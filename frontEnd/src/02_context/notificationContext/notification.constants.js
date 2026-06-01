export const VALID_KINDS = ["success", "error", "warning", "info", "loading"];

export const DEFAULT_DURATION = 4000;

// Max simultaneous toasts on screen. Oldest is silently dropped on overflow.
export const MAX_STACK = 5;

// If the exact same kind+title+message fires within this window, the duplicate is suppressed.
export const DEDUP_WINDOW_MS = 500;

// Must match the CSS exit animation duration in notificationContext.css.
export const EXIT_ANIMATION_MS = 220;
