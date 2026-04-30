import "../../../_styles/branches_addForm.css";

// Minimal "create branch" form. Name-only — the rest of a branch's data is
// filled in afterwards via the detail view's per-section edit flow.
// Rendered as a modal overlay so it never competes with list/table/map/detail
// real estate.
const Branches_addForm = ({
  name,
  isSaving,
  error,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div
      className="branchesAddForm"
      role="dialog"
      aria-modal="true"
      aria-label={t("addBranch")}>
      <div className="branchesAddForm__backdrop" onClick={onCancel} />

      <form className="branchesAddForm__dialog" onSubmit={handleSubmit}>
        <h3 className="branchesAddForm__title">{t("addBranch")}</h3>
        <p className="branchesAddForm__hint">{t("addFormHint")}</p>

        <div className="branchesAddForm__field">
          <label className="branchesAddForm__label" htmlFor="addBranchName">
            {t("fields.name")}
          </label>
          <input
            id="addBranchName"
            className="branchesAddForm__input"
            type="text"
            value={name ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("fields.namePlaceholder")}
            autoFocus
          />
        </div>

        {error && <p className="branchesAddForm__error">{error}</p>}

        <div className="branchesAddForm__actions">
          <button
            type="button"
            className="branchesAddForm__cancelBtn"
            onClick={onCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="submit"
            className="branchesAddForm__submitBtn"
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.create")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Branches_addForm;
