# cK_dashboard — Dashboard

Cross-cutting overview page. Reads from many features, owns no schema. KPIs, today's sales, alerts, negative-review feed, expiring contracts. Sidebar item: Dashboard.

## Layout
- `CK_dashboard.jsx` — parent component
- `cK_dashboard.cinfig.js` — feature config
- `_styles/cK_dashboard.css` — feature CSS (CSS-vars only)
- `01_cK_dashboard_comps/` — UI components
- `02_cK_dashboard_hlpr/` — pure helpers
- `03_cK_dashboard_hooks/` — hooks; entry point `useCK_dashboard`
- `04_cK_dashboard_vld/` — validators
- `05_cK_dashboard_cnst/` — constants
- `06_cK_dashboard_memo/` — memoized selectors
- `07_cK_dashboard_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_dashboard();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
