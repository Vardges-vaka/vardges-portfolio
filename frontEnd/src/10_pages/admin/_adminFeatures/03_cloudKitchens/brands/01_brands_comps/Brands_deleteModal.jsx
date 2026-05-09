import "../_styles/brands_modal.css";

const Brands_deleteModal = ({
  isOpen,
  brandName,
  isSaving,
  error,
  onConfirm,
  onCancel,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="brandsModal" role="dialog" aria-modal="true">
      <div className="brandsModal_panel">
        <h2 className="brandsModal_title">{t("deleteTitle")}</h2>
        <p className="brandsModal_hint">
          {t("deleteHint")} <strong>{brandName}</strong>
        </p>
        {error && <p className="brandsModal_error">{error}</p>}
        <div className="brandsModal_actions">
          <button
            type="button"
            className="brandsModal_btn"
            onClick={onCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="brandsModal_btn brandsModal_btn--danger"
            onClick={onConfirm}
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands_deleteModal;
