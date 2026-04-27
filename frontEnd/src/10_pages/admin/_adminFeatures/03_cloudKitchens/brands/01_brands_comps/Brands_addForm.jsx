import "../_styles/brands_addForm.css";

const Brands_addForm = ({
  name,
  isSaving,
  error,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => (
  <div className="brandsAddForm" role="dialog" aria-modal="true">
    <div className="brandsAddForm__panel">
      <h2 className="brandsAddForm__title">{t("addBrand")}</h2>
      <p className="brandsAddForm__hint">{t("addFormHint")}</p>
      {error && <p className="brandsAddForm__error">{error}</p>}
      <label className="brandsAddForm__field">
        <span>{t("fields.name")}</span>
        <input
          className="brandsAddForm__input"
          value={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("fields.namePlaceholder")}
          autoFocus
        />
      </label>
      <div className="brandsAddForm__actions">
        <button
          type="button"
          className="brandsAddForm__btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          {t("actions.cancel")}
        </button>
        <button
          type="button"
          className="brandsAddForm__btn brandsAddForm__btn--primary"
          onClick={onSubmit}
          disabled={isSaving}
        >
          {isSaving ? t("saving") : t("actions.create")}
        </button>
      </div>
    </div>
  </div>
);

export default Brands_addForm;
