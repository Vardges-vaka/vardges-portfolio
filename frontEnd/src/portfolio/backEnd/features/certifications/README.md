# Certifications

Earned certificates **and** the planned cybersecurity roadmap. Powers graph nodes (kind `cert`) and the filterable cert wall (flip cards reveal `description`).

## Schema (`certifications.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | graph id, `c-it-automation` |
| `title` | **String (plain)** | official certificate name — **never translated** (proper noun) |
| `org` | String | issuer, "Google · Coursera" |
| `cat` | `dev\|auto\|ai\|cyber\|foundations` | drives the wall's filter tabs |
| `sub` | String | optional sub-category |
| `featured` | Boolean | highlighted strip |
| `planned` | Boolean | roadmap cert → "Planned" badge + "View path"; **excluded from the evidence-based tech radar** |
| `file` | String | bundled PDF path / url |
| `description` | localizedString | the blurb on the flip-card back + graph sidebar |
| `order`, `active` | — | |

**Translation note:** `title` and `org` stay plain (official names); only `description` is localized.

## Controller
CRUD + `listByCategory` (`/category/:cat`) + `listPlanned` (`/planned`).

## Routes → `/api/public/certifications`
`GET /` · `GET /planned` · `GET /category/:cat` · `GET /:id` · **protected** writes.

## Why `planned` matters
The frontend must never present roadmap certs as earned. The flag keeps them visibly "Planned" everywhere and keeps the **tech radar evidence-based** (it counts earned certs + projects only).
