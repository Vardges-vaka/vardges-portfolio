# Brands Feature — Frontend UI/UX Design Specification

---

## What We Are Designing

This is the **Brands management page** inside the admin dashboard of **vardges.me** — a private, full-stack MERN web application (React 19 + Express + MongoDB) built as a personal operations management platform for a **dark kitchen chain business operating in Dubai, UAE**. The admin dashboard is protected (auth-only, superAdmin role).

The Brands feature manages the cloud kitchen brand entities that the business operates. Each brand can have: logos, social media presence, legal files, contracts, branding documents, inventory integrations, sales integrations, employee rosters, branch locations, menus, and competitor tracking. The goal of this page is to give the operator a fast, information-dense command center for every brand — replacing a heavily nested detail view with a session-based navigation model.

---

## Technical Context

- **Stack:** Plain React 19 + hand-written CSS (no Tailwind, no component library). All colors via CSS custom properties. Two themes: light and dark, applied via `data-theme` attribute on root.
- **State architecture:** Context API only (no Redux). Four global contexts: Theme, Language, Profile, User.
- **Session model:** Instead of modals or sidebars, the page uses an in-page "session router." The main content area swaps entirely between sessions (like a mini-router within the brands page). Sessions are navigated with a `← Back` button that always returns to the brands table. Only one session is active at a time.
- **i18n:** Every user-visible string uses `useTranslation("brands")`. 4 locales: en, ar, ru, hy.
- **Data already loaded on page mount:** All brands, all branches, all employees, all menus — fetched in parallel.

---

## Color Palette

### Light Theme
- **Brand primary:** deep slate `#2c3e50`
- **Brand secondary / CTA:** teal-green `#18bc9c`
- **Brand accent:** blue `#007bff`
- **Danger:** red `#e74c3c` / `#dc2626`
- **Page background:** white `#ffffff`
- **Surface / card:** light grey `#f9fafb`
- **Subtle surface:** `#f0f2f5`
- **Primary text:** `#1a1a1a`
- **Secondary text:** `#4a4a4a`
- **Muted / placeholder:** `#9ca3af`
- **Borders (soft):** `#e5e7eb`
- **Borders (regular):** `#d1d5db`
- **Hover background:** `#f3f4f6`
- **Hover border:** `#d1d5db`
- **Count badge bg:** `#e0e7ef`
- **Admin active accent:** `#007bff`
- **Admin active surface:** `#e3f2fd`
- **Admin active text:** `#1976d2`
- **Success green:** `#22c55e`

### Dark Theme
- **Page background / brand primary:** deep purple `#5c008b`
- **Surface / card:** dark purple `#2e005d`
- **Tertiary surface:** medium purple `#8e008b`
- **Primary text:** white `#ffffff`
- **Secondary text:** light lavender `#e0d4ea`
- **Muted:** `#c6a0cf`
- **Borders:** `#8e008b`
- **Hover bg:** `#2e005d`
- **Hover text / accent:** orange `#ff8300`
- **Hover border:** orange `#ff8300`
- **Count badge bg:** `#2d3748`
- **Admin active accent:** `#4a9eff`
- **Admin active surface:** `#1e3a5f`
- **Admin active text:** `#66b3ff`
- **Success green:** `#22c55e`

### CSS Variable Convention
All colors in component CSS must use CSS variables, never raw hex values:
```
--bg-primary-color, --bg-secondary-color, --bg-tertiary-color
--text-primary-color, --text-secondary-color
--border-primary-color, --border-secondary-color
--btn-primary-bg-color, --btn-primary-text-color, --btn-primary-bg-color-HOV
--brands-table-border, --brands-table-header-bg, --brands-table-row-bg
--brands-table-row-bg-hov, --brands-table-count-bg, --brands-table-count-text
--brands-table-tooltip-bg, --brands-table-tooltip-border, --brands-table-tooltip-shadow
--brands-table-icon-btn-bg, --brands-table-icon-btn-bg-hov
--brands-add-btn-color, --brands-add-btn-hover-bg
--brands-delete-btn-color, --brands-delete-btn-hover-bg
--brands-badge-active-bg, --brands-badge-active-text
--brands-badge-inactive-bg, --brands-badge-inactive-text
--brands-card-bg, --brands-card-border
--brand-secondary (teal/orange accent)
```

---

## Session Architecture

The brands page has one active session at a time. A `← Back` button always returns to `brands_view`. Sessions never stack — they replace the content area entirely.

```
brands_view        ← DEFAULT: the master table
  ↓ click logo (no logo)
logo_edit          ← upload new logo
  ↓ cancel / success
logo_view          ← view current logos with download/view buttons
  ↓ "Edit logos" button
logo_edit

  ↓ click branches count or View btn
branches_view      ← map + branch cards
  ↓ "Edit" button
branches_edit      ← add / remove branches from brand

  ↓ click employees View btn
employees_view     ← employee table with expand
  ↓ "Edit" button
employees_edit     ← add / remove employees from brand

  ↓ click equipment View btn
equipment_view     ← equipment table with expand
  ↓ "Edit" button
equipment_edit     ← add / remove equipment from brand

  ↓ click menu View / Assign btn
menu_view          ← menu details, categories, item counts
  ↓ "Change menu" button
menu_edit          ← assign / unassign menu

  ↓ click competitors View btn
competitors_view   ← competitor cards / list
  ↓ "Edit" button
competitors_edit   ← add / remove competitors

  ↓ click Files View btn
files_view         ← all brand files organized by category

  ↓ click Update icon → tooltip → specific section or "Update all"
all_edit           ← full brand detail view (bulk edit all sections)
  ↓ Back
brands_view

  ↓ click View icon → tooltip → specific section or "View all"
all_view           ← full brand detail view (read-only)
  ↓ Back
brands_view
```

Each session (other than `all_edit` / `all_view`) is a focused, purpose-built UI. The session shell always shows: `← Back` button + session title + brand name as subtitle.

---

## Session 1 — `brands_view` (Master Table)

### Overall Layout
Full-width table. Light row separators. No heavy card borders. Horizontally scrollable on small screens. The table is the default and home base.

**Table header row** (fixed columns):
```
# | Logo | Branches | Employees | Equipment | Competitors | Menu | Files | ✎ | 👁
```

- `#` — 40px, centered. Row number.
- `Logo` — 72px, centered.
- `Branches` — auto, centered. Count badge + icon-only mini buttons.
- `Employees` — auto, centered. Same.
- `Equipment` — auto, centered. Same.
- `Competitors` — auto, centered. Same.
- `Menu` — flex, left. Menu name or assign button.
- `Files` — auto, centered. Count + size.
- `✎` (Update) — 44px, centered. Pencil SVG icon in header.
- `👁` (View) — 44px, centered. Eye SVG icon in header.

---

### Logo Column

**State A — No logo uploaded:**
A dashed-border button, ~48×48px. Inside: an image-with-plus SVG icon + text label "Add logo". Clicking navigates to `logo_edit` session.

**State B — Logo exists, signed URL loaded:**
Shows the actual logo image at 48×48px, `object-fit: contain`. The entire image is a clickable button. Clicking opens `logo_view` session.

**State C — Logo exists, signed URL still loading:**
Small grey placeholder block with a subtle shimmer animation. Below it, a small edit-icon button that navigates to `logo_edit`.

---

### Branches Column

A count badge (rounded pill, `count` number inside) + two **icon-only** mini buttons placed inline to the right of the badge.

- **Badge:** if `branchCount > 0`, hovering the count shows a tooltip listing all branch names (one per line). If count is 0, badge shows `0` and buttons are present but dimmed.
- **`+` (Assign) icon button:** opens `branches_edit` session. Title attribute: "Assign branches".
- **Eye icon button:** opens `branches_view` session. Title attribute: "View branches".

Layout: `[count badge] [+ icon btn] [eye icon btn]` — all on one horizontal line, vertically centered in the cell.

---

### Employees Column

Identical pattern to Branches:
- Count badge + hover tooltip listing employee names (first + last name).
- `+` icon button → `employees_edit` session.
- Eye icon button → `employees_view` session.

---

### Equipment Column

Identical pattern to Branches/Employees (no tooltip on hover — just count):
- Count badge.
- `+` icon button → `equipment_edit` session.
- Eye icon button → `equipment_view` session.

---

### Competitors Column

Identical pattern (no tooltip — count only):
- Count badge.
- `+` icon button → `competitors_edit` session.
- Eye icon button → `competitors_view` session.

Note: The Competitor model does not exist yet. Currently stored as plain ObjectId references. The UI should render gracefully with "0 competitors" and all buttons present.

---

### Menu Column

**State A — No menu assigned:**
A single dashed-border assign button with `+` icon and label "Assign". Clicking → `menu_edit` session.

**State B — Menu assigned:**
- Menu name text (truncated with ellipsis, max ~120px wide) with `title` attribute showing full name.
- Eye icon button → `menu_view` session.
- Pencil icon button → `menu_edit` session (to change or unassign).

All three elements inline horizontally.

---

### Files Column

Shows a summary of all files stored for this brand.

- **Count number:** total count of all non-empty file fields across the brand (logos + branding files + contracts + legal files + menus PDF/Excel/Word + recipe files + miscellaneous). Files is calculated client-side from the brand document.
- **Size:** total size of all uploaded logos (where `logosMeta.{type}.size` is known). Formatted: `<1024 → "X B"`, `< 1 MB → "X.X KB"`, `≥ 1 MB → "X.XX MB"`. If no size data: omit.
- **Eye icon button:** navigates to `files_view` session.

Layout: `[count] • [size if available] [eye btn]` on one line.

---

### Update Column (✎)

A small icon button (pencil SVG) with a subtle border. Clicking it opens a dropdown popup **below** the button. The popup lists:

```
[ Update all  ]  ← bold, primary color
─────────────
[ Basic info  ]
[ Logos       ]  ← navigates to logo_edit
[ Socials     ]
[ Website     ]
[ Other socials]
[ Inventory integrations ]
[ Sales integration ]
[ Legal       ]
[ Relations   ]
```

- "Update all" → `all_edit` session (bulk edit of all sections).
- "Logos" → `logo_edit` session.
- All other specific sections → `all_edit` session (scrolled/focused to that section — future enhancement; for now same as "Update all").
- Clicking outside the popup closes it.
- When the popup is open, a transparent click-away overlay sits behind it (z-index 99) to handle outside clicks.
- The icon button itself gets a highlighted state (primary color bg + white icon) while popup is open.

---

### View Column (👁)

Same popup pattern as Update but for viewing:
```
[ View all    ]  ← bold, primary color
─────────────
[ Basic info  ]
[ Logos       ]  ← navigates to logo_view
[ Branches    ]  ← navigates to branches_view
[ Employees   ]  ← navigates to employees_view
...
```

---

### Table Header (Add Brand)

Above the table: page title `"Brands"` on the left, `"+ Add brand"` primary button on the right. Clicking opens the Add Brand form (a compact inline form or modal — already implemented; just place it above/outside the table).

---

## Session 2 — `logo_view` / `logo_edit`

*(Already implemented — document for completeness)*

### `logo_view`
- Session topbar: `← Back` | title "Logo Gallery" | brand name.
- Lists all 6 logo types (PNG, JPG, SVG, highRes, PDF, ICO) as horizontal rows.
- Each row: `[TYPE badge]` + file size (e.g. `45.2 KB`) + MIME type label + `[↓ Download]` button + `[👁 View]` button (disabled for non-viewable types like ICO with tooltip "Preview not available").
- Types not uploaded show greyed-out "Not uploaded".
- `[Edit logos]` primary button at bottom right → switches to `logo_edit`.

### `logo_edit`
- Session topbar: `← Back` | title "Logo Manager" | brand name.
- Provider selector strip: `[GCS] [S3] [R2] [Azure]` — disabled if provider not enabled.
- Per active logo type: a row showing Current preview (left) → New file dropzone (right).
  - If file selected: shows file name + size + MIME below (or replacing dropzone for non-image types).
  - During upload: real progress bar (XHR-based, actual byte progress) per file type showing 0–100%.
- `[+ JPG] [+ SVG] ...` chips to add more logo types.
- `[Cancel]` + `[Upload logos]` in footer.
- Confirmation step: shows list of files to upload with sizes + provider name.
- After success → auto-returns to `logo_view`.

---

## Session 3 — `branches_view` / `branches_edit`

### `branches_view` — Layout

Session topbar: `← Back` | title "Branches" | brand name.

**Right side of topbar:** `[Edit branches]` button → switches to `branches_edit`.

The view is split into two panels side by side (on desktop), stacked on mobile:

**Left panel — Map (~55% width):**
- An interactive map (Google Maps or similar) centered on Dubai.
- All branches belonging to this brand are pinned. Each pin shows the branch name on hover.
- A toggle button `[Show coverage areas]` / `[Hide coverage areas]` overlaid on the map. When enabled, draws the coverage polygon or radius circle for each branch on the map in a semi-transparent color.
- Pins are clickable — clicking a pin highlights the corresponding branch card on the right.

**Right panel — Branch cards (~45% width, scrollable):**
Each branch in the brand's roster is a card. Cards are stacked vertically. A card contains:

```
┌─────────────────────────────────────────────────────┐
│  🟢 Business Bay, Cuisinette                         │
│  Marasi Dr - Business Bay - Dubai                    │
│                                                      │
│  ⏰ 24 hours / Open since Jan 2024                   │
│  📞 Support: +971 50 XXX XXXX                        │
│  👤 Manager: John Smith                              │
└─────────────────────────────────────────────────────┘
```

- **Status dot:** green if `operations.isActive = true`, red if inactive.
- **Branch name** (bold).
- **Address** (secondary color, one line).
- **Timings:** "24 hours" or "07:00 – 23:45". Shows `openSince` date if set.
- **Support contact** (phone, shown if set).
- **Manager name** (shown if set).
- Cards have a subtle border and hover elevation.
- Clicking a card → map pans to that branch.

**Empty state:** If brand has no branches — a centered illustration/icon with text "No branches assigned" and a `[+ Assign branch]` button that goes to `branches_edit`.

---

### `branches_edit` — Layout

Session topbar: `← Back to branches` | title "Edit Branches" | brand name.

**Important context note for the designer:** In this session, the admin **cannot** edit branch details (name, address, timings, etc.) — that is done on the dedicated Branches page. This session only allows **assigning or removing branches from this brand.**

Layout: a two-column layout.

**Left — "Assigned" list:**
Title: `"Assigned branches (3)"`. Lists all branches currently linked to this brand, each as a row:
```
🟢 Business Bay, Cuisinette    [✕ Remove]
🟢 Dubai Marina                [✕ Remove]
🔴 Dubai Silicon Oasis         [✕ Remove]
```
- `[✕ Remove]` is a small danger-style icon button. Clicking removes the branch from this brand (with inline confirmation or immediate — designer's choice, but consistent).

**Right — "Available" list:**
Title: `"Available branches (2)"`. Lists all branches NOT yet linked to this brand:
```
🟢 Business Bay, Sol           [+ Add]
🟢 Arjan                       [+ Add]
```
- `[+ Add]` adds the branch to this brand.

Branches can also be searched/filtered by name via a search input at the top of each list.

**Footer:** `[← Back]` button (no save needed — changes apply immediately via API).

---

## Session 4 — `employees_view` / `employees_edit`

### `employees_view` — Layout

Session topbar: `← Back` | title "Team" | brand name.

**Right side of topbar:** `[Edit team]` button → `employees_edit`.

A table below the topbar:

```
#  |  Name  |  Status  |  Shift timings  |  Employed since  |  ▼
```

- `#` — row number, 40px.
- `Name` — full name (firstName + lastName). Photo avatar placeholder (initials) on the left.
- `Status` — a colored badge: `Active` (green) / `Resigned` (grey) / `Terminated` (red).
- `Shift timings` — if `workingBranch` set + branch has opening/closingTime, show "07:00 – 23:45" or "24 hours". If not set: "—".
- `Employed since` — `joiningDate` formatted (e.g. "Nov 2023"). If not set: "—".
- `▼` expand button — 44px. Rotates to `▲` when open.

**Expanded row (slides down):**
When `▼` is clicked, a panel slides down beneath that employee row. It shows:
- **Contact:** phone, WhatsApp, Telegram, email (icon + value for each that is set).
- **Working branch:** branch name (or "Not assigned").
- **Leave balance:** remaining annual leaves out of total, public holidays balance.
- **Legal docs:** Visa status/expiry, Emirates ID status/expiry, Medical cert status (just labels + status badges — not file links in this view).
- A `[View full profile]` link/button that would navigate to the employee's own page (future).

**Empty state:** "No employees assigned to this brand" + `[+ Assign employee]` button.

---

### `employees_edit` — Layout

Session topbar: `← Back to team` | title "Edit Team" | brand name.

Same two-column pattern as `branches_edit`:

**Left — "Assigned" list:**
Each assigned employee as a row: `[avatar] Name · Branch` `[✕ Remove]`

**Right — "Available" list:**
Each unassigned employee: `[avatar] Name · Branch (or 'Unassigned')` `[+ Add]`

Search input at top of each list. Changes apply immediately.

---

## Session 5 — `equipment_view` / `equipment_edit`

Same pattern as Employees but for equipment items. The Equipment model has its own schema (not yet seen — treat similarly to employees). The `equipment_view` table columns:

```
#  |  Name  |  Type / Category  |  Status  |  Location (branch)  |  ▼
```

Expanded row shows: purchase date, serial number, maintenance notes, assigned branch — whatever fields exist in the Equipment schema.

`equipment_edit` follows the same two-column assign/remove pattern.

---

## Session 6 — `menu_view` / `menu_edit`

### `menu_view` — Layout

Session topbar: `← Back` | title "Menu" | brand name.

**If no menu assigned:** Large centered state — icon + "No menu assigned" + `[Assign menu]` button.

**If menu assigned:**

```
┌──────────────────────────────────────────────────┐
│  [Active ●]  Vkusno Menu                        │
│  3 categories · 24 items total                   │
├──────────────────────────────────────────────────┤
│  BREAKFAST         8 items   [View category →]   │
│  MAIN DISHES      12 items   [View category →]   │
│  DRINKS            4 items   [View category →]   │
└──────────────────────────────────────────────────┘
```

- **Menu header card:** Active badge + menu name + totals summary.
- **Category rows:** Each linked MenuCategory as a row: category name + item count + `[View →]` button (future navigation to the category).
- **Footer:** `[Change menu]` secondary button → `menu_edit`. `[Unassign menu]` danger text-link.

### `menu_edit` — Layout

Session topbar: `← Back to menu` | title "Assign Menu" | brand name.

A list of all available menus (from the loaded `menusList`). Each menu as a selectable card:

```
○ Vkusno Menu          (currently assigned)  [Selected ✓]
○ Brunch Menu
○ Ramadan Menu
```

- Currently assigned menu is highlighted.
- Clicking a different menu → confirmation "Are you sure you want to switch to [Menu Name]?" → saves via `Brand_setMenu`.
- `[Unassign menu]` danger button at the bottom → confirmation → calls `Brand_clearMenu`.

---

## Session 7 — `competitors_view` / `competitors_edit`

*(The Competitor model does not exist yet. Design for the future state.)*

### `competitors_view` — Layout

Session topbar: `← Back` | title "Competitors" | brand name.

**Empty state (current reality):** Centered illustration + "No competitors tracked yet" + `[+ Add competitor]` button.

**When populated (future state):**
Each competitor as a card:
```
┌────────────────────────────────────────┐
│  [logo]  Competitor Brand Name         │
│          Market: Burgers · Dubai        │
│          Platforms: Talabat, Careem     │
│          Price tier: $$                 │
└────────────────────────────────────────┘
```

Cards in a 2-column grid on desktop, 1-column on mobile.

### `competitors_edit` — Layout

Same two-column assign/remove pattern as branches and employees, but pulling from a Competitor collection that doesn't exist yet. Placeholder: show the session topbar + a "Coming soon" message with a note that Competitor management will be available once the Competitor schema is implemented.

---

## Session 8 — `files_view`

*(Future session — design the concept)*

Session topbar: `← Back` | title "Brand Files" | brand name.

Shows all files stored for this brand organized by category. Each category is a collapsible section:

**Section structure:**
```
▼  LOGOS (6 fields, 3 uploaded · 245 KB total)
   PNG   45.2 KB   [↓] [👁]
   JPG   not set
   ...

▼  BRANDING (Brand book, Overview, Packaging)
   Brand book   not set
   ...

▼  CONTRACTS (2)
   Contract with Talabat · PDF · 1.2 MB · signed 2024-01-15
   ...

▼  LEGAL
   VAT Certificate · set
   Trade License · set
   Trade Mark · not set

▼  MENUS (PDF/Excel/Word)
   ...

▼  RECIPE (PDF/Excel/Word)
   ...

▼  MISCELLANEOUS (3 files)
   ...
```

Each row: file type label + size (if known) + `[↓ Download]` + `[👁 View]` buttons. For missing files: greyed-out row with "Not uploaded".

---

## Session 9 — `all_view` / `all_edit` (Existing Detail View)

These sessions are already implemented as `Brands_detail`. They show all brand sections in a two-column layout for deep viewing and editing:

- Left column: Basic info, Socials, Website, Other socials.
- Right column: Files, Inventory integrations, Sales integration, Legal, Relations.

Each section is independently collapsible and editable inline. The bulk-edit mode (`all_edit`) lets the admin edit all sections simultaneously with a single save.

This is the "everything" view — accessible from the Update/View tooltips in the table when "Update all" / "View all" is selected.

---

## Interactions Summary

| Action | Behavior |
|---|---|
| Click "Add logo" button | Navigate to `logo_edit` session |
| Click existing logo image | Navigate to `logo_view` session |
| Click branches eye button | Navigate to `branches_view` session |
| Click branches + button | Navigate to `branches_edit` session |
| Hover branches count badge | Tooltip listing branch names |
| Click employees eye button | Navigate to `employees_view` session |
| Click employees + button | Navigate to `employees_edit` session |
| Click equipment eye/+ buttons | Navigate to `equipment_view/edit` |
| Click competitors eye/+ buttons | Navigate to `competitors_view/edit` |
| Click menu eye button | Navigate to `menu_view` session |
| Click menu assign button | Navigate to `menu_edit` session |
| Click files eye button | Navigate to `files_view` session |
| Click files count area | Navigate to `files_view` session |
| Click ✎ (Update) icon | Toggle dropdown with section list |
| Click 👁 (View) icon | Toggle dropdown with section list |
| Select "Update all" from dropdown | Navigate to `all_edit` session |
| Select "View all" from dropdown | Navigate to `all_view` session |
| Select "Logos" from Update dropdown | Navigate to `logo_edit` |
| Select "Logos" from View dropdown | Navigate to `logo_view` |
| Select "Branches" from View dropdown | Navigate to `branches_view` |
| Click "← Back" in any session | Return to `brands_view` table |
| Click "+ Add brand" | Open add-brand form |
| Expand `▼` in employees table | Slide down additional employee info |
| Click "Remove" in edit sessions | Immediately remove from brand (API call) |
| Click "Add" in edit sessions | Immediately add to brand (API call) |
| Click "Show coverage areas" on map | Toggle coverage area polygons/circles |
| Click map pin | Highlight corresponding branch card |
| Click branch card | Pan map to that branch |

---

## Responsive Behavior

### Desktop (≥ 1024px)
Full table visible. All columns. Sessions use side-by-side panels where applicable (branches: map + cards, edit: two-column assign/available).

### Tablet (600–1023px)
- Table: Files column can hide label, show icon only. Competitors and Equipment columns may collapse into the Update/View dropdowns.
- Sessions: Stack panels vertically (map above cards for branches, single-column for edit sessions).

### Mobile (< 600px)
- Table: Only Logo, Branches count (badge only), Menu, ✎, 👁 columns visible. Remaining columns accessible via the View/Update dropdowns.
- Sessions: Fully single-column. Map occupies full width at ~220px height. Cards stack below.

---

## Visual Design Notes

- **Tone:** Professional admin dashboard. Clean, minimal, information-dense but not cluttered.
- **Count badges:** Rounded pill shape. In light theme: `#e0e7ef` background, dark text. In dark theme: `#2d3748` background, light text.
- **Mini icon buttons** (the `+` assign and eye view next to each count): Small, `1.5×1.5rem`, subtle border, hover fills with the primary button color (white icon on blue/teal background).
- **Session topbar:** Consistent across all sessions. `← Back` (ghost button) on left, title (bold, `1rem`) + brand name subtitle (secondary, `0.8rem`) in center/left area.
- **Map pins:** Small colored circles with the brand's primary color. Active/selected pin is slightly larger or has a ring.
- **Coverage areas:** Semi-transparent polygon fill (brand color with ~20% opacity) + dashed border line.
- **Employee avatar:** `2rem` circle with initials (2 letters), background derived from name hash or a fixed palette of muted colors.
- **Status badges:** Rounded pills. Active → green bg + green text. Resigned → grey. Terminated → red. Consistent across employees table and branch cards.
- **Expand/collapse chevron:** SVG `▼`/`▲`. Rotates 180° with CSS transition `transform 0.2s ease` when toggled.
- **Slide-down animation for expanded rows:** `max-height` transition from `0` to measured height, `overflow: hidden`, `opacity` fade-in. Duration `~250ms ease`.
- **Dropdown popup (Update/View):** Appears below the icon button, `position: absolute`, `z-index 100`. Min-width `11rem`. Rounded corners, subtle drop shadow. "Update all" / "View all" is bold, primary-color text. Section items are normal weight. Divider line between the "all" option and section items. Items have hover background.
