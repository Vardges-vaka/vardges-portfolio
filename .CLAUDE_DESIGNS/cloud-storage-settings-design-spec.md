# Cloud Storage Settings Page — Design Specification

---

## What We Are Designing

This is the **Cloud Storage Settings page** inside the admin dashboard of **vardges.me** — a private, full-stack MERN web application (React + Express + MongoDB) built as a personal management platform. The admin dashboard is a protected area accessible only to authenticated users with admin or superAdmin roles.

The Cloud Storage Settings page is part of the admin settings section. Its purpose is to let the admin manage the cloud storage providers used by the application for all file uploads (logos, documents, images, menu items, etc. across the platform). The application supports four cloud storage providers: **Amazon S3**, **Google Cloud Storage (GCS)**, **Cloudflare R2**, and **Azure Blob Storage**. Currently only GCS is fully implemented; the others are scaffolded but not yet wired.

### What the page needs to do

1. **List all four providers** in a clean table layout — one row per provider.
2. **Per provider, inline in the row:**
   - Show or add/update the provider logo (small, ~48px)
   - Show or add/update the provider console URL with copy functionality
   - Toggle the provider enabled/disabled (with confirmation)
   - Set the provider as the default upload target (with confirmation, only one can be default)
   - Toggle whether custom signed-URL expiry time is allowed for that provider
   - A collapse/expand button to open the monitoring panel for that provider
3. **Logo upload panel** — slides open below the row when adding or updating a logo. Shows a drag-and-drop file input with upload progress, file type, and file size.
4. **Monitoring panel** — slides open below the row when the expand button is clicked. Shows live cloud storage analytics for that provider pulled from the cloud provider's API, organized into 5 sections: Storage, Operations, Network, Cost, and Files.

### Context for the AI designer

- The app has a sidebar navigation on the left; the main content area is to the right.
- The Cloud Storage page sits inside the Settings group alongside pages like Admin Account, Server Settings, and Site Management.
- The design must work in both **light and dark themes** — the theme is applied via a `data-theme` attribute on the root element and drives all colors through CSS custom properties (listed in the Color Palette section below).
- The UI framework is plain React with CSS modules / global CSS — no Tailwind, no component library like MUI or Chakra. All styles are hand-written CSS using the project's own design tokens.
- The page should feel like a professional admin dashboard tool — clean, information-dense but not cluttered, with clear visual hierarchy and smooth interactions.

---

## Color Palette

The application supports **light and dark themes** toggled via a `data-theme` attribute on the root element.

### Light Theme
- **Brand primary:** deep slate `#2c3e50`
- **Brand secondary / CTA:** teal-green `#18bc9c`
- **Brand accent / danger:** red `#e74c3c`
- **Page background:** white `#ffffff`
- **Surface / card background:** light grey `#f9fafb`
- **Subtle surface:** `#f0f2f5`
- **Primary text:** near-black `#1a1a1a`
- **Secondary text:** dark grey `#4a4a4a`
- **Placeholder / muted text:** `#9ca3af`
- **Borders:** `#e5e7eb` (soft), `#d1d5db` (regular)
- **Hover background:** `#f3f4f6`
- **Hover border:** `#d1d5db`
- **Admin active accent:** blue `#007bff`
- **Admin active surface:** `#e3f2fd`
- **Admin active text:** `#1976d2`
- **Admin active border:** `#2196f3`
- **Success:** green family
- **Error / danger:** red `#dc2626` / `#b91c1c`
- **Warning:** orange family

### Dark Theme
- **Brand primary background:** deep purple `#5c008b`
- **Brand secondary background:** dark purple `#2e005d`
- **Brand tertiary / surface:** medium purple `#8e008b`
- **Page background:** `#5c008b`
- **Surface / card background:** `#2e005d`
- **Primary text:** white `#ffffff`
- **Secondary text:** light lavender `#e0d4ea`
- **Placeholder / muted text:** `#c6a0cf`
- **Borders:** `#8e008b`
- **Hover text:** orange `#ff6200`
- **Hover border:** orange `#ff8300`
- **Accent / highlight:** orange `#ff8300`
- **Hover background:** `#2e005d`
- **Admin active accent:** light blue `#4a9eff`
- **Admin active surface:** dark navy `#1e3a5f`
- **Admin active border:** `#4a9eff`
- **Admin active text:** `#66b3ff`

### CSS Variable Convention
All colors are consumed via CSS custom properties, never hardcoded:
- `--bg-primary-color`, `--bg-secondary-color`, `--bg-tertiary-color`
- `--text-primary-color`, `--text-secondary-color`
- `--border-primary-color`, `--border-secondary-color`
- `--btn-primary-bg-color`, `--btn-primary-text-color`, `--btn-primary-bg-color-HOV`
- `--btn-secondary-bg-color`, `--btn-secondary-text-color`
- `--btn-tertiary-bg-color`, `--btn-tertiary-text-color`
- `--input-primary-bg-color`, `--input-primary-border-color`, `--input-primary-text-color`
- `--input-primary-border-color-FOC`, `--input-primary-boxShadow-FOC`
- `--primary-success-border`, `--primary-error-border`, `--primary-hint-border`
- `--admin-tool-icon-active`, `--admin-sidebar-item-active`, `--admin-sidebar-item-active-color`
- `--boxShadow-primary-color`, `--boxShadow-primary-color-HOV`

---

## Overall Layout

A full-width settings page. Title and subtitle sit at the top. Below is a single table where each row is a cloud storage provider. No heavy borders — clean minimal table with light row separators. When a row is expanded via the collapse chevron, a monitoring panel slides open beneath that specific row (not at the bottom of the page).

---

## Table Header

Fixed columns, horizontally scrollable on small screens:

```
#  |  Logo  |  Provider Name  |  Console URL  |  Enabled  |  Default  |  Custom Expiry  |  ▼
```

Approximate column widths: <!-- JUST A SUGGESTIONS  -->
- `#` — 40px, center
- Logo — 70px, center
- Provider Name — 180px, left
- Console URL — flex (takes remaining space), left
- Enabled — 80px, center
- Default — 80px, center
- Custom Expiry — 110px, center
 - Collapse chevron — 48px, center

---

## Table Row — Collapsed State

Each provider is one horizontal row, all controls vertically centered.

### # column
Row number: 1, 2, 3, 4.

### Logo column
- **No logo:** a small dashed-border square button `+ Add` (~48×48px). Clicking slides open the logo upload panel inline below the row.
- **Logo exists:** the logo image at 48×48px, object-fit contain. On hover, a small `Update` overlay or pencil icon appears.

### Provider Name column
Bold text. Providers: Amazon S3 / Google Cloud Storage / Cloudflare R2 / Azure Blob Storage.
If this provider is the current default, a small pill badge `DEFAULT` appears immediately to the right, styled in the admin active accent color.

### Console URL column
- **No URL saved:** a small ghost `+ Add URL` button.
- **URL saved:** truncated URL with ellipsis + two icon buttons — pencil (edit/update) and clipboard (copy). Clicking copy briefly shows a `✓ Copied` tooltip.

### Enabled column
A toggle switch. Clicking opens a confirmation modal (enable or disable).

### Default column
A radio button or filled-circle toggle. Only one provider can be active. Clicking opens a confirmation modal that warns which provider will lose default status.

### Custom Expiry column
A checkbox or small toggle. No modal — direct toggle with a subtle per-row inline toast message. Tooltip on hover: "Allow requests with a custom signed-URL expiry time (e.g. large PDFs, videos)."

### Collapse chevron column
A `▼` chevron icon button. On click it rotates to `▲` and the monitoring panel expands below with a smooth slide-down animation.

---

## Logo Upload Panel (inline, appears below the row)

Triggered by clicking `+ Add` or `Update` in the logo column. Slides open below the row at full table width.

Layout (horizontal on desktop, stacked on mobile):

```
[ Drag & drop zone ]  |  [ File info + status ]  |  [ Upload button ]
```

- **Drop zone:** dashed border, cloud upload icon, text "Drag a file here or click to browse". On file selected, show thumbnail preview if image.
- **File info:** file name, file type (MIME), file size formatted (e.g. `2.4 MB`). Upload status progress bar (0% → animated → 100% ✓ success / ✗ error).
- **Upload button:** disabled until file selected, shows "Uploading…" + spinner while active.
- A `×` close button dismisses the panel without uploading.

---

## Monitoring Panel (collapsible, slides below a row)

Opens below the provider row when the `▼` chevron is clicked. Full table width. Visually separated from the row above by a subtle accent-colored top border.

**Panel header:** `[Provider Name] — Cloud Storage Monitor` + a small live indicator dot (green if connected, grey if not).

The panel contains 5 sections. Each section has a title and can be individually collapsed.

---

### Section 1: Storage

- **Total storage used** — label + formatted value (e.g. `14.2 GB / 100 GB`) + horizontal progress bar. Color: blue. Proportional fill.
- **Storage per bucket** — one sub-row per bucket: bucket name + size value + thinner progress bar relative to the largest bucket.
- **Object count** — plain stat: `12,840 objects` with a small files icon.
- **Storage class breakdown** — collapsible sub-section. Each class (Standard, Nearline, Coldline, Archive) as a labeled pill with percentage badge, or a horizontal stacked bar.

---

### Section 2: Operations

Sub-header note: `Free tier: 5,000 Class A / 50,000 Class B per month`

- **Class A operations** (writes, uploads, creates — paid) — value + progress bar against free tier limit. Accent: orange above 80%, red above 100%.
- **Class B operations** (reads, downloads, metadata fetches — paid) — same treatment.
- **Total operations this month** — plain stat.
- **Failed operations** — plain stat, shown in red if greater than 0.

---

### Section 3: Network

Sub-header note: `Egress pricing applies above free tier`

- **Ingress** (data uploaded in — always free) — value + progress bar + green `Free` badge.
- **Egress** (data sent to internet — costs money) — value + progress bar against free tier + orange `Billable` badge.
- **Inter-region transfer** — plain stat.
- **CDN cache hit rate** — if CDN attached: hit rate percentage shown as a small donut or bar (e.g. `84% cache hit`). If not attached: greyed out with `CDN not attached`.

---

### Section 4: Cost

- **Total estimated cost this month** — large prominent number e.g. `$1.42`.
- **Cost breakdown** — three rows: Storage / Operations / Egress, each with a value and a proportional mini-bar forming a stacked visual.
- **Cost per bucket** — list of bucket names with their cost.
- **Projected end-of-month** — e.g. `~$2.10` in muted style with a trending arrow icon (↗ rising or → flat).

---

### Section 5: Files

- **Recently uploaded** — list of last 5 files: file type icon | name (truncated) | size | time ago. Clickable row copies the object key.
- **Largest files** — similar list sorted by size descending.
- **File type breakdown** — horizontal stacked bar or small donut chart. Segments: Images / Video / Audio / Documents / Other. Each segment has a distinct color + label + count.

---

## Interactions Summary

| Action | Behavior |
|---|---|
| Click `▼` chevron | Slide open monitoring panel below that row |
| Click `+ Add` logo | Slide open upload panel below that row |
| Click `Update` logo | Slide open upload panel below that row |
| Click Enabled toggle | Confirmation modal (enable or disable) |
| Click Default radio | Confirmation modal (set default, warns which loses it) |
| Click Custom Expiry toggle | Direct toggle, per-row toast |
| Click `+ Add URL` | URL input appears inline in the Console URL cell |
| Click pencil (URL) | URL input replaces the display text inline |
| Click clipboard (URL) | Copy to clipboard + brief `✓ Copied` tooltip |

---

## Responsive Behavior

- **Desktop (≥ 900px):** Full table, all columns visible.
- **Tablet (600–899px):** Console URL column hidden (accessible via expanded row). Custom Expiry shows icon only, no label.
- **Mobile (< 600px):** Rows collapse to a card-like summary — provider name + enabled toggle visible in row header, all other controls inside an auto-expanded section below.

---

## Confirmation Modal

Used for: enable, disable, set default, delete logo, replace logo.

- Overlay with backdrop blur or semi-transparent dark overlay.
- Centered box, max-width ~430px.
- Title, body description, Cancel button + Confirm button.
- Danger types (disable, delete logo): confirm button uses danger/red styling.
- Clicking outside the modal box cancels it.

---

## Notes for Implementation

- Per-row toast messages auto-dismiss after ~4 seconds.
- Only one monitoring panel can be open at a time (opening a second closes the first) — or multiple can stay open, designer's choice.
- Non-implemented providers (S3, R2, Azure) show the same UI but return a "not yet implemented" message on logo operations.
- The whole component uses CSS custom properties from the theme system — no hardcoded colors.
