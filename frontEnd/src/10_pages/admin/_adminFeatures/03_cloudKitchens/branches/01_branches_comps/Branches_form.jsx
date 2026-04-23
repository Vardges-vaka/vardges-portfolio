import "../_styles/branches_form.css";

const Branches_form = ({
  formData,
  isEditing,
  showForm,
  error,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => {
  if (!showForm) return null;

  return (
    <div className="branchesForm">
      <h3 className="branchesForm__title">
        {isEditing ? t("editBranch") : t("addBranch")}
      </h3>

      <div className="branchesForm__field">
        <label className="branchesForm__label">{t("name")}</label>
        <input
          className="branchesForm__input"
          type="text"
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder={t("namePlaceholder")}
        />
      </div>

      {error && <p className="branchesForm__error">{error}</p>}

      <div className="branchesForm__actions">
        <button className="branchesForm__submitBtn" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? t("saving") : t("save")}
        </button>
        <button className="branchesForm__cancelBtn" onClick={onCancel} disabled={isLoading}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default Branches_form;
