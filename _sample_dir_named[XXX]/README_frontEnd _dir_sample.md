# Sample Page Directory Structure

This is a **reference sample** showing the canonical directory layout for a page in `frontEnd/src/05_pages/`. Replace `XXX` with the real page name (e.g., `Contact`), `YYY` with a component name (e.g., `ContactForm`), and `ZZZ` with a child component name (e.g., `SubmitButton`).

For full rules, naming conventions, and code examples, see: `.cursor/Directory_Architecture.md`

---

## Directory Tree

```
└── 📁 XXX/                                          (Page directory — PascalCase, e.g. Contact/)
    ├── XXX.jsx                                       (Main parent component — the page entry point)
    ├── XXX.config.js                                 (Debug flags: XXX_UI_debug, XXX_Hooks_debug, etc.)
    │
    ├── 📁 _styles/                                   (ALL CSS files for ALL components in this directory)
    │   ├── xXX.css                                   (CSS for the parent component XXX.jsx)
    │   ├── xXX_YYY.css                               (CSS for component XXX_YYY.jsx)
    │   └── xXX_YYY_ZZZ.css                           (CSS for child component XXX_YYY_ZZZ.jsx)
    │
    ├── 📁 01_XXX_comps/                              (UI components composed by XXX.jsx)
    │   ├── _XXX_comps.index.js                       (Barrel file — re-exports all components)
    │   ├── XXX_YYY.jsx                               (Component file — prefixed with parent name)
    │   └── 📁 XXX_childComps/                        (Child components used BY components above)
    │       ├── _XXX_childComps.index.js              (Barrel file for child components)
    │       └── XXX_YYY_ZZZ.jsx                       (Child component — full lineage in filename)
    │
    ├── 📁 02_XXX_helpers/                            (Pure helper functions — always create, even if empty)
    │   └── _XXX_helpers.index.js                     (Barrel file)
    │
    ├── 📁 03_XXX_hooks/                              (Hooks — always create dir + barrel. Add 4 files only if page needs state/logic)
    │   ├── _XXX_hooks.index.js                       (Barrel file)
    │   ├── useXXX_states.js                          (All useState calls → returns { states, setters })
    │   ├── useXXX_handlers.js                        (Event handlers → returns { handlers })
    │   ├── useXXX_apiHelpers.js                      (API wrappers → returns { apiHelpers })
    │   └── useXXX.js                                 (Main hook — assembles above, builds compProps, returns all)
    │
    ├── 📁 04_XXX_vld/                                (Validation & sanitization — always create, even if empty)
    │   └── _XXX_vld.index.js                         (Barrel file)
    │
    ├── 📁 05_XXX_cnst/                               (Constants — always create, even if empty)
    │   └── _XXX_cnst.index.js                        (Barrel file)
    │
    ├── 📁 06_XXX_memo/                               (React.memo comparison functions — always create, even if empty)
    │   └── _XXX_memo.index.js                        (Barrel file)
    │
    └── 📁 07_XXX_test/                               (Tests — always create, even if empty)
        └── _XXX_test.index.js                        (Barrel file)
```

---

## File-by-File Guide

Each file in this sample contains a **detailed header comment block** explaining:
- The file's role and purpose
- Naming rules for the file, its exports, and related classNames
- What it receives (parameters/props) and what it returns
- Import rules (where to import from, barrel-only rule)
- Cross-references to the relevant section in `Directory_Architecture.md`

### Files at root level

| File | Role | Key rule |
|------|------|----------|
| `XXX.jsx` | Parent component (page entry point) | Calls `useXXX()`, spreads `compProps` onto each component |
| `XXX.config.js` | Debug flags | All flags `false` by default, flip locally for debugging |

### `_styles/` — CSS files

| File | Styles for | Root className |
|------|-----------|---------------|
| `xXX.css` | `XXX.jsx` (parent) | `.xXX` |
| `xXX_YYY.css` | `XXX_YYY.jsx` (component) | `.xXX_YYY` |
| `xXX_YYY_ZZZ.css` | `XXX_YYY_ZZZ.jsx` (child) | `.xXX_YYY_ZZZ` |

### `01_XXX_comps/` — Components

| File | Role | Key rule |
|------|------|----------|
| `_XXX_comps.index.js` | Barrel — re-exports all components | Only import path for external code |
| `XXX_YYY.jsx` | Component used by `XXX.jsx` | Receives props via `{...compProps.XXX_YYY_props}` |

### `01_XXX_comps/XXX_childComps/` — Child components

| File | Role | Key rule |
|------|------|----------|
| `_XXX_childComps.index.js` | Barrel — re-exports all child components | Only import path for parent components |
| `XXX_YYY_ZZZ.jsx` | Child component used by `XXX_YYY.jsx` | Receives props via `{...childProps.XXX_YYY_ZZZ_props}` |

### `02_XXX_helpers/` — Helpers

| File | Role |
|------|------|
| `_XXX_helpers.index.js` | Barrel — empty until helpers are needed. Pure functions only. |

### `03_XXX_hooks/` — Hooks (the logic layer)

| File | Role | Returns |
|------|------|---------|
| `_XXX_hooks.index.js` | Barrel — re-exports all hooks | — |
| `useXXX_states.js` | State declarations | `{ states, setters }` |
| `useXXX_handlers.js` | Event handlers | `{ handlers }` |
| `useXXX_apiHelpers.js` | API call wrappers | `{ apiHelpers }` |
| `useXXX.js` | Main hook — orchestrates everything | `{ t, states, handlers, compProps }` |

### `04`–`07` — Optional content directories

| Directory | Barrel file | Purpose |
|-----------|-------------|---------|
| `04_XXX_vld/` | `_XXX_vld.index.js` | Validation & sanitization functions |
| `05_XXX_cnst/` | `_XXX_cnst.index.js` | Page-specific constants (UPPER_SNAKE_CASE) |
| `06_XXX_memo/` | `_XXX_memo.index.js` | React.memo comparison functions |
| `07_XXX_test/` | `_XXX_test.index.js` | Test files |

---

## Data Flow Summary

```
useXXX.js (main hook)
  ├── useXXX_states()      → { states, setters }
  ├── useXXX_apiHelpers()  → { apiHelpers }
  ├── useXXX_handlers()    → { handlers }
  ├── builds compProps:
  │     XXX_YYY_props     = { states, handlers, t, childProps: { XXX_YYY_ZZZ_props } }
  │     XXX_AAA_props     = { states, handlers, t }
  └── returns { t, states, handlers, compProps }

XXX.jsx (parent)
  ├── const { t, states, handlers, compProps } = useXXX()
  ├── <XXX_YYY {...compProps.XXX_YYY_props} />
  └── <XXX_AAA {...compProps.XXX_AAA_props} />

XXX_YYY.jsx (component)
  ├── receives { states, handlers, t, childProps }
  └── <XXX_YYY_ZZZ {...childProps.XXX_YYY_ZZZ_props} />

XXX_YYY_ZZZ.jsx (child component)
  └── receives { states, handlers, t } → renders leaf UI
```

---

## Quick Rules Checklist

- [ ] All 8 directories + barrel files exist
- [ ] Component files are prefixed: `XXX_YYY.jsx`, `XXX_YYY_ZZZ.jsx`
- [ ] CSS files in `_styles/` only: `xXX.css`, `xXX_YYY.css`, `xXX_YYY_ZZZ.css`
- [ ] Root className carries full lineage: `xXX_YYY_ZZZ`
- [ ] Internal classNames: `root_elementName` — single underscore, never double (`__`)
- [ ] All imports go through barrel files — never import directly from a component file
- [ ] `compProps` built in main hook — each component gets `XXX_YYY_props`
- [ ] Translations extracted in main hook only — passed down through props
- [ ] Debug flags in `XXX.config.js` — default to `false`
