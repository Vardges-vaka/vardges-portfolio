import { useEffect } from "react";
import { TrashIcon } from "../Branches_icons/_branches_icons.index.js";
import "../../../_styles/branches_deleteModal.css";

// Destructive confirm for branch deletion. Branch name is interpolated into
// the body copy so the user knows exactly what they're about to wipe out.
const Branches_deleteModal = ({
  isOpen,
  branchName,
  isSaving,
  error,
  onConfirm,
  onCancel,
  t,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape" && !isSaving) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isSaving, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="branchesDeleteModal"
      role="dialog"
      aria-modal="true"
      aria-label={t("deleteTitle")}>
      <div
        className="branchesDeleteModal__backdrop"
        onClick={!isSaving ? onCancel : undefined}
      />

      <div className="branchesDeleteModal__dialog">
        <div className="branchesDeleteModal__iconWrap">
          <TrashIcon size={28} />
        </div>
        <h3 className="branchesDeleteModal__title">{t("deleteTitle")}</h3>
        <p className="branchesDeleteModal__hint">
          {t("deleteHint")}
          {branchName && (
            <>
              <br />
              <strong className="branchesDeleteModal__branchName">
                {branchName}
              </strong>
            </>
          )}
        </p>

        {error && <p className="branchesDeleteModal__error">{error}</p>}

        <div className="branchesDeleteModal__actions">
          <button
            type="button"
            className="branchesDeleteModal__cancelBtn"
            onClick={onCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="branchesDeleteModal__confirmBtn"
            onClick={onConfirm}
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.deleteBranch")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Branches_deleteModal;
