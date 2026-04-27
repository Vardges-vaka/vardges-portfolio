import "../_styles/employees_modal.css";
const Employees_discardModal = ({ isOpen, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;
  return <div className="employeesModal" role="dialog" aria-modal="true"><div className="employeesModal__panel"><h2>{t("discardTitle")}</h2><p>{t("discardHint")}</p><div className="employeesModal__actions"><button type="button" onClick={onCancel}>{t("actions.keepEditing")}</button><button type="button" className="employeesModal__danger" onClick={onConfirm}>{t("actions.discard")}</button></div></div></div>;
};
export default Employees_discardModal;
