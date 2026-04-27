import { CertIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell } from "./_employees_childComps.index.js";
const fields = ["name","issuer","issuedDate","expDate","notes"];
const Employees_detail_certifications = (props) => {
  const { employee, draft, handlers, isBulkEdit, t } = props; const rows = Array.isArray(draft) ? draft : []; const readRows = employee?.certifications ?? [];
  const add = isBulkEdit ? handlers.handleBulkCertificationAdd : handlers.handleCertificationAdd; const remove = isBulkEdit ? handlers.handleBulkCertificationRemove : handlers.handleCertificationRemove; const change = isBulkEdit ? handlers.handleBulkCertificationChange : handlers.handleCertificationChange;
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailCertifications" title={t("sections.certifications")} icon={<CertIcon />} renderReadonly={() => <div>{readRows.length ? readRows.map((row, i) => <p key={i}>{row.name || t("empty.noValue")} - {row.issuer || t("empty.noValue")}</p>) : t("empty.noCertifications")}</div>} renderEditable={() => <div>{rows.map((row, i) => <div className="employeesArrayRow" key={i}>{fields.map((field) => <input key={field} type={field.includes("Date") ? "date" : "text"} value={row[field] ?? ""} placeholder={t(`fields.${field === "name" ? "certName" : field}`)} onChange={(e) => change(i, field, e.target.value)} />)}<button type="button" onClick={() => remove(i)}>{t("actions.removeRow")}</button></div>)}<button type="button" onClick={add}>{t("actions.addRow")}</button></div>} />;
};
export default Employees_detail_certifications;
