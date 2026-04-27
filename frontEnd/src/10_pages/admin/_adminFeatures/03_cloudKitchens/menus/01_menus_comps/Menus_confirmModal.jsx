import "../_styles/menus_modal.css";

const Menus_confirmModal = ({
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
    <div className="menusModal" role="dialog" aria-modal="true">
      <div className="menusModal__panel">
        <h2 className="menusModal__title">{t("confirmTitle")}</h2>
        <p className="menusModal__hint">{t("confirmHint")}</p>
        <div className="menusModal__changes">
          {(changes ?? []).map((change) => (
            <div className="menusModal__change" key={change.field}>
              <strong>{change.field}</strong>
              <span>
                {String(change.from ?? "-")} {"->"} {String(change.to ?? "-")}
              </span>
            </div>
          ))}
        </div>
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
            className="menusModal__btn menusModal__btn--primary"
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

export default Menus_confirmModal;
