# 03_cK_salesAndOrders_hooks — Hooks

Custom React hooks. The main hook `useCK_salesAndOrders` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_salesAndOrders_hooks.index.js` (the test dir uses `cK_salesAndOrders_test.index.js` — no leading underscore).
