# Portfolio — Session 2 Handoff

## RESUME DIRECTIVE
You are continuing the build of **Vardges Petrosyan's public portfolio** — a standalone, front-end-only React site under `frontEnd/src/portfolio/` (the admin MERN app is separate, untouched). This session (2) added an audience-mode system, an interactive home mind-map, a big batch of Lab games, and a reinvented contact. Read everything below, then start at **Next Steps**. Do not re-derive settled decisions. Most detail is re-readable from the code + `frontEnd/NOTES.md`.

## SESSION
- Goal: Make all three public pages (`/`, `/tech`, `/bar`) feel polished and original — add an audience-mode context, a home mind-map, many Lab mini-games, and a non-boring contact. The user is blunt about quality ("holy shit that's done", not "good enough") and explicitly asked to build **as many of the recommended ideas as possible**.

## ENVIRONMENT
- Worked in: Claude Code (CLI) on Windows, PowerShell. Project: `C:\Users\vardg\OneDrive\Desktop\Codding\vardges.me\frontEnd`
- Continuing in: Code (IDE)
- Verify loop: `npx eslint src/portfolio` (must be clean) + `npm run build` (must pass). Live preview via Claude Preview MCP `frontend-dev` on **port 3215**.
- **Preview gotchas (important):** headless viewport defaults to **0×0** → always `preview_resize` to 1440×900 first or everything measures 0. Set `localStorage` `vp-portfolio-mode` + `vp-portfolio-lang` then navigate. The **screenshot tool stalls** (worse with running canvas animations) → verify via `preview_eval` DOM/computed-style reads instead.

## CURRENT STATE  ← most important; everything here is DONE, tested, lint+build clean, console clean
Built across this session and shipping:
- **Tech page** fully reworked earlier: 20 future "cybersecurity roadmap" certs (planned, honest), graph filters/controls (legend-as-filters with counts, cert-category sub-filter, tune panel: centre/repel/link force + link thickness + text-fade + node-size), animated graph backdrop, project **Deep dive** modal (folds in the case-study mock), curated certs/projects behind **Show all**, **merged "Skills & connections"** section (evidence-based radar + graph), **/lab** extraction.
- **Bar page**: merged **"Craft & connections"** section = self-rated radar + an **experiences ↔ crafts ↔ recommendations** graph (career-chain edges, filter-by-country); testimonials are nodes in that graph (rose, with AI-translation badge in non-EN); the old "Atmosphere" media section was removed.
- **Audience-mode system** (NEW): `context/PortfolioModeContext.jsx` — `tech | both | bar`, default `both`, localStorage-persisted, mirrored to `<html data-mode>` + `.vp-root[data-mode]`. Hook: `usePortfolioMode()` → `{ mode, setMode, showTech, showBar, isBoth, cycleMode }`.
- **3D orb toggler** (NEW, `components/ModeToggle.jsx`): three glossy 3D spheres in a recessed track; active one rises + glows + label. In navbar (desktop + mobile) on every page. **NOTE: an earlier flat-pill version was explicitly rejected by the user — do not revert to it.**
- **Home mind-map** (NEW, `components/interactive/LifeMap.jsx`): hand-rolled tidy-tree of "a life in two crafts", click-to-expand, auto-fit, RTL-mirrored, mode-aware (opens the chosen branch, dims the other). Background is **`components/interactive/MindBackdrop.jsx`** — an animated neural field (drifting nodes, filaments, firing light-pulses, aurora). The user rejected the first boring blurred-orbs background; this replaced it.
- **Home NowPanel** (NEW, `components/NowPanel.jsx`): live ticking Dubai clock + status lines.
- **Mode-aware** Lab (filters zones) + Home (mind-map branch + hero-door reorder).
- **Lab now has 9 games** (mode-filtered). Security: `PhishGame`, `CrackTheVault`, `HashForge`, `CipherLab`. Bar: `CocktailBuilder`, `GuessTheCocktail`, `ShakeOrStir`, `PourCostLab`, `NameThatSpirit`. All in `components/interactive/`.
- **Contact reinvented** (`components/ContactSection.jsx`): **mode-aware** — Engineer/Both = a terminal that "POSTs" and streams a `200 OK`; Bartender = "pull up a stool / place your order" with a neon OPEN sign. Submit is still **simulated** (`submitContact`).
- **i18n: 4 languages (EN/RU/HY/AR + RTL), 341-key parity** verified. EN canonical in `i18n/en.js`; translations in `i18n/extra/{ru,hy,ar}.js` deep-merged via `i18n/dictionaries.js`. `t(path, fallback)` supports a fallback default.

## WHAT HAPPENED (settled — do not re-litigate)
- **Keep `/tech` and `/bar` as real routes; do NOT merge them into Home.** Reason: SEO + shareable links. The mode context is a *personalization lens layered on top*, not a route replacement. (User agreed.)
- **Mode toggler = 3D orbs**, not a segmented pill (user called the pill "the worst design ever"). framer `z`/translateZ didn't apply → the active orb "rises" via `y` instead.
- **Cyber certs are PLANNED/roadmap**, never shown as earned. The cybersecurity-skewed radar is *evidence-based* (counts earned certs+projects; planned excluded) on tech; bar radar stays self-rated.
- **i18n policy:** UI strings translated everywhere; game-internal content (cocktail names/specs, cipher plaintext, terminal/hash output) stays English by design ("terminals speak English"). Cocktail-game `glass`, contact `intents`, etc. are translated.
- **Graph engine is variant-driven:** `KnowledgeGraph` takes `variant="tech"|"bar"` via a `CONFIGS` map (types, palette, sub-filter). Bar experiences reuse translated tasting-menu prose via `courseIndex` → `bar.menu.courses[i]`.
- Old Fashioned scroll film concept is **parked** in `notes/old-fashioned-scroll-film.md` (needs the user to film real footage; technique decided = scroll-scrubbed frame sequence).

## KEY FACTS & CONSTRAINTS
- **ESLint quirk:** a destructured component identifier used only in JSX inside a `.map`/callback (`{ Icon }`) is wrongly flagged "unused". Use `const Icon = opt.icon;` (a plain const) instead — happened 3× this session.
- **i18n parity check** (run after any i18n edit): a node script flattens keys of `extra/{ru,hy,ar}.js` and diffs them — must be equal (341). Pattern is in the conversation; add new keys to en.js + all 3 extras.
- **Adding a Lab game:** new component in `components/interactive/`, render it inside the right `{showTech && …}` / `{showBar && …}` block in `pages/LabPage.jsx`, add `game.<id>.*` i18n (en + 3 extras), add CSS to `styles/lab.css`.
- **Bash heredoc `cat >> file <<'CSS'` failed once unexpectedly** (EOF/quote error) → fall back to the Edit tool (match the file's last line, append after) for CSS.
- Idea backlog lives in `notes/ideas-{tech-lab,hospitality-lab,contact,home}.md` (each idea tagged ✅ buildable / 📷 needs media / 🔌 needs account/backend / ⭐ top pick).
- Contact form is **simulated** — `submitContact()` in `ContactSection.jsx` needs a real delivery path (honeypot + validation already there).

## OPEN QUESTIONS (need the user)
- **Contact delivery path:** Formspree/Web3Forms (easiest) vs a Cloudflare/Vercel serverless function. Until chosen, contact can't actually send.
- **Old Fashioned film:** can the user film a locked-camera continuous take? (Or fall back to a photo sequence.)

## NEXT STEPS (the user wants the rest of the recommended ideas built — keep grinding)
1. **More Lab games** (all ✅ client-side, see `notes/ideas-*.md`): tech — Packet Inspector, JWT Surgeon, Konami Terminal, Trace the Intruder (reuse graph engine), Regex Duel, Port Scanner, Honeypot, Binary Lockpick, Entropy Visualizer, SQLi Sandbox, Steganography, Threat Dashboard. Bar — Speed Rail, Cocktail Family Tree (reuse graph engine), Flavour Wheel, Perfect Pour, Garnish Master, Pace-Yourself, Cost-to-Craft, Last Call, Design-a-Bar, Tasting Passport, Signature Serves.
2. **Home pieces:** the **cross-craft "universe" graph** (merge tech+bar graphs with bridge nodes — the user *loved* this idea), the **split-screen drag hero**, **ENGINEER ⇄ ALCHEMIST** kinetic hero, metric-mashup, manifesto moment.
3. **More contact variants** (OPEN-sign + clock, calling-card/vCard+QR, embedded scheduler, encrypted-PGP, quick-react chips).
4. After each batch: `npx eslint src/portfolio` + `npm run build` + preview-verify in modes + a non-EN language + RTL; keep i18n parity.
5. When the user picks a contact backend → wire `submitContact()`.

## TO PROVIDE ON RESUME
- Nothing required — all context is in the repo. Optional from the user later: the contact-backend choice, Old Fashioned footage, real GitHub/Discord URLs, and project/bar media (still placeholders per `NOTES.md`).
