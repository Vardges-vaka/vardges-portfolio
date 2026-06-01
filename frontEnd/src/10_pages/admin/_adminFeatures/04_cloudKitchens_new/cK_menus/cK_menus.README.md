# cK_menus — Menus

Menu management. Tabs: Menus, Items, Modifiers, Options. Categories edited inside a Menu's detail. Schemas: Menu, MenuCategory, MenuItem, MenuItemModifier, MenuItemModifierOption. Sidebar item: Menus.

## Layout
- `CK_menus.jsx` — parent component
- `cK_menus.cinfig.js` — feature config
- `_styles/cK_menus.css` — feature CSS (CSS-vars only)
- `01_cK_menus_comps/` — UI components
- `02_cK_menus_hlpr/` — pure helpers
- `03_cK_menus_hooks/` — hooks; entry point `useCK_menus`
- `04_cK_menus_vld/` — validators
- `05_cK_menus_cnst/` — constants
- `06_cK_menus_memo/` — memoized selectors
- `07_cK_menus_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_menus();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
