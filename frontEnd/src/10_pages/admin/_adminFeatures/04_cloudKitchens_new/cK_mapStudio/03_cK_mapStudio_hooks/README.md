# 03_cK_mapStudio_hooks — Hooks

Custom React hooks. The main hook `useCK_mapStudio` orchestrates the smaller hooks (`*_states`, `*_apiHelpers`, `*_handlers`) and returns `{ states, handlers, childProps, t, TOAST }`.

Barrel: `_cK_mapStudio_hooks.index.js` (the test dir uses `cK_mapStudio_test.index.js` — no leading underscore).
