import "../_styles/menuItems_modal.css";

const MenuItems_deleteModal = ({
  isOpen,
  menuItemName,
  isSaving,
  error,
  onConfirm,
  onCancel,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="menuItemsModal" role="dialog" aria-modal="true">
      <div className="menuItemsModal__panel">
        <h2 className="menuItemsModal__title">{t("deleteTitle")}</h2>
        <p className="menuItemsModal__hint">
          {t("deleteHint")} <strong>{menuItemName}</strong>
        </p>
        {error && <p className="menuItemsModal__error">{error}</p>}
        <div className="menuItemsModal__actions">
          <button
            type="button"
            className="menuItemsModal__btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="menuItemsModal__btn menuItemsModal__btn--danger"
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

export default MenuItems_deleteModal;
