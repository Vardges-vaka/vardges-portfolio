import "../_styles/modifiers_modal.css";

const Modifiers_deleteModal = ({
  isOpen,
  modifierName,
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
        <h2 className="modifiersModal__title">{t("deleteTitle")}</h2>
        <p className="modifiersModal__hint">
          {t("deleteHint")} <strong>{modifierName}</strong>
        </p>
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
            className="modifiersModal__btn modifiersModal__btn--danger"
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

export default Modifiers_deleteModal;
