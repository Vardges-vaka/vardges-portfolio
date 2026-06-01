// Pure helpers for NotificationContext. Kept stateless so they can be unit-tested
// in isolation and the provider stays focused on React wiring.

import {
  DEDUP_WINDOW_MS,
  MAX_STACK,
  VALID_KINDS,
} from "./notification.constants.js";

// ── id + hashing ─────────────────────────────────────────────────────────────

export const makeNotificationId = () =>
  `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const makeDedupHash = (kind, title, message) =>
  `${kind}|${title || ""}|${message || ""}`;

// ── dedup memory ─────────────────────────────────────────────────────────────

export const isDuplicate = (recentHashes, hash, now = Date.now()) => {
  const lastSeen = recentHashes.get(hash);
  return Boolean(lastSeen && now - lastSeen < DEDUP_WINDOW_MS);
};

// Side-effecty: trims old entries when the map grows past a soft cap.
export const pruneRecentHashes = (recentHashes, now = Date.now()) => {
  if (recentHashes.size <= 64) return;
  for (const [k, v] of recentHashes.entries()) {
    if (now - v > DEDUP_WINDOW_MS * 4) recentHashes.delete(k);
  }
};

// ── kind validation ──────────────────────────────────────────────────────────

export const sanitizeKind = (kind) =>
  VALID_KINDS.includes(kind) ? kind : "info";

// ── stack overflow ───────────────────────────────────────────────────────────

// Drops the oldest entries beyond `max` and clears their pending exit timers.
export const enforceMaxStack = (list, timersMap, max = MAX_STACK) => {
  if (list.length <= max) return list;
  const overflow = list.length - max;
  const dropped = list.slice(0, overflow);
  dropped.forEach((d) => {
    const t = timersMap.get(d.id);
    if (t) {
      clearTimeout(t);
      timersMap.delete(d.id);
    }
  });
  return list.slice(overflow);
};

// ── API error parsing ────────────────────────────────────────────────────────

// Reads a human-readable message off common error shapes:
// axios-style `err.response.data.message`, fetch-parsed `err.data.message`,
// raw `Error.message`, plain string, or the project's { success, message } envelope.
export const extractErrorMessage = (
  err,
  fallback = "Something went wrong."
) => {
  if (!err) return fallback;
  const envelope =
    err?.response?.data ||
    err?.data ||
    (typeof err === "object" ? err : null);
  if (envelope?.message && typeof envelope.message === "string") {
    return envelope.message;
  }
  if (typeof err?.message === "string") return err.message;
  if (typeof err === "string") return err;
  return fallback;
};

// ── promise-message resolver ────────────────────────────────────────────────

// promise()'s success/error msgs can be either an object or a function that
// receives the resolved value / rejected error and returns one.
export const resolveMessage = (msg, arg) =>
  typeof msg === "function" ? msg(arg) : msg;
