# cK_marketing — Marketing

Marketing operations. Tabs: Campaigns, Ad Spend. Schemas: Campaign, AdSpend. Sidebar item: Marketing.

## Layout
- `CK_marketing.jsx` — parent component
- `cK_marketing.cinfig.js` — feature config
- `_styles/cK_marketing.css` — feature CSS (CSS-vars only)
- `01_cK_marketing_comps/` — UI components
- `02_cK_marketing_hlpr/` — pure helpers
- `03_cK_marketing_hooks/` — hooks; entry point `useCK_marketing`
- `04_cK_marketing_vld/` — validators
- `05_cK_marketing_cnst/` — constants
- `06_cK_marketing_memo/` — memoized selectors
- `07_cK_marketing_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_marketing();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
