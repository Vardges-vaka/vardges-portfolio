# Services

The Cocktail Tree consultancy offerings — the "Consulting, with roots" cards on `/bar`.

## Schema (`services.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | `svc-menu`, `svc-training`… |
| `title` | localizedString | offering name |
| `text` | localizedString | one-line description |
| `icon` | String | lucide icon name |
| `order`, `active` | — | |

All copy is localized (EN required + fallback).

## Controller / Routes
Pure CRUD via `makeCrud`. Mounted at `/api/public/services`:
`GET /` · `GET /:id` · **protected** `POST` / `PATCH /:id` / `DELETE /:id`.
