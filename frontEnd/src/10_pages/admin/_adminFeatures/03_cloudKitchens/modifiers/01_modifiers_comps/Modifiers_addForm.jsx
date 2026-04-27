import "../_styles/modifiers_addForm.css";

const Modifiers_addForm = ({
  name,
  isSaving,
  error,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => (
  <div className="modifiersAddForm" role="dialog" aria-modal="true">
    <div className="modifiersAddForm__panel">
      <h2 className="modifiersAddForm__title">{t("addModifier")}</h2>
      <p className="modifiersAddForm__hint">{t("addFormHint")}</p>
      {error && <p className="modifiersAddForm__error">{error}</p>}
      <label className="modifiersAddForm__field">
        <span>{t("fields.name")} (EN)</span>
        <input
          className="modifiersAddForm__input"
          value={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("fields.name")}
          autoFocus
        />
      </label>
      <div className="modifiersAddForm__actions">
        <button
          type="button"
          className="modifiersAddForm__btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          {t("actions.cancel")}
        </button>
        <button
          type="button"
          className="modifiersAddForm__btn modifiersAddForm__btn--primary"
          onClick={onSubmit}
          disabled={isSaving}
        >
          {isSaving ? t("saving") : t("actions.create")}
        </button>
      </div>
    </div>
  </div>
);

export default Modifiers_addForm;
