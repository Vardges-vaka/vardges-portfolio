import { UserIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell } from "./_employees_childComps.index.js";
const fields = ["firstName", "lastName", "legalFullName", "dateOfBirth", "joiningDate"];
const Employees_detail_basic = (props) => {
  const { employee, draft, fieldErrors, onDraftChange, t } = props;
  const source = draft ?? {};
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailBasic" title={t("sections.basic")} icon={<UserIcon />} renderReadonly={() => <dl>{fields.map((key) => <div key={key}><dt>{t(`fields.${key}`)}</dt><dd>{key.includes("Date") && employee?.[key] ? new Date(employee[key]).toISOString().slice(0, 10) : employee?.[key] || t("empty.noValue")}</dd></div>)}</dl>} renderEditable={() => <div className="employeesSectionForm">{fields.map((key) => <label key={key}><span>{t(`fields.${key}`)}</span><input type={key.includes("Date") ? "date" : "text"} value={source[key] ?? ""} onChange={(e) => onDraftChange(key, e.target.value)} />{fieldErrors?.[key] && <small>{t(`validation.${fieldErrors[key]}`)}</small>}</label>)}</div>} />;
};
export default Employees_detail_basic;
