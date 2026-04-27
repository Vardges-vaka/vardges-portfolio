import "../_styles/menus_addForm.css";

const Menus_addForm = ({
  name,
  isSaving,
  error,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => (
  <div className="menusAddForm" role="dialog" aria-modal="true">
    <div className="menusAddForm__panel">
      <h2 className="menusAddForm__title">{t("addMenu")}</h2>
      <p className="menusAddForm__hint">{t("addFormHint")}</p>
      {error && <p className="menusAddForm__error">{error}</p>}
      <label className="menusAddForm__field">
        <span>{t("fields.nameEn")}</span>
        <input
          className="menusAddForm__input"
          value={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("placeholders.nameEn")}
          autoFocus
        />
      </label>
      <div className="menusAddForm__actions">
        <button
          type="button"
          className="menusAddForm__btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          {t("actions.cancel")}
        </button>
        <button
          type="button"
          className="menusAddForm__btn menusAddForm__btn--primary"
          onClick={onSubmit}
          disabled={isSaving}
        >
          {isSaving ? t("saving") : t("actions.create")}
        </button>
      </div>
    </div>
  </div>
);

export default Menus_addForm;
