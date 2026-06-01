# 03_cK_simulation_hooks — Hooks

Custom React hooks. The main hook `useCK_simulation` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_simulation_hooks.index.js` (the test dir uses `cK_simulation_test.index.js` — no leading underscore).
