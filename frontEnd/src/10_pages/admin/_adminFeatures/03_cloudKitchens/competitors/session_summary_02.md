# Competitors map view — session summary

This document records work on the **Cloud Kitchens → Competitors** admin feature, focused on the **map view** (`view_competitors_map`): Google Maps integration, competitor/branch markers, coverage overlays (radius + polygon), per‑pin overrides, mock data simulation, i18n, and an enhanced bottom info panel. Plain JavaScript / JSX; styling uses theme CSS variables.

---

## 1. High-level goals

- **Show Dubai map** with all competitors displayed as **logo markers**.
- Layout should be: **controls on top**, **map in the middle**, **info panel below**.
- Markers should be **all Dubai branches** for each competitor (not “one pin per competitor”).
- Coverage visualization:
  - **Polygon coverage** and **radius coverage** exist for each branch.
  - Top controls must include **two toggles**: show/hide **Polygon (all)** and **Radius (all)**.
  - Each pin tooltip must include buttons to **show/hide polygon** and **show/hide radius** for that **specific pin**.
  - Global toggles must not block per-pin toggles (pin should override global).
- Mock data must simulate coverage radii + polygons so the map is usable before API integration.
- Pin selection should **immediately populate** the bottom info panel (no extra “View info” click required).

---

## 2. Sessions, routing, and where the map lives

- **Session key:** `view_competitors_map` (already part of `VALID_SESSIONS` and `VALID_VIEW_MODES`).
- **Entry component:** `competitors/Competitors.jsx` renders `Competitors_mapView` when session is map.
- **Toggle:** `01_competitors_comps/Competitors_viewToggle.jsx` switches between `view_competitors_table` and `view_competitors_map`.

---

## 3. Map view architecture (mirrors Branches map view)

We followed the Branches map view structure and patterns:

### 3.1 Parent component (`Competitors_mapView.jsx`)

File: `01_competitors_comps/Competitors_mapView.jsx`

- Guards on session: returns null unless `states.session === "view_competitors_map"`.
- Uses `googleMaps_apiKey` from `branches/branches.config.js`.
- Handles:
  - Missing key fallback
  - Script load error fallback
  - Loading fallback
- Composes the view in the correct order:
  1) `<Competitors_mapView_controls />`
  2) `<Competitors_mapView_map />`
  3) `<Competitors_mapView_info />`

### 3.2 Hook: map state + script loader (`useCompetitors_mapView.js`)

File: `03_competitors_hooks/Competitors_mapView_hooks/useCompetitors_mapView.js`

- Loads Google Maps script via `useJsApiLoader` with `libraries: ["marker"]` to enable Advanced Markers.
- Keeps `mapRef` for fit-bounds and overlay management.
- Owns state for:
  - active marker (`activeMarkerKey`)
  - info panel target (`infoPanelCompetitorId`, `mapInfoExpanded`)
  - global coverage toggles (`showAllPolygon`, `showAllRadius`)
  - per-pin coverage overrides (see §6)
- Fits bounds to visible competitors after script load (uses helper `fitMapToCompetitors`).

### 3.3 Marker creation (AdvancedMarkerElement)

Files:
- `03_competitors_hooks/Competitors_mapView_hooks/useCompetitors_map_marker.js`
- `01_competitors_comps/.../competitors_mapView_map/Competitors_mapView_map_marker.jsx`

Key points:
- Uses AdvancedMarkerElement with custom DOM content:
  - Circular logo tile
  - Fallback initial badge if image missing/failed
- Click uses the stable handler ref pattern (avoids re-creating markers on re-render).
- Marker opens an InfoWindow when active.

---

## 4. Rendering “all branches” pins (Dubai-only)

File: `01_competitors_comps/competitors_childComps/competitors_mapView/Competitors_mapView_map.jsx`

- For each competitor:
  - Filters `branches.locations` to emirate === `"Dubai"`.
  - Renders **one marker per Dubai location**.
- Each marker gets:
  - `markerKey = "${competitorId}:${idx}"` (stable, deterministic)
  - `competitorId`
  - location lat/lng
  - an address line built from `emirate · city · address`

This guarantees:
- Multiple branches show as multiple pins.
- Coverage overlays can be attached per-branch (per markerKey), not per competitor.

---

## 5. Coverage data model used by the map

Coverage data is read from the competitor mock/schema shape:

- `branches.locations[].coverageAreas.byDistance.radius.km`
- `branches.locations[].coverageAreas.byDistance.radius.center.{lat,lng}`
- `branches.locations[].coverageAreas.byDistance.polygon[]` (array of `{lat,lng}` points)

---

## 6. Coverage overlays: polygons + radii

### 6.1 Overlay lifecycle (no React overlay components)

Instead of rendering `<Circle/>` / `<Polygon/>` React components, the map uses native Google Maps overlay classes:

- **Radius:** `new google.maps.Circle({ ... })`
- **Polygon:** `new google.maps.Polygon({ ... })`

They are created lazily and cached in a ref:

- `coverageRef.current.circlesByMarkerKey: Map<markerKey, Circle>`
- `coverageRef.current.polygonsByMarkerKey: Map<markerKey, Polygon>`

This avoids recreating overlays on every React render, and ensures we can quickly show/hide them by calling `overlay.setMap(map)` or `overlay.setMap(null)`.

### 6.2 Unique color per competitor

Each competitor gets a deterministic color based on its `_id`:

- A small palette is used
- A simple hash picks a palette index
- That color is reused for:
  - all branch polygons for that competitor
  - all branch radius circles for that competitor

This makes the map readable when multiple coverages overlap.

### 6.3 Global controls (show/hide all)

File: `01_competitors_comps/.../competitors_mapView/Competitors_mapView_controls.jsx`

Top-left controls include:

- **`Polygon (all)`** → toggles `showAllPolygon`
- **`Radius (all)`** → toggles `showAllRadius`

These are *default layers*: they define what is visible when a pin has no override.

### 6.4 Pin tooltip controls (per-pin)

File: `.../competitors_mapView_map/Competitors_mapView_map_marker.jsx`

Each InfoWindow includes buttons:

- **Show/Hide polygon** (for that pin)
- **Show/Hide radius** (for that pin)

Critically, these actions are **per markerKey** (per branch pin), not “per competitor”.

### 6.5 Per-pin override system (the key fix)

Problem encountered:
- When global `Polygon (all)` or `Radius (all)` was ON, we could not hide an individual pin’s polygon/radius because `global || pinToggle` always resolved to true.

Solution:
- Implemented per-pin tri-state overrides with precedence:

`override(show/hide)` **wins** → otherwise **inherit** global default.

Hook state:

- `polygonByMarkerKey: Record<markerKey, "show"|"hide">`
- `radiusByMarkerKey: Record<markerKey, "show"|"hide">`

Effective state:
- if override is `"show"` → ON
- if override is `"hide"` → OFF
- else → follows the global toggle

This guarantees:
- You can hide a single pin even when “all polygons” is enabled
- You can show a single pin even when global is off
- Pin toggles never interfere with the global controls (they override, they don’t rewrite global state)

---

## 7. Info panel: auto-load on pin click + more informative UI

### 7.1 Auto-load info (no “View info” click needed)

Hook: `useCompetitors_mapView.js`

Marker click now does:

- sets `activeMarkerKey`
- sets `infoPanelCompetitorId`
- expands the info panel (`mapInfoExpanded = true`)

This makes the UX feel like “select pin → details appear”.

### 7.2 More informative panel content

File: `.../competitors_mapView/Competitors_mapView_info.jsx`

Enhancements:

- **Selected pin (branch)** card:
  - address line (emirate/city/address)
  - coordinates
  - polygon/radius ON/OFF (computed using same override precedence)
  - radius km from the location coverage data
- **Competitor context**:
  - price range (localized via `formatPriceRangeLabel`)
  - menu items count + menu categories count (helpers)
  - cuisine tags
  - menu name
  - notes (competitor description)
  - quick links chips (website/instagram/facebook when present)

CSS support:
- `competitors_mapView_info.css` gained compact “mini grid” UI pieces and link chips.

---

## 8. Mock data upgrades for map view (coverage + polygons)

File: `05_competitors_cnst/MOCK_DATA.js`

Changes:

- `loc()` now accepts `coverageKm` and stores it in:
  - `coverageAreas.byDistance.radius.km`
  - `coverageAreas.byDistance.radius.center`
- Added a polygon generator to populate:
  - `coverageAreas.byDistance.polygon`

Polygon realism:
- Polygons are intentionally **irregular** (not perfect circles) to resemble “drive-time-ish” shapes.
- Still deterministic and fast to compute (no external APIs).

Dubai locations were updated to include realistic km radii (e.g. ~2.2–4.5km) so radii and polygons render visibly.

---

## 9. Internationalization (map view keys)

Files:
- `frontEnd/public/locales/{en,ar,ru,hy}/competitors.json`

Added map view keys for:

- Controls:
  - `mapView.allPolygon`, `mapView.allRadius`
  - `mapView.toggleAllPolygonTitle`, `mapView.toggleAllRadiusTitle`
- Tooltip buttons:
  - `mapView.popupShowRadius`, `popupHideRadius`
  - `mapView.popupShowPolygon`, `popupHidePolygon`
- Info panel cards / labels:
  - `mapView.cardSelectedBranch`, `mapView.noActivePin`, `mapView.cardCoords`
  - `mapView.cardCoveragePolygon`, `mapView.cardCoverageRadius`, `mapView.cardCoverageKm`
  - `mapView.cardPriceRange`, `mapView.cardMenuItems`, `mapView.cardMenuCategories`
  - `mapView.cardNotes`, `mapView.cardLinks`

Reminder: All user-visible strings were added to **all 4 locales** to keep i18n consistent.

---

## 10. Styling (map view)

Files:
- `_styles/competitors_mapView.css` (map layout + marker tile + popup)
- `_styles/competitors_mapView_controls.css` (top controls)
- `_styles/competitors_mapView_info.css` (bottom info panel)

Key UX styling details:
- Map shell uses a single scroll container (no nested map scrollbars).
- Markers are small logo tiles with a fallback initial badge (no broken images).
- Info panel uses a clean card grid with compact “mini rows” for pin metrics.

---

## 11. Verification performed

- `npm run build` in `frontEnd/` succeeded repeatedly during iterations (after coverage refactors, per-pin overrides, and info panel enhancements).

---

## 12. Summary sentence

We implemented the **Competitors map view** with a Dubai-centered Google Map showing **all Dubai branch pins** as **logo markers**, added **coverage overlays** for each pin (radius + polygon) with both **global show-all toggles** and **per-pin show/hide overrides**, upgraded `MOCK_DATA.js` to simulate realistic coverage radii + irregular polygons, wired **pin selection** to immediately populate an enhanced **bottom info panel**, and added full **i18n coverage** for the entire map workflow across `en/ar/ru/hy`.

