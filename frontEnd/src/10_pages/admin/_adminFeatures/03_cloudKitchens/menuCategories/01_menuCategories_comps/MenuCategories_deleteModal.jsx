import "../_styles/menuCategories_modal.css";

const MenuCategories_deleteModal = ({
  isOpen,
  categoryName,
  isSaving,
  error,
  onConfirm,
  onCancel,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="menuCategoriesModal" role="dialog" aria-modal="true">
      <div className="menuCategoriesModal__panel">
        <h2 className="menuCategoriesModal__title">{t("deleteTitle")}</h2>
        <p className="menuCategoriesModal__hint">
          {t("deleteHint")} <strong>{categoryName}</strong>
        </p>
        {error && <p className="menuCategoriesModal__error">{error}</p>}
        <div className="menuCategoriesModal__actions">
          <button
            type="button"
            className="menuCategoriesModal__btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="menuCategoriesModal__btn menuCategoriesModal__btn--danger"
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

export default MenuCategories_deleteModal;
