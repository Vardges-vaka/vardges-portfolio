# Cloud Kitchens — admin module

Ten sidebar groups for running the 3-brand / ~5-branch cloud-kitchen
operation in Dubai. Each `cK_*/` directory is one sidebar item. Each
item has internal tabs (component-state, not routed) — same pattern the
Menus page already uses.

## Sidebar items

| # | Dir | Tabs | Schemas |
|---|-----|------|---------|
| 1 | `cK_dashboard` | — (overview) | reads many, owns none |
| 2 | `cK_mapStudio` | layers + tools | reads Branch / Brand / Competitor |
| 3 | `cK_simulation` | Pricing · Costs · Commission · Coverage · Saved | Scenario (planned) |
| 4 | `cK_salesAndOrders` | Orders · Reviews · Refunds · Channel Metrics | Order, OrderImportRaw, Refund, Rating, SalesChannelMetrics |
| 5 | `cK_menus` | Menus · Items · Modifiers · Options | Menu, MenuCategory, MenuItem, MenuItemModifier, MenuItemModifierOption |
| 6 | `cK_recipesAndStock` | Recipes · Sub-Recipes · Ingredients · Packaging · Suppliers · Stock | Recipe, SubRecipe, Ingredient, Packaging, Supplier, Store, ReceivedItem |
| 7 | `cK_marketing` | Campaigns · Ad Spend | Campaign, AdSpend |
| 8 | `cK_competitors` | Table · Map | Competitor |
| 9 | `cK_kitchens` | Branches · Equipment · Staff | Branch, Equipment, Employee |
| 10 | `cK_setup` | Integrations · Platforms · Channels · Contracts · Cuisine · Customers · Invoices · Website · Brands | Integration, SalesPlatform, SalesChannel, Contract, CuisineTag, Customer, Invoice, Website, Brand |

All 32 backend schemas have a home above. Schema → group mapping lives
in `backEnd/06_models/cloudKitchen/cloudKitchen_info/LAYOUT.md`.

## Per-feature folder layout

```
cK_<feat>/
├── CK_<feat>.jsx               parent component
├── cK_<feat>.cinfig.js         feature config
├── cK_<feat>.README.md         per-feature description
├── _styles/                    CSS (variables only)
├── 01_cK_<feat>_comps/         UI components
├── 02_cK_<feat>_hlpr/          pure helpers
├── 03_cK_<feat>_hooks/         useCK_<feat> + sub-hooks
├── 04_cK_<feat>_vld/           validators
├── 05_cK_<feat>_cnst/          constants
├── 06_cK_<feat>_memo/          memoized selectors
└── 07_cK_<feat>_test/          tests
```

## Conventions

- Entry hook returns `{ states, handlers, childProps, t, TOAST }`.
- `TOAST` is the grouped notification API — `TOAST.success({...})`, `TOAST.error({...})`, `TOAST.promise(p, {...})`, etc. Comes from `useNotificationContext`.
- Colors only via CSS variables (see `09_styles/lightTheme.css` / `darkTheme.css`).
- User-visible strings via `useTranslation`.
