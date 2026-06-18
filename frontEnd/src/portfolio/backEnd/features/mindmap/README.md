# MindMap

The home **LifeMap** ("a life in two crafts") — stored flat, rebuilt into the tidy-tree by the frontend.

## Why flat + parent pointers
The frontend already builds its tree from a `TREE` constant by walking parent → children. Mirroring that as flat nodes (each with a `parent` key) keeps the data trivially editable and the frontend layout untouched.

## Schema (`mindmap.model.js` — `MindMapNode`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | node id (`root`, `eng`, `eng-fs`…) |
| `parent` | String | parent's key; empty / null = root |
| `label` | localizedString | node text |
| `kind` | `root\|tech\|bar\|journey\|lang\|ethos` | colours the node + branch |
| `link` | String | optional route a leaf navigates to (`/tech`) |
| `order`, `active` | — | sibling order |

## Controller / Routes → `/api/public/mindmap`
CRUD + `getTree` (`GET /mindmap/tree`) which returns **both** the flat `nodes` (what the frontend builds from) and a convenience nested `tree`.
`GET /` · `GET /tree` · `GET /:id` · **protected** writes.

## Existing nodes (seed these)
`root` → branches `eng` (tech), `bar` (bar), `journey`, `lang`, `ethos`; each branch has 3–4 leaves (see the frontend `LifeMap.jsx` `TREE`). `eng` and `bar` link to `/tech` and `/bar`.
