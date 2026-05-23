# Orders — Available Data Per Integrator

Inventory of what each integrator export exposes per order. Compiled from sample files on 2026-05-23:
- **GrabTech** (May 1-5) — Vkusno + Blin-i (note the hyphen in their naming)
- **Sapaad** (April 1-30) — Kompot only, separate report per branch
- **UrbanPiper** (April 1-30) — Kompot only

Each integrator exports **two pairs**: an orders-level report and a per-item report. They share order identifiers, so they can be cross-checked.

This document feeds the design of the `Order` schema.

---

## 1. Volume + scope of each export

| Integrator | Brands covered | Channels seen | Branches | Orders / 1 mo | Item rows / 1 mo |
|---|---|---|---|---|---|
| GrabTech | Vkusno (20,903), Blin-i (1,190) | Deliveroo, Careem, Talabat, Noon, KeeTa, Pickup | Arjan, Business Bay Cuisinette, Business Bay Sol, Dubai Marina, DSO | 22,093 | 55,566 |
| UrbanPiper | Kompot (brand field blank) | talabat, careem, deliveroo, noonfood, keeta | Arjan, Business Bay, Dubai Marina, Silicon Oasis | 2,078 | 3,787 |
| Sapaad | Kompot | Deliveroo, Talabat, UrbanPiper, Call Center | per file: Business Bay (90), Dubai Marina (59), Arjan (140), Silicon Oasis (6) | ~295 total | 630 |

**Anomaly**: Sapaad shows ~7× fewer Kompot orders than UrbanPiper in the same period. Either Sapaad's report is filtered (perhaps only some channels/states), or only some orders flow through Sapaad. Worth checking before designing the ingestion service.

**Sapaad has 'UrbanPiper' as a channel** — meaning some orders show as coming from UrbanPiper rather than from the original aggregator (Talabat/Careem/etc.). One real-world order can appear in different integrators under different channel labels.

---

## 2. Order identifiers — the core problem

Each integrator uses its own ID system. One real-world order can have 5+ identifiers across systems:

### GrabTech orders file (32 cols)
| Field | Sample | Notes |
|---|---|---|
| `Unique Order ID` | `1356360552936923136` | Long snowflake-style numeric; per-row unique (22,093 = 22,093) |
| `Order ID` | `8304`, `1003`, `155977238` | NOT unique per row (22,093 rows → 20,022 unique). Same Order ID across multiple item rows in the menu-perf file |
| `Sequence Number` | `204088` | Monotonic global GrabTech sequence |
| `Fort ID` | optional | Payment gateway transaction ID |

### UrbanPiper orders file (36 cols)
| Field | Sample | Notes |
|---|---|---|
| `Order ID` | `1116567942` | UP's primary, 10-digit integer |
| `Order ref ID` | `'456723474'` | UP's reference, 9-digit string |
| `External Platform ID` | `'3539949216'` (Talabat) | The aggregator's own order ID — this is the bridge to Rating's `platformOrderId` |
| `Aggregator Order ID` (items-wise only) | same as External Platform ID | Confirmed via cross-check |

### Sapaad CSV (12 cols)
| Field | Sample | Notes |
|---|---|---|
| `Order No` | `50945`, `51083` | Sapaad-local 5-digit number. NO aggregator ID, NO channel-manager ID |

### Cross-system overlap test
- GrabTech sales `Order ID` vs GrabTech menu-perf `Order ID`: **20,022 / 20,022 overlap** — both reports are aligned ✓
- Sapaad `Order No` vs UrbanPiper `Order ID` / `Order ref ID` / `External Platform ID`: **zero overlap** ✗

So **Sapaad cannot be auto-linked to UrbanPiper or aggregator IDs from its CSV alone.** Sapaad's report does not expose the source aggregator order ID — only its own internal number. To reconcile Sapaad ↔ UP, you'd need either: (a) Sapaad's API/different report that includes the aggregator ID, (b) fuzzy match by timestamp + items + amount, or (c) accept Sapaad as a separate truth source and skip the join.

### Implication for the Order schema

Order needs a **flexible identifier collection**, not just one field:

```js
identifiers: {
  internal:     { type: ObjectId },           // = the Order document's own _id
  aggregator: {                                // the platform's own order ID (most important)
    platform: { ref: "SalesPlatform" },
    value:    String,
  },
  GrabTech: {
    uniqueOrderId: String,                     // 1356360552936923136
    orderId:       String,                     // 8304 or 155977238
    sequenceNumber:Number,
    fortId:        String,
  },
  UrbanPiper: {
    orderId:    Number,                        // 1116567942
    refId:      String,                        // '456723474'
    externalId: String,                        // aggregator-side ID
  },
  Sapaad: {
    orderNo: String,                           // 50945
  },
},
```

Or — flatter and more extensible:

```js
externalIds: [
  { source: "talabat" | "careem" | "noon" | "deliveroo" | "keeta" | "GrabTech" | "UrbanPiper" | "Sapaad",
    kind:   "primary" | "ref" | "sequence" | "fort" | "external",
    value:  String,
  },
],
```

The flat array is more extensible (you can add new sources without schema change) but loses some structure. **My recommendation: flat array** for the same reason your `storeIds` array on SalesChannel uses that pattern.

---

## 3. Customer data — wildly inconsistent

| Integrator | Customer name | Phone | Address | Customer ID |
|---|---|---|---|---|
| GrabTech | Real names often present (Lolita, Mohamed Brett, Влад, Диана). Some "unknown unknown" | E.164 format with country code (+971554280334). Includes platform-masked numbers (+9718000320499 is Talabat's CS) | "Unknown" 53% / blank 30% / Template fallback "Street: Dubai, City: Dubai..." common / Real address 17% | ✗ |
| UrbanPiper | Mostly placeholder ("Careem User" 486×, "unknown unknown" 34×). Some real names (Ирина Петров 28×) | ✗ | ✗ | Yes (Customer ID integer) — but only 78 unique IDs for 2078 orders, mostly platform aliases |
| Sapaad | Column exists but EMPTY in 100% of sampled rows | Column exists but EMPTY | ✗ | ✗ |

**GrabTech is the richest source for customer identity.** Phone numbers in E.164 are valuable for de-duping customers across orders. Names mostly present.

**UrbanPiper customer data is unreliable** — most entries are platform-generic ("Careem User"). Each aggregator has different privacy practices that UP just passes through.

**Sapaad has no customer data** despite having columns for it.

### Customer ingestion logic implications

- **Primary identifier should be phone** (when present). Email is rarely available.
- "unknown unknown" / "Careem User" → don't create a Customer record, just leave `Order.customer = null`.
- Country-code prefixed phones make deduplication easier across integrators.
- Some "phones" are actually platform CS lines (+9718000320499 = Talabat). Maintain a blocklist of known masked numbers.

---

## 4. Items + modifiers

### GrabTech menu-perf
- Per row: parent menu item + optional Modifier (single column, single value)
- Critically: **`Menu Item External ID` is a Mongoose ObjectId** (e.g. `67be027a4745a456fbed2b31`). GrabTech is storing your `MenuItem._id` on their side. So the items they return ARE your menu items — direct ref resolution possible.
- `Modifier External ID` same pattern.
- `Tags` column captures the category name (e.g. "Soup (Домашние Супы)", "Main Courses (Основные Блюда)").

### UrbanPiper items-wise
- Per row: one item with one option (single option per row)
- `Item ID` (integer) + `Item ref ID` (string) — UP's internal IDs, not your menu IDs
- `options` (single string, e.g. "Organic Fried Potato with Mushrooms") + `option_ids` (single number/string)
- `Liability On`: "merchant" — captures who bears tax liability
- `unique id`: row-level unique (e.g. `C-1116567942-1`, `C-1116567942-2`) — same Order with -1, -2 suffix per item
- Multiple modifiers per item would appear as **multiple rows for the same item**, distinguished by the suffix

### Sapaad CSV
- Each modifier is its own row with `Item Type: 'Modifier'` and price often 0.
- The modifier row has the SAME `Order No` as the parent item but **no explicit link to which item it modifies**. Ingestion has to guess based on row order proximity.
- Pure modifiers (like "Organic Mashed Potato" without item context) lose meaning without parent linkage.

### Implication for OrderItem subdoc

```js
items: [
  {
    menuItem:        { ref: "MenuItem" },        // resolved via GrabTech's Menu Item External ID
    nameSnapshot:    String,                     // raw name as seen in export
    categorySnapshot:String,                     // from GrabTech `Tags` or derived
    qty:             Number,
    unitPrice:       Number,
    lineTotal:       Number,
    discount:        Number,
    tax:             Number,
    modifiers: [
      {
        modifierOption: { ref: "MenuItemModifierOption" },
        nameSnapshot:   String,
        price:          Number,
      }
    ],
    sourceLineId:    String,                     // e.g. UP's `unique id` ("C-1116567942-1") for reconciliation
  },
],
```

The key win is GrabTech storing your MenuItem ObjectId externally — you can resolve `menuItem` reliably on ingestion. For UP and Sapaad, you need a name-based fuzzy match.

---

## 5. Money breakdown

### GrabTech sales orders (per order)
- `Item Price`, `Surcharge`, `Delivery`, `Net Sales`, `Gross Price`, `Discount`, `VAT`, `Total(Receipt Total)`, `Channel Service Charge`, `Tips`
- Single `Discount` field (no aggregator vs merchant split)
- Single `VAT` line

### UrbanPiper orders
- `Total Amount` (customer paid total)
- `Merchant Total` (your net)
- `Sub-total Amount`
- `Discount` (combined)
- `Aggregator Discount` (platform-funded portion)
- `Merchant Discount` (brand-funded portion)
- `Aggregator Taxes`, `Merchant Taxes`, `Total Taxes` (three values)
- `Charges` (catch-all)
- `Wallet credit amount`

**UrbanPiper is the only source that splits aggregator-funded vs merchant-funded discounts in the export.** That's gold for the Campaign-funding model you already designed.

### Sapaad CSV (per row)
- `Price`, `Item Tax`, `Item discount` — per item, not per order
- No order-level subtotals/totals visible — must be aggregated by ingestion

### Implication for Order.totals

```js
totals: {
  currency:           { type: String, default: "AED" },
  itemsSubtotal:      Number,
  delivery:           Number,
  surcharge:          Number,
  tips:               Number,
  serviceCharge:      Number,
  walletCredit:       Number,
  discount: {
    total:            Number,
    aggregatorFunded: Number,   // platform-funded portion
    merchantFunded:   Number,   // brand-funded portion
  },
  tax: {
    total:            Number,
    aggregatorTax:    Number,
    merchantTax:      Number,
  },
  customerPaid:       Number,   // = total customer was charged
  merchantNet:        Number,   // = what brand actually receives
},
```

Each integrator fills different subsets — ingestion has to map their fields onto this. Some fields will be null/derived.

---

## 6. Status / lifecycle

### UrbanPiper has explicit states
`Completed` (2027), `Cancelled` (21), `Dispatched` (14), `Acknowledged` (16). Four-state enum.

### GrabTech doesn't carry state
Implicit — these exports filter to delivered orders only (presumably). No `Cancelled` or `Pending` orders in the sample.

### Sapaad doesn't carry state explicitly either

### Implication
Order needs an explicit `status` enum even if some sources don't provide it:
```js
status: {
  type: String,
  enum: ["pending", "acknowledged", "preparing", "dispatched", "delivered", "cancelled", "rejected", "unknown"],
}
```

Default to `delivered` when an integrator doesn't say (most exports filter to delivered).

---

## 7. Channel naming inconsistency — needs normalization

| Real platform | GrabTech | UrbanPiper | Sapaad |
|---|---|---|---|
| Talabat | `Talabat` | `talabat` | `Talabat` |
| Careem | `Careem` | `careem` | (in UrbanPiper-channel rows in Sapaad) |
| Noon | `Noon` | `noonfood` | — |
| Deliveroo | `Deliveroo` | `deliveroo` | `Deliveroo` |
| Keeta | `KeeTa` | `keeta` | — |
| (none) | `Pickup` | — | `Call Center` |
| (passthrough) | — | — | `UrbanPiper` |

**The ingestion service must normalize platform strings → SalesPlatform ObjectId via a mapping table.** Keep the raw string in `externalIds[]` for audit but resolve `salesChannel` via SalesPlatform.

`Pickup` in GrabTech and `Call Center` in Sapaad are non-aggregator channels — they should resolve to corresponding SalesPlatform records (your `kind: "direct"` platforms).

---

## 8. Brand naming inconsistency

- GrabTech: `Vkusno`, `Blin-i` ⚠ (hyphen)
- UrbanPiper: brand field is **`None`** for all 2,078 rows
- Sapaad: brand implicit by file (Kompot)

**Cannot rely on the integrator's brand field.** Derive brand via:
1. The store/location reference (each branch belongs to known brand[s])
2. Configuration mapping (UrbanPiper store IDs → Brand)
3. The file's source/context for Sapaad

---

## 9. Location naming inconsistency

| Real branch | GrabTech | UrbanPiper | Sapaad (file) |
|---|---|---|---|
| Arjan | `Arjan` | `Arjan` | `Kompot Restaurant(Arjan)` |
| Business Bay SOL | `Business Bay Sol kitchen` | — (?) | — |
| Business Bay Cuisinette | `Business Bay Cuisinette kitchen` | `Kompot - Business Bay` | `Kompot Business Bay` |
| Dubai Marina | `Dubai marina` | `Dubai Marina` | `Kompot Dubai Marina` |
| Dubai Silicon Oasis | `DSO` | `Kompot - Silicon Oasis` | `Kompot Silicon Oasis` |

**The ingestion service needs a Location mapping table** — a config-level translation from each integrator's location string → your Branch ObjectId. Same as platform normalization.

UrbanPiper also has `Store ID` (integer) and `Store ref ID` (string) — more stable than the name for mapping.

---

## 10. Payment method values

- GrabTech: `Prepaid` (94%), `Cash` (6%), `Card` (rare)
- UrbanPiper: `payment_gateway` (46%), `aggregator` (47%), `cash` (7%)
- Sapaad: not exposed in the CSV

Need a normalized enum:
```js
paymentMethod: { type: String, enum: ["prepaid", "cash", "card", "aggregator-wallet", "unknown"] }
```

---

## 11. Timestamps

| Field | GrabTech | UrbanPiper | Sapaad |
|---|---|---|---|
| Order received / placed | `Received At` (datetime) | `Created At` (datetime) | `Order Time` (datetime) |
| Requested delivery time | — | `Request Delivery Time` | — |
| Time slots | — | `Time Slot Start`, `Time Slot End` | — |
| Delivery milestones (accepted, ready, dispatched, delivered) | ✗ | ✗ | ✗ |

**Detailed timelines (accepted/ready/dispatched/delivered) are NOT in the integrator exports.** They appear in the platform dashboards' order-detail views (REVIEWS.md). So if you want timeline tracking, you'd need to pull from the platforms directly — not from the integrator exports.

### Implication
For Order from integrator exports, you only get **`placedAt`** + maybe **`requestedDeliveryAt`** reliably. The full timeline is a future enhancement.

```js
timestamps: {
  placedAt:           Date,
  requestedDeliveryAt:Date,
  acceptedAt:         Date,    // not in exports — manual or future scrape
  readyAt:            Date,    // same
  dispatchedAt:       Date,    // same
  deliveredAt:        Date,    // same
  cancelledAt:        Date,    // UrbanPiper has cancel-state but no timestamp
},
```

---

## 12. Cancellation data

UrbanPiper exposes:
- `Order Cancel Reason`
- `Order Cancellation Message`

GrabTech and Sapaad do not surface cancel data in these exports. Likely because exports are filtered to completed orders.

---

## 13. Recommended `Order` schema shape (high-level)

```js
{
  // ── Identity ─────────────────────────────────────────────
  salesChannel: { ref: "SalesChannel" },         // resolved: branch + brand + platform
  status: { type: String, enum: [...], default: "delivered" },
  externalIds: [
    { source: String, kind: String, value: String },
  ],

  // ── Timing ───────────────────────────────────────────────
  placedAt: Date,
  requestedDeliveryAt: Date,
  timeline: {
    acceptedAt: Date, readyAt: Date, dispatchedAt: Date, deliveredAt: Date, cancelledAt: Date,
  },

  // ── Customer ─────────────────────────────────────────────
  customer: { ref: "Customer" },                  // optional — null if unidentifiable
  customerSnapshot: {                              // raw from export
    name: String, phone: String, address: String,
  },

  // ── Items ────────────────────────────────────────────────
  items: [
    {
      menuItem:    { ref: "MenuItem" },
      nameSnapshot: String,
      categorySnapshot: String,
      qty: Number,
      unitPrice: Number,
      lineTotal: Number,
      discount: Number,
      tax: Number,
      modifiers: [{
        modifierOption: { ref: "MenuItemModifierOption" },
        nameSnapshot: String,
        price: Number,
      }],
      sourceLineId: String,                        // for reconciliation
    },
  ],

  // ── Money ────────────────────────────────────────────────
  totals: {
    currency: String,
    itemsSubtotal: Number,
    delivery: Number,
    surcharge: Number,
    tips: Number,
    serviceCharge: Number,
    walletCredit: Number,
    discount: { total, aggregatorFunded, merchantFunded },
    tax:      { total, aggregatorTax, merchantTax },
    customerPaid: Number,
    merchantNet:  Number,
  },

  // ── Discount attribution ─────────────────────────────────
  appliedCampaigns: [                              // snapshot at order time
    {
      campaign:        { ref: "Campaign" },
      discountAmount:  Number,
      brandFunded:     Number,
      platformFunded:  Number,
    },
  ],

  // ── Payment ──────────────────────────────────────────────
  paymentMethod: { type: String, enum: [...] },
  paymentTransactionId: String,

  // ── Cancellation ─────────────────────────────────────────
  cancellation: {
    reason:  String,
    message: String,
  },

  // ── Source tracking ──────────────────────────────────────
  ingestion: {
    primarySource: String,                         // "GrabTech" | "UrbanPiper" | "Sapaad" | "platform" | "manual"
    sources:       [String],                       // all sources that contributed
    importedAt:    Date,
    rawPayloads:   [                               // for debugging + cross-source reconciliation
      { source: String, importedAt: Date, raw: Mixed }
    ],
  },

  // ── Misc ─────────────────────────────────────────────────
  notes:        String,
  customerNote: String,
  ...AUDIT,
}
```

---

## 14. Cross-integrator reconciliation strategy

You'll receive the same real-world order in multiple feeds (e.g., a Talabat order on Kompot will be in BOTH the UrbanPiper export AND the Sapaad export). The ingestion service has three jobs:

1. **Identify** the same Order across sources. Match by:
   - Aggregator order ID (UrbanPiper `External Platform ID`) — the gold standard
   - Timestamp + branch + amount + items (fuzzy fallback for Sapaad which has no aggregator ID)

2. **Merge** their fields into a single Order document. Later sources update / fill gaps in earlier ones. Keep raw payloads of each for audit.

3. **Resolve refs** — translate raw strings to your ObjectIds:
   - Channel name → SalesPlatform
   - Location name → Branch
   - Brand inference → Brand
   - Customer phone → Customer (find-or-create)
   - Menu Item External ID (GrabTech) → MenuItem (direct lookup)
   - UrbanPiper item ID → MenuItem (lookup table)
   - Sapaad item name → MenuItem (fuzzy match)

This is the most complex piece of code in the whole system. Worth a dedicated design pass when we get to it.

---

## 15. Open questions before locking Order

- **Items as subdoc array vs separate `OrderItem` collection?** Subdoc is simpler for the dominant read pattern ("show me this order's items"). Own collection wins if you ever need "all orders containing item X this month" — that's a common analytical query. **My lean: subdoc for now**, build an OrderItem index later if speed becomes a problem.
- **Raw payloads stored on the Order doc** could bloat the document fast (especially with the giant XLSX rows). Consider a separate `OrderImportRaw` collection that Order refs — keeps the main Order lean.
- **Per-channel pricing differences**: an item is AED 38 on Talabat-Vkusno-Arjan but AED 42 on Careem-Vkusno-Arjan. Where does that "channel price" live? Either on MenuItem (per-channel price map) or derived from Order history. Worth a dedicated thread when designing MenuItem's price strategy.
- **Sapaad volume mystery**: why does Sapaad show 295 Kompot orders when UP shows 2,078? Ingestion design depends on whether Sapaad is a strict subset, a parallel truth source, or limited by some filter.
- **Aggregator-side cancel/refund timing**: UrbanPiper exports have cancel-reason but cancel timestamp is missing. Need to derive from `Order State` change time (which isn't in the export). Refund linkage to Order is via Talabat order ID typically.

---

## 16. Summary

**One real-world order can have**:
- 1 internal `Order._id`
- 1 aggregator order ID (Talabat's number, Careem's number, etc.) — best linkage to Rating, Refund, Campaign attribution
- 1-3 channel-manager IDs (GrabTech: 4 different ones; UrbanPiper: 3 different ones)
- 1 POS-side ID (Sapaad)
- 1-N internal sub-line IDs (UrbanPiper's `unique id` per item row)

**The aggregator order ID is the bridge to other entities** (Rating, Refund, Campaign attribution). Make sure Order indexes on `externalIds.value` where `externalIds.source` is one of the aggregator platforms.

**Customer linkage** primarily by phone (when present, GrabTech is the richest source). Lazy find-or-create at import time.

**MenuItem linkage** primarily via GrabTech's `Menu Item External ID` (it's your Mongoose ObjectId). UrbanPiper/Sapaad use their own IDs — need a mapping table.

**Channel + Location + Brand normalization tables** are required infrastructure for the ingestion service. Each integrator uses different strings for the same thing.

---

## ADDENDUM (2026-05-23) — decisions locked during Order schema design

### Sapaad ruled out as primary source
Confirmed via deeper analysis: ~7× fewer Kompot orders than UrbanPiper, zero aggregator-ID overlap. Without an aggregator order ID, Sapaad orders can't link to Rating, Refund, or Campaign attribution. **Decision**: Sapaad files archive but don't ingest. Use UrbanPiper as the single Kompot source.

### Talabat direct reports are strictly richer than GrabTech
The Talabat direct partner export (`talabat_orderDetails.xlsx`) includes:
- Explicit **`Is Pro Order`** Y/N column — answers the pro-user question definitively
- Full **delivery timeline** with all milestones (received → accepted → ready → rider near pickup → in delivery → delivered)
- **Itemized fees**: Marketing Fees Total + Marketing Fees Reasons (e.g. "Super Saver Fee; Loyalty Charges - Pro Delivery Fee") + Wait Time Fee + Online Payment Fee + Operational Charges + Avoidable Cancellation Fee + Ads Fee
- **Funding split** explicit: `Discount Funded by you` + `Voucher Funded by you` vs `Talabat-Funded Discount` + `Talabat-Funded Voucher`
- **Has Complaint?** + Complaint Reason
- **Cancellation** with reason + owner + timestamp
- **Payout breakdown**: Estimated earnings, Cash already collected, Amount owed back, Payout Amount

**Decision**: when ingesting Talabat orders for Vkusno/Blini, prefer the Talabat direct report over GrabTech. GrabTech becomes a secondary cross-check.

### VAT formula confirmed
Verified against actual GrabTech rows: **VAT is 5% on the post-discount net.** Formula: `customerPaid = (grossPrice − discount) × 1.05`. Net Sales = `customerPaid / 1.05`. VAT = `customerPaid − Net Sales`.

### Pro user data — three granularities
- **Talabat**: per-order via `Order.isProOrder` + `Order.totals.proCharge` (the +4 AED Pro Delivery Fee).
- **Careem**: daily aggregate in `SalesChannelMetrics` (segments: cplus / non-cplus / new / reactivated / retained).
- **Noon**: monthly aggregate (TBD — depends on report format from accountant).
- **Deliveroo**: confirmed no pro user charges — irrelevant for the pro model.
- **Keeta**: confirmed no pro user tier — irrelevant for the pro model.

### Per-order extra fees pattern
From UrbanPiper's `Charges` column we found:
- Talabat: avg 6.11 AED/order — pattern is "5% base commission + sometimes a flat ~4 AED upcharge"
- Careem: avg 11.75 AED/order — variance not from a single pattern
- Deliveroo / Noon / Keeta: always 0

The Talabat direct report's Marketing Fees breakdown clarifies: 2 AED Super Saver Fee for all, +4 AED Pro Delivery Fee for pro users. Captured as `Order.totals.proCharge`.

### Commission snapshot — deferred until Contract is designed
The actual commission rate per order depends on Contract terms (pro vs non-pro rates, volume tiers, negotiated overrides). Wait to design `Order.totals.commission` and `Order.totals.fees[]` until Contract is locked.

### Schema additions during this session
- **`Order.isProOrder: Boolean`** — fillable from Talabat reports; null for others.
- **`Order.totals.proCharge: Number`** — the +4 AED Pro Delivery Fee (or whatever platform exposes).
- **`OrderImportRaw` collection** (new, at root) — raw row backup. Refs Order. Stores raw JSON + source + file + sheet + row index.
- **`SalesChannelMetrics` collection** (new, cloudKitchen_general) — periodic per-channel customer-segment aggregates. Granularity enum (daily/weekly/monthly/etc.), source enum (careem-business-report etc.), segments[] with avgBasket + deliveredOrders + sales + extra Mixed.
- **`Order.delivery` block dropped** — not operationally useful (you don't manage drivers; aggregator owns delivery).
