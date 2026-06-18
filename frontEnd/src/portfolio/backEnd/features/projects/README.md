# Projects

Case-study projects. One collection powers **three** frontend surfaces: the tech **graph** (node kind `project`), the projects **grid** (featured wide card + incremental load-more), and the **deep-dive modal** (highlights).

## Why this shape
Field-for-field it mirrors `data/sampleProjects.js`, so replacing that static array with `GET /projects` is a no-op for the React components.

## Schema (`projects.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | graph id, `p-cloudops` (referenced by connections) |
| `slug` | String (unique) | url-safe id |
| `title` / `tagline` / `description` | localizedString | card + modal copy |
| `year` | String | e.g. `2024–25` |
| `status` | `live \| progress \| concept` | status chip |
| `featured` | Boolean | renders the wide hero card with metrics |
| `caseStudy` | Boolean | flags the headline case study |
| `stack` | [String] | **plain** tech names |
| `media` | media sub-schema | `assetId` keeps matching the frontend resolver |
| `links` | `{ live, github, anchor }` | plain urls |
| `metrics` | `[{ value, label }]` | `label` localized; shown on the featured card |
| `highlights` | [localizedString] | deep-dive bullet points |
| `order`, `active` | — | |

**Translation note:** `title/tagline/description/metrics.label/highlights` are localized; `slug/year/stack/links/media` stay plain.

## Controller
CRUD via `makeCrud` + `listFeatured` (`GET /projects/featured`).

## Routes → `/api/public/projects`
`GET /` · `GET /featured` · `GET /:id` (ObjectId or key) · **protected** `POST` / `PATCH /:id` / `DELETE /:id`.
