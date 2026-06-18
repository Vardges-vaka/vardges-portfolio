# Graph (read-only assembler)

**No model here.** This feature joins the node collections (`skills`, `certifications`, `projects`, `careers`, `testimonials`) with the edges (`connections`) and returns the exact `{ nodes, links }` shape the React `KnowledgeGraph` builds in `data/graphData.js`. It is the endpoint that lets you drop the static graph data with **zero component changes**.

## Endpoint
```
GET /api/public/graph/:variant      variant = tech | bar | universe      ?lang=en|ru|hy
```

### What each variant returns
| variant | node types | edges |
|---|---|---|
| `tech` | skill (domain tech) · cert · project | connections where `graph = tech` |
| `bar` | skill (domain bar) · career → **type "experience"** · testimonial | connections where `graph = bar` |
| `universe` | all of the above · **bridge** nodes | tech + bar edges + bridge edges |

### Node shape (matches the frontend)
`type` is one of `skill \| cert \| project \| experience \| testimonial \| bridge`. A **career** document becomes a node of type **`experience`** (the frontend's bar-graph vocabulary). Each node's `id` is its stable `key`, and localized fields are resolved to `?lang` (English by default), so the payload is a drop-in for `buildTechGraph` / `buildBarGraph` / `buildUniverseGraph`.

### Bridges
Each `connections` doc with `relation: "br"` is expanded into a **node** of type `bridge` (carrying `label` + `why`) plus two `br` links to its endpoints — exactly the universe graph the component renders.

## Controller (`graph.controller.js`)
`getGraph` pulls only the collections a variant needs, builds nodes via per-type mappers, resolves bridges, then emits links from connections whose endpoints are present. Pure read; safe to cache.
