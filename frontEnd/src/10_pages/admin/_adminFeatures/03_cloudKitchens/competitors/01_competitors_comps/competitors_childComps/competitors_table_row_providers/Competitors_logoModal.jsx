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
      className="Competitors_logoModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="Competitors_logoModal_panel" onClick={(e) => e.stopPropagation()}>
        <div className="Competitors_logoModal_header">
          <div className="Competitors_logoModal_title">
            <strong>{competitorName || "—"}</strong>
          </div>
          <button
            type="button"
            className="Competitors_logoModal_close"
            onClick={onClose}
            aria-label={closeLabel}
            title={closeLabel}
          >
            ×
          </button>
        </div>

        <div className="Competitors_logoModal_body">
          {logoSrc ? (
            <img className="Competitors_logoModal_img" src={logoSrc} alt="" />
          ) : (
            <span className="Competitors_logoModal_placeholder">—</span>
          )}
        </div>

        <div className="Competitors_logoModal_footer">
          <button type="button" className="Competitors_logoModal_btn" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className="Competitors_logoModal_btn Competitors_logoModal_btnPrimary"
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

