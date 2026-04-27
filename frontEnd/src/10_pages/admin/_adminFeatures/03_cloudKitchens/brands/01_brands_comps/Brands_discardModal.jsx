import "../_styles/brands_modal.css";

const Brands_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="brandsModal" role="dialog" aria-modal="true">
      <div className="brandsModal__panel">
        <h2 className="brandsModal__title">{t("discardTitle")}</h2>
        <p className="brandsModal__hint">{t("discardHint")}</p>
        <div className="brandsModal__actions">
          <button type="button" className="brandsModal__btn" onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="brandsModal__btn brandsModal__btn--danger"
            onClick={onConfirm}
          >
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands_discardModal;
