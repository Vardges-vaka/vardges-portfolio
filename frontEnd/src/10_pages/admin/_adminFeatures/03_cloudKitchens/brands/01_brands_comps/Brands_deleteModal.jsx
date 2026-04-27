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
      <div className="brandsModal__panel">
        <h2 className="brandsModal__title">{t("deleteTitle")}</h2>
        <p className="brandsModal__hint">
          {t("deleteHint")} <strong>{brandName}</strong>
        </p>
        {error && <p className="brandsModal__error">{error}</p>}
        <div className="brandsModal__actions">
          <button
            type="button"
            className="brandsModal__btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="brandsModal__btn brandsModal__btn--danger"
            onClick={onConfirm}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands_deleteModal;
