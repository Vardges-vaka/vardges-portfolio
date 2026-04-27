import "../_styles/menus_modal.css";

const Menus_deleteModal = ({
  isOpen,
  menuName,
  isSaving,
  error,
  onConfirm,
  onCancel,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="menusModal" role="dialog" aria-modal="true">
      <div className="menusModal__panel">
        <h2 className="menusModal__title">{t("deleteTitle")}</h2>
        <p className="menusModal__hint">
          {t("deleteHint")} <strong>{menuName}</strong>
        </p>
        {error && <p className="menusModal__error">{error}</p>}
        <div className="menusModal__actions">
          <button
            type="button"
            className="menusModal__btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="menusModal__btn menusModal__btn--danger"
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

export default Menus_deleteModal;
