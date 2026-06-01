# 03_cK_recipesAndStock_hooks — Hooks

Custom React hooks. The main hook `useCK_recipesAndStock` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_recipesAndStock_hooks.index.js` (the test dir uses `cK_recipesAndStock_test.index.js` — no leading underscore).
