import "../_styles/menuItems_modal.css";

const MenuItems_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="menuItemsModal" role="dialog" aria-modal="true">
      <div className="menuItemsModal__panel">
        <h2 className="menuItemsModal__title">{t("discardTitle")}</h2>
        <p className="menuItemsModal__hint">{t("discardHint")}</p>
        <div className="menuItemsModal__actions">
          <button type="button" className="menuItemsModal__btn" onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="menuItemsModal__btn menuItemsModal__btn--danger"
            onClick={onConfirm}
          >
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItems_discardModal;
