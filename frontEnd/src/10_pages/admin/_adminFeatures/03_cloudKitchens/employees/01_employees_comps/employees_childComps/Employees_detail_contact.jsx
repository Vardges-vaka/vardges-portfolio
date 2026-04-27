import { PhoneIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell } from "./_employees_childComps.index.js";
const hrefFor = (key, value) => key === "email" ? `mailto:${value}` : key === "telegram" ? `https://t.me/${String(value).replace(/^@/, "")}` : key === "whatsApp" ? `https://wa.me/${String(value).replace(/\D/g, "")}` : `tel:${value}`;
const fields = ["phone","whatsApp","telegram","email"];
const Employees_detail_contact = (props) => {
  const { employee, draft, fieldErrors, onDraftChange, t } = props; const source = draft ?? {};
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailContact" title={t("sections.contact")} icon={<PhoneIcon />} renderReadonly={() => <div>{fields.map((key) => { const value = employee?.contact?.[key]; return <p key={key}><strong>{t(`fields.${key}`)}:</strong> {value || t("empty.noValue")} {value && <a href={hrefFor(key, value)} target={key === "phone" || key === "email" ? undefined : "_blank"} rel="noopener noreferrer">{t(`contactActions.${key === "phone" ? "call" : key}`)}</a>}</p>; })}</div>} renderEditable={() => <div className="employeesSectionForm">{fields.map((key) => <label key={key}><span>{t(`fields.${key}`)}</span><input value={source[key] ?? ""} onChange={(e) => onDraftChange(key, e.target.value)} />{fieldErrors?.[key] && <small>{t(`validation.${fieldErrors[key]}`)}</small>}</label>)}</div>} />;
};
export default Employees_detail_contact;
