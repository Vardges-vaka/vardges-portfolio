# 03_cK_dashboard_hooks — Hooks

Custom React hooks. The main hook `useCK_dashboard` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_dashboard_hooks.index.js` (the test dir uses `cK_dashboard_test.index.js` — no leading underscore).
