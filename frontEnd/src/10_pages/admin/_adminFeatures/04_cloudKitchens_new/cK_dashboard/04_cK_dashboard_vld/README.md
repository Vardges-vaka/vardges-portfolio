# 04_cK_dashboard_vld — Validators

Field-level + form-level validators. Each returns `{ isValid, msg, sanitizedData }` to mirror the backend validator shape. Pure functions, no side effects.

Barrel: `_cK_dashboard_vld.index.js` (the test dir uses `cK_dashboard_test.index.js` — no leading underscore).
