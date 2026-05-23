# Reviews & Ratings — Available Data Per Platform

Inventory of what each aggregator exposes when a customer leaves a review. Compiled from the screenshots shared on 2026-05-23. This document feeds the design of the `Rating` schema (and informs `Order`).

---

## Talabat

### Initial review view (operator dashboard)
- Rating value (stars out of 5 — e.g. 4★)
- Review text (freeform)
- Date + time (e.g. `05/22/2026, 02:01 PM`)
- Action buttons: Reply, View order
- **Customer name**: NOT shown on operator dashboard

### Reply modal
- Same review data
- Reply textarea (response will appear on shop's public page below the customer's review)

### View order (linked to the review)
- Order ID (e.g. `3642253289`)
- Outlet name + address
- Order status (e.g. `COMPLETED`, `PAYABLE`)
- Order timeline: Order received, Order accepted, Rider near pickup, Order ready to pick up, In Delivery, Order delivered — each with timestamps
- Lateness flag (e.g. "4 min. late, Estimated to deliver by 23:00")
- Order items (name, quantity, price each)
- Financial breakdown:
  - Subtotal
  - Vouchers funded by you (brand-funded discounts)
  - Commission
  - Payment fee
  - Marketing fees
  - Estimated earnings
  - Taxes
- Payment method (e.g. Cash)
- Delivery type (e.g. Talabat delivery)

### Talabat customer-app view (regular user perspective)
- Brand name + logo
- Overall rating (e.g. 4.7) and review count (e.g. "1k+")
- Per-review:
  - Star rating
  - Review text
  - **Customer display name** (e.g. "San Kubos", "Corina Filipoiu") — OR `unknown` if customer chose not to share
  - Date (no time on customer-facing app)

**Takeaway**: customer name only visible via the customer-app view; operator dashboard does NOT expose it.

---

## Deliveroo

### Initial review view
- Rating value (stars/5 — e.g. 1★)
- Date (no time, e.g. `9th May 2026`)
- Review text
- Action buttons: Details, Reply
- **Customer name**: NOT shown

### Reply modal
- Review + star + date + time (`9th May 2026, 13:04`)
- **Customer loyalty signal**: "Frequent customer (ordered 5+ times)" with a tier descriptor
- Order summary: Order #5853 (AED 38 total)
- Reply textarea
- "Add credit for their next order" checkbox (compensation workflow)
- Note: replies sent privately via email, not public

### Details (order linked to review)
- Order #5853
- Order status (Delivered)
- Date ordered + time (e.g. `8 May 2026 at 17:48`)
- Order total (item count)
- Order details table: Category, Item name, Quantity, Price, Subtotal

**Takeaway**: no customer name, but loyalty tier exposed; private reply with credit-grant option.

---

## Careem

### Initial review view (embedded in orders table)
- Reviews live **inside the recent-orders table**, not a separate reviews section
- Per row:
  - Order ID (e.g. `158864803`)
  - Order placed (date + time)
  - Amount
  - Outlet
  - Area
  - Delivery status
  - Cancellation Reason (if applicable)
  - **Rating column**: star value + count
  - **Review column**: review text (optional — orders can have rating without review)

### Click into a review/order row
- Order ID, status (Delivered, Prepaid)
- "Repeat Customer" tag + tier (e.g. `2-4 Orders`)
- Top-right shows **rider name + phone + arrival time** — this is the DELIVERY RIDER, not the customer (e.g. Muhammad Mustehsan, +971564124271, "Arrived at 20:33")
- Outlet name + area
- Items with image, category, name, qty, price
- Basket amount, total, payment method

**Takeaway**: no customer name; rider identity often mistaken for customer; ratings are per-order embedded in orders list.

---

## Noon

### Initial review view
- Brand name (e.g. Vkusno Russian Kitchen)
- Rating value (stars/5)
- Date + time (e.g. `May 14 | 03:16 PM`)
- **Items mentioned in review** with thumbs-up icon (the items the customer praised/commented on)
- Review text
- View Order button
- **Customer name**: NOT shown

### View order
- Order ref (short — e.g. `0256`)
- Date + time
- Payment status (e.g. Payable)
- Outlet with branch (e.g. `Vkusno Russian Kitchen - Dubai Marina`)
- Order type (Delivery / Pickup)
- Order ref (short)
- Order ID (long alphanumeric — e.g. `FG5DNNX94A3G6PA`)
- Items with name + price
- "Discount by you" (brand-funded discount)
- Total
- Order timeline: Order placed, Order accepted, Ready for pickup, Picked up, Order delivered — each with timestamps

**Takeaway**: customer name not shown; uniquely tracks **liked items** alongside review; two separate order identifiers (short ref + long ID).

---

## Careem (regular user app perspective)

User could not find a public reviews section as a normal user. Reviews appear to be operator-side only.

---

## Keeta

### Initial review view (richest of all platforms)
- **Customer name** explicitly shown (e.g. `Ahmad Radwan`) — only platform that exposes this
- Rating value (stars/5)
- Brand + branch label (e.g. `Vkusno Russian Kitchen (Business Bay)`)
- Date (e.g. `8 May 2026`)
- **Sentiment/category tag** (e.g. `Poor service` — red badge)
- Review text
- **Customer-attached photos** (Keeta is the only platform with this)
- **Disliked items**: specific menu item names the customer disliked (e.g. "Samsa With Meat (Самса из говядины)")
- Order summary line: items + qty
- Action buttons: Appeal, Reply, View order

### Reply modal
- Reply textarea (500 char limit)
- "Modification times: 0/6" — operator can edit the reply up to 6 times after posting

### View order
- Order # (short e.g. `#2940`) + long ID (`3937844212652940`)
- Delivery type (e.g. `Keeta delivery`)
- Customer flag: `New customer` or implied repeat
- **Customer address: masked** (`***`)
- Order timeline: Order placed, Order to be accepted, Order accepted, Finding courier, Order accepted by courier, Meal ready (with preparation time and `(Delayed)` flag if late)
- Items with image, name, qty, price
- Total (VAT incl.)
- **Promotion funded by merchant** (sub-broken):
  - Percentage off (e.g. -AED 30)
  - Delivery fee discounts (e.g. -AED 2)
- **Commission** (sub-broken):
  - Basic commission
- Online payment fee
- Top-up to minimum (top-up shown even if zero)
- **Earnings** (your net)
- **Customer paid: AED + payment method** (e.g. `AED 36.15 with Apple Pay`)

### Appeal modal
- Lists 5 appeal types: Inappropriate language, Privacy information, Threats & harassment, Non-dining experience, Malicious or false content
- Weekly limit (e.g. `3 appeals remaining this week`)
- Each appeal type comes with detailed criteria text

**Takeaway**: Keeta exposes the most data — customer name, photos, disliked items, sentiment tag, payment method, masked address, formal appeal workflow with rate limit.

---

## Cross-platform comparison

| Field | Talabat | Deliveroo | Careem | Noon | Keeta |
|---|---|---|---|---|---|
| Rating value (stars) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Review text | ✓ (optional) | ✓ | ✓ (optional) | ✓ | ✓ |
| Date | ✓ | ✓ | ✓ | ✓ | ✓ |
| Time | ✓ (operator) | reply only | ✓ | ✓ | view-order only |
| Customer name | only customer-app | ✗ | ✗ | ✗ | ✓ |
| Customer loyalty tier | ✗ | ✓ (5+ orders) | ✓ (2-4 Orders / New / etc.) | ✗ | ✓ (New / repeat) |
| Customer attached photos | ✗ | ✗ | ✗ | ✗ | ✓ |
| Sentiment / category tag | ✗ | ✗ | ✗ | ✗ | ✓ ("Poor service") |
| Liked items | ✗ | ✗ | ✗ | ✓ (thumbs-up items) | ✗ |
| Disliked items | ✗ | ✗ | ✗ | ✗ | ✓ |
| Order ID linkage | ✓ | ✓ | ✓ | ✓ (short + long) | ✓ (short + long) |
| Order item breakdown | ✓ | ✓ | ✓ | ✓ | ✓ |
| Order timeline w/ timestamps | ✓ | ✗ | ✗ | ✓ | ✓ |
| Lateness flag | ✓ | ✗ | ✗ | ✗ | ✓ ("Delayed") |
| Brand-funded discount breakdown | ✓ (Vouchers) | ✗ | ✗ | ✓ ("Discount by you") | ✓ ("Promotion funded by merchant") |
| Commission shown | ✓ | ✗ | ✗ | ✗ | ✓ |
| Marketing/ad fees | ✓ | ✗ | ✗ | ✗ | ✗ |
| Taxes | ✓ | ✗ | ✗ | ✗ | ✓ (VAT incl.) |
| Customer payment method | ✓ | ✗ | ✓ (Prepaid/Cash) | ✗ | ✓ (e.g. Apple Pay) |
| Reply: public on shop page | ✓ | ✗ (private email) | ? | ? | ? |
| Reply: with credit-grant | ✗ | ✓ | ✗ | ✗ | ✗ |
| Reply: edit limit | ✗ | ✗ | ✗ | ✗ | ✓ (6 modifications) |
| Appeal mechanism | ✗ | ✗ | ✗ | ✗ | ✓ (with weekly limit) |
| Customer address | ✗ | ✗ | ✗ | ✗ | masked (`***`) |

---

## What this means for the Rating schema

### Always available (required fields)
- `salesChannel` ref (we infer this from the brand + branch + platform)
- `rating` (1-5 stars)
- `receivedAt` (date or date+time)
- `platform` (derivable from salesChannel)

### Often available (optional fields)
- `comment` (review text)
- `order` ref (every platform exposes linked order)
- `platformOrderId` (snapshot string — useful since you may not have the Order in your DB yet)

### Sometimes available
- `customerName` (Keeta always; Talabat via customer-app view only)
- `customerLoyaltyTier` (Deliveroo, Careem, Keeta — needs normalization across platforms)
- `attachedPhotos[]` (Keeta only)
- `sentimentTag` (Keeta only — "Poor service" etc.)
- `likedItems[]` (Noon — items the customer praised)
- `dislikedItems[]` (Keeta — items the customer disliked)

### Reply tracking
- `reply.text`
- `reply.sentAt`
- `reply.editCount` (only relevant for Keeta — 6 max)
- `reply.visibility`: `"public" | "private"` (Talabat = public, Deliveroo = private email)
- `reply.creditGranted` (Deliveroo only — amount added to customer's next order)

### Appeal tracking (Keeta only for now)
- `appeal.status`: not-filed / filed / accepted / rejected
- `appeal.kind`: enum of the 5 categories
- `appeal.filedAt`

### Open shape decisions for Rating

1. **Customer linkage**: when platform doesn't expose a name (most cases), do we still create a Customer record? Probably not — leave `customer: null` until we link via Order ingestion.
2. **Loyalty tier normalization**: each platform uses a different tier vocabulary. Either store the raw string or normalize to a shared enum (`new`, `2-4 orders`, `5+ orders`, `vip`, `unknown`).
3. **Photos**: Keeta gives URLs (cloud-hosted by them). We could store the URLs as-is or re-upload to our own storage. Worth deciding.
4. **Per-platform raw payload**: many fields are platform-unique (Keeta sentiment, Noon liked items). Consider a `platformRawPayload: {}` mixed object for fields we don't normalize, alongside the normalized fields.

---

## What this means for the Order schema

The order-detail views surfaced by every review give a very good preview of what's actually in the platform exports. Worth noting before designing Order:

- **Two order identifiers** per platform on Noon and Keeta (short ref + long ID). Need `platformOrderId` + `platformOrderRef` (optional second).
- **Order timeline** with named milestones + timestamps. Either flat fields (placedAt, acceptedAt, riderAssignedAt, readyAt, deliveredAt) or a structured array.
- **Brand-funded vs platform-funded discounts** are surfaced separately on every platform that shows them — confirms the funding-split modeling.
- **Commission, payment fee, marketing fees, taxes** are platform-itemized — Order.fees should be a flexible breakdown, not single number.
- **Payment method** is captured on most platforms.
- **Lateness signal** comes from Talabat and Keeta (`(Delayed)`, "X min. late").
- **VAT inclusion** varies — Keeta shows VAT-inclusive total; Talabat shows tax as separate line.

---

## Open questions to settle before locking Rating

- **How do we get reviews into the system?** Manual entry, screen-scraping, partner APIs (limited), or a hybrid? Affects whether the schema needs an `ingestionSource` field and how strictly we model "raw payload."
- **Per-platform appeal workflow**: do we track appeals in the Rating schema, or build a thin Appeal collection later? For Keeta-only and low volume, inline is fine.
- **Reply editing audit**: if we track `editCount`, do we also track edit history? Probably not — too granular for the value.
- **Rating without review** is real (Careem yellow box: stars only). Schema must allow null/empty `comment`.
- **Liked/disliked items** are platform-specific signals. Worth normalizing into a shared `itemFeedback: [{ item: ref, sentiment: "liked" | "disliked" | "mentioned" }]` array — or keep platform-specific arrays?

---

## Summary of unique-per-platform fields

| Field | Source platform(s) |
|---|---|
| Customer name on operator side | Keeta |
| Customer photos | Keeta |
| Sentiment tag / category badge | Keeta |
| Disliked items | Keeta |
| Liked items (thumbs-up items in review) | Noon |
| Reply edit count limit | Keeta (6 max) |
| Reply credit-grant | Deliveroo |
| Formal appeal mechanism | Keeta |
| Loyalty tier exposed in review | Deliveroo, Careem, Keeta |
| Commission shown on order from review | Talabat, Keeta |
| Customer payment method on order from review | Talabat (Cash), Careem (Prepaid), Keeta (e.g. Apple Pay) |
| Customer address (masked) | Keeta |

---

## ADDENDUM (2026-05-23) — what the integrator exports add

After analyzing `ORDERS.md`, three updates are relevant to Rating:

### 1. Customer name is available from GrabTech for ALL platforms — operator dashboards mask, integrator exports don't
The platform dashboards (Talabat, Deliveroo, Careem, Noon) mostly hide customer names from the operator side. But the **GrabTech export** for the same orders shows real customer names for every platform — `Lolita`, `Mohamed Brett`, `Влад`, `Диана`, etc. Many also show real E.164 phone numbers.

So when designing Rating, we should be aware that **the customer who left a review may already exist in your Customer collection** because the same person's Order was ingested from GrabTech with a real name + phone. The Rating's `customer` ref might be resolvable via the linked Order even when the platform dashboard didn't expose the name.

### 2. Aggregator order ID is the bridge
Every review surfaces a linked aggregator order ID (`platformOrderId`). The integrator exports also carry it (UrbanPiper `External Platform ID`, GrabTech via its own ID system). So when a Rating arrives:

```
Rating.platformOrderId ──→ Order.externalIds (where source = "talabat" / "careem" / etc.)
                       └─→ Order.customer ──→ Customer
```

This means: even though most platforms don't expose customer name in the review itself, you can ALWAYS resolve the customer (when known) via the order chain — no need to capture customer-name in the Rating's own fields. Just store `platformOrderId` reliably.

### 3. UrbanPiper exposes the aggregator-funded vs merchant-funded discount split
ORDERS.md §5 — UrbanPiper is the only integrator that gives `Aggregator Discount` + `Merchant Discount` as separate columns. This data feeds Order.totals.discount.{aggregatorFunded, merchantFunded}, which then drives correct attribution for any Rating-linked refund analysis ("did the customer who left a 1★ get a brand-funded refund?").

### Updated Rating-design implication
Drop `customerName` and `customerLoyaltyTier` as required Rating fields. Treat them as **fallback fields** only filled when the platform exposes them and we can't resolve the customer via the linked Order. Primary path: `Rating.order` ref → `Order.customer` → `Customer.{name, phone, ...}`.
