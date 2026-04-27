import "../_styles/employees_modal.css";
const Employees_deleteModal = ({ isOpen, employeeName, isSaving, error, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;
  return <div className="employeesModal" role="dialog" aria-modal="true"><div className="employeesModal__panel"><h2>{t("deleteTitle")}</h2><p>{t("deleteHint")} <strong>{employeeName}</strong></p>{error && <p className="employeesModal__error">{error}</p>}<div className="employeesModal__actions"><button type="button" onClick={onCancel} disabled={isSaving}>{t("actions.cancel")}</button><button type="button" className="employeesModal__danger" onClick={onConfirm} disabled={isSaving}>{isSaving ? t("saving") : t("actions.delete")}</button></div></div></div>;
};
export default Employees_deleteModal;
