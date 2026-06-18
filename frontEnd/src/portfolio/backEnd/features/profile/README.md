# Profile (singleton)

The site-wide content no other collection owns: identity, hero copy, the "who I am" intro, the manifesto, the live now-panel, the home stat counters, and the marquee words.

## Why a singleton
There is exactly one Vardges. A fixed unique `singleton: "profile"` key guarantees one document; the controller upserts it (no list/create/delete).

## Schema (`profile.model.js`)
| field | type | feeds |
|---|---|---|
| `name` | String (plain) | hero / footer |
| `role`, `location`, `tagline` | localizedString | meta, hero |
| `hero` | `{ kicker, techWord, barWord, techSub, barSub }` localized | the split hero ("The Engineer" / "The Alchemist") |
| `about` | `{ kicker, title, paragraphs[], badges[] }` localized | the "Two crafts. One discipline." intro |
| `manifesto` | localizedString | the manifesto moment |
| `now` | `{ tz, statuses[] }` | the live now-panel (clock + status chips) |
| `stats` | `[{ value, suffix, label, mode }]` | the home counters (`mode` = which audience the number leads for) |
| `marquee` | [localizedString] | the scrolling ticker words |

`name` and `now.tz` are plain; everything else is localized.

## Controller / Routes → `/api/public/profile`
`GET /` (singleton, `?lang=`) · **protected** `PATCH /` (upsert).
