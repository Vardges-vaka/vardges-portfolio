# Cloud Kitchen Domain — Master Logic

Canonical design reference. Read before designing or modifying any schema. Sister docs:
- `LAYOUT.md` — folder structure (32 schemas)
- `TRACKER.md` — progress + open decisions
- `RESUME.md` — prompt to bootstrap a fresh session
- `RESEARCH_PLAN.md` — coverage area algorithm
- `RESEARCH_DEPRECIATION.md` — equipment depreciation

---

## 1. Context

Private MERN admin dashboard for cloud kitchen operations. Solo user (~95%). Production reality:

- **3 own brands**: Vkusno, Blini (twins — symmetric mirror), Kompot
- **Tracked competitors**: separate but parallel modeling
- **4+ branches** in Dubai: Arjan, Business Bay (SOL + Cuisinette), Dubai Marina, Dubai Silicon Oasis
- **7 sales platforms**: Talabat, Careem, Noon, Deliveroo, BTT, Call Center, Express Talabat
- **Inventory & sales integrations**: Supy/Sapaad (inventory), GrabTech/UrbanPiper (sales-channel managers)

---

## 2. Core architectural principles

### 2.1 Storage shape ≠ view shape
DB models **domain truth** (normalized, queryable, lifecycle-aware). Frontend gets **denormalized view shapes** via a presenter layer at `07_controllers/<feature>Cntrl/_utils/<feature>_presenters/`.

### 2.2 Polymorphic ownership (`refPath`)
- `Menu`: ownerType ∈ `Brand` | `Competitor`
- `Contract`: ownerType ∈ `Brand` | `Branch` | `Employee` | `Equipment` | `Integration` | `Menu` | `Other`
- `ReceivedItem`: itemType ∈ `Ingredient` | `SubRecipe` | `Packaging`

### 2.3 Many-to-many vs polymorphic
- Many-to-many arrays when entity is *shared* (Integration.brands/branches, SalesChannel pivot)
- Polymorphic owner when entity belongs to *one* owner

### 2.4 Pivot collections
`SalesChannel` pivots Branch × Brand × SalesPlatform. Order references one SalesChannel, not three refs.

### 2.5 Convenience back-refs
Brand.contracts/menus/integrations etc. for populate convenience. Cost: bidirectional sync. OK <~100 per parent.

### 2.6 Audit + soft delete on every entity
Every schema spreads `AUDIT` (exported plain object from `modelHelpers/.temp.index.js`):
```
isActive, isDeleted, deletedAt, deletedReason,
createdBy, updatedBy, deletedBy   // each → { ref: "User" }
```
Mongoose `{ timestamps: true }` handles `createdAt`/`updatedAt`.

### 2.7 Reference data in own collections
SalesPlatform (~7 records), CuisineTag (aggregator vocabulary).

### 2.8 Snapshot vs ref on transactional records
Order/Refund/AdSpend referencing Campaign/Contract **store both the ref AND a snapshot** so historical totals don't drift when the definitional record is edited.

### 2.9 Discriminator + flexible metrics
One collection + `kind` enum + loose `metrics: {}` subdoc (AdSpend pattern). Not Mongoose discriminators.

### 2.10 Derived data is never stored — computed via presenters
Branch costs, SalesChannel rating aggregates, Equipment book value, Competitor branch counts — all derived at read time from source collections. Schema holds only manual/ad-hoc data with no other home.

### 2.11 Variant arrays for context-dependent geometry
`coverageAreas: [{ label, kind, polygon, radius, notes }]` — labels like `normal | peak | weekend | ramadan`. New variant = data change, not schema change.

### 2.12 Lifecycle pattern for soft-delete on subdoc arrays
For subdoc-array entries that need historical tracking (Competitor.branches[], Competitor.branches[].platforms[]):
```js
lifecycle: {
  startAt:     { type: Date, default: Date.now },  // auto-stamp creation
  restartedAt: { type: Date },                      // for close→reopen cycles
  endAt:       { type: Date },                      // soft-delete marker
}
```
**Discipline rule**: never `splice()` or `pull()` — set `lifecycle.endAt` instead. Enables active-at-date filtering:
```js
const active = items.filter(i =>
  i.lifecycle.startAt <= T && (!i.lifecycle.endAt || i.lifecycle.endAt > T)
);
```

### 2.13 Paired files + storage with `getStorageSchema()`
Files always come with their storage destination:
```js
files: getStorageSchema(),
// returns { cloudStorage: getCloudStorageSchema(), items: [getGeneralFilesSchema()] }
```
Makes "files without storage" unrepresentable.

### 2.14 `by*` prefix for relationship dimensions
When capturing *which dimensions* of a relationship apply (Competitor.competesWith):
```js
byPlatforms:   [{ ref: "SalesPlatform" }],   // empty = doesn't compete on platforms
byCuisineTags: [{ ref: "CuisineTag" }],      // same logic
byCoverageArea: Boolean,                     // explicit yes/no
byPriceRange:   Boolean,
```
Single consistent reading: "competes by X if the array is non-empty / boolean is true."

### 2.15 Per-context observations
Same `observations[]` shape used at different scopes — top-level (about the entity) vs nested (about a specific relationship). Different lifetimes, different query patterns. Keep both.

---

## 3. Domain glossary

| Term | Definition |
|---|---|
| **Brand** | Owned restaurant identity. Has name, files, socials, registration, refs to website/contracts/integrations/menus/branches/employees/equipments/competitors/siblings. |
| **Competitor** | Tracked external brand. Lifecycle on branches[] + platforms[]. Per-branch `competesWith[]` with `by*` dimensions. |
| **Branch** | Physical kitchen. Holds operations (hours), expenses (ad-hoc only — derived costs via presenter), coverageAreas (variant array), files (paired storage), contracts/employees/equipments/brands refs. |
| **SalesPlatform** | Catalog of platforms. `kind: third-party | direct`. |
| **SalesChannel** | **Pivot** for {branch, brand, platform}. storeIds (multi-source), status (8-state), commissionPct cache, ratings aggregate, excludedMenuItems. |
| **Integration** | Vendor account. Many-to-many with brands+branches. References Contract for legal lifecycle. |
| **Contract** | Legal agreement. Polymorphic owner. |
| **Website** | Standalone collection (deferred). |
| **CuisineTag** | Aggregator-sourced vocabulary. `kind` discriminator. |
| **Menu** layer | Menu → MenuCategory → MenuItem → MenuItemModifier → MenuItemModifierOption. Polymorphic owner Brand/Competitor. |
| **Recipe** layer | Recipe with components: Ingredient + SubRecipe + Packaging. SubRecipe = prep only. |
| **Ingredient / Packaging / Supplier** | Sourcing. |
| **Store** | Storage location inside a branch. |
| **ReceivedItem** | Inflow event. Polymorphic over Ingredient/SubRecipe/Packaging. |
| **Order** | Sales event on SalesChannel. Holds OrderItems + appliedCampaigns snapshot. |
| **Refund** | Order's twin. Kind, funding split, status. |
| **Customer** | Thin. orderStats cached, complaints subdoc, source enum. |
| **Rating** | Per-event review. Aggregate cached on SalesChannel. |
| **Campaign / AdSpend** | Promo rules / time-period ad spend. AdSpend uses `kind` + `metrics` pattern. |
| **Employee** | Staff. legalDocs[] polymorphic, position history, attendance tracking inline. |
| **Equipment** | Asset. Refs Branch. Depreciation params + computed book value. |
| **Invoice** | Bills/receipts. Referenced by Branch.expenses, Equipment.purchase, AdSpend, Integration.payment. |

---

## 4. Relationship map

```
SalesPlatform ──┐
                │
Brand ──┬───────┼──→ SalesChannel ──→ Order ──→ Rating
        │       │          │              ╲        ╲
        │       │          │               ╲        Customer
        │       │          │                ╲
        │       │          ├──→ AdSpend      └─→ Refund
        │       │          └──→ Campaign ──→ (snapshot in Order.appliedCampaigns)
        │       │
Branch ─┴───────┘
        │
        ├──→ Store ──→ ReceivedItem (polymorphic: Ingredient | SubRecipe | Packaging)
        └──→ Equipment

Brand ──→ Menu ──→ MenuCategory ──→ MenuItem ──→ MenuItemModifier ──→ MenuItemModifierOption
     └──→ Website / Contracts[] / Integrations[] / CuisineTags[] / siblings[Brand]

Recipe ──┬──→ Ingredient ──→ Supplier
         ├──→ SubRecipe (self-loop)
         └──→ Packaging ──→ Supplier

Contract ←── polymorphic owner: Brand | Branch | Employee | Equipment | Integration | Menu | Other
Competitor ── branches[].lifecycle / platforms[].lifecycle / competesWith[] (per branch, by* dimensions)
```

---

## 5. Locked-in patterns

### 5.1 Routes
PUT only, no PATCH. Field-per-route granularity. Flat URL prefixes.

### 5.2 Backend file organization
Controllers/services/validators: 3-folder split (`_crud/`, `_fields/`, `_relations/`). Always import from barrels.

### 5.3 Schema conventions
PascalCase singular models. camelCase fields. Subdoc helpers return Schema, field-spread helpers return plain objects. Enums in `10_constances/cloudKitchen/`.

### 5.4 Service shape
Controller → validator → service → response envelope `{success, message, payload}`.

### 5.5 Pagination
`?page=1&limit=50`, hard cap 200.

### 5.6 Helper patterns — two kinds
```js
// Field-spread helper — plain object, spreadable
const getNewAuditFieldsSchema = () => ({ ... });
// Subdoc helper — Schema instance, used as field value
const getDescriptionSchema = () => new mongoose.Schema({...}, { _id: false });
```
Exported `AUDIT` constant in `modelHelpers/.temp.index.js` spread into every schema.

### 5.7 File handling
Flat `files: getStorageSchema()` (paired cloudStorage + items). `usedIn` enum (broad category). TODO: add `role`/`subType` for specific slots.

### 5.8 Campaign attribution
Campaign holds rule; Order snapshots applied discount.

### 5.9 Refund pattern
Top-level collection. Refs Order + Customer + SalesChannel. Funding split.

### 5.10 AdSpend kind/metrics
One collection, `kind` enum, flexible `metrics: {}` subdoc.

### 5.11 Variant arrays for context-dependent geometry
`coverageAreas: [{ label, kind, polygon, radius, notes }]`.

### 5.12 Runtime-computed costs
Branch.expenses[] holds manual/ad-hoc only. Rent/salaries/contractual = derived via presenter.

### 5.13 Lazy creation in ingestion services
Customer, Campaign, Rating — create on first encounter during Order ingestion.

### 5.14 SalesChannel storeIds as labeled array
`[{ source: enum, value: String, notes }]`.

### 5.15 SalesChannel status — single 8-state enum + transition dates
`queued | skipped | onboarding | live | paused | maintenance | terminated-temporary | terminated-permanent`.

### 5.16 Lifecycle pattern on subdoc arrays
```js
lifecycle: { startAt: Date.now default, restartedAt, endAt }
```
Set `endAt` to soft-delete; never splice. Enables historical queries.

### 5.17 Equipment depreciation — parameters not values
Store method/usefulLifeYears/salvageValue/inServiceDate. Book value computed via presenter at any asOf date.

### 5.18 `by*` prefix for relationship dimensions
`byPlatforms[]`, `byCuisineTags[]`, `byCoverageArea: Boolean`, `byPriceRange: Boolean`. Single consistent reading.

### 5.19 Per-branch competition on Competitor
Each competitor branch has its own `competesWith[]`. Geographic competition is per-location.

### 5.20 Paired storage + files (`getStorageSchema`)
`files: getStorageSchema()` bundles `cloudStorage` + `items[]`. Invalid states unrepresentable.

---

## 6. Cross-cutting concerns

### Vkusno/Blini twin pattern
Separate Brand docs. `Brand.siblings: [{ ref: "Brand" }]`. Service layer maintains symmetry.

### Recipe vs SubRecipe
Separate models. Recipe.components polymorphic: ingredient | subRecipe | packaging.

### Credentials handling (open)
Three tiers for `Integration.credentials`:
- Best: external secrets manager (GCP/AWS)
- Workable: field-level encryption
- Minimum: `select: false` + restricted routes

**Decision pending — blocks Integration design.**

### Aggregator placement
Aggregators = SalesPlatform records (catalog). Connection via SalesChannel pivot. **NOT** fields on Brand or Branch.

### Coverage area algorithm
Separate research scoped in `RESEARCH_PLAN.md`.

### Depreciation
Separate research scoped in `RESEARCH_DEPRECIATION.md`.

---

## 7. What lives where

See `LAYOUT.md` for the 30-schema table.

| Domain | Folder | Schemas |
|---|---|---|
| Brand & competitors | `cloudKitchen_brand/` | 2 |
| Menu layer | `cloudKitchen_menu/` | 5 |
| Recipe & sourcing | `cloudKitchen_recipe/` | 5 |
| Inventory | `cloudKitchen_inventory/` | 2 |
| Marketing | `cloudKitchen_marketing/` | 2 |
| Operational / sales / ops infra | `cloudKitchen_general/` | 12 |
| Cross-cutting transactions | `cloudKitchen/` (root) | 2 |
| **Total** | | **30** |

---

## 8. Forbidden anti-patterns

- **Spreading a `new mongoose.Schema()` instance** — silently drops fields.
- **`required` as bare identifier** — `ReferenceError`. Use `required: true`.
- **Duplicating shared records across owners** — use many-to-many arrays.
- **Encoding schema slots into UI shape** — use flat array + presenter.
- **Plural model names** — Mongoose convention is singular.
- **PATCH endpoints** — PUT only.
- **`new mongoose.Schema({ type: ObjectId, ref })` for ref fields** — that's a subdoc, not a ref.
- **Splitting AdSpend per kind** — wrong cut.
- **Mongoose discriminators when a loose `metrics: {}` subdoc works** — overkill.
- **Duplicating Contract lifecycle on Integration/AdSpend** — Contract holds legal terms.
- **Storing derived costs/aggregates as static fields** — compute at read time.
- **Bare `ObjectId` reference** — must be `mongoose.Schema.Types.ObjectId`.
- **`audit`/`AUDIT` spread of undefined variable** — must spread the constant from helpers.
- **Aggregator field on Brand or Branch** — connect via SalesChannel pivot.
- **Splicing/pulling from subdoc arrays with lifecycle** — set `endAt`, don't remove.
- **Calling Schema instance as function** (`PlatformsSchema()` when already `getPlatformsSchema()`) — TypeError.
- **Field named `type` inside a path config** — fragile due to Mongoose discriminator parsing; use `kind`.
- **Storing derived aggregates** (`branchesInfo`, `totalQnt`) — drift. Use lifecycle filter + presenter.

---

## 9. Session log

| Session | Outcome |
|---|---|
| Menu layer (prior) | 5 schemas + ~99 routes/controllers/services/validators scaffolded |
| Brand | Brand.js finished, 26-schema layout decided, doc set created |
| Marketing + Refund | Campaign, AdSpend (new folder), Refund (root). Total 29. Patterns 2.8–2.9, 5.8–5.10. |
| Operational core | SalesPlatform, SalesChannel, Customer, CuisineTag, Branch finished (5 schemas). AUDIT exported. Coverage RESEARCH_PLAN.md. Patterns 2.10–2.11, 5.11–5.15. |
| Invoice add | Invoice slotted into general. Total 30. |
| Org & competitor | Employee, Equipment, Competitor finished (3 schemas). RESEARCH_DEPRECIATION.md created. New patterns 2.12 (lifecycle pattern), 2.13 (paired storage), 2.14 (by* prefix), 2.15 (per-context observations), 5.16–5.20. New helpers: `getStorageSchema`, `getBranchLocationSchema`, `getWarrantySchema`, `getDocSchema`. |
| Rating | Rating finished. REVIEWS.md + ORDERS.md + KAM_NOTES.md created. Customer linkage via Order chain (no name on Rating). |
| Integration | Tier 3 credentials (`select: false`). Scope = 4 vendors only. Aggregator portals excluded. |
| Marketing | Campaign + AdSpend. Campaign 4-field funding (brandPct/platformPct + per-order fees). AdSpend `kind` + `metrics`. |
| Order | Order + OrderImportRaw + SalesChannelMetrics. Q1=merge, Q2=subdoc items, Q3=separate raw collection. Three-granularity pro user model. Ingestion hierarchy: GrabTech→V/B, UrbanPiper→K, Talabat direct reports preferred when available, Sapaad ruled out. VAT 5% post-discount confirmed. |
| Contract (draft) | First-principles draft. Polymorphic owner (Brand/Branch/Employee/Equipment/Integration/SalesChannel/Menu/Other), `kind` enum, `commercialTerms: Mixed` for kind-specific terms, lifecycle + status + renewal/termination fields. **NOT FINAL** — revisit when real contract samples are gathered. |
| Rating | Rating finished (1 schema). Analysis docs added at `cloudKitchen/` root: REVIEWS.md (per-platform review data), ORDERS.md (GrabTech/UrbanPiper/Sapaad export analysis), KAM_NOTES.md. New pattern: `comment: {original, translated}` for translation pipelines. Customer linkage on Rating goes via `Rating.platformOrderId → Order.externalIds → Order.customer`. |
