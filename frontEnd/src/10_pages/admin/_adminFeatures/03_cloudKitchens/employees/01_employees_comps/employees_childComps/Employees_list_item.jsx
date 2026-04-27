import "../../_styles/employees_item.css";
const statusLabel = (employee, t) => employee?.isTerminated ? t("badges.terminated") : employee?.isResigned ? t("badges.resigned") : employee?.isActive === false ? t("badges.inactive") : t("badges.active");
const Employees_list_item = ({ employee, onView, onEdit, onAddFiles, onAddImages, t }) => (
  <div className="employeesListItem">
    <div className="employeesListItem__main">
      <strong>{employee.firstName} {employee.lastName}</strong>
      <span>{statusLabel(employee, t)}</span>
      <small>{employee?.workingBranch?.name || t("empty.noValue")} | {employee?.joiningDate ? new Date(employee.joiningDate).toISOString().slice(0, 10) : t("empty.noValue")}</small>
    </div>
    <div className="employeesListItem__actions">
      <button type="button" onClick={() => onView(employee._id)}>{t("actions.view")}</button>
      <button type="button" onClick={() => onEdit(employee._id)}>{t("actions.edit")}</button>
      <button type="button" onClick={() => onAddFiles(employee._id)}>{t("actions.addFiles")}</button>
      <button type="button" onClick={() => onAddImages(employee._id)}>{t("actions.addImages")}</button>
    </div>
  </div>
);
export default Employees_list_item;
