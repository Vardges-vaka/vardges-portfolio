# 03_cK_menus_hooks — Hooks

Custom React hooks. The main hook `useCK_menus` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_menus_hooks.index.js` (the test dir uses `cK_menus_test.index.js` — no leading underscore).
