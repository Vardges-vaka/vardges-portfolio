# Cloud Kitchen Menu — Refactoring Plan

This is the actionable checklist for refactoring the menu domain.
The conceptual design lives in `cloudKitchen_menu_README.md` — read it first.

**Phases run sequentially.** After each phase, pause and review before starting the next.

---

## Scope of this refactor

**In scope (now):** make the schema layer solid and production-ready.
- Schema helpers
- The 5 menu schemas
- Surrounding schema updates (Brand, Competitor)
- Constants & enums
- Indexes
- Data migration plan (if existing prod data needs it)

**Out of scope (decided later):** the application layer on top of the schemas.
- Mongoose validation hooks (pre/post `validate`, `save` — for schema-level rules)
- Service layer (CRUD services + invariants like mirror-sync, owner validation, soft-delete cascade)
- Express validators & sanitizers
- Controllers
- Routes
- Frontend admin UI — **architecture not yet decided**; will follow whichever frontend pattern is chosen
- i18n keys
- Smoke testing of the full flow

The schema layer is being locked in **first** so the rest can be built on a stable foundation. Nothing downstream should be touched until Phases 1–5 below are complete and reviewed.

---

## Status

- [x] Brainstorming complete (design locked in)
- [x] Phase 1 — Schema helpers
- [x] Phase 2 — Schema refactor (5 files)
- [x] Phase 3 — Surrounding schema updates (Brand, Competitor)
- [x] Phase 4 — Constants & enums
- [x] Phase 5 — Indexes & barrel cleanup
- [ ] *(later)* Validation hooks, service layer, validators, sanitizers, controllers, routes, frontend, i18n, smoke testing — **decided later**

## Implementation notes (divergences worth knowing)

1. **`getNameSchema()` bug fix.** The previous implementation wrapped its content in an outer `name:` key, causing `menuItem.name.label` to actually resolve at `menuItem.name.name.label`. The new version returns the inner shape directly so the documented path works. (Helper file: `04_helpers/schemaHelpers/cloudKitchen_helpers/cloudKitchen_menu_helpers.js`.)

2. **`getTypeSchema()` kept but unused.** Left untouched per "stays as-is" instruction. The new schemas drop the legacy `type: getTypeSchema()` field entirely — `ownerType` covers the same `competitor | own` discrimination cleanly.

3. **`MENU_OWNER_TYPES = ["Brand", "Competitor"]` (capitalised).** Required for Mongoose `refPath: "ownerType"` to resolve to the actual model names.

4. **Legacy artefacts left in place (deletable in a follow-up pass).**
   - `06_models/Menu.js`, `06_models/MenuItem.js`, `06_models/MenuCategory.js` — orphaned root-level versions of the unified menu schemas. No imports remain after the barrel cleanup; safe to delete.
   - `06_models/cloudKitchen/cloudKitchen_competitor/CompetitorMenu.js`, `CompetitorMenuCategory.js`, `CompetitorMenuItem.js` — obsoleted by the unified model. Removed from the competitor barrel; safe to delete.
   - `06_models/cloudKitchen/cloudKitchen_competitor/CompetitorMenu copy.js`, `06_models/Brand copy.js`, `06_models/EmployeeSchema_ suggested.js`, `06_models/Employee_sample.js` — pre-existing draft files, untouched.

5. **`modifierCntrl/` controllers will fail to import.** The folder still imports `Modifier` from `06_models/_models.index.js`, which no longer re-exports that alias (the underlying `Modifier.js` was already deleted on this branch). Since routes/controllers are explicitly out of scope and slated for rewrite, this is left as-is. The rewrite will replace `Modifier` with `MenuItemModifier` from the unified model.

---

## Phase 1 — Schema helpers

File: `backEnd/04_helpers/schemaHelpers/cloudKitchen_helpers/cloudKitchen_menu_helpers.js`

Add the following helpers (each returns a Mongoose subdocument or field config):

- [ ] `getOwnershipSchema()` → `{ ownerType: enum["brand","competitor"], ownerId: ObjectId(refPath: "ownerType") }`
- [ ] `getSoftDeleteSchema()` → `{ isDeleted: { default: false }, deletedAt: Date }`
- [ ] `getAuditFieldsSchema()` → `{ createdBy: ref User, updatedBy: ref User }`
- [ ] `getCloudStorageSchema()` → `{ isDefault: { default: true }, value: enum CLOUD_STORAGES.ENUM }`
- [ ] `getNutritionSchema()` → `{ source: enum, calories, protein, carbs, fat, lastCalculatedAt }`
- [ ] Confirm `getActiveTimingsSchema()` already exists in `_schemaHelpers.index.js` — reuse it.
- [ ] Confirm `getNameSchema()`, `getDescriptionSchema()`, `getTypeSchema()`, `getImagesSchema()`, `getFileTypesSchema()`, `getPriceSchema()` already exist — reuse them.
- [ ] Export all new helpers from the cloud-kitchen helpers barrel and re-export from `_schemaHelpers.index.js`.

---

## Phase 2 — Schema refactor

All five files live in: `backEnd/06_models/cloudKitchen/cloudKitchen_menu/`

### 2.1 `MenuItem.js`

- [ ] Replace existing schema with the shape defined in README §4.3
- [ ] **Drop** `isActive`, `isDeleted` (re-added via soft-delete helper), manual `createdAt`/`updatedAt` (use `{ timestamps: true }` option), `cloudStorage` (re-added via helper)
- [ ] **Drop** `priceHistory` legacy shape and replace with `[{ from, to, price, source }]`
- [ ] **Add** ownership, soft-delete, audit fields, cloud storage helpers
- [ ] **Add** enrichment fields: `dietaryTags`, `allergens`, `spicyLevel`, `preparationTimeMin`, `sku`, `kitchenStation`, `cuisineType`, `nutrition`
- [ ] **Add** `mirroredWithOtherMenuItems` array
- [ ] **Add** `source` field (capture provenance)
- [ ] **Fix typo** `compeatsWithOtherMenuItems` → `competesWithOtherMenuItems`
- [ ] **Fix ref** `modifiers` from `"Modifier"` → `"MenuItemModifier"`
- [ ] **Restructure** `modifiers` from `[ref]` → `[{ modifier: ref, displayOrder }]`
- [ ] **Keep** `name`, `description`, `images`, `type`, `recipeFile`, `techCardFile`, `otherFiles`, `recipe`, `sellingPrice`, `cost`, `sizeByGrams`, `quantity`, `externalId`
- [ ] Add `{ timestamps: true }` schema option

### 2.2 `MenuCategory.js`

- [ ] Replace existing schema with the shape defined in README §4.2
- [ ] **Restructure** `menuItems` from `[ref MenuItem]` → `[{ item: ref, isActive, activeTimings, displayOrder, sellingPriceOverride }]`
- [ ] **Add** `menu: ref Menu` (parent reference)
- [ ] **Add** `displayOrder` on the category itself
- [ ] **Add** `description` field
- [ ] **Add** ownership, soft-delete, audit fields, cloud storage helpers
- [ ] Keep `name`, `type`, `activeTimings`, `isActive`

### 2.3 `Menu.js`

- [ ] Replace existing schema with the shape defined in README §4.1
- [ ] **Drop** `branches[]` and `brands[]` arrays — ownership lives on the parent side (`Brand.menus[]`) and on each doc's `ownerType`/`ownerId`
- [ ] **Add** ownership, soft-delete, audit fields, cloud storage helpers
- [ ] **Add** `description` field
- [ ] Keep `name`, `categories[]`, `type`, `isActive`

### 2.4 `MenuItemModifier.js`

- [ ] Replace existing schema with the shape defined in README §4.4
- [ ] **Rename** `selectionQty` → `selectionMode`, values `"onlyOne"|"multiple"` → `"single"|"multiple"`
- [ ] **Restructure** `options` from `[ref]` → `[{ option: ref, displayOrder }]`
- [ ] **Rename** `descriptions` → `description` (typo fix; consistency)
- [ ] **Add** `activeTimings`
- [ ] **Add** ownership, soft-delete, audit fields, cloud storage helpers
- [ ] Keep `title`, `type`, `isOptional`, `isFree`, `isActive`

### 2.5 `MenuItemModifierOption.js`

- [ ] Replace existing schema with the shape defined in README §4.5
- [ ] **Drop** `isActive` — atomic; remove from parent Modifier's `options[]` to disable
- [ ] **Add** `nutrition`
- [ ] **Rename** `descriptions` → `description` (consistency)
- [ ] **Add** ownership, soft-delete, audit fields, cloud storage helpers
- [ ] Keep `name`, `type`, `images`, `recipeFile`, `techCardFile`, `cost`, `sellingPrice`

### 2.6 Models barrel

- [ ] Update `backEnd/06_models/cloudKitchen/cloudKitchen_menu/_cloudKitchen_menu.index.js` — make sure all five models are re-exported and the deleted legacy `Modifier` model (already removed in current branch) stays removed.
- [ ] Update `backEnd/06_models/_models.index.js` — confirm all five models propagate through the top barrel.

---

## Phase 3 — Surrounding schema updates

### 3.1 `backEnd/06_models/Brand.js`

- [ ] `menu: { type: ObjectId, ref: "Menu" }` → `menus: [{ type: ObjectId, ref: "Menu" }]`

### 3.2 `backEnd/06_models/cloudKitchen/cloudKitchen_competitor/Competitor.js`

- [ ] `menu: { type: ObjectId, ref: "CompetitorMenu" }` → `menus: [{ type: ObjectId, ref: "Menu" }]`
- [ ] Audit other competitor cross-links that referenced `CompetitorMenu` or `Modifier` — none should remain.

---

## Phase 4 — Constants & enums

File location: `backEnd/05_constants/` (infrastructure constants) or `backEnd/10_constances/` (domain constants) — see CLAUDE.md split.

Add the following enums (all in `10_constances` since they're domain enums):

- [ ] `DIETARY_TAGS` — `["vegetarian","vegan","halal","glutenFree","keto","dairyFree","nutFree"]`
- [ ] `ALLERGENS` — `["nuts","dairy","gluten","egg","shellfish","soy","sesame","fish"]`
- [ ] `KITCHEN_STATIONS` — `["grill","cold","fryer","dessert","beverage","prep","assembly"]`
- [ ] `CUISINE_TYPES` — `["russian","georgian","caucasian","international","fastFood","dessert","beverage"]`
- [ ] `MENU_OWNER_TYPES` — `["brand","competitor"]`
- [ ] `NUTRITION_SOURCES` — `["manual","autoFromRecipe"]`
- [ ] `MODIFIER_SELECTION_MODES` — `["single","multiple"]`
- [ ] Confirm `CLOUD_STORAGES.ENUM` already exists — reuse it.

Each enum exports both `.ENUM` (array for Mongoose) and individual constants where the FE/BE codebase consumes them.

---

## Phase 5 — Indexes & migrations

### Indexes (in each model file)

- [ ] `MenuItem`: `(ownerType, ownerId, sku)` unique sparse
- [ ] `MenuItem`: `(ownerType, ownerId, isDeleted)`
- [ ] `MenuItem`: text index on `name.label` + `description.label`
- [ ] `MenuCategory`: `(menu)` and `(ownerType, ownerId)`
- [ ] `Menu`: `(ownerType, ownerId, isActive, isDeleted)`
- [ ] `MenuItemModifier`: `(ownerType, ownerId, isDeleted)`
- [ ] `MenuItemModifierOption`: `(ownerType, ownerId, isDeleted)`

### Data migrations

Migrations only matter if production data exists in the old shape.

- [ ] Audit current DB — count existing docs in each collection. If empty / dev-only, skip migrations and seed fresh.
- [ ] If data exists:
  - [ ] Backfill `ownerType` + `ownerId` on each doc (probably from the brand/competitor that owns its menu)
  - [ ] Convert `MenuCategory.menuItems: [ObjectId]` → `[{ item, isActive: true, displayOrder: idx }]`
  - [ ] Convert `MenuItem.modifiers: [ObjectId]` → `[{ modifier, displayOrder: idx }]`
  - [ ] Convert `MenuItemModifier.options: [ObjectId]` → `[{ option, displayOrder: idx }]`
  - [ ] Convert `Brand.menu` (single) → `Brand.menus: [menu]`
  - [ ] Convert `MenuItem.compeatsWithOtherMenuItems` → `competesWithOtherMenuItems`
  - [ ] Default `cloudStorage: { isDefault: true }` everywhere
  - [ ] Default `isDeleted: false` everywhere

---

## Decided later (not part of this refactor)

The following layers are intentionally deferred until the schema layer is locked. They will be planned separately after Phases 1–5 are complete and reviewed.

- **Mongoose validation hooks** (pre/post `validate`, `save`)
- **Service layer** — CRUD services for each schema, plus cross-cutting service logic:
  - Mirror sync hook (symmetric `mirroredWithOtherMenuItems` maintenance)
  - Owner validation (reject cross-owner attaches between parent/child docs)
  - Audit field auto-population (`createdBy`/`updatedBy`)
  - Soft-delete cascade rules
- **Express validators & sanitizers** (request body validation + `sanitizedData` wiring)
- **Controllers** (thin per CLAUDE.md, calling validator → service → response)
- **Routes** (file layout, mount points, middleware order)
- **Frontend admin UI** — *architecture not yet decided*. The whole feature page layout (`menus/`, `menuCategories/`, etc.), cross-link UX (mirror picker, competes-with picker, drag-and-drop reordering, activation/timing editors), and endpoint config will be designed once the frontend pattern is chosen.
- **i18n keys** for all five resources across en/ar/ru/hy
- **Smoke testing** of the full end-to-end flow

---

## Out of scope (explicitly deferred — even longer term)

These belong to future refactor passes — do **not** address them here:

- Recipe / SubRecipe / Ingredient / Packaging schemas (will replace manual `estimatedCost` + `nutrition.source: "manual"`)
- SalesChannel (Branch × Brand × Aggregator) — per-channel pricing & availability overrides
- Per-aggregator `externalIds[]` array (single `externalId` retained for inventory integrations)
- Customer-facing tags / badges (`isFeatured`, `bestseller`, etc.)
- Order / OrderItem schemas
- Aggregator-API sync jobs (Talabat / Careem / Deliveroo)
- Menu templating / copy-from-another-menu tooling
