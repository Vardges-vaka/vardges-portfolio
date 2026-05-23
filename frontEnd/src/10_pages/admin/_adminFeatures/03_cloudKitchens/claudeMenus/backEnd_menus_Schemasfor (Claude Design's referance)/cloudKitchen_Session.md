# Cloud Kitchen Menu — Session Handoff

This doc is a cold-start summary of where we are in the cloud-kitchen menu refactor, so the next session can pick up without re-reading the entire brainstorm.

**Primary references** (read these first if you have time):

- `cloudKitchen_menu_README.md` — full conceptual design (source of truth)
- `cloudKitchen_menu_TODO's.md` — refactoring plan with status checkboxes

---

## What we are doing

Refactoring the **cloud kitchen menu domain** to a clean, unified data model that handles:

- **Our own brands** (Vkusno, Blini, Kompot — operationally distinct, but Blini's menu is largely a Vkusno re-skin)
- **Competitor brands** (limited data, mostly captured manually or scraped from aggregators)

…all using the **same schema set**, with a `(ownerType, ownerId)` discriminator (`"Brand"` vs `"Competitor"`).

The five schemas in scope live in `06_models/cloudKitchen/cloudKitchen_menu/`:

```
Menu           — composition layer (owned by one brand/competitor; one per future channel triple)
MenuCategory   — owned by exactly one Menu; carries isActive + activeTimings
MenuItem       — reusable across categories; identity + presentation; no activation here
MenuItemModifier         — reusable; global behaviour (isOptional, selectionMode, isFree)
MenuItemModifierOption   — reusable atomic option (no isActive — remove from parent to disable)
```

---

## Why this refactor matters

1. **Unified ownership** — competitor menus were diverging into their own parallel schemas (`CompetitorMenu`, `CompetitorMenuCategory`, `CompetitorMenuItem`). Now they share the same collections as our brands, just with `ownerType: "Competitor"`. Cleaner queries, easier comparisons, one set of services.
2. **Vkusno/Blini twin pattern** — they sell the same food under different brands. We model this with **separate MenuItem documents** linked via a symmetric `mirroredWithOtherMenuItems` cross-reference (service-layer hook keeps the two sides in sync). No shared-recipe assumption — the link is purely informational for now.
3. **Reusability done right** — MenuItems, Modifiers, and Options are **reusable**; Menus and MenuCategories are **owned**. Activation/timings for reusable docs live on the **join** (e.g. `MenuCategory.menuItems[]`). Per-item timing can override per-category timing (e.g. `combo1` active 3–5pm even inside a 11am–5pm COMBOS category).
4. **Schema is solid before the application layer is built.** Locking the data model first means controllers/services/validators don't get rewritten twice.

---

## What we did so far (all 5 schema-layer phases — COMPLETE)

### Phase 1 — Schema helpers (`04_helpers/schemaHelpers/cloudKitchen_helpers/cloudKitchen_menu_helpers.js`)

Added five new helpers and **fixed a bug in `getNameSchema()`** (it previously double-wrapped its content, breaking the documented `name.label` path):

- `getOwnershipSchema()` — returns `{ ownerType, ownerId }` (plain object, spread into a parent schema). Uses `refPath: "ownerType"`.
- `getSoftDeleteSchema()` — returns `{ isDeleted, deletedAt }` (plain object, spread).
- `getAuditFieldsSchema()` — returns `{ createdBy, updatedBy }` (refs to User; plain object, spread).
- `getCloudStorageSchema()` — returns a Schema with `{ isDefault, value }` (used as a field value).
- `getNutritionSchema()` — returns a Schema with `{ source, calories, protein, carbs, fat, lastCalculatedAt }`.

Naming convention to remember: helpers that produce **multi-field configs** return plain objects (spread); helpers that produce **subdocuments** return Schemas (assigned to a field).

### Phase 2 — Five schema files rewritten

All in `06_models/cloudKitchen/cloudKitchen_menu/`:

- `MenuItem.js` — full identity + presentation + enrichments (dietaryTags, allergens, spicyLevel, preparationTimeMin, sku, kitchenStation, cuisineType, nutrition) + `mirroredWithOtherMenuItems` + `competesWithOtherMenuItems` + `source` field + `modifiers[]` join with `displayOrder`.
- `MenuCategory.js` — `menu` parent ref, `menuItems[]` join with per-item `isActive`/`activeTimings`/`displayOrder`/`sellingPriceOverride`, own `isActive`/`activeTimings`/`displayOrder`.
- `Menu.js` — owner discriminator, `categories[]`, `isActive`. **Dropped** the legacy `branches[]` / `brands[]` arrays (ownership is upstream now). **Dropped** `hasTimeBoundCategories` / `hasTimeBoundMenuItems` flags (consumers check timings per entity).
- `MenuItemModifier.js` — global behaviour fields (`isOptional`, `selectionMode`, `isFree`, `activeTimings`, `isActive`), `options[]` join with `displayOrder`. **Renamed** `selectionQty` → `selectionMode` and values `onlyOne/multiple` → `single/multiple`.
- `MenuItemModifierOption.js` — atomic, no `isActive` (remove from parent to disable).

All five carry the cross-cutting helpers (ownership, soft-delete, audit, cloudStorage) and `{ timestamps: true }`. All have indexes on `(ownerType, ownerId, isDeleted)`; MenuItem also has a unique-sparse SKU index and a text index on name/description.

### Phase 3 — Surrounding schema updates

- `06_models/Brand.js`: `menu: ref Menu` → `menus: [ref Menu]`.
- `06_models/cloudKitchen/cloudKitchen_competitor/Competitor.js`: `menu: ref "CompetitorMenu"` → `menus: [ref Menu]`.

### Phase 4 — Constants & enums (`10_constances/cloudKitchen/`)

New sub-folder with seven enum files + a sub-barrel:

- `menu_dietaryTags.js`, `menu_allergens.js`, `menu_kitchenStations.js`, `menu_cuisineTypes.js`
- `menu_ownerTypes.js` — **`MENU_OWNER_TYPES = ["Brand", "Competitor"]`** (capitalised to match Mongoose model names so `refPath` resolves).
- `menu_nutritionSources.js`, `menu_modifierSelectionModes.js`
- `_cloudKitchen_constances.index.js` — sub-barrel
- Updated `10_constances/_constances.index.js` to include the sub-barrel.

### Phase 5 — Indexes & barrel cleanup

- Indexes added inline in each schema file (see Phase 2).
- `06_models/_models.index.js` rewritten to:
  - Drop legacy root-level `Menu` / `MenuItem` / `MenuCategory` imports (orphans from a previous structure).
  - Drop the `Modifier` alias (the underlying `Modifier.js` was already deleted on this branch).
  - Re-export from the cloudKitchen barrel for the unified models.
- `06_models/cloudKitchen/cloudKitchen_competitor/_cloudKitchen_competitor.index.js` rewritten to drop obsoleted `CompetitorMenu` / `CompetitorMenuCategory` / `CompetitorMenuItem` exports. Only `Competitor` remains.

---

## Deliberate divergences worth remembering

1. **`getNameSchema()` bug fix.** Was producing `name.name.label`, now produces `name.label`.
2. **`getTypeSchema()` kept but unused** by the new schemas. Left in the helpers file for backwards compatibility; `ownerType` cleanly replaces its `competitor | own` enum role.
3. **`MENU_OWNER_TYPES` is capitalised** (`"Brand"`, `"Competitor"`) — required for `refPath` to find the right model.
4. **Field renames carried out:**
   - `selectionQty` → `selectionMode` (values `onlyOne/multiple` → `single/multiple`)
   - `compeatsWithOtherMenuItems` → `competesWithOtherMenuItems` (typo fix)
5. **Schema-level concerns out of scope.** Mongoose `pre`/`post` validation hooks, refPath safety checks, and any business-rule invariants (mirror sync, owner consistency between parent/child docs) all belong to the **service layer**, not the schema. They have not been added yet.

---

## Carry-over issues (intentionally left alone)

1. **`modifierCntrl/` controllers will fail to import.** They reference `Modifier` from the models barrel; the barrel no longer exports that alias. Since controllers are getting rewritten in the next session, this is expected. Plan: replace `Modifier` with `MenuItemModifier` and update the service shape.
2. **Orphan / legacy files on disk** (safe to delete in a cleanup pass — not deleted by us to avoid surprising the user):
   - `06_models/Menu.js`, `06_models/MenuItem.js`, `06_models/MenuCategory.js` — old root-level versions
   - `06_models/cloudKitchen/cloudKitchen_competitor/CompetitorMenu.js`, `CompetitorMenuCategory.js`, `CompetitorMenuItem.js` — obsoleted by unified model
   - `06_models/cloudKitchen/cloudKitchen_competitor/CompetitorMenu copy.js`, `06_models/Brand copy.js`, `06_models/EmployeeSchema_ suggested.js`, `06_models/Employee_sample.js` — pre-existing drafts, untouched.
3. **Recipe / SubRecipe / Ingredient / Packaging** schemas not designed yet. MenuItem currently has `recipe: ref Recipe` and `cost.estimatedCost` as manual entries. The Recipe refactor is a future, separate pass — when it lands, it will compute `cost.actualCost` and switch `nutrition.source` to `"autoFromRecipe"`.
4. **SalesChannel (Branch × Brand × Aggregator)** layer is deferred. `Brand.salesIntegration`, `Brand.inventoryIntegrations` etc. stay as they are. The schemas were designed so this layer can be added without migrations — only additive fields needed.

---

## What we are doing next (tomorrow's session)

**Goal:** prepare the backend application layer so the frontend can be wired against it.

For each of the five schemas (Menu, MenuCategory, MenuItem, MenuItemModifier, MenuItemModifierOption), we need to build the **routes → middlewares → controllers → validators → services** stack per the architecture doc at `.context/.backEnd_ararchitecture.md`. Concretely, in dependency order:

### Step 1 — Decide controller subdirectory shape per feature

Per CLAUDE.md and the architecture doc, each feature controller lives at `07_controllers/<feature>Cntrl/` and has at minimum `<feature>Cntrl_crud/`. Richer features (MenuItem definitely qualifies — modifiers, mirroring, competes-with relations) also get `<feature>Cntrl_sections/` and `<feature>Cntrl_relations/`.

Decisions to make at the start of the session:

- For **MenuItem**, do mirroring + competes-with operations live in `MenuItemCntrl_relations/` as dedicated controllers (`link_mirror`, `unlink_mirror`, `link_compete`, `unlink_compete`), or are they handled inside the `update` controller via the body payload?
- For **MenuCategory**, does adding/removing/reordering items in `menuItems[]` get its own `_sections/` or `_relations/` controllers, or is it all handled via the generic `update` controller?
- Same question for **MenuItemModifier**'s `options[]` array.

### Step 2 — Service layer (the meaty part)

Services live at `07_controllers/<feature>Cntrl/_utils/<feature>Services/<feature>Services_crud/<feature>_action_srv.js`.

For each of the five resources, build CRUD services: `add`, `getAll`, `getOne`, `update`, `softDelete`, `restore`. Plus cross-cutting service logic:

- **Mirror sync hook.** When `MenuItem.mirroredWithOtherMenuItems` changes on item A, synchronously update the inverse entry on each linked item in the same transaction. Same on `add` (write inverse to the target items) and `softDelete` (clear inverse entries on linked items).
- **Owner consistency validation.** When attaching `MenuItem → MenuCategory`, `Modifier → MenuItem`, or `Option → Modifier`, verify both share the same `ownerType` + `ownerId`. Reject cross-owner attaches.
- **Audit field auto-fill.** `createdBy` on insert from `req.user._id`, `updatedBy` on every update.
- **Soft-delete cascade.** Deleting a Menu unlinks it from `Brand.menus[]` / `Competitor.menus[]` (but doesn't touch its categories). Deleting a Category removes it from its parent `Menu.categories[]`.
- **`[STARTED]` / `[COMPLETED]` log lines** in try/finally per project convention.
- Return shape `{ success, message, data }` for every service.

### Step 3 — Validators + sanitizers

Live at `07_controllers/<feature>Cntrl/_utils/<feature>Validators/<feature>Validators_crud/<feature>_action_vld.js`.

Each validator returns `{ isValid, message, sanitizedData }`. Sanitised data lands at `req.body.sanitizedData` in the controller. Validation rules to cover at minimum:

- `ownerType ∈ MENU_OWNER_TYPES`, `ownerId` is a valid ObjectId, the referenced doc exists (service-layer existence check).
- `dietaryTags[]`, `allergens[]`, `kitchenStation`, `cuisineType`, `selectionMode` ∈ their enums.
- `spicyLevel ∈ [0, 3]`, `preparationTimeMin ≥ 0`, `sellingPrice.gross ≥ 0`.
- `cloudStorage.value ∈ CLOUD_STORAGES` when `isDefault: false`.
- Cross-link refs (`mirroredWith*`, `competesWith*`) point to existing docs.
- `MenuCategory.menuItems[].item` refs share the category's owner (defence in depth — service also checks).

### Step 4 — Controllers (thin orchestration)

Live at `07_controllers/<feature>Cntrl/<feature>Cntrl_crud/<feature>_action_cntrl.js`. Per CLAUDE.md, each controller is **thin**: read sanitized body → call **one** service → respond via `validRespond` / `catch_errorHandler_cntrl`. Use the canonical template from the architecture doc.

### Step 5 — Routes

Five route files in `08_routes/`:

- `menuRoutes.js`, `menuCategoryRoutes.js`, `menuItemRoutes.js` — already exist, will be rewritten to point at new controllers.
- `menuItemModifierRoutes.js`, `menuItemModifierOptionRoutes.js` — new files.

All five mounted in `_routes.index.js` and `server.js`. Middleware order per architecture doc: **auth → upload (if needed) → validate/sanitize → controller**.

### Step 6 — Sanity check: legacy controllers

After the new structure is in place, **delete** or **rewrite** the old `modifierCntrl/` folder. The shape it operated on (legacy `Modifier` model with `descriptions`, `selectionQty`, etc.) no longer exists — it should become `menuItemModifierCntrl/` against the new schema.

### Step 7 — Hand off to frontend

Once routes are working, the next session after that will be the frontend admin UI (architecture still to be decided).

---

## Open questions to decide tomorrow before writing code

1. **Controller granularity for mirror / competes-with links.** Dedicated `_relations/` endpoints vs. embedded in the `update` controller's body payload?
2. **`MenuCategory.menuItems[]` mutation strategy.** Generic `update` (whole array replacement) vs. `_relations/` endpoints (add-one / remove-one / reorder-one)? Reordering specifically might need its own endpoint to keep payloads light.
3. **Should we use Mongoose transactions** for the mirror-sync writes? Requires a replica-set-backed DB. If we're on standalone Mongo in dev, we'll need a fallback (sequential writes with rollback on failure).
4. **Cross-owner attachment validation** — service-layer reject vs. validator-layer reject? Probably both, with service being the authoritative gate (validators can't read the DB).
5. **`Brand.menus[]` / `Competitor.menus[]` sync on Menu CRUD.** Add the menu's ObjectId to the parent's `menus[]` on create; remove on soft-delete. Service-layer concern — decide whether to use Mongoose pre/post hooks or explicit service calls (we have a project convention to prefer service calls for clarity).

These are blockers — answer them at the start of the session, not mid-implementation.
