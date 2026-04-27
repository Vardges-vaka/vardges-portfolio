import "../_styles/menus_modal.css";

const Menus_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="menusModal" role="dialog" aria-modal="true">
      <div className="menusModal__panel">
        <h2 className="menusModal__title">{t("discardTitle")}</h2>
        <p className="menusModal__hint">{t("discardHint")}</p>
        <div className="menusModal__actions">
          <button type="button" className="menusModal__btn" onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="menusModal__btn menusModal__btn--danger"
            onClick={onConfirm}
          >
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menus_discardModal;
