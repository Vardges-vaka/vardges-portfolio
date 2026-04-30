import { useEffect } from "react";
import "../../../_styles/branches_confirmModal.css";

// Displays a clean field-level diff before the PUT fires. Reused by BOTH
// the inline-rename flow AND the per-section edit flow, so it's intentionally
// payload-agnostic — it only renders the supplied `changes` array.

// Coerces whatever `from`/`to` carry into something printable.
// `null` → dash, booleans → yes/no, arrays → length, objects → [object].
const formatValue = (value, t) => {
  if (value === null || value === undefined || value === "") {
    return t("empty.noValue");
  }
  if (typeof value === "boolean") {
    return value ? t("badges.yes") : t("badges.no");
  }
  if (Array.isArray(value)) return `${value.length} item(s)`;
  if (typeof value === "object") return "{…}";
  return String(value);
};

const Branches_confirmModal = ({
  isOpen,
  sectionKey,
  changes,
  isSaving,
  error,
  onConfirm,
  onCancel,
  t,
}) => {
  // Esc closes the modal without wiping the section draft.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const title = sectionKey
    ? `${t("confirmTitle")} — ${t(`sections.${sectionKey}`)}`
    : t("confirmTitle");

  return (
    <div
      className="branchesConfirmModal"
      role="dialog"
      aria-modal="true"
      aria-label={title}>
      <div className="branchesConfirmModal__backdrop" onClick={onCancel} />

      <div className="branchesConfirmModal__dialog">
        <h3 className="branchesConfirmModal__title">{title}</h3>
        <p className="branchesConfirmModal__hint">{t("confirmHint")}</p>

        <ul className="branchesConfirmModal__changes">
          {changes.map(({ field, from, to }) => (
            <li key={field} className="branchesConfirmModal__changeRow">
              <span className="branchesConfirmModal__field">{field}</span>
              <div className="branchesConfirmModal__values">
                <span className="branchesConfirmModal__from">
                  {formatValue(from, t)}
                </span>
                <span className="branchesConfirmModal__arrow">→</span>
                <span className="branchesConfirmModal__to">
                  {formatValue(to, t)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {error && <p className="branchesConfirmModal__error">{error}</p>}

        <div className="branchesConfirmModal__actions">
          <button
            type="button"
            className="branchesConfirmModal__cancelBtn"
            onClick={onCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="branchesConfirmModal__confirmBtn"
            onClick={onConfirm}
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Branches_confirmModal;
