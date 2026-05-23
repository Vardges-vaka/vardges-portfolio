# Resume Prompt — Cloud Kitchen Domain Refactor

This file's job: give a fresh Claude Code session enough state to continue the cloud kitchen domain refactor **without re-establishing context from scratch**. Saves usage budget.

The actual prompt block lives in **`PROMPT.md`** (this file is just the wrapper).

---

## How to use

1. Open a new Claude Code session in this repo.
2. Copy contents of `PROMPT.md`.
3. Paste as your first message.
4. Replace `[TASK]` at the bottom with what you want to tackle.
5. Send.

---

## Task examples

### Now-buildable schemas (no semantic dep on Order)
```
Let's design Contract — polymorphic owner across Brand/Branch/Employee/Equipment/Integration/Menu/Other.
```
```
Refactor Employee — currently at root, move into cloudKitchen_general/ and bring it up to the agreed pattern.
```
```
Design Equipment — small, refs Branch, owns warranty/service Contracts.
```
```
Refactor Competitor — move from cloudKitchen_competitor/ into cloudKitchen_brand/.
```
```
Design the recipe layer (Recipe, SubRecipe, Ingredient, Packaging, Supplier) — five schemas together.
```
```
Design the inventory layer (Store, ReceivedItem).
```

### Settling open decisions
```
Settle the credentials tier for Integration (secrets manager / field encryption / select: false). Then design Integration.
```
```
Add the file role/subType discriminator to getGeneralFilesSchema.
```
```
Pick a data source for the coverage-area algorithm per RESEARCH_PLAN.md §2.
```

### Deferred (waiting on aggregator export shapes)
```
We received the first GrabTech XLSX export. Let's design Order based on what's actually in it.
```

### Implementation
```
Implement the SalesPlatform routes/controllers/services/validators following the menu layer's pattern.
```
```
Move helpers from cloudKitchen/modelHelpers/.temp.index.js into 04_helpers/ — the schemas are stable enough now.
```

### Cleanup
```
Execute the LAYOUT.md cleanup actions — delete superseded root files, move CuisineTags.txt out, etc. Show me the plan before running anything destructive.
```

---

## Maintenance

After each session, update **TRACKER.md** with:
- ✅ rows for finished schemas
- Updated open-decisions checklist
- Notes for the next session

If a new locked-in pattern emerges, add it to **MASTER_LOGIC.md** §5 and the anti-patterns to §8.

If the folder layout changes, update **LAYOUT.md**.

If a research-scope question opens up, document in **RESEARCH_PLAN.md**.

This keeps the doc set the single source of truth.

---

## Session log

| Date | Session | Outcome |
|---|---|---|
| (prior) | Menu layer | 5 schemas + ~99 routes/controllers/services/validators scaffolded |
| 2026-05-21 | Brand | Brand.js finished, 26-schema layout decided, doc set created |
| 2026-05-21 | Marketing + Refund | Campaign, AdSpend (new folder), Refund (root). Total 29. Patterns 2.8–2.9, 5.8–5.10. |
| 2026-05-21 | Operational core | SalesPlatform, SalesChannel, Customer, CuisineTag, Branch finished (5 schemas). Order/Refund/Rating/Campaign/AdSpend/Website deferred. Patterns 2.10–2.11, 5.11–5.15. `AUDIT` exported. RESEARCH_PLAN.md created for coverage algorithm. |
| 2026-05-21 | Org & competitor | Employee, Equipment, Competitor finished (3 schemas). RESEARCH_DEPRECIATION.md created. New patterns: lifecycle on subdoc arrays (2.12), paired storage (2.13), `by*` prefix for relationship dimensions (2.14), per-context observations (2.15). Helpers added: `getStorageSchema`, `getBranchLocationSchema`, `getWarrantySchema`, `getDocSchema`. **Total: 14/30 done, 7 remaining to design.** |
| 2026-05-23 | Rating | Rating finished (1 schema). Created `REVIEWS.md` (per-platform review data inventory), `ORDERS.md` (GrabTech/UrbanPiper/Sapaad integrator export analysis), `KAM_NOTES.md` (questions for KAMs). Key finding: integrator exports carry much richer customer data than platform dashboards (real names, phones); customer linkage for Rating goes via `platformOrderId → Order.externalIds → Order.customer`. **Total: 15/30 done.** |
| 2026-05-23 | Integration | Integration finished (1 schema). **Credentials tier resolved → Tier 3 (`select: false`)** for solo-local-app context. Scope trimmed to 4 real vendors (GrabTech, Supy, Sapaad, UrbanPiper). Aggregator portals deliberately excluded. New helpers extracted: `getLoginCredentialSchema`, `getKAMSchema`, `getPlatformSupportSchema`, `getLifecycleSchema`. **Total: 16/30 done.** |
| 2026-05-23 | Marketing | Campaign + AdSpend finished (2 schemas). Campaign: `funding` split into 4 fields (brandPct/platformPct + per-order fees), `cap` for capped percentage promos, open-ended validity. Reality: 99% brand-funded, Talabat adds 2 AED/order. AdSpend: only CPC currently used; `currency` and payment-tracking fields dropped (auto-deducted). Monthly commitments (Noon 5% of net sales) modeled via Contract + AdSpend with `basis: "percent-of-net-sales"`. Deleted `AdvertisingSpend.js` skeleton. KAM_NOTES expanded. **Total: 18/30 done.** |
| 2026-05-23 | Order | Order + OrderImportRaw + SalesChannelMetrics finished (3 schemas). Q1-Q3 locked: merge across integrators, items subdoc, raw payloads in separate collection. Ingestion hierarchy: GrabTech→Vkusno/Blini, UrbanPiper→Kompot, Sapaad ruled out (volume + no aggregator IDs), Talabat direct reports strictly richer than GrabTech for Talabat orders. Pro user data three-granularity model: per-order Talabat / daily Careem / monthly Noon — `Order.isProOrder` + `Order.totals.proCharge` for per-order, `SalesChannelMetrics` for aggregates. VAT confirmed 5% on post-discount. Commission snapshot deferred until Contract. **Total: 21/32 done.** |
| 2026-05-23 | Contract (draft) | Contract drafted from first principles (polymorphic owner, flexible `commercialTerms` Mixed bucket, lifecycle/status/renewal/termination fields, `parentContract` ref for amendments). **NOT FINAL** — designed without real samples. Revisit once aggregator agreements, kitchen leases, employment contracts, and integration vendor agreements are gathered. |
