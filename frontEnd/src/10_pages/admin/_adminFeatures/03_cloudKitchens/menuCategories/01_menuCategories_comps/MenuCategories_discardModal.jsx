import "../_styles/menuCategories_modal.css";

const MenuCategories_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="menuCategoriesModal" role="dialog" aria-modal="true">
      <div className="menuCategoriesModal__panel">
        <h2 className="menuCategoriesModal__title">{t("discardTitle")}</h2>
        <p className="menuCategoriesModal__hint">{t("discardHint")}</p>
        <div className="menuCategoriesModal__actions">
          <button type="button" className="menuCategoriesModal__btn" onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="menuCategoriesModal__btn menuCategoriesModal__btn--danger"
            onClick={onConfirm}
          >
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCategories_discardModal;
