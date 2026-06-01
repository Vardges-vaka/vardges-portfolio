import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { NotificationContainer } from "./components/_components.index.js";
import {
  DEFAULT_DURATION,
  EXIT_ANIMATION_MS,
} from "./notification.constants.js";
import {
  makeNotificationId,
  makeDedupHash,
  isDuplicate,
  pruneRecentHashes,
  sanitizeKind,
  enforceMaxStack,
  extractErrorMessage,
  resolveMessage,
} from "./notificationContext_hlprs.js";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Dedup memory: hash → last-fired timestamp.
  const recentHashesRef = useRef(new Map());

  // Exit-animation timers, keyed by notification id.
  const exitTimersRef = useRef(new Map());

  // Internal: actually drop a notification from state.
  const remove = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const exitTimer = exitTimersRef.current.get(id);
    if (exitTimer) {
      clearTimeout(exitTimer);
      exitTimersRef.current.delete(id);
    }
  }, []);

  // Public dismiss → marks exiting (slide-out plays), then removes.
  const dismiss = useCallback(
    (id) => {
      if (!id) return;
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, exiting: true } : n)),
      );
      const exitTimer = setTimeout(() => remove(id), EXIT_ANIMATION_MS);
      exitTimersRef.current.set(id, exitTimer);
    },
    [remove],
  );

  const notify = useCallback(
    ({ kind = "info", title, message, duration = DEFAULT_DURATION } = {}) => {
      const safeKind = sanitizeKind(kind);
      const hash = makeDedupHash(safeKind, title, message);
      const now = Date.now();

      if (isDuplicate(recentHashesRef.current, hash, now)) return null;
      recentHashesRef.current.set(hash, now);
      pruneRecentHashes(recentHashesRef.current, now);

      const id = makeNotificationId();
      const next = { id, kind: safeKind, title, message, duration };

      setNotifications((prev) =>
        enforceMaxStack([...prev, next], exitTimersRef.current),
      );

      return id;
    },
    [],
  );

  // Patch an existing notification (kind/title/message/duration).
  const update = useCallback((id, patch = {}) => {
    if (!id) return;
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;
        const k = patch.kind ? sanitizeKind(patch.kind) : n.kind;
        return { ...n, ...patch, kind: k };
      }),
    );
  }, []);

  const success = useCallback(
    (opts) => notify({ ...opts, kind: "success" }),
    [notify],
  );
  const error = useCallback(
    (opts) => notify({ ...opts, kind: "error" }),
    [notify],
  );
  const warning = useCallback(
    (opts) => notify({ ...opts, kind: "warning" }),
    [notify],
  );
  const info = useCallback(
    (opts) => notify({ ...opts, kind: "info" }),
    [notify],
  );

  const promise = useCallback(
    (p, msgs = {}) => {
      const loadingId = notify({
        kind: "loading",
        title: msgs.loading?.title,
        message: msgs.loading?.message,
        duration: 0,
      });

      Promise.resolve(p)
        .then((result) => {
          const resolved = resolveMessage(msgs.success, result);
          if (loadingId) {
            update(loadingId, {
              kind: "success",
              title: resolved?.title,
              message: resolved?.message,
              duration: DEFAULT_DURATION,
            });
          }
        })
        .catch((err) => {
          const resolved = resolveMessage(msgs.error, err);
          if (loadingId) {
            update(loadingId, {
              kind: "error",
              title: resolved?.title,
              message: resolved?.message,
              duration: DEFAULT_DURATION,
            });
          }
        });

      return p;
    },
    [notify, update],
  );

  const notifyApiError = useCallback(
    (err, fallback = {}) =>
      error({
        title: fallback.title || "Error",
        message: extractErrorMessage(err, fallback.message),
      }),
    [error],
  );

  const clear = useCallback(() => {
    exitTimersRef.current.forEach((t) => clearTimeout(t));
    exitTimersRef.current.clear();
    setNotifications([]);
  }, []);

  // Unmount cleanup — kill any lingering exit timers.
  useEffect(() => {
    const exitTimers = exitTimersRef.current;
    return () => {
      exitTimers.forEach((t) => clearTimeout(t));
      exitTimers.clear();
    };
  }, []);

  // Grouped namespace API — preferred public surface.
  // Stable across renders since all methods are useCallback-memoized.
  const TOAST = useMemo(
    () => ({
      success,
      error,
      warning,
      info,
      promise,
      update,
      notifyApiError,
      notify,
      dismiss,
      clear,
    }),
    [
      success,
      error,
      warning,
      info,
      promise,
      update,
      notifyApiError,
      notify,
      dismiss,
      clear,
    ],
  );

  const contextValue = useMemo(
    () => ({
      // Grouped (recommended)
      TOAST,
      // Individual exports (still here for backward compatibility)
      notifications,
      notify,
      success,
      error,
      warning,
      info,
      update,
      promise,
      notifyApiError,
      dismiss,
      clear,
    }),
    [
      TOAST,
      notifications,
      notify,
      success,
      error,
      warning,
      info,
      update,
      promise,
      notifyApiError,
      dismiss,
      clear,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onDismiss={dismiss}
      />
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

NotificationProvider.displayName = "NotificationProvider";

export { NotificationContext, NotificationProvider };
