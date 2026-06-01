# 03_cK_marketing_hooks — Hooks

Custom React hooks. The main hook `useCK_marketing` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_marketing_hooks.index.js` (the test dir uses `cK_marketing_test.index.js` — no leading underscore).
