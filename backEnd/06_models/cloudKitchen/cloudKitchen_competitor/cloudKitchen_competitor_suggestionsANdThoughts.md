# Competitor Schema — Thoughts & Suggestions

---

## Overall Structure Assessment

The four-model structure you have (`Competitor → CompetitorMenu → CompetitorMenuCategory → CompetitorMenuItem`) mirrors the app's own menu hierarchy — that's exactly right. It means you can reuse the same mental model and UI patterns. The foundation is solid.

The biggest gap isn't structural — it's **what the model is actually for**. Competitor intelligence for a dark kitchen chain in Dubai is really about tracking rivals *per delivery platform*. The same competitor brand can have a completely different menu, different pricing, different ratings, and different delivery zones on Talabat vs. Careem Now vs. Noon Food. The current schema doesn't model this at all, and it's the most important dimension.

---

## Bugs (will throw errors at runtime)

### `Competitor.js` — `coordinateSchema` is not defined

`branches.locations[].coordinates` and both `coverageAreas` fields reference `coordinateSchema`, but it's never declared or imported in the file. This will throw a `ReferenceError: coordinateSchema is not defined` the moment Mongoose processes the schema.

**Fix:** Either import it from a shared helper or define it locally:
```js
const coordinateSchema = new mongoose.Schema(
  { lat: { type: Number }, lng: { type: Number } },
  { _id: false },
);
```

### `Competitor.js` — `menu` points to the wrong model

```js
menu: { type: mongoose.Schema.Types.ObjectId, ref: "CompetitorMenuCategory" }
```

This references a `CompetitorMenuCategory` but should reference `CompetitorMenu` (the top-level menu document). A competitor has one menu; that menu has categories.

**Fix:** `ref: "CompetitorMenu"`

### `CompetitorMenu.js` — typo in schema variable name

`competitorMenurSchema` has an extra `r`. Doesn't affect runtime in this case (the variable is local) but is confusing.

---

## Missing Critical Piece: Delivery Platform Tracking

Dark kitchen competitors live and die by their platform presence. You need to track:

- Which platforms they're on (Talabat, Careem Now, Noon Food, Deliveroo, InstaShop, etc.)
- Their rating and review count on each platform
- Their minimum order and delivery fee per platform
- A direct link to their storefront per platform
- Whether they're active on that platform right now

**Suggested addition to `Competitor.js`:**
```js
platforms: [
  {
    name: { type: String }, // "Talabat", "Careem Now", "Noon Food", "Deliveroo"
    storeUrl: { type: String },
    isActive: { type: Boolean, default: true },
    rating: { type: Number },        // e.g. 4.7
    reviewCount: { type: Number },
    deliveryFee: { type: Number },   // in AED
    minOrder: { type: Number },      // in AED
    deliveryTimeMin: { type: Number }, // estimated delivery time in minutes
    lastChecked: { type: Date },
    notes: { type: String },
  },
],
```

---

## Missing: Market Positioning Fields

You have no way to categorize or compare competitors at a glance. Suggested additions to `Competitor.js`:

```js
// What type of food / market they're in
cuisineTypes: [{ type: String }],  // ["burgers", "pizza", "shawarma"]

// Where they sit in the market
priceRange: {
  type: String,
  enum: ["budget", "mid", "premium"],
},
averageOrderValue: { type: Number }, // in AED

// Geographic footprint (these already exist as computed flags — keep them)
// branches.multiBranch, multiEmirates, multiCountry — good, keep these

// What brands of ours this competitor competes with
// Note: Brand already has competitors[] ref, so this is optional.
// But having it here too makes it easy to query from the competitor's side:
competesWithBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
```

---

## Missing: Intelligence / Observation Log

The most valuable part of competitor tracking is the over-time narrative — "they launched a new breakfast menu last month", "their ratings dropped after the management change". There's no place to record this currently.

**Suggested addition:**
```js
observations: [
  {
    date: { type: Date },
    note: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String }], // ["pricing", "menu-change", "expansion", "marketing"]
  },
],
```

---

## `Competitor.js` — `promos` Section Needs Dates and Platform

Promos without a time range are essentially useless for intelligence — you can't tell if it's current or old. And in Dubai's delivery ecosystem, promos are platform-specific.

**Current:**
```js
promos: [{
  name, description, discountType, discountAmount, discountPercentage, discountCap, discountMinOrder
}]
```

**Suggested:**
```js
promos: [
  {
    name: { type: String },
    platform: { type: String },         // which platform the promo runs on
    discountType: { type: String, enum: ["fixed", "percentage", "freeDelivery", "bogo"] },
    discountValue: { type: Number },
    discountCap: { type: Number },
    minOrder: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
    description: { type: String },
    capturedAt: { type: Date },         // when you first saw this promo
  },
],
```

---

## `CompetitorMenu.js` — Add Platform and Timestamp

A competitor can have a different menu on each platform (Talabat and Careem Now can show different items and prices for the same restaurant). The menu model should know which platform it belongs to and when it was last captured.

**Suggested additions:**
```js
competitor: { type: mongoose.Schema.Types.ObjectId, ref: "Competitor", required: true },
platform: { type: String },    // "Talabat", "Careem Now", etc. — null if universal
capturedAt: { type: Date },    // when this menu snapshot was taken
isArchived: { type: Boolean, default: false }, // old snapshots vs. current
```

This lets you store historical menu snapshots (e.g., "Talabat menu as of March 2025") and compare against the current one.

---

## `CompetitorMenuCategory.js` — Minor Improvements

1. **Add `competitorMenu` backref** — without it you can't find a category's parent menu without scanning all menus:
   ```js
   competitorMenu: { type: mongoose.Schema.Types.ObjectId, ref: "CompetitorMenu" },
   ```

2. **Add `sortOrder`** — categories appear in a specific order in the app; you'll want to control this:
   ```js
   sortOrder: { type: Number, default: 0 },
   ```

3. **`activeTimings` `_id: false`** — this is placed incorrectly inside the array item instead of as a schema option. It's working because Mongoose accepts it, but it should be `{ _id: false }` in the schema options of a named subdoc schema for clarity.

---

## `CompetitorMenuItem.js` — Several Issues

### `Images` should be lowercase `images`
Conventions throughout the codebase use lowercase field names. `Images` is inconsistent.

### Price change tracking is redundant
`hasIncreased`, `hasDecreased`, `increaseAmount`, `decreaseAmount` can all be derived from the `oldPrices[]` array. They'll also go out of sync the moment there's a second price change (the first change data is overwritten). Remove these four fields and just use `oldPrices`.

### Missing fields for useful intelligence
```js
currency: { type: String, default: "AED" },
portion: { type: String },       // "250g", "Regular / Large", "6 pcs"
isAvailable: { type: Boolean, default: true }, // item can be temporarily unavailable
platform: { type: String },      // if the item only exists on a specific platform
category: { type: mongoose.Schema.Types.ObjectId, ref: "CompetitorMenuCategory" }, // backref
```

### Price history should include `capturedAt`
```js
oldPrices: [
  {
    price: { type: Number },
    capturedAt: { type: Date },  // renamed from `date` — more precise
    notes: { type: String },     // "Ramadan pricing", "post-VAT increase"
  },
],
```

---

## Suggested Final Schema Relationship

```
Competitor
  ├── platforms[]           ← per-platform presence, ratings, delivery fees
  ├── branches.locations[]  ← geographic footprint
  ├── promos[]             ← time-bound platform-specific promotions
  ├── observations[]       ← intelligence log / notes over time
  └── competesWithBrands[] ← links back to Brand documents

CompetitorMenu (one per platform snapshot)
  ├── competitor (ref)
  ├── platform
  └── capturedAt

CompetitorMenuCategory
  ├── competitorMenu (ref)
  ├── sortOrder
  └── activeTimings[]

CompetitorMenuItem
  ├── category (ref)
  ├── images[] (lowercase)
  ├── sellingPrice + currency
  ├── portion
  ├── isAvailable
  └── oldPrices[] (with capturedAt)
```

---

## What to Do First (Priority Order)

1. **Fix the `coordinateSchema` bug** — it will crash on import.
2. **Fix the `menu` ref** — `CompetitorMenu` not `CompetitorMenuCategory`.
3. **Add `platforms[]` to Competitor** — this is the most analytically valuable addition.
4. **Add `competitor` backref to CompetitorMenu** — needed for any useful query.
5. **Clean up `CompetitorMenuItem`** — lowercase `images`, remove redundant price flags, add `capturedAt` to `oldPrices`.
6. **Add `promos.startDate/endDate/platform`** — promos without dates are dead data.
7. Everything else (observations, positioning, per-platform menus) can come later once the basics work.
