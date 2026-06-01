# notificationContext

Drop-in toast notification system for React. Self-contained — zero styling dependencies on the host app.

Copy the folder into any React project, wrap your tree with `<NotificationProvider>`, and call `TOAST.success({...})` from anywhere.

---

## Features

- **5 kinds** — `success`, `error`, `warning`, `info`, `loading`
- **Auto-dismiss** with **pause-on-hover** and visible **progress bar**
- **Slide-in / slide-out** animations (LTR and RTL)
- **`promise()`** wrapper — loading → success/error swap in place
- **`notifyApiError()`** — reads `{ success, message, data }` envelopes, axios/fetch shapes, and native `Error`s
- **Dedup** — identical toasts fired within 500ms are suppressed
- **Max stack** of 5 — oldest silently dropped on overflow
- **Inline SVG icons** (no icon-font dependency)
- **Light + dark** via system preference *and* explicit `[data-theme]` override
- **Portal-mounted** on `document.body` — never clipped by parent overflow

---

## File layout

```
notificationContext/
├── NotificationContext.jsx           Provider + state
├── useNotificationContext.js         Consumer hook
├── _notificationContext.index.js     Barrel
├── notificationContext_hlprs.js      Pure helpers (id, dedup, error parsing…)
├── notification.constants.js         DEFAULT_DURATION, MAX_STACK, DEDUP_WINDOW_MS, …
├── README.md                         This file
└── components/
    ├── NotificationContainer.jsx     Portal + map → toasts
    ├── NotificationToast.jsx         Toast card (owns its dismiss timer)
    ├── NotificationIcons.jsx         Inline SVG icons (incl. animated spinner)
    ├── notificationContext.css       All styles + CSS variables
    └── _components.index.js          Components barrel
```

---

## Quick start

### 1. Mount the provider — once, at app root

```jsx
import { NotificationProvider } from "./notificationContext/_notificationContext.index";

<NotificationProvider>
  <App />
</NotificationProvider>
```

### 2. Use anywhere

```jsx
import { useNotificationContext } from "./notificationContext/_notificationContext.index";

const SomeComponent = () => {
  const { TOAST } = useNotificationContext();

  const handleSave = async () => {
    try {
      await api.save(data);
      TOAST.success({ title: "Saved", message: "Updated successfully." });
    } catch (e) {
      TOAST.notifyApiError(e);
    }
  };
};
```

---

## API

`useNotificationContext()` returns `{ TOAST, ...individualMethods }`. `TOAST` is the grouped namespace — always prefer it. Individual methods are kept for backward compatibility.

### Simple kinds

```js
const id = TOAST.success({ title, message, duration });   //   default duration: 4000ms
TOAST.error({   title, message, duration });
TOAST.warning({ title, message, duration });
TOAST.info({    title, message, duration });
```

- All fields are optional.
- `duration: 0` → persistent (stays until dismissed).
- Returns the toast `id` (string), or `null` if deduped.

### Generic notify

```js
TOAST.notify({ kind: "info", title, message, duration });
```

Kind defaults to `"info"` and is clamped to a valid value.

### Promise wrapper

```js
TOAST.promise(
  api.saveBranch(data),
  {
    loading: { title: "Saving…", message: "Updating branch details." },
    success: { title: "Saved" },                              //  or function
    error:   (err) => ({ title: "Failed", message: err.message }),
  }
);
```

Shows a loading toast (with spinner, no close button, no auto-dismiss), then **updates it in place** to success/error when the promise settles. Returns the original promise so you can still `await` it.

The `success` / `error` fields can each be either an object or a function. Function form receives the resolved value (or rejected error) and returns the message object.

### API-error helper

```js
try { await api.foo(); } catch (e) { TOAST.notifyApiError(e); }
```

Extracts a human message from:
- `err.response.data.message` (axios)
- `err.data.message` (parsed fetch)
- `err.message` (native `Error`)
- `err` itself (plain string)
- any `{ message }` envelope

Falls back to a generic message if nothing matches.

Optional second arg overrides the fallback: `TOAST.notifyApiError(e, { title: "Save failed", message: "..." })`.

### Update in place

```js
const id = TOAST.info({ title: "Uploading", message: "1 of 3…", duration: 0 });
TOAST.update(id, { message: "2 of 3…" });
TOAST.update(id, { kind: "success", message: "Done!", duration: 4000 });
```

Changing `duration` re-arms the auto-dismiss timer automatically.

### Dismiss / clear

```js
TOAST.dismiss(id);   //  dismiss one (plays slide-out animation)
TOAST.clear();       //  remove all immediately
```

---

## Behaviors

| Behavior | How it works |
|----------|--------------|
| Auto-dismiss | Per-toast `setTimeout` (lives inside `NotificationToast`, not the provider) |
| Pause-on-hover | `mouseenter` sets `paused=true`; effect cleanup captures remaining time; `mouseleave` resumes |
| Progress bar | CSS animation tied to `--toast-duration`; `animation-play-state: paused` on hover |
| Slide-out | `dismiss(id)` sets `exiting: true`, removes from state after 220ms |
| Dedup | Hash of `kind|title|message` checked against a `Map` of recent fires (500ms window) |
| Max stack | If `notifications.length > 5`, oldest are silently dropped (no exit animation) |
| Loading kind | No close button rendered; no auto-dismiss; spinner SVG animates |
| RTL | Container uses `inset-inline-end`; separate `*-rtl` keyframes flip the slide direction when `dir="rtl"` is set |

---

## Customization

All visual customization happens through CSS variables. Override any of them in your own stylesheet **after** importing the toast CSS:

```css
:root {
  --notify-success-bg: #00ff00;
  --notify-success-text: #003300;
  --notify-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

### Full variable list (all set in `components/notificationContext.css`)

| Variable | Purpose |
|----------|---------|
| `--notify-shadow` | Toast box-shadow |
| `--notify-icon-bg` | Background behind the kind icon |
| `--notify-close-hover-bg` | Close button hover background |
| `--notify-success-{bg,text,border}` | Success toast colors |
| `--notify-error-{bg,text,border}` | Error toast colors |
| `--notify-warning-{bg,text,border}` | Warning toast colors |
| `--notify-info-{bg,text,border}` | Info toast colors |
| `--notify-loading-{bg,text,border}` | Loading toast colors |

### Theme detection

Resolution order (most-specific wins):

1. `[data-theme="light"]` / `[data-theme="dark"]` on any ancestor (typically `<html>`)
2. `@media (prefers-color-scheme: dark)` — system preference
3. `:root` defaults — light

So:
- App that sets nothing → respects OS dark/light setting.
- App that sets `data-theme="dark"` on `<html>` → dark, regardless of OS.
- App that has its own theme switcher (this is what `vardges.me` does) → just sets `data-theme`, toasts follow.

### Tunable constants

In `notification.constants.js`:

| Constant | Default | Meaning |
|----------|---------|---------|
| `DEFAULT_DURATION` | `4000` | Auto-dismiss timeout in ms |
| `MAX_STACK` | `5` | Max simultaneous toasts |
| `DEDUP_WINDOW_MS` | `500` | Identical toasts within this window suppressed |
| `EXIT_ANIMATION_MS` | `220` | Must match the CSS exit animation duration |
| `VALID_KINDS` | `["success", "error", "warning", "info", "loading"]` | Allowed kinds |

---

## Architecture notes

- **Provider is logic-only.** No JSX markup beyond `<NotificationContainer />`. All UI lives under `components/`.
- **Auto-dismiss timer is owned by `NotificationToast`**, not the provider. This is what makes pause-on-hover clean — the toast's `useEffect` depends on `[paused, duration, exiting, onClose]`, so pause/resume/duration-change just re-runs the effect.
- **Exit-animation timer is owned by the provider** (single 220ms grace period between `dismiss(id)` and actual removal).
- **`TOAST` is `useMemo`-stable** — safe to put in `useEffect` deps.
- **Helpers are pure** — `notificationContext_hlprs.js` has no React imports, easy to unit-test.

---

## Dependencies

- `react` (>=18, hooks API)
- `react-dom` (for `createPortal`)
- `prop-types`

That's it. No CSS framework, no icon library, no theme tokens, no i18n.

---

## Porting to another React app

1. Copy the `notificationContext/` folder into your project.
2. Import & mount once:
   ```jsx
   import { NotificationProvider } from "./.../notificationContext/_notificationContext.index";

   <NotificationProvider>
     <App />
   </NotificationProvider>
   ```
3. Use `TOAST` anywhere via `useNotificationContext()`.

No further setup needed — colors, animations, portal target, dark mode, and RTL handling are all baked in.
