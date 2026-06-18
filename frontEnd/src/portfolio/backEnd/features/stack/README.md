# Stack

The concrete technology **arsenal** shown grouped on `/tech` — "Every item below is in production code I wrote, not a logo wall."

## Why this collection exists
The frontend renders the stack as a few cards, each a named group with a bullet list of tools. The natural unit is therefore the **group**, so this collection stores one document per group.

## Schema (`stack.model.js` — model `StackGroup`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | stable id, e.g. `stack-frontend` |
| `name` | localizedString | the group heading ("Frontend" → "Фронтенд"); EN required, RU/HY fall back |
| `items` | [String] | the tools — **plain strings**, never translated (React 19, Node.js, AWS…). Proper nouns stay as-is, per the i18n policy. |
| `icon` | String | a lucide icon name the frontend maps to a component |
| `order`, `active` | — | ordering + soft-delete |

**Translation note:** only `name` is localized. `items` are brand/tech names and stay plain.

## Controller (`stack.controller.js`)
Pure CRUD from the shared `makeCrud` factory — no special endpoints.

## Routes (`stack.routes.js`) → `/api/public/stack`
| method | path | notes |
|---|---|---|
| GET | `/` | list (`?all=true`, `?lang=`) |
| GET | `/:id` | ObjectId or key |
| POST/PATCH/DELETE | `/`, `/:id` | **protect** |
