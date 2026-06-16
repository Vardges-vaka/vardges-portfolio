# Portfolio — Session 1 Handoff

## RESUME DIRECTIVE
You are continuing an in-progress build of **Vardges Petrosyan's public portfolio** — a standalone, front-end-only React site living entirely under `frontEnd/src/portfolio/` (the admin MERN app is untouched and separate). Read everything below, then start at **Next Steps**. Do not re-derive settled decisions. Most detail is re-readable from the code + `frontEnd/NOTES.md`; this handoff captures only what you can't cheaply re-read.

## SESSION
- Goal: Build a high-end, animated, multilingual public portfolio with three routes (`/` combined, `/tech`, `/bar`), then iteratively add signature interactive pieces. This session ended mid-polish on the **tech-page knowledge graph**.

## ENVIRONMENT
- Worked in: Claude Code (CLI) on Windows, PowerShell. Project: `C:\Users\vardg\OneDrive\Desktop\Codding\vardges.me\frontEnd`
- Continuing in: Code (IDE)
- Dev/verify: `npx eslint src/portfolio` (must be clean) and `npm run build` (must pass). Live preview via the Claude Preview MCP `frontend-dev` config on **port 3215** (`.claude/launch.json`); the user runs their own dev server on 3210 — don't fight it. Node 22.11 prints a Vite "requires 22.12" warning — harmless. Screenshot tool stalls intermittently → when it does, verify via `preview_eval` computed-style/DOM checks instead.

## CURRENT STATE  ← most important
- **Everything builds and lints clean; console is clean.** Site is in a shippable state.
- **Just built: the tech-page knowledge graph** (`components/interactive/KnowledgeGraph.jsx`) — Obsidian-style force-directed graph (d3-force on canvas) of **certs ↔ skills ↔ projects, with cert↔project and project↔project edges**. Verified live: renders/clusters, drag nodes, pan, scroll-zoom (labels fade in when zoomed), hover-highlight (dims rest), click node → section-scoped sidebar (cert: description + "Builds these skills"/"Enabled these projects" pills + View PDF; project: tagline + stack + relationship pills + Visit/Deep-dive), relationship pills navigate node→node, zoom +/−/fit controls, theme recolor without re-sim, sr-only `<ul>` of all 40 nodes for keyboard/AT. Slotted into TechPage as a new **"How it all connects"** section, below the certificates.
- **Graph QA pass is done (5 agents) but its fixes are NOT all applied yet.** 1 high, 5 medium, 5 low. **One already applied**: panel focus-management (focus moves into panel on open via `closeBtnRef`, restores `prevFocusRef` on close — done in this session). The rest are listed under Next Steps with exact fixes — apply them first.

## WHAT HAPPENED (settled decisions — do not re-litigate)
- **Architecture**: `src/portfolio/PortfolioApp.jsx` is the shell: own `PortfolioThemeProvider` + `PortfolioLanguageProvider` (NOT the admin contexts), `<MotionConfig reducedMotion="user">` wrapping everything, fixed `SceneBackground`, `ScrollProgress`, `Navbar`, routes via `PageFade` + `AnimatePresence`, `Footer`, `SkipLink`, an aria-live region, SEO via `lib/seo.js`, `NotFoundPage` for `*`.
- **Styling**: plain CSS scoped under `.vp-root`. Tokens/base in `styles/portfolio.css`; FX + most new components in `styles/fx.css`; per-page `styles/{home,tech,bar}.css`. Never inline raw colors — use CSS vars (`--acc`, `--c-tech`, `--c-bar`, `--vp-bg`, `--vp-text`, etc.).
- **Performance (hard-won, keep it)**: a global rule in fx.css kills `backdrop-filter` everywhere (`.vp-root *,::before,::after { backdrop-filter:none !important }`) — it was the dominant cost over the animated scene. No `mix-blend-mode` on scene layers. Motif canvas capped ~30fps, paused on tab-hidden + reduced-motion. AsciiField ~22fps + IntersectionObserver pause. Translucent panels (color-mix) replace blur for legibility.
- **Media**: auto-resolved at build time from `src/portfolio/media/` via `lib/media.js` (`import.meta.glob`). Images keyed by filename-without-ext = `assetId`; certs/CVs found by `certByName`/`pdfByName` unique substring. Missing asset → graceful animated placeholder (`MediaPlaceholder`) via `Media.jsx`.
- **3D**: `Hero3D` (CSS fallback) lazy-loads `Hero3DScene` (react-three-fiber) **only on capable devices** (`detectCapable`: not reduced-motion/save-data, ≥4 cores/mem, WebGL present) and **only when on-screen** (IntersectionObserver → `frameloop`). three.js stays in its own lazy chunk (~229KB gzip), never the main bundle. **`vite.config.js` has `resolve.dedupe: ['react','react-dom']`** — required, or r3f throws "Invalid hook call" in dev.
- **i18n**: one big nested object per locale in `i18n/{en,ru,hy,ar}.js`; `t()` is a dot-path resolver with EN fallback. Arabic is RTL (`dir` on `.vp-root` + `<html>`). Every new user-facing string must be added to **all four** files with identical shape.
- **Graph tech choice**: hand-rolled d3-force on `<canvas>` (NOT react-force-graph/cytoscape) for full theme control + the on-brand look. Node colors: cert=teal `#38e1c8`, skill=violet `#9b8cff`, project=gold `#e9a23b` (light-theme variants in code + CSS).
- Ruled out: heavy all-in-one graph libs; full WebGL scene on every page (perf); per-route social-share images (needs SSR/prerender — deferred).

## KEY FACTS & CONSTRAINTS
- Routes: `/` HomePage, `/tech` TechPage, `/bar` BarPage, `*` NotFoundPage.
- Graph data + edges: `data/graphData.js` → `buildTechGraph()` returns `{nodes, links}` from `TECH_CERTS`, `SAMPLE_PROJECTS` + a hand-authored `EDGES` array (kinds: `cs` cert→skill, `ps` project→skill, `cp` cert→project, `pp` project→project) + 7 skill hubs + `CERT_DESC` map. Edit EDGES/CERT_DESC to change connections — user may refine these.
- **`KnowledgeGraph.jsx` is currently hardcoded to `buildTechGraph()`** — to reuse it for the bar "work experience" graph, parameterize it (pass a `{nodes,links}` or a builder + variant prop).
- Contact form (`components/ContactSection.jsx`): simulated `submitContact()` clearly marked — wire to `POST /api/public/contact` later. Honeypot field `company` present.
- Social/analytics still placeholders: GitHub/Discord URLs in `portfolio.constants.js`; Plausible tag in `index.html` (needs account); `public/og-image.png` must be exported from `public/og-image.svg` (1200×630) for share previews. All documented in `frontEnd/NOTES.md`.

## OPEN QUESTIONS
- After the graph lands, the user is open to **removing the now-redundant flat cert wall (`CertWall`) and/or skills radar (`SkillsSection`)** on the tech page — confirm before deleting.
- Cocktail scroll animation visual: stylized SVG (buildable now) vs photoreal frame sequence (needs ~40 frame assets) — undecided.

## NEXT STEPS
1. **Apply the remaining graph QA fixes** (all in `KnowledgeGraph.jsx` unless noted), then re-run `npx eslint src/portfolio` + `npm run build` + preview-verify (drag/zoom/click):
   - **[HIGH] Wheel scroll-trap**: in `onWheel`, add `if (!e.ctrlKey && !e.metaKey) return;` BEFORE `e.preventDefault()` so plain wheel scrolls the page and Ctrl/⌘+wheel (and trackpad pinch) zooms. Update the `graph.hint` i18n string in all 4 locales to say "Ctrl/⌘ + scroll to zoom".
   - **[MED] Dangling listener**: hoist the inline `pointerleave` handler to `const onLeave = () => {...}` and add `canvas.removeEventListener("pointerleave", onLeave)` to the effect cleanup.
   - **[MED] Panel a11y name**: add `id="vp-kg-title"` to the panel `<h3 class="vp-kg__title">` and `role="region" aria-labelledby="vp-kg-title"` (or `role="dialog"`) on the `<Motion.aside class="vp-kg__panel">`.
   - **[MED] sr-only list name**: give the sr-only `<ul>` an accessible name — add a new i18n key (e.g. `graph.nodeList`) in all 4 locales and `aria-label={t("graph.nodeList")}` on the `<ul>`.
   - **[MED] RTL panel slide**: `const { t, dir } = usePortfolioLang();` then `const slideX = dir === "rtl" ? -30 : 30;` and use `x: slideX` in the aside's `initial`/`exit` (animate stays `x:0`).
   - **[LOW] Esc to close**: close the panel on Escape (onKeyDown on the aside, or a document keydown while `selected`).
   - **[LOW] RTL shadow**: add `.vp-root[dir="rtl"] .vp-kg__panel { box-shadow: 24px 0 60px color-mix(in srgb, var(--vp-shadow) 55%, transparent); }` to fx.css.
   - **[LOW] draw() allocs**: precompute an adjacency `Set` map once (reuse the `neighbours` map idea) and look it up in `draw()` instead of calling `connectedTo()` each frame; hoist the two font strings (`skillFont`/`otherFont`) per `draw()` call instead of per node.
   - **[LOW] mobile zoom note**: pinch-zoom on touch isn't implemented (buttons only); the Ctrl+wheel fix enables trackpad pinch. Leave `touch-action: pan-y` as-is (keeps mobile page-scroll). Optional: add touch-gesture pinch later.
2. Ask the user whether to **retire `CertWall`/`SkillsSection` on tech** now the graph covers that ground.
3. **Build the bar-page work-experience graph**: add `buildBarGraph()` to `data/graphData.js` (experiences ↔ skills, from the LinkedIn roles: Congress Hotel, Metropol, Miramar, Southern Sun, Subah Group, BFF, The Cocktail Tree, Vkusno → mixology/leadership/cost control/guest XP/etc.), parameterize `KnowledgeGraph` to accept the builder/variant, add a section to BarPage + `graph` i18n already exists (reuse/extend).
4. **Old Fashioned scroll animation** (bar): pinned/sticky section, scroll-scrubbed SVG assembly (glass→whiskey→sugar→bitters→muddle→ice→peel) via framer `useScroll`/`useTransform`. Decide vs. the existing interactive `CocktailBuilder` (keep both, or replace).
5. Housekeeping the user owns (see NOTES.md): export `public/og-image.png`; set GitHub/Discord URLs; create Plausible site (or swap to Umami); add remaining project images + bar cert PDFs; wire contact backend.

## TO PROVIDE ON RESUME
- Nothing required — all context is in the repo. The graph QA full output (if needed verbatim) is at `C:\Users\vardg\AppData\Local\Temp\claude\...\tasks\w4b4fpgf7.output`, but the fixes are already transcribed above. Optional: the user's real GitHub/Discord URLs and the og-image PNG when convenient.
