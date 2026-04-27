import "../_styles/employees_modal.css";
const Employees_confirmModal = ({ isOpen, changes, isSaving, error, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;
  return (
    <div className="employeesModal" role="dialog" aria-modal="true"><div className="employeesModal__panel">
      <h2>{t("confirmTitle")}</h2><p>{t("confirmHint")}</p>
      <div className="employeesModal__changes">{(changes ?? []).map((change) => <div className="employeesModal__change" key={change.field}><strong>{change.field}</strong><span>{String(change.from ?? "-")} {"->"} {String(change.to ?? "-")}</span></div>)}</div>
      {error && <p className="employeesModal__error">{error}</p>}
      <div className="employeesModal__actions"><button type="button" onClick={onCancel} disabled={isSaving}>{t("actions.cancel")}</button><button type="button" className="employeesModal__primary" onClick={onConfirm} disabled={isSaving}>{isSaving ? t("saving") : t("actions.confirm")}</button></div>
    </div></div>
  );
};
export default Employees_confirmModal;
