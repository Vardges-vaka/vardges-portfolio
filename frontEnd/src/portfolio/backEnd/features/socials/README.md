# Socials

Social / contact links for the nav, footer and contact rail (LinkedIn, GitHub, Discord, Email…).

## Schema (`socials.model.js`)
| field | type | purpose |
|---|---|---|
| `key` | String (unique) | `linkedin`, `github`… |
| `platform` | String | "LinkedIn" |
| `label` | String | accessible label |
| `display` | String | the @handle / text shown |
| `url` | String | the link |
| `icon` | String | icon name |
| `order`, `active` | — | |

All fields are **plain** — platform names, handles and urls aren't translated.

> The current frontend has **TODO placeholders** for the GitHub and Discord urls (`portfolio.constants.js`). Fill them here once known.

## Controller / Routes
Pure CRUD via `makeCrud`. Mounted at `/api/public/socials`:
`GET /` · `GET /:id` · **protected** writes.
