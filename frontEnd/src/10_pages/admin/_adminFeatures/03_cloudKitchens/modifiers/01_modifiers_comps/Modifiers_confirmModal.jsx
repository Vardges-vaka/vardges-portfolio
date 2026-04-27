import "../_styles/modifiers_modal.css";

const Modifiers_confirmModal = ({
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
    <div className="modifiersModal" role="dialog" aria-modal="true">
      <div className="modifiersModal__panel">
        <h2 className="modifiersModal__title">{t("confirmTitle")}</h2>
        <p className="modifiersModal__hint">{t("confirmHint")}</p>
        <div className="modifiersModal__changes">
          {(changes ?? []).map((change) => (
            <div className="modifiersModal__change" key={change.field}>
              <strong>{change.field}</strong>
              <span>
                {String(change.from ?? "-")} {"->"} {String(change.to ?? "-")}
              </span>
            </div>
          ))}
        </div>
        {error && <p className="modifiersModal__error">{error}</p>}
        <div className="modifiersModal__actions">
          <button
            type="button"
            className="modifiersModal__btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="modifiersModal__btn modifiersModal__btn--primary"
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

export default Modifiers_confirmModal;
