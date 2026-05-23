# NewMenu

A strict implementation of the project's **canonical page architecture** (see `.local_only/.context/.frontEnd_ararchitecture.md`), built as a one-to-one functional clone of the `menus copy/preview.html` design.

The route is mounted at `cloudKitchens_newMenu` (see `componentMap.jsx` + `cloudKitchens.config.jsx`) and shows up as a "NewMenu" entry in the Cloud Kitchens sidebar.

---

## Directory layout

```
newMenu/
├── NewMenu.jsx                    # page parent (renders sessionToggle + active session + modals + toast)
├── newMenu.config.js              # debug flags + tunables (toast duration, options-preview count)
├── README.md                      # you're reading it
│
├── _styles/                       # every component's CSS lives here, lowercase-first file naming
│   ├── newMenu.css                # design tokens + page-root layout
│   ├── newMenu_sessionToggle.css
│   ├── newMenu_session.css
│   ├── newMenu_confirmModal.css
│   ├── newMenu_form.css
│   ├── newMenu_toast.css
│   ├── newMenu_breadcrumb.css
│   ├── newMenu_iconBtn.css
│   ├── newMenu_pill.css
│   ├── newMenu_fieldRow.css
│   ├── newMenu_translations.css
│   ├── newMenu_dropZone.css
│   ├── newMenu_filePreview.css
│   ├── newMenu_quickView.css
│   ├── newMenu_emptyState.css
│   ├── newMenu_table.css          # shared table primitives
│   ├── newMenu_viewOne.css        # shared view-one card primitives
│   ├── newMenu_menu_viewOne.css
│   └── newMenu_item_viewOne.css
│
├── 01_newMenu_comps/              # top-level components (rendered directly by NewMenu.jsx)
│   ├── _newMenu_comps.index.js
│   ├── NewMenu_sessionToggle.jsx  # sticky top bar (4 tabs + breadcrumb + owner filter + create)
│   ├── NewMenu_session_menus.jsx  # session container: routes between view_all + view_one
│   ├── NewMenu_session_items.jsx
│   ├── NewMenu_session_modifiers.jsx
│   ├── NewMenu_session_options.jsx
│   ├── NewMenu_confirmModal.jsx   # double-confirm modal for any per-field save
│   ├── NewMenu_form.jsx           # 3-step creation wizard (reused by all 5 entity kinds)
│   ├── NewMenu_toast.jsx          # auto-dismissing status pill
│   │
│   └── newMenu_childComps/        # shared primitives + entity-specific tables/views
│       ├── _newMenu_childComps.index.js
│       ├── NewMenu_iconBtn.jsx
│       ├── NewMenu_pill.jsx
│       ├── NewMenu_breadcrumb.jsx
│       ├── NewMenu_ownerBadge.jsx
│       ├── NewMenu_fieldRow.jsx
│       ├── NewMenu_translations.jsx
│       ├── NewMenu_dropZone.jsx
│       ├── NewMenu_filePreview.jsx
│       ├── NewMenu_quickView.jsx
│       ├── NewMenu_emptyState.jsx
│       ├── NewMenu_table_menus.jsx
│       ├── NewMenu_table_items.jsx
│       ├── NewMenu_table_modifiers.jsx
│       ├── NewMenu_table_options.jsx
│       ├── NewMenu_menu_viewOne.jsx
│       ├── NewMenu_item_viewOne.jsx
│       ├── NewMenu_modifier_viewOne.jsx
│       └── NewMenu_option_viewOne.jsx
│
├── 02_newMenu_helpers/            # pure helpers
│   ├── _newMenu_helpers.index.js
│   ├── formatDate.js              # relative-time formatter ("Today, 5 minutes ago")
│   ├── formatBytes.js
│   ├── dataAdapter.js             # bridges nested mock → flat indexed shape
│   ├── buildBreadcrumb.js         # derives the breadcrumb trail from state + handlers
│   └── getCompProps.js            # builds the flat-props bundle per component
│
├── 03_newMenu_hooks/              # the page hook layer (state machine)
│   ├── _newMenu_hooks.index.js
│   ├── useNewMenu_states.js       # every useState + setters
│   ├── useNewMenu_apiHelpers.js   # API wrappers (currently mocks); same { success, message, data } envelope as the rest of the app
│   ├── useNewMenu_handlers.js     # every event handler + the goto() navigator
│   └── useNewMenu.js              # orchestrator (composes states + handlers + apiHelpers + side-effects + builds compProps)
│
├── 04_newMenu_vld/                # placeholder; populate when forms wire to real backend
├── 05_newMenu_cnst/
│   ├── _newMenu_cnst.index.js
│   ├── newMenu_cnst.js            # session / viewingType / ownerType / form-kind enums
│   ├── newMenu_tableHeaders.js    # header definitions for each entity's table
│   └── newMenu_mockSource.js      # re-exports MOCK_DATA from the existing temp folder
├── 06_newMenu_memo/               # placeholder; reserved for heavier memoised derivations
└── 07_newMenu_test/               # placeholder; no test framework configured yet
```

---

## How the architecture doc is honoured

| Doc rule | Where it lives in NewMenu/ |
|---|---|
| Plain JS / JSX (no TypeScript) | Everywhere — no `.ts` / `.tsx` |
| Page directory is camelCase + lowercase first letter | `newMenu/` |
| Parent component file is `XXX.jsx` matching dir name | `NewMenu.jsx` |
| Numbered sub-dirs `01_…` → `07_…` | All seven exist |
| Hook layer split (states / apiHelpers / handlers / orchestrator) | `03_newMenu_hooks/` |
| CSS file naming: lowercase-first stem of component | `_styles/newMenu_sessionToggle.css`, etc. |
| Root className `"ComponentName"`, internals `"ComponentName_part"` | `<div className="NewMenu_sessionToggle">…<aside className="NewMenu_sessionToggle_actions">…` |
| **No `-` and no `__`** in classNames | Verified — only single underscores |
| `compProps.<Component>_props` per component, spread directly | `<NewMenu_sessionToggle {...compProps.NewMenu_sessionToggle_props} />` |
| i18n through `useTranslation` extracted in the page hook | `useNewMenu` calls `useTranslation("newMenu")` and threads `t` through `compProps` |
| Every user-visible string has i18n key with `defaultValue` fallback | Every `t()` call passes `defaultValue` so missing locale keys never show raw strings |
| CSS uses theme variables, not raw colors | `newMenu.css` defines `--newMenu_*` tokens with `var(--bg-primary-color, …)` fallbacks |
| Barrels (`_index.js`) for imports | Each numbered sub-dir has one |
| API helpers return `{ success, message, data }` envelope | `useNewMenu_apiHelpers.js` |
| Lazy + Suspense at the route level | Already done in `componentMap.jsx` via `lazy(() => import(...))` |

---

## How the state machine works

```
                                    ┌─────────────────────────────────┐
                                    │       useNewMenu (parent)       │
                                    │                                 │
                                    │  useNewMenu_states     ──┐      │
                                    │  useNewMenu_apiHelpers ──┤      │
                                    │  useNewMenu_handlers   ──┤      │
                                    │                          │      │
                                    │  useEffect(fetch for session)   │
                                    │  useEffect(toast auto-dismiss)  │
                                    │                          │      │
                                    │  getCompProps(states,    │      │
                                    │               handlers,  │      │
                                    │               t)         │      │
                                    └────────────┬─────────────┘      │
                                                 │                    │
                                                 ▼                    │
                                          compProps bundle            │
                                                 │                    │
                ┌────────────────────────┬───────┴────────┬───────────┴────────────┐
                ▼                        ▼                ▼                        ▼
   NewMenu_sessionToggle    NewMenu_session_*    NewMenu_confirmModal   NewMenu_form + NewMenu_toast
   ({...sessionToggle_props}) ({...session_X_props}) ({...confirmModal_props}) ({...form_props}, {...toast_props})
```

Every component receives a **flat-props bundle** (`{...compProps.X_props}`); none of them call `useTranslation` themselves — `t` is threaded through props.

### State transitions

| Action | Result |
|---|---|
| Click a session tab in `NewMenu_sessionToggle` | `goto(session, "all", null)` — resets edits + confirm + selection |
| Click `View` on a row | `goto(session, "single", id)` — resolves the entity from cache and renders the view-one |
| Click `Update` on a row | Same as `View`, plus `isUpdating = true` |
| Click `+ New <thing>` | `openCreate(session)` → `showForm = "<entity kind>"` → `NewMenu_form` mounts |
| Submit the form | `handleCreate(payload)` → `apiHelpers.createEntity(payload)` → closes form + sets toast |
| Per-field pencil → check | `setEditingField(fieldKey)` → check pops `requestConfirm({fieldLabel, prev, next, onCommit})` → `NewMenu_confirmModal` opens |
| Confirm modal `Yes, confirm` | Runs `onCommit`, clears confirm, sets toast |
| Brand / Competitor button | Tri-state toggle: `both` ↔ single owner |

---

## Mock data source

The page imports its demo data from the existing `.temp_MOCK_DATA/` folder so you only have one mock source to maintain:

```js
// 05_newMenu_cnst/newMenu_mockSource.js
export {
  MENUS, MOCK_MENU_ITEMS, MODIFIERS, OPTIONS, CATEGORIES,
} from "../../03_cloudKitchens/menus copy/05_menus_cnst/.temp_MOCK_DATA/_MOCK_DATA.index.js";
```

When the real API lands, replace that single file with the fetch wrappers in `useNewMenu_apiHelpers.js`. No other file in `newMenu/` references the temp folder directly.

---

## Things NOT carried over from the preview (intentional)

| Preview thing | Why it isn't in NewMenu/ |
|---|---|
| `AppShell` (fake sidebar + topbar + dashboard chrome) | The real admin layout provides this in production. |
| `window.MOCK / window.I / window.FLAGS` globals | We import from real ES modules instead. |
| The "First option preview" image on a modifier's detail page | Modifiers don't have images — the modifier detail uses a clearly-labelled "Options" preview chip strip instead. |
| `<script type="text/babel">` runtime JSX compilation | Vite handles JSX at build time. |

---

## Where to extend next

- **Real persistence** — replace mock calls in `useNewMenu_apiHelpers.js` with endpoint entries from `03_config/apiEndpoints/adminEndpoints/ADMIN_endpoints.js`, keeping the `{success, message, data}` envelope.
- **Per-field validators** — wire into `04_newMenu_vld/` and call from `requestConfirm` before committing.
- **More translations** — populate `frontEnd/public/locales/{ar,ru,hy}/newMenu.json` (currently stubs).
- **Tests** — once a frontend framework is chosen, drop spec files under `07_newMenu_test/`.
