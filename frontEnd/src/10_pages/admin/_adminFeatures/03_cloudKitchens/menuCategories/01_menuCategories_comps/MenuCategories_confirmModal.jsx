import "../_styles/menuCategories_modal.css";

const MenuCategories_confirmModal = ({
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
    <div className="menuCategoriesModal" role="dialog" aria-modal="true">
      <div className="menuCategoriesModal__panel">
        <h2 className="menuCategoriesModal__title">{t("confirmTitle")}</h2>
        <p className="menuCategoriesModal__hint">{t("confirmHint")}</p>
        <div className="menuCategoriesModal__changes">
          {(changes ?? []).map((change) => (
            <div className="menuCategoriesModal__change" key={change.field}>
              <strong>{change.field}</strong>
              <span>
                {String(change.from ?? "-")} {"->"} {String(change.to ?? "-")}
              </span>
            </div>
          ))}
        </div>
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
            className="menuCategoriesModal__btn menuCategoriesModal__btn--primary"
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

export default MenuCategories_confirmModal;
