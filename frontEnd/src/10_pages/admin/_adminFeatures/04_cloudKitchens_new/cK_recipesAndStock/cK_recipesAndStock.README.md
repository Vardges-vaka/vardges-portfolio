# cK_recipesAndStock — Recipes and Stock

Recipe + inventory backbone for food-cost analytics. Tabs: Recipes, Sub-Recipes, Ingredients, Packaging, Suppliers, Stock. Schemas: Recipe, SubRecipe, Ingredient, Packaging, Supplier, Store, ReceivedItem. Sidebar item: Recipes and Stock.

## Layout
- `CK_recipesAndStock.jsx` — parent component
- `cK_recipesAndStock.cinfig.js` — feature config
- `_styles/cK_recipesAndStock.css` — feature CSS (CSS-vars only)
- `01_cK_recipesAndStock_comps/` — UI components
- `02_cK_recipesAndStock_hlpr/` — pure helpers
- `03_cK_recipesAndStock_hooks/` — hooks; entry point `useCK_recipesAndStock`
- `04_cK_recipesAndStock_vld/` — validators
- `05_cK_recipesAndStock_cnst/` — constants
- `06_cK_recipesAndStock_memo/` — memoized selectors
- `07_cK_recipesAndStock_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_recipesAndStock();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
