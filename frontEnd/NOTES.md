# Portfolio — Asset & Integration Notes

Everything you need to replace placeholders and wire the portfolio to your backend.
Each placeholder on the site shows its **ASSET ID** badge — find it here.

---

## 1. How to replace a media placeholder

Every placeholder is a `<MediaPlaceholder assetId="ASSET-XX" … />` component
(`src/portfolio/components/MediaPlaceholder.jsx`).
To replace one, swap the component for a real element **keeping the same `className` prop** so layout/hover styles still apply:

```jsx
// image
<img
  src="/media/portrait.jpg"
  alt="Vardges Petrosyan"
  className="vp-monogram__portrait"
  style={{ aspectRatio: "4 / 5", objectFit: "cover", borderRadius: 18, width: "70%" }}
/>

// video (autoplay, silent, looped — like a gif but lighter)
<video
  src="/media/bar-service.mp4"
  autoPlay
  muted
  loop
  playsInline
  style={{ aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 18, width: "100%" }}
/>
```

Recommended: put files in `frontEnd/public/media/` (create the folder) and reference them as `/media/<file>`.
For videos: mp4 (H.264), under ~8 MB, 10–20 s loop, no audio track. **No audio assets are required anywhere on the site.**

---

## 2. Asset list

### ASSET-H1 — Portrait (Home → "Who I am" card)
- **Type:** image · **Aspect:** 4:5 · **Mood:** premium, warm, confident
- **Best option:** a real professional photo of you. Dark background, single warm light source, business-casual — ideally holding a cocktail shaker with a laptop nearby (the "two crafts" story in one frame).
- **AI prompt:** `Professional studio portrait of a confident man in his early 30s, dark teal-to-charcoal gradient background, dramatic rim lighting with warm amber accent light from the side, wearing a dark shirt, slight smile, cinematic color grade, shallow depth of field, 4:5 portrait crop, photorealistic, high-end editorial photography`
- **Search terms:** *(use your own photo — stock defeats the purpose here)*

### ASSET-P1 — Project thumbnail: vardges.me platform (Tech → Projects, featured card)
- **Type:** image · **Aspect:** 16:11
- **Best option:** a real screenshot of your admin dashboard (the cloud monitor page) — recruiters love real UI. Dark theme, tight crop.
- **AI prompt:** `Sleek dark-mode SaaS operations dashboard UI on a laptop screen, teal accent color #38e1c8, cloud storage health monitors with green status indicators, charts and provider cards, floating in dark space with soft teal glow, 3D perspective product shot, octane render, high detail`
- **Search terms:** `dark dashboard ui mockup laptop` (Unsplash / Pexels)

### ASSET-P2 — Project thumbnail: ReviewRadar (Tech → Projects)
- **Type:** image · **Aspect:** 16:10
- **AI prompt:** `Dark analytics dashboard showing customer review sentiment analysis, red and green sentiment cards, star ratings, notification feed on the right side, modern flat UI design, teal and dark navy palette, isometric perspective, clean vector illustration style`
- **Search terms:** `review sentiment dashboard illustration dark`

### ASSET-P3 — Project thumbnail: PourCost (Tech → Projects)
- **Type:** image · **Aspect:** 16:10
- **AI prompt:** `Split-scene illustration: left side a cocktail jigger pouring liquid, right side a clean dark finance dashboard with cost charts and percentages, connected by a glowing teal line, modern flat illustration, dark background, amber and teal accents`
- **Search terms:** `bar inventory app illustration`, `cocktail cost calculator ui`

### ASSET-P4 — Project thumbnail: Breach Lab (Tech → Projects)
- **Type:** image (a subtle looping **gif/video also works great** here) · **Aspect:** 16:10
- **AI prompt:** `Dark hacker-aesthetic terminal screen with green and teal code, a glowing wireframe padlock hologram floating above the keyboard, shallow depth of field, moody cyberpunk lighting, photorealistic, dark teal color grade`
- **Search terms:** `cybersecurity terminal padlock dark` (Unsplash: "cybersecurity")

### ASSET-B1 — Bar service video (Hospitality → "Atmosphere", wide slot)
- **Type:** video (mp4 loop, 10–20 s, muted) · **Aspect:** 16:10
- **Best option:** real footage of you in service at the bar.
- **Search terms (free stock video):** `bartender pouring cocktail slow motion dark bar` (Pexels Videos / Coverr)
- **AI video prompt (Runway / Pika):** `Slow motion: a bartender's hands pouring a deep amber cocktail through a strainer into a coupe glass, dark moody bar, warm golden backlight, bokeh bottles in background, cinematic, 24fps`

### ASSET-B2 — Cocktail macro (Hospitality → "Atmosphere")
- **Type:** image · **Aspect:** 4:5
- **AI prompt:** `Macro photography of a craft cocktail in a crystal coupe, amber liquid with a flamed orange peel garnish, dark background, dramatic warm side lighting, tiny bubbles and condensation visible, art-deco bar blurred behind, photorealistic, editorial food photography`
- **Search terms:** `craft cocktail dark background macro` (Unsplash)

### ASSET-B3 — Masterclass / training (Hospitality → "Atmosphere")
- **Type:** image · **Aspect:** 4:5
- **Best option:** a real photo from one of your trainings/masterclasses.
- **AI prompt:** `A bar trainer demonstrating a cocktail shake to three attentive young bartenders behind a professional bar, warm amber lighting, bottles backlit on shelves, candid documentary style, shallow depth of field`
- **Search terms:** `bartender training masterclass`

---

## 3. Certificate PDFs

Drop your real PDFs into **`frontEnd/public/certs/`** with these exact filenames
(defined in `src/portfolio/data/certificates.js`):

| File | Certificate |
|---|---|
| `ai-infrastructure-fundamentals.pdf` | AI Infrastructure and Operations Fundamentals |
| `ai-creative-expert-partner.pdf` | Use AI as a Creative or Expert Partner |
| `design-prompts-everyday-tasks.pdf` | Design Prompts for Everyday Work Tasks |
| `hotel-hospitality-management.pdf` | Hotel & Hospitality Management (Zabeel) |
| `strategic-negotiation.pdf` | Strategic Negotiation |
| `negotiation-foundations.pdf` | Negotiation Foundations |

Until the files exist, the "View PDF" buttons will 404 — expected.

---

## 4. Social links (GitHub / Discord)

Update the two `TODO(Vardges)` placeholders in `src/portfolio/portfolio.constants.js`:
`github` / `githubDisplay` and `discord` / `discordDisplay`.
They feed the contact-section channel list **and** the footer social buttons.

---

## 5. Contact form → backend

The form lives in `src/portfolio/components/ContactSection.jsx`.
Replace the simulated `submitContact()` (clearly marked block) with the real call:

```
POST /api/public/contact
Content-Type: application/json
{
  "name":    string,                        // trimmed, required
  "email":   string,                        // trimmed, required, format-checked client-side
  "topic":   "tech" | "hospitality" | "other",
  "message": string,                        // trimmed, required
  "lang":    "en" | "ru" | "hy" | "ar",
  "source":  string,                        // pathname the form was sent from: "/", "/tech", "/bar"
  "sentAt":  string                         // ISO timestamp
}
```

Respond with your usual `{ success, message, data }` envelope — the UI switches to the
success state when `success === true`. A hidden honeypot field (`company`) is already
in the form; if it arrives non-empty on the backend, silently drop the request.

---

## 6. Projects → backend

Sample objects live in `src/portfolio/data/sampleProjects.js` with the full shape
documented at the top of the file (id, slug, title, tagline, description, year,
status, featured, stack[], media{type, assetId, alt}, links{live, github, anchor}, metrics[]).

Suggested endpoint: `GET /api/public/projects` → `{ success, message, data: Project[] }`.
When you switch to the API, replace `media.assetId` with a real `media.url` and swap the
`MediaPlaceholder` in `src/portfolio/components/ProjectsGrid.jsx` for an `<img>` / `<video>`.
