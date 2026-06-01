# 04_cK_salesAndOrders_vld — Validators

Field-level + form-level validators. Each returns `{ isValid, msg, sanitizedData }` to mirror the backend validator shape. Pure functions, no side effects.

Barrel: `_cK_salesAndOrders_vld.index.js` (the test dir uses `cK_salesAndOrders_test.index.js` — no leading underscore).
