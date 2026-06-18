# Connections

**The edges of every knowledge graph** — and the universe **bridges**. This is the collection that makes "serve the graph connections from the backend" real. The `graph` assembler (`features/graph`) joins these with the node collections to produce the `{ nodes, links }` payload the frontend already consumes.

## Schema (`connections.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String | required for **bridges** only (`br-experience`); empty for plain edges |
| `from` | graphRef `{ kind, key }` | source node (e.g. `{ kind: "cert", key: "c-it-automation" }`) |
| `to` | graphRef | target node |
| `relation` | enum | the edge type — see codes below |
| `graph` | `tech\|bar\|universe` | which graph this edge belongs to |
| `label` | localizedString | **bridge-only** title ("Experience design") |
| `why` | localizedString | **bridge-only** one-line analogy |
| `order`, `active` | — | |

### Relation codes (identical to the frontend `graphData.js`)
| code | meaning |
|---|---|
| `cs` | cert → skill |
| `ps` | project → skill |
| `cp` | cert → project |
| `pp` | project → project |
| `es` | career (experience) → skill (craft) |
| `ee` | career → career (the career chain) |
| `te` | testimonial → career |
| `tk` | testimonial → skill (craft) |
| `br` | **bridge** (universe: a tech node ↔ a bar node) |

A `pre("validate")` hook enforces that a bridge (`relation: "br"`) carries a `key` and a `label`.

## How bridges become nodes
A bridge is stored as ONE edge but the frontend renders it as a **node** of kind `bridge` connecting its two endpoints. The graph assembler expands each `br` connection into a bridge node + two `br` links — matching the universe graph the React component builds today.

## Controller / Routes → `/api/public/connections`
CRUD + `listByGraph` (`/graph/:graph`) + `listBridges` (`/bridges`).
`GET /` · `GET /bridges` · `GET /graph/:graph` · `GET /:id` · **protected** writes.

> You rarely read this collection directly from the frontend — you read the **assembled** `/api/public/graph/:variant`. This collection is the editable source the assembler reads.
