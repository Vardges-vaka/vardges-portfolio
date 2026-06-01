# cK_mapStudio — Map Studio

Geospatial workspace. Visualize branches, brands, and competitors on a map; draw and edit coverage areas; measure distances. Reads from Branch + Brand + Competitor; owns no schema. Sidebar item: Map Studio.

## Layout
- `CK_mapStudio.jsx` — parent component
- `cK_mapStudio.cinfig.js` — feature config
- `_styles/cK_mapStudio.css` — feature CSS (CSS-vars only)
- `01_cK_mapStudio_comps/` — UI components
- `02_cK_mapStudio_hlpr/` — pure helpers
- `03_cK_mapStudio_hooks/` — hooks; entry point `useCK_mapStudio`
- `04_cK_mapStudio_vld/` — validators
- `05_cK_mapStudio_cnst/` — constants
- `06_cK_mapStudio_memo/` — memoized selectors
- `07_cK_mapStudio_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_mapStudio();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
