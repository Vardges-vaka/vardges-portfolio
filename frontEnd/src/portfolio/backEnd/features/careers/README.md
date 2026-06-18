# Careers

14 years of roles. **One collection, three frontend surfaces:** the bar **graph** (node kind `career`, rendered as type `experience`), the home **journey/recipe timeline**, and the bar **tasting-menu** prose.

## Schema (`careers.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | graph id, `xp-bff` (connections reference it) |
| `role` | localizedString | job title |
| `venue` / `city` / `country` | String (plain) | proper nouns |
| `year` | String | `2018–24` |
| `courseIndex` | Number | aligns the role with its bar tasting-menu "course" |
| `type` | `bar\|tech\|hybrid` | timeline card colour (the coding pivot = `tech`, founding the consultancy = `hybrid`) |
| `title` | localizedString | timeline headline |
| `place` | String | "BFF Sports Bar · Dubai, UAE" |
| `text` | localizedString | the blurb (timeline + tasting menu) |
| `order`, `active` | — | chronological order |

**Translation note:** `role/title/text` localized; `venue/city/country/year/place` plain.

## Controller
CRUD + `listTimeline` (`GET /careers/timeline`, chronological — what the journey renders).

## Routes → `/api/public/careers`
`GET /` · `GET /timeline` · `GET /:id` · **protected** writes.

## Why one collection for three views
The same role appears as a graph node, a timeline card, and a tasting-menu course — duplicating it would risk drift. Keeping it in one place (with `courseIndex`, `type`, and the localized blurbs) lets every surface read the same source of truth.
