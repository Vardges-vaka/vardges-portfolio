import "../_styles/menuCategories_addForm.css";

const MenuCategories_addForm = ({
  name,
  isSaving,
  error,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => (
  <div className="menuCategoriesAddForm" role="dialog" aria-modal="true">
    <div className="menuCategoriesAddForm__panel">
      <h2 className="menuCategoriesAddForm__title">{t("addCategory")}</h2>
      <p className="menuCategoriesAddForm__hint">{t("addFormHint")}</p>
      {error && <p className="menuCategoriesAddForm__error">{error}</p>}
      <label className="menuCategoriesAddForm__field">
        <span>{t("fields.nameEn")}</span>
        <input
          className="menuCategoriesAddForm__input"
          value={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("placeholders.nameEn")}
          autoFocus
        />
      </label>
      <div className="menuCategoriesAddForm__actions">
        <button
          type="button"
          className="menuCategoriesAddForm__btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          {t("actions.cancel")}
        </button>
        <button
          type="button"
          className="menuCategoriesAddForm__btn menuCategoriesAddForm__btn--primary"
          onClick={onSubmit}
          disabled={isSaving}
        >
          {isSaving ? t("saving") : t("actions.create")}
        </button>
      </div>
    </div>
  </div>
);

export default MenuCategories_addForm;
