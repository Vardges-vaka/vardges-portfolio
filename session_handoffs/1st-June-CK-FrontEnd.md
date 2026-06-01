## RESUME DIRECTIVE
You are continuing an in-progress session: the cloud-kitchens admin UI refactor (sidebar IA + 9 new feature scaffolds) plus a portable toast notification system in the `vardges.me` MERN dashboard. Read everything below, then begin with the Next Steps. Do not re-derive settled decisions.

## SESSION
- Goal: (1) lock the cloud-kitchens sidebar IA and scaffold 9 new feature folders to match the existing `cK_competitors` template; (2) build a portable notification/toast system, refactor for clean separation, expose a grouped `TOAST` API, and wire it into every feature hook; (3) add READMEs everywhere and make the toast CSS fully self-contained for porting to other apps.

## ENVIRONMENT
- Worked in: Claude Code CLI on Windows 11 (PowerShell shell), IDE context (Cursor/VS Code).
- Continuing in: Code (IDE).

## CURRENT STATE
- **Sidebar IA locked** — 10 groups: Dashboard · Map Studio · Simulation · Sales & Orders · Menus · Recipes & Stock · Marketing · Competitors · Kitchens · Setup. Documented in `frontEnd/src/10_pages/admin/_adminFeatures/04_cloudKitchens_new/cloudKitchens_README.md`.
- **10 feature scaffolds exist** under `04_cloudKitchens_new/cK_*/` — match the `cK_competitors` template: 7 numbered subdirs (`01_*_comps` … `07_*_test`) + `_styles/` + `CK_<feat>.jsx` + `cK_<feat>.cinfig.js` + `cK_<feat>.README.md`.
- **Notification system built and refactored:**
  - Provider state-only at `frontEnd/src/02_context/notificationContext/NotificationContext.jsx`.
  - UI under `components/` — `NotificationContainer.jsx`, `NotificationToast.jsx`, `NotificationIcons.jsx`.
  - Pure helpers in `notificationContext_hlprs.js` (id gen, dedup hash, error parsing, max-stack drop, resolveMessage).
  - Constants in `notification.constants.js` (`VALID_KINDS`, `DEFAULT_DURATION=4000`, `MAX_STACK=5`, `DEDUP_WINDOW_MS=500`, `EXIT_ANIMATION_MS=220`).
  - **Self-contained CSS** in `components/notificationContext.css` — all `--notify-*` variables baked in; light/dark resolution via `prefers-color-scheme` AND `[data-theme]`. Removed from `09_styles/lightTheme.css` and `darkTheme.css`.
  - README at `frontEnd/src/02_context/notificationContext/README.md` covers features, file layout, full API, behaviors, customization, theme detection, constants, architecture, deps, porting steps.
- **TOAST namespace** is the public surface — `useMemo`-stable. Pattern: `const { TOAST } = useNotificationContext(); TOAST.success({...})`. Individual methods (`success`, `error`, etc.) also still exposed for backward compat.
- **TOAST wired into all 10 feature hooks** — every `useCK_<feat>.js` imports `useNotificationContext`, destructures `TOAST`, passes it to handlers, and returns it. Path used: `../../../../../../02_context/context.index.js` (6 levels up).
- **Dashboard demo** at `04_cloudKitchens_new/cK_dashboard/CK_dashboard.jsx` exercises all 7 TOAST methods (success/error/warning/info/promise/notifyApiError/clear) with realistic shapes.
- **91 READMEs written**: 1 top-level + 10 feature roots + 70 numbered subdirs + 10 `_styles` dirs.
- **Old `03_cloudKitchens/` still active.** `componentMap.jsx` (lines 14–35) and `cloudKitchens.config.jsx` still point to the legacy paths. The new `04_cloudKitchens_new/` is NOT yet wired into routing — that's the next major step.

## WHAT HAPPENED
- **Decisions made**
  - 10 sidebar items, not 25+. Each = one `subSection` under route `dashboard/:section?/:subSection?`; in-page tabs are component state (mirrors Menus + branches `sectionMap.js`). No routing changes needed for the refactor.
  - Cross-cutting "tools" group at top of sidebar (Dashboard / Map Studio / Simulation) — they read many schemas, own none. Visual divider recommended.
  - Simulation has its own item (not folded into Map Studio) — covers pricing, costs, commission, AND map/coverage what-ifs. Map Studio remains the *editor* for real coverage; Simulation reuses the same map component for hypothetical scenarios.
  - `TOAST` chosen over user's first idea `SEND_NOTE` — shorter, universal toast-notification terminology, reads cleanly with method calls.
  - **Auto-dismiss timer moved from provider → Toast component.** This is what makes pause-on-hover clean — Toast's `useEffect` deps are `[paused, duration, exiting, onClose]`. Provider only manages the 220ms exit-animation timer.
  - **All `--notify-*` CSS vars live ONLY in `components/notificationContext.css`** now (with light defaults + `prefers-color-scheme: dark` + `[data-theme="dark/light"]` overrides). Removed from project-wide theme files so the system is portable.
  - Test-dir barrel filename has NO leading underscore: `cK_<feat>_test.index.js`. All other barrels: `_cK_<feat>_<type>.index.js`. Quirk inherited from the original `cK_competitors` template — preserved for consistency.
- **Ruled out**
  - 25+ flat sidebar items.
  - Action buttons in toasts (user explicitly excluded — "everything except action buttons").
  - Mobile-bottom toast positioning (not in user's approved 4 UI items).
  - `SEND_NOTE`, lowercase `notify` as the grouped namespace name.
  - Brand as its own sidebar item — recommended folding into header context-switcher + Setup CRUD (user hasn't confirmed yet — see Open Questions).
  - PDF-based Contract schema closure — only ~4 of ~22 contracts reviewed; Contract.js carries a DRAFT/partial-review warning at the top of the file.

## KEY FACTS & CONSTRAINTS
- **Project conventions** (from root `CLAUDE.md`)
  - Context API only — no Redux/Zustand. Existing: Theme, Language, Profile, User, Notification (just added).
  - All colors must use CSS variables — never inline hex.
  - All user-visible strings through `useTranslation`. Locales: `en/ar/ru/hy`.
  - Backend response envelope: `{ success, message, data }`. `TOAST.notifyApiError(err)` reads this shape.
- **32 backend schemas all exist on disk** — schema → sidebar-group mapping in `cloudKitchens_README.md`. Schema details in `backEnd/06_models/cloudKitchen/cloudKitchen_info/LAYOUT.md`.
- **Frontend nav arch**: `dashboard/:section?/:subSection?` route → `componentMap[section][subSection]` renders. Section = `cloudKitchens`/`me`/`settings`/`vkusno` (top header level). The 10 new groups will be subSections.
- **Feature hook return shape**: `{ states, handlers, childProps, t, TOAST }`. Handlers receive `TOAST` as a param too.
- **Notification system deps**: only `react`, `react-dom`, `prop-types`. Zero project-specific imports for styling.
- **5 toast kinds**: success, error, warning, info, loading. Loading has no close button + no auto-dismiss; spinner SVG animates.
- **Dedup**: identical `kind|title|message` within 500ms suppressed.
- **Max stack**: 5; overflow drops oldest silently (no exit animation).
- **EXIT_ANIMATION_MS = 220** must stay in sync with the CSS exit animation duration. If you change one, change both.
- **Memus tech-debt**: `03_cloudKitchens/` still has 5 menu variants (`claudeMenus`, `menus`, `menus copy`, `newMenu`, `_shared_menu`) — to be consolidated when the Menus group is wired in `04_cloudKitchens_new/`.
- **User preference (persistent memory)**: lead with recommendation, concise responses. "When you dump too much info it is really hard to go through it." Don't enumerate options unasked.
- **Naming quirks**: `cinfig.js` (not `config.js`) — typo preserved from user's original placeholders, intentional consistency. `recipesAndStock` (corrected from earlier `recipesAnStock`).

## OPEN QUESTIONS
- **Brand placement**: my recommendation is *header context-switcher (filters all views by brand) + CRUD tab in Setup*, instead of a sidebar item. User has not confirmed.
- **In-page tab state**: my recommendation is *component-internal state* (matches today's Menus + branches `sectionMap` pattern). Alternative: `?tab=` query param for bookmarkable URLs. Deferred — fine to keep component-internal until shareable URLs become a real need.
- **When to delete the old `03_cloudKitchens/`**: only after `04_cloudKitchens_new/` is wired, demo'd in browser, and the menu-variant consolidation lands.
- **Scenario schema for Simulation**: not designed yet. Will need `{ kind, baseline, overrides (Mixed), results (Mixed), notes, ...AUDIT }` shape, mirroring the existing `kind + Mixed` pattern used by `AdSpend` / `Campaign`.

## NEXT STEPS
1. **Wire `04_cloudKitchens_new/` into routing.** Replace the 10 entries under `componentMap.cloudKitchens` in `frontEnd/src/10_pages/admin/adminDashboard/05_adminDashboard.constances/componentMap.jsx` to lazy-import the new `CK_<feat>.jsx` files. Update `cloudKitchens.config.jsx` (sidebar items) — 10 groups in the order: Dashboard, Map Studio, Simulation, Sales & Orders, Menus, Recipes & Stock, Marketing, Competitors, Kitchens, Setup. Add icons (most already imported); add i18n keys to `en/ar/ru/hy` locale files. Verify in browser.
2. **Build a reusable `<FeatureGroupShell tabs={...} />`** wrapper (tab strip + lazy panel; mirrors the branches `sectionMap` pattern). Each feature page mounts the shell with its tabs config. Keep tabs as component-internal state (no route change).
3. **Wire tabs for the 3 already-built features** — Kitchens (Branches/Equipment/Staff), Menus (consolidate the 5 messy variants), Competitors (Table/Map). For the 7 net-new groups, stub each tab with a "coming soon" placeholder so the sidebar is fully navigable.
4. **Confirm the Brand decision with the user** before starting Setup-group implementation (header context-switcher vs sidebar item shapes everything downstream).
5. **Then back to backend**: design `Scenario` schema for Simulation; resume Contract once more PDF samples are reviewable; align Menu layer (5 files) with `modelHelpers/.temp.index.js` imports; fix `aggrigator` typo in `helpers.temp.js` line 116.

## TO PROVIDE ON RESUME
- Nothing required — all context is in-tree.
- If running locally: `frontEnd/.env` must exist (Vite proxy config) and backend needs `MONGODB_URL` + (for storage features) `GOOGLE_APPLICATION_CREDENTIALS` / `GCS_BUCKET_NAME` / `GCP_PROJECT_ID`. See root `CLAUDE.md`.
