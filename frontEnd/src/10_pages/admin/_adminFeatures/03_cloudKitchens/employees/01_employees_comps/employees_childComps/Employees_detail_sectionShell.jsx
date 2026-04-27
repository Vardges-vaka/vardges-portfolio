import { ChevronIcon } from "../Employees_icons/_employees_icons.index.js";
import "../../_styles/employees_detail_section.css";
const Employees_detail_sectionShell = ({ rootClass, title, icon, isEditing, isBulkEdit, isCollapsed, isEmpty, isSaving, onToggleCollapse, onEditStart, onCancel, onSubmit, t, renderReadonly, renderEditable }) => {
  const collapsed = !isBulkEdit && isCollapsed && !isEditing;
  return (
    <div className={"employeesDetailSection " + rootClass + (collapsed ? " employeesDetailSection--collapsed" : "")}>
      <div className="employeesDetailSection__header">
        <button type="button" onClick={onToggleCollapse} disabled={isBulkEdit} aria-expanded={!collapsed}>{!isBulkEdit && <ChevronIcon size={14} />}{icon}<h3>{title}</h3></button>
        {!isBulkEdit && <div>{isEditing ? <><button type="button" onClick={onCancel} disabled={isSaving}>{t("actions.cancel")}</button><button type="button" onClick={onSubmit} disabled={isSaving}>{isSaving ? t("saving") : t("actions.save")}</button></> : <button type="button" onClick={onEditStart}>{isEmpty ? t("actions.add") : t("actions.edit")}</button>}</div>}
      </div>
      {!collapsed && <div className="employeesDetailSection__body">{isEditing ? renderEditable() : renderReadonly()}</div>}
    </div>
  );
};
export default Employees_detail_sectionShell;
