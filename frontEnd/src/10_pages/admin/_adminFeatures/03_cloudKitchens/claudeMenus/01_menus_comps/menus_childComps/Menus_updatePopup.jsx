import { useEffect, useRef } from "react";

/* ============================================================================
   Menus_updatePopup — anchored small popup of update options.

   When a table row's Update icon is clicked, the host passes the click target's
   bounding rect + a list of update keys. The popup auto-closes on outside-click
   or option selection. Includes an Activate/Deactivate toggle.

   props:
   - open: boolean
   - anchorRect: DOMRect-like { top, bottom, left, right }
   - options: Array<{ key, label }>
   - isActive: boolean
   - onPick: (key) => void
   - onToggleActive: () => void
   - onClose: () => void
============================================================================ */
const Menus_updatePopup = ({
  open,
  anchorRect,
  options = [],
  onPick,
  onClose,
  onToggleActive,
  isActive,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) onClose?.();
    };
    // Defer so the click that opened us doesn't immediately close it.
    const id = setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open, onClose]);

  if (!open || !anchorRect) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: anchorRect.bottom + 6,
        left: Math.max(8, anchorRect.left - 120),
        minWidth: 220,
        background: "white",
        // background: "var(--menus-bg-elev)",
        border: "1px solid var(--menus-border)",
        borderRadius: 10,
        boxShadow: "0 12px 32px rgba(0,0,0,.18)",
        zIndex: 250,
        padding: 6,
        animation: "menus_tooltip_in 140ms ease both",
      }}>
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => { onPick?.(o.key); onClose?.(); }}
          style={{
            display: "flex",
            width: "100%",
            padding: "8px 10px",
            border: "none",
            background: "transparent",
            textAlign: "left",
            cursor: "pointer",
            borderRadius: 6,
            font: "inherit",
            fontSize: 13,
            color: "var(--menus-text)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--menus-bg-soft)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          {o.label}
        </button>
      ))}
      {onToggleActive && (
        <>
          <div style={{ height: 1, background: "var(--menus-border-soft)", margin: "4px 0" }} />
          <button
            type="button"
            onClick={() => { onToggleActive(); onClose?.(); }}
            style={{
              display: "flex",
              width: "100%",
              padding: "8px 10px",
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              borderRadius: 6,
              font: "inherit",
              fontSize: 13,
              color: isActive ? "var(--menus-danger)" : "var(--menus-accent-text)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--menus-bg-soft)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </>
      )}
    </div>
  );
};

/* ============================================================================
   Session-specific update options, keyed by session name.
============================================================================ */
export const UPDATE_OPTIONS = {
  menu: [
    { key: "updateAll",   label: "Update all fields" },
    { key: "label",       label: "Update label" },
    { key: "description", label: "Update description" },
    { key: "ownerType",   label: "Update who owns" },
  ],
  item: [
    { key: "updateAll",       label: "Update all fields" },
    { key: "images.main",     label: "Update image" },
    { key: "name.label",      label: "Update name" },
    { key: "description",     label: "Update description" },
    { key: "sellingPrice",    label: "Update price" },
    { key: "ownerType",       label: "Update owner" },
    { key: "nutrition",       label: "Update nutrition" },
  ],
  modifier: [
    { key: "updateAll",     label: "Update all fields" },
    { key: "options",       label: "Update options" },
    { key: "title.label",   label: "Update name" },
    { key: "description",   label: "Update description" },
    { key: "ownerType",     label: "Update owner" },
    { key: "activeTimings", label: "Update active timings" },
    { key: "isOptional",    label: "Update is optional" },
    { key: "selectionMode", label: "Update selection mode" },
  ],
  option: [
    { key: "updateAll",    label: "Update all fields" },
    { key: "name.label",   label: "Update name" },
    { key: "description",  label: "Update description" },
    { key: "images.main",  label: "Update image" },
    { key: "sellingPrice", label: "Update price" },
    { key: "files",        label: "Update files" },
    { key: "ownerType",    label: "Update owner" },
    { key: "nutrition",    label: "Update nutrition" },
  ],
};

export default Menus_updatePopup;
