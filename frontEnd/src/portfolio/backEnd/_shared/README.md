# `_shared` — building blocks every feature reuses

These six files are the spine of the backend. Read them before any feature.

| file | what it is | why |
|---|---|---|
| `localizedString.schema.js` | embedded `{ en, ru, hy }` sub-schema (EN required + fallback) | one document per record, three languages; the React `t(path, fallback)` already falls back to EN, so untranslated `ru`/`hy` degrade safely |
| `media.schema.js` | `{ type, assetId, url, alt }` | `assetId` keeps matching the frontend's build-time media resolver; `url` is for when you move media to a CDN |
| `graphRef.schema.js` | `{ kind, key }` + `NODE_KINDS` | a stable, cross-collection pointer so graph edges never depend on ObjectIds — they use the same ids the frontend uses today |
| `localize.util.js` | `localize(payload, lang)`, `pick(loc, lang)` | optional server-side flattening of localizedString leaves for `?lang=ru` |
| `response.util.js` | `{ success, message, payload }` envelope + `wrap()` | identical to the main vardges.me API shape; swap for your `validRespond` on integration |
| `crudController.js` | `makeCrud(Model)` factory + `restRoutes()` | one consistent CRUD implementation for all 13 collections — features only add what's *special* |

## Conventions enforced here
- **Public list** returns `{ active: true }` only, sorted by `order` then `createdAt`. `?all=true` (admin) includes drafts.
- **`getOne`** accepts an ObjectId **or** the stable `key` slug.
- **`?lang=en|ru|hy`** flattens translations; omit it for the full multilingual objects (the default, and what the current frontend wants).
- Everything is **ES modules** (`import`/`export default`) and **Mongoose**, matching the main backend.
