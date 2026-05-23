# Cloud Kitchen Menu — Schema Documentation

This document describes the data model for the menu domain (Menus, MenuCategories, MenuItems, MenuItemModifiers, MenuItemModifierOptions) used by both **our own brands** and **competitor brands**.

It is the single source of truth for *what the schemas mean*. Code comments should never restate this document; refer back here instead.

---

## 1. The big picture

### 1.1 Domain hierarchy

```
Brand / Competitor  (the owner of a menu)
   └── Menu          (1 brand → many menus, scoped to a future Branch × Brand × Aggregator triple)
        └── MenuCategory  (owned by exactly one Menu; carries its own active flag + timings)
             └── menuItems[]  ── join entry, references reusable MenuItem
                  └── MenuItem      (reusable across menus; identity + presentation)
                       └── modifiers[]  ── join entry, references reusable MenuItemModifier
                            └── MenuItemModifier   (reusable across items)
                                 └── options[]    ── join entry, references reusable MenuItemModifierOption
                                      └── MenuItemModifierOption  (reusable atomic option)
```

### 1.2 Two operational types of menu, one schema set

We track two parallel worlds:

- **Our brands** — Vkusno, Blini, Kompot. Full data: cost, recipe, sales channels, etc.
- **Competitor brands** — limited data, captured manually or via scraping. No internal cost.

Both worlds share the **same five schemas**. Every document carries `ownerType` ("brand" | "competitor") and `ownerId` (ref to `Brand` or `Competitor`). Queries filter by these to scope to one world or compare across worlds.

---

## 2. Core architectural decisions

### 2.1 Unified ownership (one schema set, two worlds)

Every Menu/MenuCategory/MenuItem/Modifier/Option document carries:

```js
ownerType: { type: String, enum: ["Brand", "Competitor"], required: true }
ownerId:   { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "ownerType" }
```

`ownerType` values are **capitalised to match the actual Mongoose model names** (`Brand`, `Competitor`). This is required for `refPath` to resolve correctly when populating — Mongoose looks up the model by the literal string in the sibling field.

`refPath` makes `ownerId` resolve to either `Brand` or `Competitor` depending on `ownerType`. Indexes should include `(ownerType, ownerId)`.

The previous `type: getTypeSchema()` field that lived on every legacy schema (with the enum `["competitor", "own"]`) is **dropped** in this refactor — `ownerType` covers the same concept more cleanly and with a working enum.

### 2.2 Reusability vs. ownership

| Schema | Reusable? | Why |
|---|---|---|
| `MenuItemModifierOption` | Yes — atomic, referenced by many Modifiers | Same "Extra Cheese" option can be used by any modifier group. |
| `MenuItemModifier` | Yes — referenced by many MenuItems | Same "Sauce" group can be attached to Burger, Stroganoff, Pelmeni. |
| `MenuItem` | Yes — referenced by many MenuCategories | The same dish can appear in multiple menus (main, breakfast, catering). |
| `MenuCategory` | **No** — owned by exactly one Menu | Categories carry per-menu activation state. Reusing them across menus would create activation ambiguity. |
| `Menu` | **No** — owned by one future (Branch × Brand × Aggregator) triple | A menu is the leaf composition layer. |

**Consequence:** reusable docs cannot carry activation/timing/order state directly — that state varies per parent context. They carry it on the **join** instead (the array entry where they're referenced).

### 2.3 Activation and timings

Activation is decided **top-down**, with overrides at lower levels.

```
Menu.isActive
   ├── if false → entire menu hidden
   └── if true → walk categories[]
        MenuCategory.isActive
           ├── if false → category hidden
           └── if true → check MenuCategory.activeTimings
                ├── if outside timing window → category hidden
                └── if inside → walk menuItems[]
                     MenuCategory.menuItems[entry].isActive
                        ├── if false → item hidden
                        └── if true → check entry.activeTimings (per-item override)
                             ├── if entry.activeTimings is empty → item follows category timing
                             ├── if entry.activeTimings is set → use it instead of category timing
                             └── if outside → item hidden
                             └── if inside → item visible
```

**Concrete example:**

- COMBOS category is active 11am–5pm.
- `combo1` is inside COMBOS, with its own `activeTimings: 3pm–5pm`.
- `combo2`, `combo3` are inside COMBOS with no `activeTimings` override.

Result:
- 11am–3pm → only `combo2`, `combo3` are visible.
- 3pm–5pm → all three are visible.
- After 5pm → all hidden (category window closed).

**Modifier activation** is global and propagates to every MenuItem using that modifier. To get different behavior for the same conceptual group, **duplicate** the Modifier — don't add per-item overrides.

### 2.4 The Vkusno/Blini twin pattern (mirroring)

Vkusno and Blini share most of their menu — same food, different brand presentation (name, image, description, packaging, price). We model this as **two separate MenuItem documents** connected via a symmetric cross-link:

```js
mirroredWithOtherMenuItems: [
  {
    brand: { type: ObjectId, ref: "Brand" },   // UI shortcut to avoid an extra populate
    item:  { type: ObjectId, ref: "MenuItem" },
    note:  String,                              // optional, e.g. "Blini-branded Stroganoff"
  }
]
```

**Rules:**
- The link is **symmetric**: if A mirrors B, both A and B carry a `mirroredWithOtherMenuItems` entry pointing at the other.
- A service-layer hook (`mirroredSync`) keeps both sides consistent on create/update/delete. The schema does not enforce symmetry — the service layer does.
- The `brand` field is a denormalized shortcut for UI rendering (avoids an extra populate when listing items).
- **No assumption that mirrored items share a Recipe.** They might, they might not. The link is purely informational. When the Recipe refactor lands, sharing will be enforced at the Recipe layer if desired.

### 2.5 Competitor cross-references

`competesWithOtherMenuItems` (renamed from the legacy typo `compeatsWithOtherMenuItems`) lets a MenuItem record which competitor items it's positioned against. Used for pricing analysis ("if I bump my Stroganoff to 55 AED, what does the nearest competitor charge?").

```js
competesWithOtherMenuItems: [
  {
    brand:         { type: ObjectId, ref: "Competitor" },  // UI shortcut
    item:          { type: ObjectId, ref: "MenuItem" },     // unified ref — competitor MenuItems live in the same collection
    sizeByGrams:   String,
    quantity:      Number,
    addOns: [
      {
        type:        { type: String, enum: ["sauce", "sideDish", "drink", "dessert"] },
        description: String,
        sizeByGrams: String,
        quantity:    Number,
      },
    ],
    sellingPrice:  getPriceSchema(),
    estimatedCost: Number,
    capturedAt:    Date,
    note:          String,
  }
]
```

Unlike `mirroredWith`, **this cross-link is one-directional** — only our brands' items carry it pointing at competitors. Competitor items don't need a back-reference.

### 2.6 The future SalesChannel layer (deferred)

The matrix `Branch × Brand × Aggregator` (e.g. *Arjan + Vkusno + Talabat*) is operationally one "store" and will become a first-class `SalesChannel` model in a future refactor.

For now, we keep `Brand.salesIntegration`, `Brand.inventoryIntegrations`, and similar fields as-is. When SalesChannel lands:
- Per-channel availability & pricing overrides will move from MenuCategory.menuItems[] into either a separate `MenuItemListing` collection or a SalesChannel-keyed array.
- `Brand.menus[]` will be indexed by SalesChannel.

The schemas in this refactor are designed to **not require migration** when SalesChannel lands — new fields will be additive.

### 2.7 The Recipe layer (deferred)

`MenuItem.recipe: ref Recipe` and `cost.actualCost` are placeholders. Today, cost is captured as `cost.estimatedCost` (manual entry). When the Recipe + SubRecipe + Ingredient + Packaging refactor lands, cost and nutrition will be **computed** from the recipe graph and synced into MenuItem (see §3.4 Nutrition for the auto-calc pattern).

---

## 3. Cross-cutting field patterns

These patterns are applied across all five schemas in this domain. Each is implemented as a helper in `04_helpers/schemaHelpers/cloudKitchen_helpers/cloudKitchen_menu_helpers.js`.

### 3.1 Ownership

Every document:
```js
ownerType: { type: String, enum: ["brand", "competitor"], required: true }
ownerId:   { type: ObjectId, required: true, refPath: "ownerType" }
```
Helper: `getOwnershipSchema()`. Index on `(ownerType, ownerId)`.

### 3.2 Soft delete

Every document:
```js
isDeleted: { type: Boolean, default: false }
deletedAt: { type: Date }
```
Helper: `getSoftDeleteSchema()`. Service layer sets `isDeleted: true` + `deletedAt: now` instead of hard-deleting. Queries default to `isDeleted: false`.

### 3.3 Audit fields

Every document:
```js
createdBy: { type: ObjectId, ref: "User" }
updatedBy: { type: ObjectId, ref: "User" }
```
Helper: `getAuditFieldsSchema()`. Auto-populated from `req.user` in the service layer.

### 3.4 Cloud storage routing

Every document carries a `cloudStorage` block describing where its associated files (images, recipe files, etc.) should be stored:

```js
cloudStorage: {
  isDefault: { type: Boolean, default: true },
  value:     { type: String, enum: CLOUD_STORAGES },
}
```

- `isDefault: true` → use the system's default cloud storage provider (configured at the user/admin level).
- `isDefault: false` → use the explicit `value` (one of the providers listed in `10_constances/cloudStorages.js`).

Even schemas that don't currently have file fields (`Menu`, `MenuCategory`, `MenuItemModifier`) carry this property to support future expansion (category icons, menu banners, modifier diagrams) without schema migration.

Helper: `getCloudStorageSchema()`.

### 3.5 Nutrition

Carried by `MenuItem` and `MenuItemModifierOption`:

```js
nutrition: {
  source:           { type: String, enum: ["manual", "autoFromRecipe"], default: "manual" },
  calories:         Number,
  protein:          Number,   // grams
  carbs:            Number,   // grams
  fat:              Number,   // grams
  lastCalculatedAt: Date,     // only meaningful when source === "autoFromRecipe"
}
```

- **Today (Stage 1):** `source: "manual"`. Humans type the numbers.
- **When Recipe lands (Stage 2):** Recipe walks `subRecipes[]` + `ingredients[]` (each ingredient carries per-100g nutrition), computes totals, and a service hook syncs the result into MenuItem's `nutrition`. `source` flips to `"autoFromRecipe"` and `lastCalculatedAt` updates.
- **Manual override:** if `source === "manual"`, the auto-calc skips this document — chef's manual entry wins.

Order-level nutrition totals are computed at read time (item + selected options) and not stored.

Helper: `getNutritionSchema()`.

### 3.6 Display order

Order is positional, not behavioral. It lives where it's unambiguous:

| Field | Location | Why |
|---|---|---|
| `displayOrder` on `MenuCategory` | On the doc | Categories belong to exactly one Menu — order is unambiguous. |
| `displayOrder` inside `MenuCategory.menuItems[]` entry | On the join | The same MenuItem can sit at different positions in different categories. |
| `displayOrder` inside `MenuItem.modifiers[]` entry | On the join | The same Modifier can sit at different positions on different MenuItems. |
| `displayOrder` inside `MenuItemModifier.options[]` entry | On the join | The same Option can sit at different positions inside different Modifiers. |

Queries sort `.sort({ displayOrder: 1 })`. Drag-and-drop reordering in admin UI just updates the numbers.

### 3.7 Localization

`getNameSchema()` and `getDescriptionSchema()` provide localized text. `getNameSchema()` now returns the inner shape directly (the previous version wrapped its content in an outer `name:` key, which caused consumer paths like `menuItem.name.label` to actually resolve at `menuItem.name.name.label` — this has been fixed).

`getNameSchema()` produces:

```js
{
  label:        String,           // canonical, used everywhere in the app
  translations: { ar, en, ru },   // for monitoring & internal comprehension only
  aggrigators:  { ar, en, ru },   // labels used on aggregator listings
}
```

`getTypeSchema()` remains in the helpers file for backwards compatibility but is **not consumed by the new menu schemas** — ownership semantics now live on `ownerType` (see §2.1).

**Only `name` and `description` are localized.** All other string fields (cuisineType, kitchenStation, dietary tags, allergens, etc.) are enum strings or plain strings, with i18n keys resolved client-side via `useTranslation`.

---

## 4. Schema reference

### 4.1 `Menu`

The composition layer. Owned by one future (Branch × Brand × Aggregator) triple.

```js
{
  name:        getNameSchema(),
  type:        getTypeSchema(),
  description: getDescriptionSchema(),

  categories:  [{ type: ObjectId, ref: "MenuCategory" }],

  isActive:    { type: Boolean, default: true },

  // cross-cutting
  ownerType, ownerId,                 // §3.1
  isDeleted, deletedAt,               // §3.2
  createdBy, updatedBy,               // §3.3
  cloudStorage,                       // §3.4
  timestamps: true,
}
```

**Notes:**
- `categories[]` is an array of refs; ordering is provided by `MenuCategory.displayOrder` (since categories are owned by a single menu).
- No `branches[]` or `brands[]` arrays here — ownership lives on the parent side (`Brand.menus[]` and the future SalesChannel layer).
- No `hasTimeBoundCategories` / `hasTimeBoundMenuItems` flags — the consumer can check timings on each entity at render time.

### 4.2 `MenuCategory`

Owned by exactly one `Menu`. Carries its own activation + timings.

```js
{
  name:          getNameSchema(),
  description:   getDescriptionSchema(),

  menu:          { type: ObjectId, ref: "Menu" },   // parent

  menuItems: [{
    item:                 { type: ObjectId, ref: "MenuItem" },
    isActive:             { type: Boolean, default: true },
    activeTimings:        getActiveTimingsSchema(),   // optional override of category timing
    displayOrder:         { type: Number, default: 0 },
    sellingPriceOverride: { type: Number },            // optional, overrides MenuItem.sellingPrice in this category
  }],

  isActive:      { type: Boolean, default: true },
  activeTimings: getActiveTimingsSchema(),
  displayOrder:  { type: Number, default: 0 },

  // cross-cutting
  ownerType, ownerId,                 // §2.1
  isDeleted, deletedAt,               // §3.2
  createdBy, updatedBy,               // §3.3
  cloudStorage,                       // §3.4
  timestamps: true,
}
```

**Notes:**
- `menuItems[]` is the *join layer* between the reusable MenuItem and this owned category — that's why activation, timings, order, and per-menu price overrides live here.
- Per-item `activeTimings` is optional: if empty, the item follows the category's timing window.
- `sellingPriceOverride` is rare but supported — for cases like a catering menu where the same item is priced higher.

### 4.3 `MenuItem`

Reusable. Identity + presentation. No activation state on the doc itself.

```js
{
  // identity
  name:          getNameSchema(),
  description:   getDescriptionSchema(),
  images:        getImagesSchema(),

  // recipe (deferred refactor)
  recipe:        { type: ObjectId, ref: "Recipe" },
  recipeFile:    getFileTypesSchema(),
  techCardFile:  getFileTypesSchema(),
  otherFiles:    [{ ref: String, path: String, fileType: String, sizeInBytes: Number, description: String }],

  // pricing
  cost:          { actualCost: Number, estimatedCost: Number },
  sellingPrice:  getPriceSchema(),
  priceHistory:  [{ from: Date, to: Date, price: Number, source: String }],

  // modifiers
  modifiers: [{
    modifier:     { type: ObjectId, ref: "MenuItemModifier" },
    displayOrder: { type: Number, default: 0 },
  }],

  // portion
  sizeByGrams:   String,
  quantity:      Number,

  // enrichments
  dietaryTags:        [{ type: String, enum: DIETARY_TAGS.ENUM }],
  allergens:          [{ type: String, enum: ALLERGENS.ENUM }],
  spicyLevel:         { type: Number, min: 0, max: 3 },
  preparationTimeMin: Number,
  sku:                String,
  kitchenStation:     { type: String, enum: KITCHEN_STATIONS.ENUM },
  cuisineType:        { type: String, enum: CUISINE_TYPES.ENUM },
  nutrition:          getNutritionSchema(),

  // cross-references
  mirroredWithOtherMenuItems: [{
    brand: { type: ObjectId, ref: "Brand" },          // UI shortcut
    item:  { type: ObjectId, ref: "MenuItem" },
    note:  String,
  }],
  competesWithOtherMenuItems: [{
    brand:         { type: ObjectId, ref: "Competitor" },
    item:          { type: ObjectId, ref: "MenuItem" },
    sizeByGrams:   String,
    quantity:      Number,
    addOns: [{ type: { type: String, enum: ["sauce","sideDish","drink","dessert"] }, description: String, sizeByGrams: String, quantity: Number }],
    sellingPrice:  getPriceSchema(),
    estimatedCost: Number,
    capturedAt:    Date,
    note:          String,
  }],

  // capture provenance (competitor items)
  source:        String,   // e.g. "talabat-scrape", "manual", "deliveroo-api"

  // integrations
  externalId:    String,   // inventory integrations (Supy / Sapaad / GrabTech / UrbanPiper)

  // cross-cutting
  ownerType, ownerId,                 // §2.1
  isDeleted, deletedAt,               // §3.2
  createdBy, updatedBy,               // §3.3
  cloudStorage,                       // §3.4
  timestamps: true,
}
```

**Notes:**
- **No `isActive` here.** Activation lives on the `MenuCategory.menuItems[]` join.
- `cost.actualCost` will be populated by the future Recipe refactor; today only `estimatedCost` is used.
- `priceHistory` covers both our brand prices and competitor prices (the `source` field distinguishes context).
- The `images` field continues to use the existing `getImagesSchema()` helper.

### 4.4 `MenuItemModifier`

Reusable. Single source of truth for the modifier group's behavior.

```js
{
  title:         getNameSchema(),
  description:   getDescriptionSchema(),

  isOptional:    { type: Boolean, default: true },
  selectionMode: { type: String, enum: ["single", "multiple"], default: "single" },
  isFree:        { type: Boolean, default: false },

  options: [{
    option:       { type: ObjectId, ref: "MenuItemModifierOption" },
    displayOrder: { type: Number, default: 0 },
  }],

  isActive:      { type: Boolean, default: true },
  activeTimings: getActiveTimingsSchema(),

  // cross-cutting
  ownerType, ownerId,                 // §2.1
  isDeleted, deletedAt,               // §3.2
  createdBy, updatedBy,               // §3.3
  cloudStorage,                       // §3.4
  timestamps: true,
}
```

**Notes:**
- `selectionMode` replaces the legacy `selectionQty` (its values weren't actually quantities).
- `isOptional`, `selectionMode`, `isFree`, `activeTimings`, `isActive` are **global** — they apply everywhere this modifier is referenced. For different behavior, duplicate the modifier.
- `options[]` is a join (with per-modifier display order); options themselves are reusable atomic docs.

### 4.5 `MenuItemModifierOption`

Reusable. Atomic.

```js
{
  name:         getNameSchema(),
  description:  getDescriptionSchema(),
  images:       getImagesSchema(),
  recipeFile:   getFileTypesSchema(),
  techCardFile: getFileTypesSchema(),

  cost:         { actualCost: Number, estimatedCost: Number },
  sellingPrice: getPriceSchema(),
  nutrition:    getNutritionSchema(),

  // cross-cutting
  ownerType, ownerId,                 // §2.1
  isDeleted, deletedAt,               // §3.2
  createdBy, updatedBy,               // §3.3
  cloudStorage,                       // §3.4
  timestamps: true,
}
```

**Notes:**
- **No `isActive` field.** If you don't want an option, remove it from the parent Modifier's `options[]` array.
- Same nutrition pattern as MenuItem.

---

## 5. Changes to surrounding schemas

### 5.1 `Brand`

```diff
- menu: { type: ObjectId, ref: "Menu" }
+ menus: [{ type: ObjectId, ref: "Menu" }]
```

Anticipates the future SalesChannel layer where one brand has many menus (one per channel triple).

### 5.2 `Competitor`

```diff
- menu: { type: ObjectId, ref: "CompetitorMenu" }
+ menus: [{ type: ObjectId, ref: "Menu" }]
```

Unified model: competitor menus live in the same `Menu` collection, distinguished by `ownerType: "competitor"`.

---

## 6. Indexes (recommended)

| Collection | Index | Purpose |
|---|---|---|
| All | `(ownerType, ownerId)` | scope queries to one brand or competitor |
| All | `(isDeleted)` | exclude soft-deleted by default |
| `MenuItem` | `(ownerType, ownerId, sku)` unique sparse | enforce SKU uniqueness per owner |
| `MenuItem` | `(ownerType, ownerId, isDeleted, name.label)` | search by name within a brand |
| `MenuCategory` | `(menu)` | fetch all categories of a menu |
| `Menu` | `(ownerType, ownerId, isActive)` | list active menus for an owner |
| `MenuItem` | `text index on name.label + description.label` | full-text search in admin UI |

---

## 7. Service-layer invariants

The schema doesn't enforce these — the service layer must:

1. **Mirror sync.** When `mirroredWithOtherMenuItems` is mutated on item A, the corresponding entry on item B is created/updated/removed in the same transaction.
2. **Soft-delete cascade rules:**
   - Deleting a `MenuItem` does **not** delete the modifiers/options it references (they're reusable).
   - Deleting a `MenuCategory` does **not** delete the items it contains (reusable). It does remove the category from `Menu.categories[]`.
   - Deleting a `Menu` removes it from `Brand.menus[]` / `Competitor.menus[]`.
3. **Audit fields.** `createdBy` is set on insert from `req.user._id`. `updatedBy` is set on every save.
4. **Owner validation.** When attaching a reusable doc (MenuItem to MenuCategory, Modifier to MenuItem, etc.), the service must verify the child's `ownerId` matches the parent's `ownerId`. A Vkusno category cannot contain a Kompot item.
5. **Soft-delete filter.** All `getAll` / `getOne` queries default to `isDeleted: false` unless explicitly opted-in by an admin flag.

---

## 8. Open / deferred items

- **Recipe + SubRecipe + Ingredient + Packaging** schemas — design pending. Will turn `cost` and `nutrition` into derived values.
- **SalesChannel** (Branch × Brand × Aggregator) — design pending. Will introduce per-channel pricing and availability overrides.
- **Order / OrderItem** schemas — out of scope for this refactor.
- **Per-aggregator `externalIds[]`** — out of scope; single `externalId` retained for inventory integrations.
- **Customer-facing tags / badges** (`isFeatured`, `bestseller`, etc.) — out of scope; can be added later.

---

## 9. Glossary

| Term | Meaning |
|---|---|
| **Brand** | One of our operational brands (Vkusno, Blini, Kompot). |
| **Competitor** | An external brand we monitor (lives in `Competitor` collection). |
| **Owner** | The Brand or Competitor that owns a given menu/category/item/modifier/option. |
| **Aggregator** | A delivery platform (Talabat, Careem, Deliveroo, Noon, etc.). |
| **Sales channel** | The triple `(Branch × Brand × Aggregator)` — operationally one "store". Will become a first-class model later. |
| **Reusable doc** | A document that can be referenced from multiple parents (MenuItem, Modifier, Option). |
| **Owned doc** | A document that has exactly one parent (MenuCategory, Menu). |
| **Join entry** | An array element on a parent doc that references a reusable child and carries per-parent state (activation, timings, display order, price override). |
| **Mirror** | A symmetric cross-link between two MenuItems representing the same food under different brands (Vkusno ↔ Blini). |
| **Competes** | A one-directional cross-link from our MenuItem to a competitor's MenuItem for price-positioning analysis. |
