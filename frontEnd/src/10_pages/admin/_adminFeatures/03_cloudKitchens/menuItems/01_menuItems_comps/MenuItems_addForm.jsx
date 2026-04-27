import "../_styles/menuItems_addForm.css";

const MenuItems_addForm = ({
  name,
  isSaving,
  error,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => (
  <div className="menuItemsAddForm" role="dialog" aria-modal="true">
    <div className="menuItemsAddForm__panel">
      <h2 className="menuItemsAddForm__title">{t("addMenuItem")}</h2>
      <p className="menuItemsAddForm__hint">{t("addFormHint")}</p>
      {error && <p className="menuItemsAddForm__error">{error}</p>}
      <label className="menuItemsAddForm__field">
        <span>{t("fields.name")}</span>
        <input
          className="menuItemsAddForm__input"
          value={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("placeholders.namePlaceholder")}
          autoFocus
        />
      </label>
      <div className="menuItemsAddForm__actions">
        <button
          type="button"
          className="menuItemsAddForm__btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          {t("actions.cancel")}
        </button>
        <button
          type="button"
          className="menuItemsAddForm__btn menuItemsAddForm__btn--primary"
          onClick={onSubmit}
          disabled={isSaving}
        >
          {isSaving ? t("saving") : t("actions.create")}
        </button>
      </div>
    </div>
  </div>
);

export default MenuItems_addForm;
