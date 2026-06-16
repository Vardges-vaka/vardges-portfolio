# Portfolio — Asset & Integration Notes

How the portfolio loads your real media, what's wired, and the few things still left for you.

---

## ⚡ Assets I still need from you

| Asset | Where it goes | Why / how |
|---|---|---|
| **`og-image.png`** (1200×630) | `frontEnd/public/og-image.png` | The social share preview (LinkedIn/WhatsApp/X). Scrapers don't render SVG, so export the ready-made design at `public/og-image.svg` to PNG (any SVG→PNG tool, or Figma/Canva export at 1200×630) and drop it in. Until then the title/description still share fine — just no image. |
| **Analytics account** | — | The privacy-friendly Plausible tag is already in `index.html`. It only starts collecting once you create the site at **plausible.io** (paid) for domain `vardges.me`. Prefer free? Say the word and I'll swap it for self-hosted **Umami**. |
| **GitHub / Discord URLs** | `src/portfolio/portfolio.constants.js` | Replace the two `TODO(Vardges)` placeholders. |
| *(optional)* `apple-touch-icon.png` 180×180 + icons 192/512 | `public/` | Only needed for pixel-perfect iOS/Android install icons. The SVG favicon already covers modern browsers + Chrome install. |
| *(optional)* `ASSET-CARELINK`, `ASSET-VKUSNO`, `ASSET-BARFLOW`, `ASSET-PHISHGUARD`, `ASSET-PORTFOLIO` images, `ASSET-B1.mp4`, `ASSET-B2.jpg` | `src/portfolio/media/` | Real screenshots for the newer projects + the bar atmosphere video/macro. Each shows a labeled placeholder until you drop a file with that exact name. |

---

## 1. How media loading works

All images/videos and PDFs live in **`src/portfolio/media/`** and are wired **automatically**
at build time by `src/portfolio/lib/media.js` (Vite `import.meta.glob`). Just drop a correctly-named file.

- **Images**: filename-without-extension = the `assetId` (e.g. `ASSET-P1` → `ASSET-P1.png`). Supports png/jpg/jpeg/webp/avif/gif/svg.
- **Videos** (mp4/webm/mov): resolve the same way, render as muted autoplay loops.
- **No match → animated placeholder** (shows the assetId so you know what to add). Nothing breaks.

Wired real images: `ASSET-P1` (CloudOps), `ASSET-P2` (Sentio), `ASSET-P3` (Cocktail Tree), `ASSET-P4` (Breach Lab), `ASSET-B3` (masterclass), `ASSET-H1` (portrait).

---

## 2. CVs — wired ✅

Three CV buttons (Full / Tech / Hospitality) appear in the contact section, with the page-relevant one
highlighted. Files: `CV_tech.pdf`, `Cv_Bar.pdf`, `Cv_Both.pdf` in `src/portfolio/media/` — resolved in
`src/portfolio/data/cvs.js`. To change a CV, just replace the PDF.

---

## 3. Certificates — wired ✅

All ~24 earned tech PDFs auto-link into the filterable cert wall (`src/portfolio/data/certificates.js`).
On top of those, 20 **cybersecurity roadmap** certs (`CYBER_CERTS`, `planned: true`, `cat: "cyber"`) link to
the syllabus PDFs in `src/portfolio/media/cyber/`. These render with a "Planned" badge and a "View path"
link — they are clearly shown as *not yet earned*, never as completed. The wall + knowledge graph use the
combined `ALL_TECH_CERTS`.
Hospitality certs have `file: null` (no PDFs supplied) and render as credentials without a download
button — drop a PDF + set `file: certByName("…")` to enable it.

### Translations for data-driven prose
Cert descriptions, project tagline/description/highlights, and testimonial quotes are English in the data
files and translated **by id** in `src/portfolio/i18n/extra/{ru,hy,ar}.js` (deep-merged in `dictionaries.js`).
`t(path, fallback)` returns the English data string when a translation is missing. Testimonials show a
"Translated with AI" disclaimer in any non-English language. To add/adjust a translation, edit the matching
id under `certInfo` / `projectInfo` / `testimonialInfo` in those three files.

---

## 4. Testimonials — wired ✅

Five LinkedIn recommendations (condensed in `src/portfolio/data/testimonials.js`, sourced from
`media/LinkedIn_Testemonials.md`) show on the hospitality and home pages. They're all hospitality —
add tech recommendations later with `track: "tech"` and they'll appear on the tech page.

---

## 5. Projects + deep-dive — wired ✅

`src/portfolio/data/sampleProjects.js` now holds 9 projects, each with a `highlights` list. Clicking a
card (image or title) opens a deep-dive modal. Swap to a backend later with
`GET /api/public/projects → { success, message, data: Project[] }`, same shape.

---

## 6. Contact form → backend (still a TODO)

`src/portfolio/components/ContactSection.jsx` — replace the simulated `submitContact()` with your API:
`POST /api/public/contact { name, email, topic, message, lang, source, sentAt } → { success, message, data }`.
A hidden honeypot (`company`) is included — drop the request if it arrives non-empty.

---

## 7. SEO / shareability — wired ✅

- `index.html` has full meta, Open Graph, Twitter cards and JSON-LD Person schema, keyword-tuned for
  **web development, cybersecurity, and hospitality (bar / beverage / F&B)**.
- Per-route titles/descriptions update at runtime (`src/portfolio/lib/seo.js`) for the browser + Google.
- `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`, `public/favicon.svg`, `public/og-image.svg`.
- Note: social scrapers read the **static** `index.html` (they don't run JS), so the share preview is the
  combined one for all routes. Per-route share previews would need prerendering/SSR — a future step.

---

## 8. Accessibility — wired ✅

Skip-to-content link, focus moved to `<main>` on route change with a screen-reader live-region
announcement, `<html lang/dir>` kept in sync, reduced-motion honored everywhere, and a
`prefers-reduced-data` / Data-Saver fallback that drops the motif canvas on metered connections.

---

## 8a. Audience mode + the home mind-map (no action needed)

- **Audience mode** (`context/PortfolioModeContext.jsx`) is a 4th global context — `tech | both | bar`, default `both`, persisted in localStorage, mirrored onto `<html data-mode>` and `.vp-root[data-mode]`. The 3D toggler (`components/ModeToggle.jsx`) lives in the navbar (desktop + mobile) on every page. Use `usePortfolioMode()` → `{ mode, setMode, showTech, showBar, isBoth }`.
- Mode reacts across the site: the **Lab** filters its zones (Security / Bar / Both); the **home mind-map** auto-opens the chosen branch and dims the other; the **home hero doors** reorder to lead with the chosen craft.
- **The mind-map** (`components/interactive/LifeMap.jsx`) is a hand-rolled tidy-tree of "a life in two crafts" — click a branch to expand; it re-lays-out + auto-fits; RTL-mirrored; data + i18n in `lifemap.*`. Edit the `TREE` constant to change branches.

## 8b. The knowledge graph & the Lab (no action needed)

- `components/interactive/KnowledgeGraph.jsx` is now **variant-driven** (`variant="tech" | "bar"`). Tech graphs certificates ↔ skills ↔ projects; bar graphs **experiences ↔ crafts** with a career chain (experience→experience) and a **filter-by-country** sub-filter. Both live in a merged "… & connections" section alongside the proficiency radar. Edit `buildTechGraph` / `buildBarGraph` + their `EDGES` in `data/graphData.js` to change connections. Bar experiences reuse the translated tasting-menu prose via `courseIndex` → `bar.menu.courses[i]`, so no separate experience translations are needed.
- The tech radar is **evidence-based** (strength = earned certs + projects feeding each skill, via `techSkillStrengths`); the bar radar stays self-rated (14-year veteran).
- **The Lab** (`/lab`, `pages/LabPage.jsx`) is the shared, mode-filtered playground. **Security zone:** spot-the-phish · **Crack the Vault** (password cracker) · **Hash Forge** (live SHA-1/256/512 + avalanche) · **Cipher Lab** (Caesar decode, the secret is a cocktail recipe). **Behind-the-bar zone:** cocktail builder · **Guess the Cocktail** · **Shake or Stir?** · **Pour-Cost Lab** (the consultancy calculator) · **Name That Spirit** (trivia). Add new games inside the relevant `{showTech && …}` / `{showBar && …}` block. Game framing is fully translated; cocktail names/specs and cipher/terminal content stay in their original form by design.
- **The mode toggler** (`components/ModeToggle.jsx`) is three glossy 3D orbs in a recessed track (active one rises + glows). **Contact** (`components/ContactSection.jsx`) is mode-aware: a terminal `POST /contact` (streams a 200 OK) for Engineer/Both, "pull up a stool / place your order" for Bartender. The submit is still simulated — wire `submitContact`. The home has a live Dubai-clock **NowPanel** and the mind-map's animated **MindBackdrop** (neural field with firing pulses).

## 9. The background FX system (no action needed)

`src/portfolio/components/fx/` — `SceneBackground`, `MotifCanvas`, `AsciiField`, `SectionAtmosphere`,
`ScrollProgress`. Tuned for performance (no live backdrop blurs, paused off-screen/off-tab). Styles in
`src/portfolio/styles/fx.css`.
