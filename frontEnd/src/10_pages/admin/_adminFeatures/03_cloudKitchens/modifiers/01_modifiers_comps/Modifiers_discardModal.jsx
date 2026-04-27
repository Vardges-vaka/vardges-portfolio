import "../_styles/modifiers_modal.css";

const Modifiers_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="modifiersModal" role="dialog" aria-modal="true">
      <div className="modifiersModal__panel">
        <h2 className="modifiersModal__title">{t("discardTitle")}</h2>
        <p className="modifiersModal__hint">{t("discardHint")}</p>
        <div className="modifiersModal__actions">
          <button type="button" className="modifiersModal__btn" onClick={onCancel}>
            {t("actions.keepEditing")}
          </button>
          <button
            type="button"
            className="modifiersModal__btn modifiersModal__btn--danger"
            onClick={onConfirm}
          >
            {t("actions.discard")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modifiers_discardModal;
