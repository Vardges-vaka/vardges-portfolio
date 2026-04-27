import { BadgeIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell } from "./_employees_childComps.index.js";
const Employees_detail_status = (props) => {
  const { employee, draft, fieldErrors, onDraftChange, t } = props;
  const source = draft ?? {};
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailStatus" title={t("sections.status")} icon={<BadgeIcon />} renderReadonly={() => <dl>{["isActive","isResigned","isTerminated","terminationReason"].map((key) => <div key={key}><dt>{t(`fields.${key}`)}</dt><dd>{typeof employee?.[key] === "boolean" ? (employee[key] ? t("badges.yes") : t("badges.no")) : employee?.[key] || t("empty.noValue")}</dd></div>)}</dl>} renderEditable={() => <div className="employeesSectionForm">{["isActive","isResigned","isTerminated"].map((key) => <label key={key} className="employeesCheckbox"><input type="checkbox" checked={!!source[key]} onChange={(e) => onDraftChange(key, e.target.checked)} /><span>{t(`fields.${key}`)}</span></label>)}{fieldErrors?.isActive && <small>{t(`validation.${fieldErrors.isActive}`)}</small>}{source.isTerminated && <label><span>{t("fields.terminationReason")}</span><textarea value={source.terminationReason ?? ""} onChange={(e) => onDraftChange("terminationReason", e.target.value)} /></label>}</div>} />;
};
export default Employees_detail_status;
