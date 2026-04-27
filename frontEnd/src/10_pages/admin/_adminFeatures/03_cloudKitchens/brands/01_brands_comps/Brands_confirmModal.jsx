import "../_styles/brands_modal.css";

const Brands_confirmModal = ({
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
    <div className="brandsModal" role="dialog" aria-modal="true">
      <div className="brandsModal__panel">
        <h2 className="brandsModal__title">{t("confirmTitle")}</h2>
        <p className="brandsModal__hint">{t("confirmHint")}</p>
        <div className="brandsModal__changes">
          {(changes ?? []).map((change) => (
            <div className="brandsModal__change" key={change.field}>
              <strong>{change.field}</strong>
              <span>
                {String(change.from ?? "-")} {"->"} {String(change.to ?? "-")}
              </span>
            </div>
          ))}
        </div>
        {error && <p className="brandsModal__error">{error}</p>}
        <div className="brandsModal__actions">
          <button
            type="button"
            className="brandsModal__btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="brandsModal__btn brandsModal__btn--primary"
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

export default Brands_confirmModal;
