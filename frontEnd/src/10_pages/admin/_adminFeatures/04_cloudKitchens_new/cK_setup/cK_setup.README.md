# cK_setup — Setup

Reference + configure-once data (the configure-rarely tail). Tabs: Integrations, Sales Platforms, Sales Channels, Contracts, Cuisine Tags, Customers, Invoices, Website, Brands. Schemas: Integration, SalesPlatform, SalesChannel, Contract, CuisineTag, Customer, Invoice, Website, Brand. Sidebar item: Setup.

## Layout
- `CK_setup.jsx` — parent component
- `cK_setup.cinfig.js` — feature config
- `_styles/cK_setup.css` — feature CSS (CSS-vars only)
- `01_cK_setup_comps/` — UI components
- `02_cK_setup_hlpr/` — pure helpers
- `03_cK_setup_hooks/` — hooks; entry point `useCK_setup`
- `04_cK_setup_vld/` — validators
- `05_cK_setup_cnst/` — constants
- `06_cK_setup_memo/` — memoized selectors
- `07_cK_setup_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_setup();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
