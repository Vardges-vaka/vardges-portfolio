# 03_cK_competitors_hooks — Hooks

Custom React hooks. The main hook `useCK_competitors` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_competitors_hooks.index.js` (the test dir uses `cK_competitors_test.index.js` — no leading underscore).
