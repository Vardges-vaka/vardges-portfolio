import "../../../_styles/competitors_logoModal.css";

const Competitors_logoModal = ({
  isOpen,
  competitorName,
  logoSrc,
  onClose,
  onUpdate,
  t,
}) => {
  if (!isOpen) return null;

  const closeLabel = t ? t("actions.close", "Close") : "Close";
  const cancelLabel = t ? t("actions.cancel", "Cancel") : "Cancel";
  const updateLabel = t
    ? t("profile.logo.update", { defaultValue: "Update logo" })
    : "Update logo";

  return (
    <div
      className="competitorsLogoModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="competitorsLogoModal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="competitorsLogoModal__header">
          <div className="competitorsLogoModal__title">
            <strong>{competitorName || "—"}</strong>
          </div>
          <button
            type="button"
            className="competitorsLogoModal__close"
            onClick={onClose}
            aria-label={closeLabel}
            title={closeLabel}
          >
            ×
          </button>
        </div>

        <div className="competitorsLogoModal__body">
          {logoSrc ? (
            <img className="competitorsLogoModal__img" src={logoSrc} alt="" />
          ) : (
            <span className="competitorsLogoModal__placeholder">—</span>
          )}
        </div>

        <div className="competitorsLogoModal__footer">
          <button type="button" className="competitorsLogoModal__btn" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className="competitorsLogoModal__btn competitorsLogoModal__btn--primary"
            onClick={onUpdate}
          >
            {updateLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Competitors_logoModal;

