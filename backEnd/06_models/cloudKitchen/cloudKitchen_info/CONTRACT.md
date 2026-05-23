# Contract — Real-World Sample Observations

Notes from the ~22 contract PDFs in `cloudKitchen_sampleData/Contracts/`. Used to validate/refine the draft `Contract.js` schema.

The current schema is still a **DRAFT** — designed from first principles + adjusted against the few contracts I could extract text from.

## ⚠ Review status — PARTIAL

So far text-extracted and used to inform the schema:
- ✅ Deliveroo Agreement 2024.pdf (full)
- ✅ Grubtech New Deal (full)
- ✅ Careem Commission Contract (partial — got term + notice info)
- ✅ Vkusno Russian — Bby Sol Updated Commission March 2025 (partial — got fee + notice + multi-date info; turned out to be a hybrid DHK+Talabat doc)

Not yet reviewed (image-based PDFs that need manual reading, or large docs not extracted):
- 🔴 Talabat — Vkusno Russian Kitchen (Business Bay).pdf (image-based)
- 🔴 Contract Detailed — Talabat BB Signed TPRO.pdf (image-based)
- 🔴 Agreement Careem 22-Oct 2024.pdf
- 🔴 Careem — Vkusno Russian Kitchen Agreement.pdf
- 🔴 CPC Careem — Marina.pdf
- 🔴 Noon Commission Rate.jpeg (image format)
- 🔴 DHK Services Agreement — Sufouh Signed.pdf (34 pages — kitchen rental)
- 🔴 DHK Vendor Service Agreement — Vkusno Business Bay.pdf
- 🔴 Contract — OQ-0004238347 Ibn Battuta.pdf
- 🔴 Merchant Agreement — BFF MANAGEMENT LLC
- 🔴 Merchant Agreement — HEALTHY WEALTHY RESTAURANT
- 🔴 Vkusno Russian — Sofouh (Updated Commission March 2025)
- 🔴 Vkusno Russian Kitchen, Dubai Marina Tablet.pdf
- 🔴 UAE Core Service Pack (Deliveroo framework)
- 🔴 UAE Marketplace+ (Deliveroo framework)
- 🔴 UAE Restaurant T&Cs

**The schema must be revisited once these are reviewed.** Lease / kitchen-rental contracts in particular may surface fields the current draft doesn't model (security deposit, escalation %, ejari number, equipment provision details, etc.).

---

## Contracts inventory

### Aggregator agreements
- `Deliveroo Agreement 2024.pdf`
- `Talabat - Vkusno Russian Kitchen (Business Bay).pdf`
- `Vkusno Russian - Bby Sol (Updated the Commission) March 2025.pdf` — commission update / amendment
- `Vkusno Russian - Sofouh (Updated the Commission) March 2025.pdf` — same
- `Vkusno Russian Kitchen, Dubai Marina Tablet.pdf` — Talabat Marina (tablet device)
- `Careem - Vkusno Russian Kitchen Agreement.pdf` (couldn't extract — image-based PDF)
- `Agreement Careem 22-Oct 2024.pdf`
- `Careem Healthy Wealthy Enrollment Agreement Aug 2025.pdf` — second legal entity (Healthy Wealthy LLC)
- `Commission Contract -Vkusno Russian Kitchen (2).pdf`
- `Contract Detailed - Talabat BB Signed TPRO.pdf` — Talabat Business Bay TPRO tier
- `CPC Careem - Marina.pdf` — Careem CPC ad agreement
- `Noon Commission Rate.jpeg` — image (commission rate card)

### Integration / SaaS vendor agreements
- `Grubtech - Beyond The Taste Restaurant LLC - New Deal.pdf` — GrabTech subscription
- `Grubtech - Beyond The Taste Restaurant LLC _ New Deal _ Expansion.pdf` — expansion

### Kitchen / property service agreements
- `DHK Services Agreement - Sufouh Signed.pdf` — cloud kitchen rental (34 pages)
- `DHK Vendor Service Agreement - Vkusno Business Bay.pdf` — kitchen vendor agreement
- `Contract - OQ-0004238347 Ibn Battuta.pdf` — Ibn Battuta site
- `Merchant_Agreement_Signing「BFF_MANAGEMENT_LL.pdf` — BFF Management LLC merchant agreement
- `Merchant_Agreement_Signing「HEALTHY_WEALTHY_RE.pdf` — Healthy Wealthy Restaurant merchant agreement

### Reference / framework documents
- `UAE - Core Service Pack (English) - August 2022.docx.pdf` — Deliveroo Core service definition
- `UAE - Marketplace+ (English) - August 2022.docx.pdf` — Deliveroo Marketplace+ tier
- `UAE - Restaurant Terms and Conditions (English).docx.pdf` — Deliveroo standard T&Cs

---

## Fields actually present in the contracts (from extraction)

### Deliveroo agreement — concrete fields

- **Party details** (both sides):
  - Legal entity name (`Deliveroo DMCC` / `BFF Management LLC`)
  - Registration number
  - Registered office address (with coordinates!)
- **Bank details** for payouts: IBAN + BIC (encoded, sensitive)
- **Term**:
  - Commencement Date (`18/10/2024`)
  - Initial Terms in Months (often `N/A` = open-ended)
  - Territory (UAE)
- **Nominated Representatives** (named contact + email on each side)
- **Partner Sites** (multi-site coverage):
  - Site name (`Vkusno Russian Kitchen`)
  - Site address + coordinates
  - One contract can cover multiple Sites
- **Joining Fee** per Site (`AED 1,500.00 ex VAT`)
- **Service Fees** — tiered table:
  - Per Site, per Service tier (`Core`, `Marketplace+`)
  - Order value range (e.g. `0.00 - ∞`)
  - Effective date range (e.g. `1/1/2025 -`, `10/18/2024 - 12/31/2024`)
  - Applicable Service Fee % (e.g. `28.00%`, `20.00%`)
- **Equipment** provision (yes/no, who supplies)
- **Exclusivity** clause toggle
- **Signature** block: signed name + position + date + DocuSign envelope ID

### Grubtech vendor agreement — concrete fields
- Quote-style document with **quote ID** and **expiration date**
- **Counterparty contact**: name, email, phone
- **Itemized products**:
  - Item name (`g'Online Lite`)
  - Quantity
  - Unit price
  - Billing frequency (`Quarterly`)
  - Discount per cycle
  - Subtotal per cycle
- **VAT** (5%) shown as separate line
- **Currency**: priced in USD, billed in SAR (Saudi)
- **Milestones**:
  - Payment due (15 days)
  - Onboarding (30 days)
  - Billing commences (45 days from signing)
- **Cancellation**: 30 days notice after minimum 3 months
- **Payable to**: bank account details (beneficiary, bank, IBAN, currency)
- **Doc ID** (audit trail)

---

## Patterns across all contracts

### Common at every contract
- Party details (legal name, registration number, address)
- Bank details for money flow
- Commencement / effective date
- Initial term (months, often N/A for open-ended)
- Nominated representatives (named contact per side)
- Signature block with positions and dates
- Audit trail (DocuSign envelope ID or doc ID)

### Aggregator-specific
- **Multi-site coverage** — one contract for many branches under one legal entity
- **Service tiers** (Core / Marketplace+ / TPRO / Standard)
- **Tiered fees** by order value range
- **Effective date ranges per fee row** — fees change over time, captured in same contract
- **Joining fee** (one-time, per site)
- **Equipment provision** (tablet, kiosk, etc.)
- **Exclusivity** clauses (can be opted out)
- **Amendments** common (`Updated the Commission March 2025` files are amendments to the original)

### Integration / SaaS-specific
- **Quote / proposal format** with expiration date
- **Itemized products** with quantity, unit price, billing frequency
- **Discounts** as separate line
- **Currency mismatch** common (priced USD, billed SAR/AED — happens when vendor is in another country)
- **Onboarding milestones** + delayed billing start
- **License count reductions** with notice (after minimum lock-in period)

### Kitchen-rental / DHK contracts
- Much heavier (34 pages for one)
- Property terms, ejari, security deposit, escalation
- Mention of multiple Sites operated by same legal entity
- Equipment/utilities provision

---

## What the draft schema gets right

- **Polymorphic owner** — supports the "one contract per Brand / Branch / Integration / etc." reality
- **`commercialTerms: Mixed`** — accommodates the wide variation between contract kinds without forcing fields
- **`parentContract` ref** — handles the amendment pattern observed in `Updated the Commission March 2025` files
- **`counterparty.name` + `counterparty.kind`** — captures Deliveroo DMCC, Grubtech LLC, DHK Services, etc.
- **`signedAt` + `effectiveFrom` + `effectiveTo`** — handles real signing/effective dates
- **`lifecycle`** with `endAt` — soft-delete for terminated contracts without losing history
- **`files: getStorageSchema()`** — for the PDF + addendums
- **`status` enum** — covers active/expired/terminated/renewed/superseded

---

## What the draft schema is missing

### 1. Multi-site coverage at first-class level
One Deliveroo contract covers multiple `Sites` (each = your Branch). Current `ownerType/ownerId` is singular. Options:
- Add `additionalOwners: [{ ownerType, ownerId }]` array
- Or: link Sites via `commercialTerms.sites: [...]` (loose)
- Or: separate the agreement (one big Contract) from per-site terms (smaller Contract records with parentContract ref)

**Recommendation: add `additionalOwners[]`** — captures "this single agreement covers these N entities" cleanly.

### 2. Service tiers + tiered fees
Deliveroo's `Core` vs `Marketplace+` are formal tiers, each with its own fee schedule. Same for Talabat (TPRO). The current `commercialTerms` Mixed bucket can hold this, but it's hidden. Could surface as:
```js
commercialTerms: {
  tiers: [
    { name: "Core", feePct: 28, effectiveFrom, effectiveTo, orderValueRangeFrom, orderValueRangeTo },
    { name: "Marketplace+", feePct: 25, effectiveFrom, ... },
  ],
  joiningFee: { amount, currency, perSite: true },
  exclusivity: false,
  equipment: "provided" | "self",
}
```
Still in Mixed for now — but worth typing out a recommended shape per kind in TRACKER.

### 3. Bank details for payouts
Every aggregator contract has bank fields (IBAN, BIC). Currently no place for them. Either:
- Add to `counterparty.bank: { iban, bic, accountName, ... }`
- Or treat as separate `PayoutAccount` collection (overkill for solo app)

**Recommendation: add to `counterparty.bank` subdoc** — keeps everything about the counterparty together.

### 4. Audit trail (DocuSign envelope ID)
Every signed contract has an envelope/doc ID. Useful for legal audit. Add `signature.envelopeId: String` and `signature.signedBy: [{ name, position, side: "us"|"them", at: Date }]`.

### 5. Effective date overrides per fee row
Service fees often have row-level effective dates ("28% from 1/1/2025, was 20% before"). This is the amendment pattern. Two options:
- Capture each fee history row inside `commercialTerms.tiers[].history[]`
- Use the `parentContract` linkage — old commission terms live in the predecessor Contract, new ones in current

The second is cleaner. When a commission changes, the old contract gets `endAt` set, a new contract is created with `parentContract` pointing back. Snapshot-on-Order pattern then preserves historical accuracy.

### 6. Quote / proposal vs executed agreement
The Grubtech file is a *quote* (not a signed agreement). Quotes have expiration dates and a different lifecycle ("accepted" / "expired" / "rejected" before becoming an active contract). Possibly:
- Add `proposalExpiresAt: Date` field
- Add `"proposal"` to the status enum

Worth considering once you decide whether to track unsigned quotes.

### 7. Service-level + onboarding milestones
The Grubtech contract has: payment due in 15 days, onboarding in 30, billing starts at day 45. Worth a `milestones: [{ label, dueAt, completedAt }]` array if you want to track these — but may be overkill if your accountant already does it.

### 8. Multi-currency contracts
Grubtech is priced USD, billed SAR. Even though the rest of the app is AED-only, contracts can have foreign currencies. The current `payment.currency` field handles it; just don't constrain to AED at the contract level.

---

## Recommended refinements for Contract.js (next pass)

Once you decide to refine:

1. Add `additionalOwners: [{ ownerType, ownerId }]` for multi-site coverage
2. Add `counterparty.bank: { iban, bic, accountName, currency }` subdoc
3. Add `signature: { envelopeId, signedBy: [{ name, position, side, at }] }` block
4. Add `"proposal"` to status enum + optional `proposalExpiresAt`
5. Document recommended `commercialTerms` shapes per kind in TRACKER (aggregator template, integration template, lease template)
6. Decide if `milestones[]` is worth adding

---

## Sample shapes per kind (for future schema docs)

### Aggregator (Deliveroo / Talabat / Careem)
```js
{
  kind: "aggregator",
  ownerType: "Brand",
  ownerId: vkusnoId,
  additionalOwners: [ { ownerType: "Branch", ownerId: businessBayId }, ... ],
  counterparty: { name: "Deliveroo DMCC", kind: "aggregator", contactPerson: {...}, bank: {...} },
  signedAt, effectiveFrom, effectiveTo,
  commercialTerms: {
    territory: "UAE",
    joiningFee: { amount: 1500, currency: "AED", perSite: true },
    exclusivity: false,
    equipmentProvided: true,
    tiers: [
      { name: "Core", feePct: 28, effectiveFrom: "2025-01-01", effectiveTo: null, orderValueRangeFrom: 0, orderValueRangeTo: null },
      { name: "Core", feePct: 20, effectiveFrom: "2024-10-18", effectiveTo: "2024-12-31", orderValueRangeFrom: 0, orderValueRangeTo: null },
    ],
  },
}
```

### Integration / SaaS (Grubtech)
```js
{
  kind: "integration",
  ownerType: "Brand",
  ownerId: vkusnoId,
  counterparty: { name: "Grubtech", kind: "vendor", bank: { iban: "SA...", currency: "SAR" } },
  status: "active",
  commercialTerms: {
    items: [
      { name: "g'Online Lite", quantity: 2, unitPrice: 120, billingFrequency: "quarterly", discount: 12 },
    ],
    proposalExpiresAt: "2025-03-03",
    onboardingMilestones: [
      { label: "Payment", dueAt: "2025-03-11" },
      { label: "Onboarding", dueAt: "2025-03-26" },
      { label: "Billing starts", dueAt: "2025-04-10" },
    ],
    cancellation: { noticeDays: 30, minimumPeriodMonths: 3 },
  },
  payment: { cycle: "quarterly", amount: 216, currency: "USD" },
}
```

### Kitchen rental / DHK
TBD — couldn't extract 34-page contract programmatically. Manual review needed when refining.

---

## Open questions for you

1. **Do you want to track unsigned quotes/proposals** (the Grubtech file is a quote, not a signed agreement)?
2. **Multi-site coverage** — when Deliveroo's contract covers Business Bay + Marina + Arjan, do you want one Contract record (with `additionalOwners[]`) or one per site (with `parentContract` link)?
3. **Bank details storage** — store IBAN/BIC in the schema, or treat as sensitive and keep in password manager only?
4. **Commission amendment pattern** — when Talabat's commission changes from 25% → 28%, do you (a) create a new Contract record with `parentContract` linking back, or (b) edit the existing contract's `commercialTerms.tiers[]` history?

Answer those and the schema can be tightened.
