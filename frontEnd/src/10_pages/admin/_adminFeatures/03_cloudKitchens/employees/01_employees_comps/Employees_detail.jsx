import {
  Employees_detail_basic,
  Employees_detail_status,
  Employees_detail_contact,
  Employees_detail_assignment,
  Employees_detail_salary,
  Employees_detail_leaves,
  Employees_detail_legal,
  Employees_detail_certifications,
  Employees_detail_uniform,
  Employees_detail_imagesPlaceholder,
} from "./employees_childComps/_employees_childComps.index.js";
import { TrashIcon } from "./Employees_icons/_employees_icons.index.js";
import { SECTION_KEYS } from "../05_employees_cnst/_employees_cnst.index.js";
import "../_styles/employees_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Employees_detail_basic,
  [SECTION_KEYS.status]: Employees_detail_status,
  [SECTION_KEYS.contact]: Employees_detail_contact,
  [SECTION_KEYS.assignment]: Employees_detail_assignment,
  [SECTION_KEYS.salary]: Employees_detail_salary,
  [SECTION_KEYS.leaves]: Employees_detail_leaves,
  [SECTION_KEYS.legal]: Employees_detail_legal,
  [SECTION_KEYS.certifications]: Employees_detail_certifications,
  [SECTION_KEYS.uniform]: Employees_detail_uniform,
};

const Employees_detail = ({ employee, isBulkEdit, isSaving, error, layout, sectionProps, onBack, onBulkSubmit, onBulkCancel, onDeleteRequest, t }) => {
  if (!employee) return <div className="employeesDetail"><button type="button" onClick={onBack}>{t("actions.back")}</button><p>{t("empty.employeeGone")}</p></div>;
  const renderSection = (key) => { const Component = SECTION_COMPONENT[key]; return Component ? <Component key={key} {...sectionProps[key]} /> : null; };
  return (
    <div className="employeesDetail">
      <div className="employeesDetail__toolbar"><button type="button" onClick={onBack}>{t("actions.back")}</button><h2>{employee.firstName} {employee.lastName}</h2>{isBulkEdit && <span>{t("bulkEditBadge")}</span>}</div>
      {error && <p className="employeesDetail__error">{error}</p>}
      <div className="employeesDetail__columns"><div>{layout.leftColumn.map(renderSection)}</div><div>{layout.rightColumn.map(renderSection)}</div></div>
      <div className="employeesDetail__bottomStrip"><Employees_detail_imagesPlaceholder t={t} /></div>
      {isBulkEdit ? <div className="employeesDetail__footer"><button type="button" onClick={onBulkCancel} disabled={isSaving}>{t("actions.cancel")}</button><button type="button" onClick={onBulkSubmit} disabled={isSaving}>{isSaving ? t("saving") : t("actions.saveAll")}</button></div> : <div className="employeesDetail__footer"><button type="button" onClick={onDeleteRequest}><TrashIcon size={16} /> {t("actions.deleteEmployee")}</button></div>}
    </div>
  );
};
export default Employees_detail;
