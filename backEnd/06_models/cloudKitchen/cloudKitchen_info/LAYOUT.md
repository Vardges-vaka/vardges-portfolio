# Cloud Kitchen Domain — Layout

Full folder/file map. **32 schemas** across 6 sub-folders + 3 files at root.

Sister docs: `MASTER_LOGIC.md` · `TRACKER.md` · `RESUME.md` · `RESEARCH_PLAN.md` · `RESEARCH_DEPRECIATION.md`

---

## `backEnd/06_models/cloudKitchen/` — structure

Legend: ✅ done · 🟡 skeleton · 🔴 not started · ⏸ deferred

| #   | Path                                              | Schema                 | Status              | Notes                                                                                    |
| --- | ------------------------------------------------- | ---------------------- | ------------------- | ---------------------------------------------------------------------------------------- |
|     | `cloudKitchen/_cloudKitchen.index.js`             | —                      | KEEP                | Top-level barrel                                                                         |
| 1   | `cloudKitchen/Order.js`                           | Order                  | ✅                  | Finished — externalIds[] array, items subdoc with snapshots, totals with funding split, isProOrder for Talabat |
| 2   | `cloudKitchen/Refund.js`                          | Refund                 | ⏸                   | Depends on Order (now ready to design — Order is done)                                   |
| 2b  | `cloudKitchen/OrderImportRaw.js`                  | OrderImportRaw         | ✅                  | NEW — raw row backup per Q3 decision. Refs Order. Source+file+rowIndex+raw mixed         |
|     |                                                   |                        |                     |                                                                                          |
|     | **`cloudKitchen_brand/` — 2 schemas**             |                        |                     |                                                                                          |
| 3   | `cloudKitchen_brand/Brand.js`                     | Brand                  | ✅                  | Finished                                                                                 |
| 4   | `cloudKitchen_brand/Competitor.js`                | Competitor             | ✅                  | Finished — lifecycle pattern, per-branch competition, by* prefix                         |
|     |                                                   |                        |                     |                                                                                          |
|     | **`cloudKitchen_menu/` — 5 schemas**              |                        |                     |                                                                                          |
| 5   | `cloudKitchen_menu/Menu.js`                       | Menu                   | ✅                  | Prior session                                                                            |
| 6   | `cloudKitchen_menu/MenuCategory.js`               | MenuCategory           | ✅                  | Prior session                                                                            |
| 7   | `cloudKitchen_menu/MenuItem.js`                   | MenuItem               | ✅                  | Prior session                                                                            |
| 8   | `cloudKitchen_menu/MenuItemModifier.js`           | MenuItemModifier       | ✅                  | Prior session                                                                            |
| 9   | `cloudKitchen_menu/MenuItemModifierOption.js`     | MenuItemModifierOption | ✅                  | Prior session                                                                            |
|     |                                                   |                        |                     |                                                                                          |
|     | **`cloudKitchen_recipe/` — 5 schemas**            |                        |                     |                                                                                          |
| 10  | `cloudKitchen_recipe/Recipe.js`                   | Recipe                 | 🟡                  | Skeleton                                                                                 |
| 11  | `cloudKitchen_recipe/SubRecipe.js`                | SubRecipe              | 🟡                  | Skeleton — prep-only confirmed                                                           |
| 12  | `cloudKitchen_recipe/Ingredient.js`               | Ingredient             | 🟡                  | Skeleton                                                                                 |
| 13  | `cloudKitchen_recipe/Packaging.js`                | Packaging              | 🟡                  | Skeleton — own model confirmed                                                           |
| 14  | `cloudKitchen_recipe/Supplier.js`                 | Supplier               | 🟡                  | Skeleton                                                                                 |
|     |                                                   |                        |                     |                                                                                          |
|     | **`cloudKitchen_inventory/` — 2 schemas**         |                        |                     |                                                                                          |
| 15  | `cloudKitchen_inventory/Store.js`                 | Store                  | 🟡                  | Skeleton                                                                                 |
| 16  | `cloudKitchen_inventory/ReceivedItem.js`          | ReceivedItem           | 🟡                  | Skeleton                                                                                 |
|     |                                                   |                        |                     |                                                                                          |
|     | **`cloudKitchen_marketing/` — 2 schemas**         |                        |                     |                                                                                          |
| 17  | `cloudKitchen_marketing/Campaign.js`              | Campaign               | ✅                  | Finished — kind enum, funding split (brandPct/platformPct + perOrderBrandFee), conditions |
| 18  | `cloudKitchen_marketing/AdSpend.js`               | AdSpend                | ✅                  | Finished — kind + metrics pattern, period-based, contract ref for commitments            |
|     |                                                   |                        |                     |                                                                                          |
|     | **`cloudKitchen_general/` — 12 schemas**          |                        |                     |                                                                                          |
| 19  | `cloudKitchen_general/Branch.js`                  | Branch                 | ✅                  | Refactored + coverageAreas variant array + computed-costs pattern                        |
| 20  | `cloudKitchen_general/Employee.js`                | Employee               | ✅                  | Finished — `legalDocs[].kind` polymorphic, position history, attendance tracking         |
| 21  | `cloudKitchen_general/Equipment.js`               | Equipment              | ✅                  | Finished — depreciation block (parameters only; computed via presenter)                  |
| 22  | `cloudKitchen_general/Contract.js`                | Contract               | 🟢                  | Draft — polymorphic owner, flexible `commercialTerms`. **NOT FINAL** — revisit when real samples gathered |
| 23  | `cloudKitchen_general/Website.js`                 | Website                | ⏸                   | Low priority — skipped                                                                   |
| 24  | `cloudKitchen_general/Integration.js`             | Integration            | ✅                  | Finished — Tier 3 credentials (`select: false`), many-to-many brands+branches, 4 helpers extracted |
| 25  | `cloudKitchen_general/CuisineTag.js`              | CuisineTag             | ✅                  | Finished                                                                                 |
| 26  | `cloudKitchen_general/Customer.js`                | Customer               | ✅                  | Finished                                                                                 |
| 27  | `cloudKitchen_general/Rating.js`                  | Rating                 | ✅                  | Finished — itemFeedback unified, comment {original, translated}, attachments for Keeta photos |
| 28  | `cloudKitchen_general/SalesChannel.js`            | SalesChannel           | ✅                  | Finished                                                                                 |
| 29  | `cloudKitchen_general/SalesPlatform.js`           | SalesPlatform          | ✅                  | Finished                                                                                 |
| 30  | `cloudKitchen_general/Invoice.js`                 | Invoice                | 🔴                  | Receipts/bills — referenced by Branch.expenses, Equipment.purchase.invoice, AdSpend      |
| 31  | `cloudKitchen_general/SalesChannelMetrics.js`     | SalesChannelMetrics    | ✅                  | NEW — platform-provided periodic aggregates (Careem daily C+ data, Noon monthly, etc.)   |

## Cleanup actions

| File                                                     | Action | Reason                                                      |
| -------------------------------------------------------- | ------ | ----------------------------------------------------------- |
| `cloudKitchen/cloudKitchen_competitor/` (folder)         | DELETE | Competitor canonical now in `cloudKitchen_brand/`           |
| `cloudKitchen/CuisineTag.js` (root)                      | DELETE | Moved into `cloudKitchen_general/`                          |
| `cloudKitchen/CuisineTags.txt`                           | MOVE   | To `.local_only/` — reference data                          |
| `06_models/Brand.js`                                     | DELETE | Superseded                                                  |
| `06_models/Brand copy.js`                                | DELETE | Junk                                                        |
| `06_models/Menu.js`                                      | DELETE | Superseded                                                  |
| `06_models/MenuCategory.js`                              | DELETE | Superseded                                                  |
| `06_models/MenuItem.js`                                  | DELETE | Superseded                                                  |
| `06_models/Branch.js`                                    | DELETE | Superseded                                                  |
| `06_models/Employee.js`                                  | DELETE | Superseded                                                  |
| `06_models/EmployeeSchema_ suggested.js`                 | DELETE | Draft                                                       |
| `06_models/Employee_sample.js`                           | DELETE | Draft                                                       |

## Summary

| Folder                    | Schemas         | Done |
| ------------------------- | --------------- | ---- |
| `cloudKitchen_brand/`     | 2               | 2/2  |
| `cloudKitchen_menu/`      | 5               | 5/5  |
| `cloudKitchen_recipe/`    | 5               | 0/5  |
| `cloudKitchen_inventory/` | 2               | 0/2  |
| `cloudKitchen_marketing/` | 2               | 2/2 |
| `cloudKitchen_general/`   | 13              | 10/13 |
| `cloudKitchen/` (root)    | 3 (Order, Refund, OrderImportRaw) | 2/3 |
| **Total**                 | **32**          | **21/32 done · 4 deferred · 7 remaining to design** |

## Supporting docs at `cloudKitchen/` root

- `KAM_NOTES.md` — personal "things to ask Key Account Managers" list
- `REVIEWS.md` — per-platform inventory of review data (Talabat, Careem, Noon, Deliveroo, Keeta)
- `ORDERS.md` — integrator export analysis (GrabTech, UrbanPiper, Sapaad)
- `cloudKitchen_sampleData/` — actual XLSX/CSV samples from each integrator
