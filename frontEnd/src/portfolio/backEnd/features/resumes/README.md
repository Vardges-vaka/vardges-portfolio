# Resumes

The CVs the single, **context-aware** CV button downloads.

## The mapping (why `track`)
The frontend button resolves one CV by context:
| context | track | file |
|---|---|---|
| Both mode / home default | `both` | Full CV |
| Engineer mode / `/tech` | `tech` | Tech CV |
| Bartender mode / `/bar` | `bar` | Hospitality CV |

`GET /resumes/track/:track` returns the **current** resume for that track — exactly what the button needs.

## Schema (`resumes.model.js`)
| field | type | purpose |
|---|---|---|
| `track` | `tech\|bar\|both` | which context this CV serves |
| `label` | localizedString | button text ("Full CV"…) |
| `file` | String | PDF path / url |
| `filename` | String | the `download` attribute |
| `current` | Boolean | the live file for this track (keep old ones `current: false`) |
| `order`, `active` | — | |

## Controller / Routes → `/api/public/resumes`
CRUD via `makeCrud` (note `keyField: "track"`) + `getByTrack`.
`GET /` · `GET /track/:track` · `GET /:id` · **protected** writes.
