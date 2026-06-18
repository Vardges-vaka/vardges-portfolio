# Testimonials

LinkedIn recommendations → graph nodes (kind `testimonial`) + the testimonials strip.

## Schema (`testimonials.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | graph id, `t-maria` |
| `name` | String (plain) | the person (proper noun) |
| `role` | localizedString | their job title |
| `org` | String | where they worked with Vardges |
| `quote` | localizedString | the recommendation text |
| `track` | `bar\|tech` | which graph they appear on |
| `aiTranslated` | Boolean | `true` → frontend shows a "translated with AI" badge in non-EN, because the original was written in English |
| `order`, `active` | — | |

**Translation note:** `role/quote` localized; `name/org` plain. The English values are authoritative; RU/HY are machine translations, hence `aiTranslated`.

## Controller
CRUD + `listByTrack` (`GET /testimonials/track/:track`).

## Routes → `/api/public/testimonials`
`GET /` · `GET /track/:track` · `GET /:id` · **protected** writes.
