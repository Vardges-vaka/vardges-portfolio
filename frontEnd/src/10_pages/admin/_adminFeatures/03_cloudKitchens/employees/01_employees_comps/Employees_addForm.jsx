import "../_styles/employees_addForm.css";
const Employees_addForm = ({ firstName, lastName, isSaving, error, onFirstNameChange, onLastNameChange, onSubmit, onCancel, t }) => (
  <div className="employeesAddForm" role="dialog" aria-modal="true">
    <div className="employeesAddForm__panel">
      <h2>{t("addEmployee")}</h2>
      <p>{t("addFormHint")}</p>
      {error && <p className="employeesAddForm__error">{error}</p>}
      <label><span>{t("fields.firstName")}</span><input value={firstName} onChange={(event) => onFirstNameChange(event.target.value)} autoFocus /></label>
      <label><span>{t("fields.lastName")}</span><input value={lastName} onChange={(event) => onLastNameChange(event.target.value)} /></label>
      <div className="employeesAddForm__actions">
        <button type="button" onClick={onCancel} disabled={isSaving}>{t("actions.cancel")}</button>
        <button type="button" className="employeesAddForm__primary" onClick={onSubmit} disabled={isSaving}>{isSaving ? t("saving") : t("actions.create")}</button>
      </div>
    </div>
  </div>
);
export default Employees_addForm;
