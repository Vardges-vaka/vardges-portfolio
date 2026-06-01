# cK_competitors — Competitors

Competitor intelligence. Tabs: Table, Map. Models rivals branch-to-branch, per-platform, multi-dimensional (via the competesWith subdoc). Schema: Competitor. Sidebar item: Competitors.

## Layout
- `CK_competitors.jsx` — parent component
- `cK_competitors.cinfig.js` — feature config
- `_styles/cK_competitors.css` — feature CSS (CSS-vars only)
- `01_cK_competitors_comps/` — UI components
- `02_cK_competitors_hlpr/` — pure helpers
- `03_cK_competitors_hooks/` — hooks; entry point `useCK_competitors`
- `04_cK_competitors_vld/` — validators
- `05_cK_competitors_cnst/` — constants
- `06_cK_competitors_memo/` — memoized selectors
- `07_cK_competitors_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_competitors();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
