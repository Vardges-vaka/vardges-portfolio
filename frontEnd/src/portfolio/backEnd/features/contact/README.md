# Contact

Two concerns in one folder: the contact section's **config** (a singleton) and inbound **messages** from the form.

## `contact.model.js` — `Contact` (singleton config)
| field | type | purpose |
|---|---|---|
| `singleton` | String (unique, immutable) | always `"contact"` → exactly one doc |
| `email` / `phone` / `phoneDisplay` | String | direct channels |
| `location` | localizedString | "Dubai, UAE" |
| `ctaText` | localizedString | the section sub-heading |
| `intents` | `[{ key, label }]` | the chips (Build / Consult / Chat); `label` localized |
| `active` | — | |

## `contactMessage.model.js` — `ContactMessage` (submissions)
Mirrors the frontend `submitContact(payload)` shape: `{ name, email, topic, message, lang, source, sentAt }` + `read` / `archived` for the admin inbox. **Not translated** (user input). `source` records the page path (`/`, `/tech`, `/bar`).

## Controller (`contact.controller.js`)
| handler | route | notes |
|---|---|---|
| `getContact` | GET `/` | config singleton |
| `updateContact` | PATCH `/` | upsert (**protect**) |
| `submitMessage` | POST `/message` | **public** submit |
| `listMessages` | GET `/messages` | inbox (**protect**) |
| `markRead` | PATCH `/messages/:id/read` | (**protect**) |

### `submitMessage` mirrors the frontend exactly
- **Honeypot**: a hidden `company` field — if it arrives non-empty, the handler returns `200` and **stores nothing** (bots fill hidden inputs; humans never see it).
- Validates `name` / `email` / `message`, rejects malformed emails, then persists.

## Routes → `/api/public/contact`
`GET /` · `POST /message` (public) · **protected** `PATCH /`, `GET /messages`, `PATCH /messages/:id/read`.

> When you wire real delivery (Formspree / Resend / a serverless fn), call it from `submitMessage` after the `create` — see the frontend NOTES.md.
