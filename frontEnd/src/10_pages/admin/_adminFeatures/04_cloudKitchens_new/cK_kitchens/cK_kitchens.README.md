# cK_kitchens — Kitchens

Physical kitchen operations. Tabs: Branches, Equipment, Staff. Schemas: Branch, Equipment, Employee. Sidebar item: Kitchens.

## Layout
- `CK_kitchens.jsx` — parent component
- `cK_kitchens.cinfig.js` — feature config
- `_styles/cK_kitchens.css` — feature CSS (CSS-vars only)
- `01_cK_kitchens_comps/` — UI components
- `02_cK_kitchens_hlpr/` — pure helpers
- `03_cK_kitchens_hooks/` — hooks; entry point `useCK_kitchens`
- `04_cK_kitchens_vld/` — validators
- `05_cK_kitchens_cnst/` — constants
- `06_cK_kitchens_memo/` — memoized selectors
- `07_cK_kitchens_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_kitchens();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
