# Tooltip_11 — Radial Popup Menu

A compact radial-fan menu component. A single toggle button (showing a count, label, or any node) expands into up to **3 circular action items** that fan out to the right. Clicking outside or pressing the toggle again collapses the menu.

---

## Files

| File | Purpose |
|---|---|
| `src/01_components/toolTips/Tooltip_11.jsx` | Component |
| `src/01_components/_styles/toolTips/Tooltip_11.css` | Styles |

**Import via barrel:**
```js
import { Tooltip_11 } from "src/01_components/components.index.js";
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `toggleContent` | `ReactNode` | — | Content shown inside the center button when **closed** (e.g. a count number, icon, or text). When open the button shows `×` automatically. |
| `toggleAriaLabel` | `string` | `"Toggle menu"` | `aria-label` for the center toggle button. |
| `items` | `Item[]` | `[]` | Radial action items. Max **3** — extras are ignored. |

### Item shape

```js
{
  content:    ReactNode,          // required — displayed inside the circular button
  ariaLabel:  string,             // used for aria-label AND the native hover title tooltip
  onClick:    (e) => void,        // optional — called on button click, receives the real DOM event
  gradient:   string,             // optional — any CSS background value (color, gradient, var())
  dataProps:  Record<string, string>, // optional — raw HTML data-* attributes spread onto the button
}
```

**`dataProps` example** — useful when the `onClick` handler reads from `e.currentTarget.dataset`:
```js
dataProps: {
  "data-session":       "view_competesWithBrands",
  "data-competitor-id": competitor._id,
  "data-editing":       "false",
}
```

---

## Basic usage

```jsx
import { Tooltip_11 } from "../../01_components/components.index.js";

<Tooltip_11
  toggleContent={3}
  toggleAriaLabel="Open brand menu, 3 items"
  items={[
    {
      content: <img src={logo1} alt="Brand A" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
      ariaLabel: "Brand A",
    },
    {
      content: <img src={logo2} alt="Brand B" style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
      ariaLabel: "Brand B",
    },
    {
      content: <MyViewIcon />,
      ariaLabel: "View all brands",
      gradient: "var(--t11-view-gradient)",
      onClick: handleViewClick,
      dataProps: { "data-session": "view_brands" },
    },
  ]}
/>
```

---

## Live usage — Competitors table

`Competitors_table_row_competesWithBrands.jsx` uses this component to replace the old stacked-logo column with a single count badge that fans out into competitor logos + a view button:

```
[  5  ]  →  click  →  [logo1]
                       [logo2]  ← fanned right
                       [ 👁 ]
```

The view-button item carries `dataProps` with `data-session`, `data-competitor-id`, and `data-editing` so that the existing `handleCompetitorTableAction` handler (which reads `e.currentTarget.dataset.*`) works without any wrapping.

---

## CSS custom properties

All sizing variables are declared on `.Tooltip_11` and can be overridden from any ancestor or via `style` on the component's parent.

| Variable | Default | Description |
|---|---|---|
| `--t11-size` | `60px` | Width and height of the component's bounding box. Items overflow this box — it only affects the toggle's centering anchor. |
| `--t11-toggle-size` | `32px` | Diameter of the center toggle button. |
| `--t11-item-size` | `48px` | Diameter of each radial action button. |
| `--t11-radius` | `76px` | Distance from the toggle center to each item center when open. Increase to spread items farther apart. |

**Resizing example** — larger context (not a table):
```css
.MyPage .Tooltip_11 {
  --t11-size:        80px;
  --t11-toggle-size: 44px;
  --t11-item-size:   56px;
  --t11-radius:      90px;
}
```

### Theme-aware gradient variable

| Variable | Light value | Dark value | Description |
|---|---|---|---|
| `--t11-view-gradient` | `linear-gradient(135deg, #4f46e5, #7c3aed)` | `linear-gradient(135deg, #818cf8, #a78bfa)` | Indigo→purple gradient used for action/view buttons. Pass as `gradient: "var(--t11-view-gradient)"` on an item. |

Defined in `lightTheme.css` and `darkTheme.css` under the `COMPETITORS FEATURE` block.

### Global theme variables consumed

These come from the app's global theme files and do not need to be set per-instance:

| Variable | Used on |
|---|---|
| `--bg-primary-color` | Toggle background (closed state) + toggle glow |
| `--bg-secondary-color` | Toggle background (open state), item default background |
| `--border-primary-color` | Toggle border (closed) |
| `--border-secondary-color` | Toggle border (open) |
| `--border-primary-color-HOV` | Item focus-visible outline |
| `--text-primary-color` | Toggle label color |

---

## Fan geometry

Items spread to the **right** of the toggle in a symmetric 90° arc:

| Slot (`--i`) | Angle | Direction |
|---|---|---|
| 0 | 225° | Lower-right |
| 1 | 270° | Directly right |
| 2 | 315° | Upper-right |

The CSS formula is `rotate(45deg × i + 225deg) translateY(-radius)`. Each item button is counter-rotated by the same amount so its content (logo, icon, text) always stays upright on screen.

The component's bounding box does **not** need to contain the expanded items — the parent table cell has `overflow: visible`.

---

## Behaviour notes

- **Click-outside to close** — a `mousedown` listener on `document` is attached while open and cleaned up on close.
- **Keyboard** — items have `tabIndex={-1}` when closed and `tabIndex={0}` when open so they are reachable by keyboard only after the menu is open.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` removes all transitions on the toggle and item wrappers.
- **Max items** — only the first 3 items in the `items` array are rendered; the rest are silently dropped.
- **Empty state** — if `items` is empty, only the toggle button renders (no radial items).
