# cK_salesAndOrders — Sales and Orders

Transactional core + analytics. Tabs: Orders, Reviews, Refunds, Channel Metrics. Schemas: Order, OrderImportRaw, Refund, Rating, SalesChannelMetrics. Sidebar item: Sales and Orders.

## Layout
- `CK_salesAndOrders.jsx` — parent component
- `cK_salesAndOrders.cinfig.js` — feature config
- `_styles/cK_salesAndOrders.css` — feature CSS (CSS-vars only)
- `01_cK_salesAndOrders_comps/` — UI components
- `02_cK_salesAndOrders_hlpr/` — pure helpers
- `03_cK_salesAndOrders_hooks/` — hooks; entry point `useCK_salesAndOrders`
- `04_cK_salesAndOrders_vld/` — validators
- `05_cK_salesAndOrders_cnst/` — constants
- `06_cK_salesAndOrders_memo/` — memoized selectors
- `07_cK_salesAndOrders_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_salesAndOrders();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
