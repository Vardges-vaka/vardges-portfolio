import "../_styles/menuItems_modal.css";

const MenuItems_confirmModal = ({
  isOpen,
  changes,
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
        <h2 className="menuItemsModal__title">{t("confirmTitle")}</h2>
        <p className="menuItemsModal__hint">{t("confirmHint")}</p>
        <div className="menuItemsModal__changes">
          {(changes ?? []).map((change) => (
            <div className="menuItemsModal__change" key={change.field}>
              <strong>{change.field}</strong>
              <span>
                {String(change.from ?? "-")} {"->"} {String(change.to ?? "-")}
              </span>
            </div>
          ))}
        </div>
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
            className="menuItemsModal__btn menuItemsModal__btn--primary"
            onClick={onConfirm}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItems_confirmModal;
