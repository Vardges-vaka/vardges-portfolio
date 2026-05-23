# Research Plan — Coverage Area Algorithm

**Goal**: decide how to compute and store `Branch.coverageAreas` polygons + radii so that variants (normal, peak, weekend, ramadan) reflect realistic delivery reach without relying on aggregator data.

Sister docs: `MASTER_LOGIC.md` · `TRACKER.md` · `LAYOUT.md` · `RESUME.md`

---

## 1. The decision

You need to answer four questions:

1. **What input data feeds the algorithm?** (drive-time API, drive-distance, manual driving, hybrid)
2. **What geometry do you store?** (polygon only, radius only, both, sampled points)
3. **How do you handle variants?** (normal vs peak vs weekend etc.)
4. **How often do you recompute?** (one-time, periodic, on-demand)

Each downstream question depends on these four. The research plan is structured to settle them in order.

---

## 2. Phase 1 — Pick a data source

| Source | Cost | Accuracy | Effort | Notes |
|---|---|---|---|---|
| **Google Distance Matrix API** | Paid per request | High | Low | Industry standard; rate-limited; needs API key + billing |
| **Mapbox Isochrone API** | Paid, free tier | High | Lowest | Returns the polygon directly for a given drive-time |
| **HERE Routing API** | Paid | High | Low | Alternative to Google; sometimes better for MENA |
| **OSRM (OpenStreetMap)** | Free / self-hosted | Medium | High | Self-host required; UAE OSM data quality is good for Dubai |
| **Manual sampling** | Free | Variable | Very high | You drive routes, log times, fit polygon. Reliable but slow |
| **Hybrid (Mapbox + manual validation)** | Mixed | Highest | Medium | Mapbox baseline, you spot-check 10-20 points |

**Research tasks:**
- [ ] Get Mapbox free-tier limits and pricing past free tier
- [ ] Check Google Distance Matrix cost per 1000 calls
- [ ] Try the Mapbox Isochrone API with one branch coordinate; visualize the resulting polygon
- [ ] Compare Mapbox isochrone vs Google Distance Matrix radius for the same branch — how different are they?

**Decision output**: pick one primary source.

---

## 3. Phase 2 — Pick the geometry

Three storage options:

### A. Polygon-only
Store the actual contour (array of lat/lng).
- **Pro**: precise, irregular shapes (matches real streets)
- **Con**: harder to compute "is customer inside?" — needs a point-in-polygon check (mongoose+turf.js works)

### B. Radius-only
Store a circle: center + radius (km or minutes).
- **Pro**: trivial computation
- **Con**: ignores reality — Dubai has bridges, dead-ends, highways that distort coverage. A circle says you reach Palm Jumeirah from Marina; you might not.

### C. Both (recommended)
Store both. Polygon as ground truth, radius as a fast pre-filter.
- **Pro**: cheap rejection ("> radius from center? not eligible, skip polygon check"), accurate include
- **Con**: storage cost (negligible)

**Research tasks:**
- [ ] Test point-in-polygon performance for a single branch's polygon (~50 vertices) — should be sub-millisecond
- [ ] Decide whether you need the radius fallback or just polygon
- [ ] Confirm the variant array in your schema can hold both — current `radius.value` + `polygon` already supports it

**Decision output**: confirm the current `Option B variants array` shape covers your needs.

---

## 4. Phase 3 — Define the variants

You said: normal + peak + (maybe weekend, ramadan).

**Research tasks:**
- [ ] List the variants you actually need at launch (recommended: just "normal" + "peak")
- [ ] Define peak windows: lunch (12-3pm?), dinner (7-10pm?), weekend lunch, ramadan iftar
- [ ] Decide what changes at peak: only the polygon shrinks? Only the radius value? Both?
- [ ] Do you need per-day-of-week variants, or weekday/weekend bucket is enough?

**Decision output**: a finalized enum of variant labels and an operational definition of each.

---

## 5. Phase 4 — Compute methodology

For each branch × each variant, decide:

### A. Sample points
- How many sample destinations do you query? (8 cardinal directions? 16? a grid?)
- Drive-time threshold (e.g., 25 min normal, 35 min peak)
- Maximum reach (don't query beyond 15km — it's pointless)

### B. Polygon construction
- Take the N points, fit a polygon (alpha shape / concave hull / simple convex hull)
- Smoothing pass to remove artifacts

### C. Validation
- Cross-check against ~20 known delivery records (orders you've fulfilled)
- Spot-check against what platforms show on their app
- Manually drive 2-3 edge cases

**Research tasks:**
- [ ] Pick a sampling density (recommend: 16 directions, 250m increments out to 15km)
- [ ] Choose convex vs concave hull (concave is more realistic; needs alpha parameter tuning)
- [ ] Define an acceptance threshold ("80% of historical orders must fall inside the polygon")

**Decision output**: a documented algorithm spec you (or future you) could re-run.

---

## 6. Phase 5 — Recompute strategy

| Strategy | When to use |
|---|---|
| **One-time, hardcoded** | Coverage stable; no big traffic changes expected |
| **Periodic (monthly)** | Dubai traffic patterns evolve; new roads open; sensible for the long run |
| **On-demand (manual trigger)** | When you notice your zone is wrong, click "recompute" |

**Research tasks:**
- [ ] Decide if coverage is "static reference data" or "living data"
- [ ] If recomputing, estimate API cost per recompute × frequency
- [ ] Build a one-off script first; promote to scheduled job only if you re-run more than 2-3 times

**Decision output**: a refresh policy.

---

## 7. Phase 6 — Application points

Where in your app does coverage get used? Affects how fast it needs to be.

- [ ] **Order ingestion** — when an order lands, do you check if the delivery address was inside coverage? (Audit / data quality use)
- [ ] **UI display** — show your zone on an admin map?
- [ ] **Analytics** — "how many orders fell near the edge of our zone?"
- [ ] **Operational** — alert if a SalesChannel goes live without a defined coverage area?

If only used for analytics, performance doesn't matter. If used real-time, polygon-in-polygon needs to be indexed (MongoDB supports geospatial indexes — research that).

---

## 8. Open questions to settle before implementation

- [ ] Does coverage *ever* differ by platform, or are you happy with one-per-branch forever?
- [ ] What's the cost ceiling for the data source you pick? (e.g., "I'll spend up to $20/month")
- [ ] Do you want to model peak vs normal as separate stored variants, OR derive peak by shrinking normal by a factor at read time?
- [ ] Is the polygon ever edited manually after computation, or treated as a pure compute output?
- [ ] How do you visualize and verify? (Need a small admin map UI, or just dump coordinates to a viewer like geojson.io?)

---

## 9. Suggested execution order

1. **Spike**: try Mapbox Isochrone API on one branch (Arjan). Get the polygon JSON. Visualize at geojson.io. **1 hour.**
2. **Compare**: same branch, query Google Distance Matrix for 8 directions, fit a manual concave hull. Compare to Mapbox. **2 hours.**
3. **Decide**: pick one source. Pick polygon-only or polygon+radius. Pick variants. Document below in the "Decisions" section.
4. **Script**: write a one-off Node script that takes a branch's coordinates and generates the variant array your schema expects. **1 day.**
5. **Populate**: run script for all branches, paste output into your seed.
6. **Validate**: cross-check against ~20 real orders. Adjust alpha / sampling if needed.

---

## 10. Decisions log (fill in as you go)

> When you make a decision, write it here so future you doesn't re-litigate.

- Primary data source: _TBD_
- Geometry stored: _TBD_
- Variants enabled at launch: _TBD_
- Peak window definition: _TBD_
- Recompute frequency: _TBD_
- Maximum reach (km from branch): _TBD_
- Sampling density: _TBD_
- Polygon fit method: _TBD_

---

## 11. Resources to look at

- Mapbox Isochrone API docs: https://docs.mapbox.com/api/navigation/isochrone/
- Google Distance Matrix API: https://developers.google.com/maps/documentation/distance-matrix
- Turf.js (point-in-polygon, concave hull): https://turfjs.org/
- MongoDB geospatial queries: https://www.mongodb.com/docs/manual/geospatial-queries/
- geojson.io for visualizing polygons: https://geojson.io
