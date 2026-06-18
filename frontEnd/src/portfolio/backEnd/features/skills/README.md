# Skills

Competencies that act as **hubs** in the knowledge graphs and **axes** on the proficiency radars — for both crafts (engineering + hospitality).

## Why this collection exists
The radar and the graph on `/tech` and `/bar` both revolve around a small set of high-level skills. Keeping them in one collection (rather than hard-coding them in the frontend's `graphData.js`) lets you add/rename a skill, re-rate it, or re-wire its connections from the backend with **no frontend change** — the assembled `/graph/:variant` payload keeps the exact shape the `KnowledgeGraph` component expects.

## Schema (`skills.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | Stable graph id — **must** match the frontend ids: `sk-frontend`, `bk-mixology`, … Connections reference this. |
| `domain` | `"tech" \| "bar"` | Which craft / which graph + radar it belongs to. |
| `name` | localizedString | Display name (EN required; RU/HY optional, fall back to EN). |
| `description` | localizedString | The sidebar blurb shown when a node is selected. |
| `radarAxis` | String | The radar axis key (`"frontend"`, `"mixology"`…). Empty → graph-only, not on the radar. |
| `rating` | Number 0–100 | **Self-rated** strength (used by the bar radar, the 14-year veteran view). |
| `evidenceBased` | Boolean | When `true` (tech skills) the graph controller **derives** strength from how many earned certs + projects connect to it — so the shape reflects evidence, not opinion. |
| `color`, `featured`, `order`, `active` | — | Presentation + soft-delete. |

### The two radars, one model
- **Tech radar** = evidence-based: set `evidenceBased: true`, leave `rating` at 0. Strength is counted from `connections`.
- **Bar radar** = self-rated: set `evidenceBased: false` and a `rating`.

## Controller (`skills.controller.js`)
- `listSkills` / `getSkill` / `createSkill` / `updateSkill` / `deleteSkill` — standard CRUD from the shared `makeCrud` factory.
- `listByDomain` — `GET /skills/domain/:domain` returns just one craft's active skills (what the radar fetches).

`getSkill` accepts an ObjectId **or** the `key` slug. Any read accepts `?lang=ru|hy` to flatten translations, or returns full `{en,ru,hy}` objects by default.

## Routes (`skills.routes.js`) → mounted at `/api/public/skills`
| method | path | notes |
|---|---|---|
| GET | `/` | list (`?all=true`, `?lang=`) |
| GET | `/domain/:domain` | tech \| bar |
| GET | `/:id` | ObjectId or key |
| POST | `/` | **protect** |
| PATCH | `/:id` | **protect** |
| DELETE | `/:id` | **protect** |

## This module is the template
Every other feature in `backEnd/features/*` follows this exact shape (model + controller via `makeCrud` + routes + README). Read it first.
