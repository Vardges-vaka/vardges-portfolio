# 03_cK_kitchens_hooks — Hooks

Custom React hooks. The main hook `useCK_kitchens` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_kitchens_hooks.index.js` (the test dir uses `cK_kitchens_test.index.js` — no leading underscore).
