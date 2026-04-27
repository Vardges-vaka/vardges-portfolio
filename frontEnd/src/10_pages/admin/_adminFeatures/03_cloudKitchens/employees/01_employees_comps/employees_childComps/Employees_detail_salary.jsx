import { MoneyIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell } from "./_employees_childComps.index.js";
const fields = ["basic","allowances","currency"];
const Employees_detail_salary = (props) => {
  const { employee, draft, fieldErrors, onDraftChange, t } = props; const source = draft ?? {};
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailSalary" title={t("sections.salary")} icon={<MoneyIcon />} renderReadonly={() => <dl>{fields.map((key) => <div key={key}><dt>{t(`fields.${key}`)}</dt><dd>{employee?.salary?.[key] ?? t("empty.noValue")}</dd></div>)}</dl>} renderEditable={() => <div className="employeesSectionForm">{fields.map((key) => <label key={key}><span>{t(`fields.${key}`)}</span><input type={key === "currency" ? "text" : "number"} value={source[key] ?? ""} onChange={(e) => onDraftChange(key, e.target.value)} />{fieldErrors?.[key] && <small>{t(`validation.${fieldErrors[key]}`)}</small>}</label>)}</div>} />;
};
export default Employees_detail_salary;
