import { useEffect } from "react";
import "../../../_styles/branches_discardModal.css";

// "You have unsaved changes. Discard them?" — surfaces whenever the user tries
// to leave a dirty edit flow (back button, section cancel, view-mode switch).
// Confirm = run the stashed onConfirm action; Cancel = keep editing.
const Branches_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="branchesDiscardModal"
      role="dialog"
      aria-modal="true"
      aria-label={t("discardTitle")}>
      <div className="branchesDiscardModal__backdrop" onClick={onCancel} />

      <div className="branchesDiscardModal__dialog">
        <h3 className="branchesDiscardModal__title">{t("discardTitle")}</h3>
        <p className="branchesDiscardModal__hint">{t("discardHint")}</p>

        <div className="branchesDiscardModal__actions">
          <button
            type="button"
            className="branchesDiscardModal__cancelBtn"
            onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="branchesDiscardModal__confirmBtn"
            onClick={onConfirm}>
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Branches_discardModal;
