# Cloud Kitchen Domain — Progress Tracker

**Last updated**: 2026-05-23 (contract draft)
**Total schemas planned**: 32 · **Done**: 21 + 1 draft (Contract) · **Deferred**: 3 · **Remaining to design**: 7

> Note: Contract is at draft state. Refined against ~4 of ~22 contract samples (Deliveroo + Grubtech extracted cleanly; Careem + Talabat hybrid partially). The other ~18 (Talabat image-based PDFs, Noon JPEG, DHK kitchen rentals, merchant agreements, framework docs) are NOT YET REVIEWED. **Schema must be revisited once those are reviewed** — lease/rental contracts in particular may surface fields the current draft doesn't model. See `cloudKitchen_info/CONTRACT.md` for the full review-status list.

Sister docs: `MASTER_LOGIC.md` · `LAYOUT.md` · `RESUME.md` · `RESEARCH_PLAN.md` · `RESEARCH_DEPRECIATION.md`

---

## Done ✅ (14)

| # | Schema | Location | Session |
|---|---|---|---|
| 1 | Menu | `cloudKitchen_menu/Menu.js` | prior |
| 2 | MenuCategory | `cloudKitchen_menu/MenuCategory.js` | prior |
| 3 | MenuItem | `cloudKitchen_menu/MenuItem.js` | prior |
| 4 | MenuItemModifier | `cloudKitchen_menu/MenuItemModifier.js` | prior |
| 5 | MenuItemModifierOption | `cloudKitchen_menu/MenuItemModifierOption.js` | prior |
| 6 | Brand | `cloudKitchen_brand/Brand.js` | Brand |
| 7 | SalesPlatform | `cloudKitchen_general/SalesPlatform.js` | operational-core |
| 8 | SalesChannel | `cloudKitchen_general/SalesChannel.js` | operational-core |
| 9 | Customer | `cloudKitchen_general/Customer.js` | operational-core |
| 10 | CuisineTag | `cloudKitchen_general/CuisineTag.js` | operational-core |
| 11 | Branch | `cloudKitchen_general/Branch.js` | operational-core |
| 12 | Employee | `cloudKitchen_general/Employee.js` | org & competitor |
| 13 | Equipment | `cloudKitchen_general/Equipment.js` | org & competitor |
| 14 | Competitor | `cloudKitchen_brand/Competitor.js` | org & competitor |
| 15 | Rating | `cloudKitchen_general/Rating.js` | rating |
| 16 | Integration | `cloudKitchen_general/Integration.js` | integration |
| 17 | Campaign | `cloudKitchen_marketing/Campaign.js` | marketing |
| 18 | AdSpend | `cloudKitchen_marketing/AdSpend.js` | marketing |
| 19 | Order | `cloudKitchen/Order.js` | order |
| 20 | OrderImportRaw | `cloudKitchen/OrderImportRaw.js` | order |
| 21 | SalesChannelMetrics | `cloudKitchen_general/SalesChannelMetrics.js` | order |
| 22 | Contract | `cloudKitchen_general/Contract.js` | order (DRAFT — not final, revisit with samples) |

---

## Remaining to design 🟡 (7)

| # | Schema | Target | Blocking |
|---|---|---|---|
| 1 | Recipe | `cloudKitchen_recipe/Recipe.js` | nothing |
| 2 | SubRecipe | `cloudKitchen_recipe/SubRecipe.js` | nothing |
| 3 | Ingredient | `cloudKitchen_recipe/Ingredient.js` | nothing |
| 4 | Packaging | `cloudKitchen_recipe/Packaging.js` | nothing |
| 5 | Supplier | `cloudKitchen_recipe/Supplier.js` | nothing |
| 6 | Store | `cloudKitchen_inventory/Store.js` | nothing |
| 7 | ReceivedItem | `cloudKitchen_inventory/ReceivedItem.js` | nothing |

Also designable but flagged separately:
- **Invoice** (`cloudKitchen_general/Invoice.js`) — minor, can be done anytime
- **Integration** (`cloudKitchen_general/Integration.js`) — blocked on **credentials tier** decision

---

## Deferred ⏸ (9)

| # | Schema | Reason |
|---|---|---|
| 1 | Order | Unknown until GrabTech/UrbanPiper export shapes seen |
| 2 | Refund | Depends on Order |
| 3 | Rating | Depends on Order |
| 4 | Campaign | Depends on Order |
| 5 | AdSpend | Depends on Order |
| 6 | Website | Low priority — user skipped |
| 7 | Contract | Needs real contract samples (legal terms vary) |
| 8 | Invoice | Designable anytime — pause until real bill samples are useful |
| 9 | Integration | Blocked on credentials tier decision |

---

## Next-step sequence

### Priority 1 — design now (mongoose refs resolve later)
1. ~~Rating~~ ✅
2. ~~Integration~~ ✅ (Tier 3 credentials)
3. ~~Campaign~~ ✅
4. ~~AdSpend~~ ✅
5. ~~Order~~ ✅ (+ OrderImportRaw, + SalesChannelMetrics added during session)
6. Refund
7. ~~Contract~~ 🟢 **DRAFT only — revisit with real samples before locking**

### Priority 2 — after P1
1. Recipe
2. SubRecipe
3. Ingredient
4. Packaging
5. Supplier
6. Store
7. ReceivedItem
8. Invoice
9. Website

---

## Open decisions

### Blocking design
- ~~Credentials tier for Integration~~ ✅ resolved → Tier 3 (`select: false`)

### Non-blocking
- [ ] **File `role`/`subType` enum** on `getGeneralFilesSchema` for named slot identification
- [ ] **`"aggrigator"` typo** → `"aggregator"` in `usedIn` enum
- [ ] **`getNewAuditFieldsSchema(ref)` dead param** — remove or use
- [ ] **OrderItem** subdoc vs own collection (defer until Order design)
- [ ] **StockTransaction** — separate from ReceivedItem (defer to inventory phase)
- [ ] **Campaign cardinality** — `salesChannels[ref]` array vs derive from brands+platforms
- [ ] **Refund shape** — final fields pending real export data
- [ ] **Coverage area algorithm** — see `RESEARCH_PLAN.md`
- [ ] **Depreciation method per category** — see `RESEARCH_DEPRECIATION.md`

---

## Decisions locked — Order session (2026-05-23)

### Q1-Q3 schema-shape decisions
- **Q1 — Merge across integrators** (one Order per real-world transaction). Dedup by externalIds at ingestion. Since only one integrator per brand (GrabTech→Vkusno+Blini, UrbanPiper→Kompot), dedup is by-source-uniqueId — no fuzzy match needed.
- **Q2 — OrderItems as subdoc array** on Order (not separate collection). Promote later only if analytics demand.
- **Q3 — Separate `OrderImportRaw` collection** for raw row backup (parse debugging / recovery). Order stays lean.

### Ingestion source hierarchy (locked)
- **Vkusno + Blini** → **GrabTech** (the two xlsx files). Use as primary.
- **Kompot** → **UrbanPiper** (the two xlsx files). Use as primary.
- **Sapaad ruled out** as primary source for Kompot — ~7× volume gap vs UrbanPiper, no aggregator order ID (can't link to Rating / Refund / Campaign attribution). Archive but don't ingest.
- **Talabat direct reports** are strictly richer than GrabTech for Talabat orders (explicit `Is Pro Order` flag, full timeline, itemized fees including Marketing Fees / Wait Time Fee / Online Payment Fee / Operational Charges, aggregator-funded vs merchant-funded split). Worth pulling for Talabat orders specifically; GrabTech becomes secondary cross-check for Talabat.

### Pro user data — three-granularity model (locked)
- **Talabat**: per-order via `Order.isProOrder` + `Order.totals.proCharge` (the +4 AED Pro Delivery Fee from the Talabat report). Filled from the Talabat direct report.
- **Careem**: daily aggregate in `SalesChannelMetrics` (segments include `cplus` / `non-cplus` / `new` / `reactivated` / `retained`). Filled from Careem business report CSV.
- **Noon**: monthly aggregate (TBD — depends on report format from accountant).
- **Deliveroo**: confirmed no pro user charges. Irrelevant.
- **Keeta**: confirmed no pro user tier at all. Irrelevant.

### Confirmed facts
- **VAT** is **5% on post-discount net**. Formula: `customerPaid = (subtotal - discount) × 1.05`. Confirmed against actual GrabTech row math.
- **GrabTech `Menu Item External ID`** is your Mongoose ObjectId — direct ref resolution at ingestion (no fuzzy match needed for Vkusno+Blini items).
- **UrbanPiper `Charges` column** captures per-order extra fees on Talabat (avg 6.11 AED) + Careem (avg 11.75 AED). Talabat-direct report's Marketing Fees breakdown is more useful — captures the same info plus the reason ("Super Saver Fee" alone or "+ Loyalty Pro Delivery Fee").

### Order schema highlights
- `externalIds: [{source, kind, value}]` flat array — dedup index on `(source, value)`
- `items: []` subdoc with `menuItem` ref + `nameSnapshot` + `unitPrice` snapshot + modifiers (with their own ref+snapshot)
- `totals` block: subtotal, gross, discount split (aggregator/merchant), tax split, proCharge, netSales, customerPaid, merchantNet
- `appliedCampaigns: []` for Campaign attribution at order time
- `cancellation: {reason, message}` for UrbanPiper data
- `ingestion: {primarySource, sources[], lastImportedAt, fileRef}` tracks which integrators contributed
- `delivery` block dropped (not operationally useful)
- **`commission` snapshot deferred** — wait until Contract is designed; the rate structure depends on contract terms (pro vs non-pro, volume tiers, etc.)

### New collections introduced
- **`OrderImportRaw`** at root — refs Order + stores raw row JSON + file + sheet + row index. For parse debugging.
- **`SalesChannelMetrics`** in cloudKitchen_general — periodic per-channel customer-segment aggregates (Careem daily, Noon monthly, anything similar from others).

### Items that move forward to KAM follow-up
- Verify per-order participation fees on Careem / Noon / Deliveroo / Keeta (Talabat 2 AED confirmed)
- Pro user reporting granularity per platform (per-order vs aggregate-only)
- Request sample reports from each platform in their native format
- Full campaign and advertising option lists from each KAM

---

## Decisions locked — Marketing session (2026-05-23)

- **Campaign**: each running promo = its own record (not template + runs). `funding` split into 4 fields: `brandPct`, `platformPct`, `perOrderBrandFee` (Talabat's 2 AED/order), `perOrderPlatformFee`. **Reality**: 99% of campaigns are 100% brand-funded; Talabat additionally charges 2 AED/order participation fee.
- **`cap` field** on Campaign for capped percentage promos (e.g. "50% up to 30 AED").
- **Open-ended validity** supported (set `validity.from`, leave `to` null for permanent promos).
- **AdSpend**: kind + metrics pattern locked. Currently only CPC is in use. `currency` dropped (AED-only). `invoice`/payment fields dropped (platform auto-deducts from sales). `attributedOrders` + `attributedRevenue` = what the platform credits back to your ads.
- **Monthly platform commitments** (Noon 5% of net sales) modeled as: Contract holds the commitment terms; AdSpend records the actual periodic spend monthly with `basis: "percent-of-net-sales"` + `contract: ref`.
- **AdvertisingSpend.js skeleton file deleted** — model name is `AdSpend`, file is `AdSpend.js`.
- **KAM_NOTES expanded**: per-platform participation fee verification + full advertising options inventory request.

---

## Decisions locked — Integration session (2026-05-23)

- **Credentials tier**: **Tier 3 (`select: false`)** chosen for solo-local-app context. Every credential field gets `select: false`; explicit `.select("+...")` required to read. App will treat DB as secret-bearing. Upgrade path to Tier 1 (cloud secrets manager) preserved if app ever deploys.
- **Aggregator portals dropped from Integration scope** — Talabat/Careem portal logins don't belong here. Integration is for paid third-party services (Supy, Sapaad, GrabTech, UrbanPiper). Portal credentials stay in password manager.
- **Scope trimmed to current reality**: only 4 actual vendors (GrabTech + Supy for Vkusno/Blini; Sapaad + UrbanPiper for Kompot). Enums tightened to match (no `quarterly`, no `trial`, etc.).
- **`registeredPhones` removed** — not needed at current scale.
- **API `credentials` block removed** — these 4 vendors don't expose API keys to operators; only portal login matters.
- **New helpers extracted**: `getLoginCredentialSchema`, `getKAMSchema`, `getPlatformSupportSchema`, `getLifecycleSchema`.

---

## Decisions locked — Rating session (2026-05-23)

- **Sample-data analysis docs added** at `cloudKitchen/` root: `REVIEWS.md` (per-platform review data), `ORDERS.md` (GrabTech/UrbanPiper/Sapaad export analysis), `KAM_NOTES.md` (personal reminders for KAM conversations).
- **Rating shape**:
  - `comment: { original, translated }` — translation pipeline pre-baked into the shape.
  - `itemFeedback[]` unified across platforms with `sentiment: liked|disliked|mentioned` (Keeta dislikes, Noon likes, future others).
  - `attachments: { images: [String], cloudStorage }` — simplified for Keeta-hosted photos (vs full getStorageSchema).
  - `platformOrderId` snapshot string — bridges to Order even when Order isn't yet ingested. Indexed.
  - `(salesChannel, receivedAt)` compound index for the dominant query.
  - Customer ref optional — resolvable via Order chain (`Rating.platformOrderId → Order.externalIds → Order.customer`).
  - Appeal block dropped — Keeta-only, low operational value.
  - `platformRawPayload` dropped — reviews are mostly manual entry, no raw payload to store.
- **Major upstream finding**: integrator exports (GrabTech especially) carry much richer customer data than the platform dashboards — real names + E.164 phones for many orders that platform dashboards mask. This shifts the Customer linkage strategy: don't capture customer-name on Rating; resolve via the Order chain.

---

## Decisions locked — Org & Competitor session

- **Employee**: `legalDocs[]` array with `kind` discriminator + `info` subdoc (polymorphic legal documents). Position history with change-type enum. Attendance tracking inline (sick days, leaves, public holidays).
- **Equipment**: depreciation block stores **parameters only** (method, usefulLifeYears, salvageValue, inServiceDate) — book value computed via presenter. `warranty` block extracted as `getWarrantySchema()` helper. Maintenance log includes its own per-event warranty (for replacement parts).
- **Competitor**:
  - **Lifecycle pattern** on branches[] AND platforms[]: `{ startAt: Date.now default, restartedAt, endAt }`. Soft-delete by setting `endAt`, not splicing.
  - **`getStorageSchema()`** helper bundles `cloudStorage` + `items: [getGeneralFilesSchema()]` — files always come with their storage destination.
  - **`getBranchLocationSchema()`** combines address + coverageAreas (variant array) in one reusable unit.
  - **`competesWith[]` is per-competitor-branch**, not top-level. Geographic competition is per-location.
  - **`by*` prefix** on dimensions of competition: `byPlatforms[]`, `byCuisineTags[]`, `byCoverageArea: Boolean`, `byPriceRange: Boolean`. Empty array / false = not competing on that dimension.
  - **Two observations[] scopes**: top-level for general competitor notes, per-`competesWith` for relationship-specific notes.
  - **Historical aggregates derivable via presenter**: count of active branches at any date T = `branches.filter(b => b.lifecycle.startAt <= T && (!b.lifecycle.endAt || b.lifecycle.endAt > T))`. No stored `branchesInfo`.

---

## Notes for next session

- Helpers in `modelHelpers/.temp.index.js` keep growing: now includes `AUDIT`, `getCoordinateSchema`, `getBranchContactSchema`, `getCustomerContactSchema`, `getDescriptionSchema`, `getCloudStorageSchema`, `getGeneralFilesSchema`, `getStorageSchema`, `getDocSchema`, `getWarrantySchema`, `getBranchLocationSchema`, plus ~20 enums. Once schemas are stable, move to `04_helpers/`.
- Bugs caught/fixed this session: `legalDocs[].type` (Mongoose-ambiguous field name) → `kind`, `PlatformsSchema()` (calling Schema instance as function), missing `coordinates` binding, `hasCps` typo → `hasCpc`, `branchesInfo` storing derived values, redundant `deactivatedAt` after lifecycle adoption, shared Schema instance via `const PlatformsSchema = getPlatformsSchema()` migrated to per-call.
- Confirmed *not needed* in app: PlatformSettlement, Expense (replaced by Branch.expenses), Shift, Attendance (folded into Employee.attendanceInfo), PurchaseOrder, Complaint (folded into Customer.complaints), InspectionLog, Incident, AuditLog, DailySnapshot, Driver/DeliveryAssignment/Vehicle (aggregator-fulfilled).
