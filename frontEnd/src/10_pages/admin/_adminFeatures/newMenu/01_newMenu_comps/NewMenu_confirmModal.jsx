import { useEffect } from "react";
import { X as XIcon } from "lucide-react";
import "../_styles/newMenu_confirmModal.css";

/* ============================================================================
   NewMenu_confirmModal — generic double-confirm modal used by per-field saves.

   Keyboard: Enter confirms, Escape cancels.
============================================================================ */
const NewMenu_confirmModal = ({
  isOpen,
  title = "Save change?",
  subtitle = "Field update",
  fieldLabel,
  prevValue,
  nextValue,
  danger = false,
  onCancel,
  onConfirm,
  t,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") onConfirm?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;
  const tr = (k, fb) => (t ? t(`confirmModal.${k}`, { defaultValue: fb }) : fb);
  const hasDiff = prevValue !== undefined || nextValue !== undefined;

  return (
    <div
      className="NewMenu_confirmModal_overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="NewMenu_confirmModal_title">
      <div className="NewMenu_confirmModal" onClick={(e) => e.stopPropagation()}>
        <header className="NewMenu_confirmModal_header">
          <div>
            <p className="NewMenu_confirmModal_subtitle">{subtitle}</p>
            <h2 id="NewMenu_confirmModal_title" className="NewMenu_confirmModal_title">{title}</h2>
          </div>
          <button
            type="button"
            className="NewMenu_confirmModal_close"
            onClick={onCancel}
            aria-label={tr("close", "Close")}>
            <XIcon size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="NewMenu_confirmModal_body">
          <p>
            {fieldLabel ? (
              <>
                {tr("aboutToUpdate1", "You are about to update")}{" "}
                <strong>{fieldLabel}</strong>.{" "}
                {tr("aboutToUpdate2", "This change cannot be undone.")}
              </>
            ) : (
              tr("genericUndone", "This change cannot be undone.")
            )}
          </p>
          {hasDiff && (
            <div className="NewMenu_confirmModal_diff">
              <div className="NewMenu_confirmModal_diff_col NewMenu_confirmModal_diff_col_prev">
                <span className="NewMenu_confirmModal_diff_col_label">{tr("current", "Current")}</span>
                <span className="NewMenu_confirmModal_diff_col_value">{String(prevValue ?? "—")}</span>
              </div>
              <div className="NewMenu_confirmModal_diff_col NewMenu_confirmModal_diff_col_next">
                <span className="NewMenu_confirmModal_diff_col_label">{tr("new", "New")}</span>
                <span className="NewMenu_confirmModal_diff_col_value">{String(nextValue ?? "—")}</span>
              </div>
            </div>
          )}
        </div>
        <footer className="NewMenu_confirmModal_actions">
          <button type="button" className="NewMenu_confirmModal_btn" onClick={onCancel}>
            {tr("cancel", "Cancel")}
          </button>
          <button
            type="button"
            className={`NewMenu_confirmModal_btn ${danger ? "NewMenu_confirmModal_btn_danger" : "NewMenu_confirmModal_btn_primary"}`}
            onClick={onConfirm}>
            {danger ? tr("yesDelete", "Yes, delete") : tr("yesConfirm", "Yes, confirm")}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewMenu_confirmModal;
