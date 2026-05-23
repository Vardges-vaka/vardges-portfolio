# Research Plan — Equipment Depreciation

**Goal**: learn what depreciation is, why it matters for audits and P&L, how it's calculated, and what shape the `Equipment.depreciation` block should take so the app can produce accurate financial views.

Sister docs: `MASTER_LOGIC.md` · `LAYOUT.md` · `TRACKER.md` · `RESEARCH_PLAN.md` (coverage area)

---

## 1. What I need to understand

You said: "I know it's necessary for audits and cost-profit calculations, but I don't know the mechanics."

Goal of this plan: close that gap with a structured learning path, then translate it into schema + presenter logic.

---

## 2. The core concept (start here)

**Depreciation = allocating the cost of a long-lived asset across the years it's actually used, instead of expensing it all in the year you bought it.**

Example: you buy a 50,000 AED oven that lasts 5 years.
- **Without depreciation**: your 2026 P&L shows 50,000 AED expense, then 0 expense in 2027–2030. P&L looks terrible in 2026 and artificially good after.
- **With depreciation** (straight-line, 5 years, no salvage): you expense 10,000 AED per year for 5 years. P&L reflects the truth that you used 1/5 of that oven each year.

**Why audits care**: GAAP/IFRS require you to match expenses to the periods that benefited from them. An auditor will reject financial statements that lump capex into one year.

**Why P&L cares**: without depreciation, comparing year-over-year profitability is meaningless — heavy-investment years look bad, lean years look great.

---

## 3. Key terms to look up

- [ ] **Useful life** — how many years the asset is expected to be productive
- [ ] **Salvage value (residual value)** — what you can sell it for at end of life (often 0 for kitchen equipment)
- [ ] **Book value** — original cost minus accumulated depreciation
- [ ] **Accumulated depreciation** — total amount written off since purchase
- [ ] **Depreciation expense** — what hits the P&L each period
- [ ] **Capex vs Opex** — capital expenditure (depreciable) vs operating expense (immediately deductible)
- [ ] **Fixed asset register** — the list of all depreciable assets the auditor inspects
- [ ] **Impairment** — extra write-down when an asset loses value faster than the schedule (broken, obsolete)

---

## 4. Methods to understand

| Method | When used | Math |
|---|---|---|
| **Straight-line** | Default for most equipment. Equal expense each year. | `(cost − salvage) / usefulLife` per year |
| **Declining balance** | Front-loaded: bigger expense in early years, smaller later. Used when equipment loses value fast (IT, electronics). | `bookValue × rate` per year |
| **Units of production** | Asset usage drives depreciation (e.g., per hour of oven use, per km on a delivery vehicle). | `(cost − salvage) × actualUsage / totalExpectedUsage` |
| **Double declining balance** | Aggressive front-loading. Rare. | `2 × straight-line rate × bookValue` |

**Research task**: pick one (probably straight-line) and skip the others for now.

---

## 5. UAE-specific context to research

- [ ] **UAE Federal Corporate Tax (effective June 2023)** — 9% rate. Depreciation reduces taxable income.
- [ ] **FTA (Federal Tax Authority) guidance on capital allowances** — what useful lives are accepted?
- [ ] **Typical useful lives for cloud-kitchen assets in UAE**:
  - Kitchen equipment (ovens, fryers): typically 5 years
  - Refrigeration: 5–7 years
  - IT (POS, printers): 3 years
  - Furniture: 7–10 years
  - HVAC: 10 years
  - Vehicles (if any): 4–5 years
- [ ] **Free-zone vs mainland** — if any of your entities are in a free zone, tax treatment differs
- [ ] **IFRS for SMEs** — small/medium UAE companies often follow this simplified standard

---

## 6. Practical questions to answer

Before deciding the schema shape, talk to your accountant about:

- [ ] What method do they currently use (straight-line, declining, mixed)?
- [ ] Per-asset depreciation or grouped (e.g., "all kitchen equipment depreciated together")?
- [ ] How often is depreciation booked — monthly or annually?
- [ ] What's the threshold below which something is *expensed* immediately instead of capitalized? (e.g., assets under 1,000 AED often hit P&L directly — no point depreciating a toaster)
- [ ] What software holds the canonical fixed asset register today? (Tally / Zoho / Xero / spreadsheet / nothing yet?)
- [ ] Does the app need to *be* the fixed asset register, or just *reference* the values for management views?

---

## 7. What this means for the app

Two roles the app could play:

### Role A: management view only
- Equipment stores depreciation parameters (method, useful life, salvage, in-service date)
- A presenter computes current book value and YTD depreciation expense on demand
- Used in dashboards: "what's the book value of all equipment at Arjan?" "monthly depreciation expense across all branches?"
- Source of truth for taxes/audit stays in accounting software (Tally/Zoho)

### Role B: canonical fixed asset register
- App holds all the data the accountant needs
- Exports for audit
- More schema needed: depreciation history snapshots, audit trail, asset disposals, impairments

**Recommendation: start with Role A.** Add Role B fields only if you actually want to replace your accounting software's fixed asset register.

---

## 8. Schema impact

For Role A, the proposed shape on Equipment is:

```js
depreciation: {
  method:          { type: String, enum: ["straight-line", "declining-balance", "none"], default: "straight-line" },
  usefulLifeYears: { type: Number },     // 5 for kitchen, 3 for IT, etc.
  salvageValue:    { type: Number, default: 0 },
  inServiceDate:   { type: Date },       // when depreciation starts (usually = purchase.date)
},
```

If you go Role B, you'd add fields like:
- `impairments: [{ date, amount, reason }]`
- `disposal: { date, proceeds, notes, file }`
- Maybe `depreciationLog: [{ asOf, bookValue, accumulated }]` for snapshots

**Decide Role A vs B before adding the block.**

---

## 9. Research execution order

1. **Read foundational** — 30 min:
   - Investopedia "Depreciation" article
   - One short video on straight-line depreciation
2. **UAE-specific** — 30 min:
   - FTA guidance on capital allowances
   - 1–2 articles on UAE Corporate Tax depreciation
3. **Talk to your accountant** — 30 min call:
   - How do they currently handle it?
   - What useful lives do they apply?
   - Where's the fixed asset register today?
4. **Decide** — fill in §10 decisions log
5. **Implement** — add the `depreciation` block + presenter

Total: ~2 hours of learning + one accountant conversation.

---

## 10. Decisions log

- App role: _Role A (management view) | Role B (canonical register)_ — _TBD_
- Default method for all equipment: _TBD_
- Useful life per category (years): _TBD_
  - cooking: _TBD_
  - refrigeration: _TBD_
  - it: _TBD_
  - furniture: _TBD_
  - hvac: _TBD_
- Salvage value default: _TBD_
- Capitalization threshold (AED below which to expense immediately): _TBD_
- Depreciation booking frequency: _monthly / annually_ — _TBD_
- Authoritative fixed-asset register location: _this app / accounting software / spreadsheet_ — _TBD_

---

## 11. Resources

- Investopedia, "Depreciation": https://www.investopedia.com/terms/d/depreciation.asp
- UAE Federal Tax Authority (FTA): https://www.tax.gov.ae/
- IFRS for SMEs: https://www.ifrs.org/issued-standards/ifrs-for-smes/
- Common UAE useful-life schedules (search: "UAE depreciation schedule kitchen equipment")
