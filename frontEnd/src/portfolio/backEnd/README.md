# Portfolio Backend — design scaffold

A complete, review-ready Mongoose + Express backend for the public portfolio. It exists so that **everything the frontend renders — the knowledge graphs, the mind-map, the CVs, the timeline, the contact section — can be served from the database without changing a single frontend component.** The API payloads are shaped to match the data files the React app already consumes.

> Status: **scaffold for review.** Nothing here is wired into a running server yet. Files are ES modules and Mongoose models; they pass `node --check`. When you build the real backend, drop these into your layered structure (or run them as-is) and replace the local response helper with your `validRespond`.

---

## The three ideas that make "no frontend changes" possible

1. **Stable keys, not ObjectIds.** Every node carries the same id the frontend already uses (`sk-frontend`, `c-it-automation`, `p-cloudops`, `xp-bff`, `t-maria`, `br-experience`). Graph edges reference those keys (`_shared/graphRef.schema.js`). So the assembled graph payload is 1:1 with `KnowledgeGraph`'s expected `{ nodes, links }`.

2. **One translatable string type.** All copy is a `{ en, ru, hy }` object (`_shared/localizedString.schema.js`). EN is required and is the fallback — exactly how the frontend's `t(path, fallback)` already behaves. The API returns full multilingual objects by default; pass `?lang=ru` to flatten.

3. **A CRUD factory.** `_shared/crudController.js` gives all 13 collections the same list/get/create/update/delete. Each feature file only writes the endpoints that are *special* to it (e.g. `projects.getFeatured`, the graph assembler).

---

## Collections (13) + 2 read-only aggregators

```
backEnd/
  _shared/            building blocks (read its README first)
  features/
    skills/           radar axes + graph hubs (THE TEMPLATE — read this first)
    certifications/   earned + planned (cybersecurity roadmap) certs → graph nodes
    projects/         case-study projects → graph nodes + deep-dive modal
    careers/          14 years of roles → bar graph nodes + the "journey" timeline
    testimonials/     LinkedIn recommendations → graph nodes (with AI-translation flag)
    services/         The Cocktail Tree consultancy offerings
    stack/            the concrete tech "arsenal" (grouped: Frontend / Backend / …)
    socials/          social links (LinkedIn, GitHub, Discord, …)
    contact/          contact channels + inbound message submissions
    resumes/          the CVs (tech / bar / full) the single CV button downloads
    connections/      the EDGES of every graph (incl. universe "bridges")
    mindmap/          the LifeMap tree (root → branches → leaves)
    profile/          singleton: name/role, hero copy, about, manifesto, now-panel, home stats
    graph/            read-only: GET /graph/:variant → { nodes, links }  (tech|bar|universe)
    bundle/           read-only: GET /bundle → the whole site in one call
  routes.index.js     mounts every feature router under /api/public + /api/admin
```

### How each frontend piece maps to the API
| frontend piece | served by |
|---|---|
| `/tech` radar + graph | `skills` (evidence-based) + `certifications` + `projects` + `connections`, assembled by `graph/tech` |
| `/bar` radar + graph | `skills` (self-rated) + `careers` + `testimonials` + `connections`, assembled by `graph/bar` |
| home **universe graph** | both of the above + `bridges` (Connections of kind `bridge`), assembled by `graph/universe` |
| home **mind-map** (LifeMap) | `mindmap` |
| **CV button** (context-aware) | `resumes` (track = tech \| bar \| both) |
| **journey** ("recipe") timeline | `careers` (the chronological list) |
| projects grid + deep-dive | `projects` |
| cert wall + flip cards | `certifications` |
| contact section + form | `contact` (+ inbound `ContactMessage`) |
| footer / nav socials | `socials` |
| hero, intro, stats, now-panel, manifesto | `profile` (singleton) |

---

## API surface (public)
```
GET  /api/public/skills            ?domain= ?all= ?lang=
GET  /api/public/certifications    ?cat= ?planned=
GET  /api/public/projects          ?featured=
GET  /api/public/careers
GET  /api/public/testimonials      ?track=
GET  /api/public/services
GET  /api/public/stack
GET  /api/public/socials
GET  /api/public/resumes           ?track=
GET  /api/public/connections       ?graph=
GET  /api/public/mindmap
GET  /api/public/profile
GET  /api/public/graph/:variant    tech | bar | universe   ← assembled { nodes, links }
GET  /api/public/bundle            everything, one request
POST /api/public/contact           submit a message (honeypot + validation)
```
Each collection also exposes `GET /:id` (ObjectId **or** key) and **protected** `POST / PATCH /:id / DELETE /:id` for the admin.

## i18n rule (every feature)
Any human-readable text is a `localizedString`. **English is mandatory and is the fallback.** Russian + Armenian are optional. Proper nouns, tech names, and game-internal content (cocktail specs, terminal output) stay as plain strings by design — the same policy the frontend already follows.

## Integrating into the real backend
1. `npm i mongoose express` (already present in your main backend).
2. Move `features/*` and `_shared/*` into your layered structure, or mount `routes.index.js` directly.
3. Replace `_shared/response.util.js` calls with your `validRespond` / `catch_errorHandler_cntrl` (the JSON shape already matches).
4. Add your auth/role middleware to the write routes (marked `TODO: protect`).
5. Seed from the current frontend data files (`data/*.js`, `data/graphData.js`) — the ids line up.
