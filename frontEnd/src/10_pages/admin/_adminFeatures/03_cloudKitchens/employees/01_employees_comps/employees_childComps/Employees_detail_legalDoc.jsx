import { LEGAL_DOC_STATUS } from "../../05_employees_cnst/_employees_cnst.index.js";
const Employees_detail_legalDoc = ({ docKey, doc, isEditing, onChange, t }) => (
  <div className="employeesLegalDoc">
    <h4>{t(`legalBlocks.${docKey}`)}</h4>
    {isEditing ? <div className="employeesSectionForm"><select value={doc?.status ?? ""} onChange={(e) => onChange(`${docKey}.status`, e.target.value)}><option value="">{t("empty.noValue")}</option>{LEGAL_DOC_STATUS.map((status) => <option key={status} value={status}>{t(`legalStatus.${status === "n/a" ? "na" : status}`)}</option>)}</select><input type="date" value={doc?.expDate ?? ""} onChange={(e) => onChange(`${docKey}.expDate`, e.target.value)} />{docKey === "visa" && <input value={doc?.whatCompanyIsUnder ?? ""} onChange={(e) => onChange(`${docKey}.whatCompanyIsUnder`, e.target.value)} placeholder={t("fields.whatCompanyIsUnder")} />}<textarea value={doc?.notes ?? ""} onChange={(e) => onChange(`${docKey}.notes`, e.target.value)} placeholder={t("fields.notes")} /></div> : <p>{doc?.status || t("empty.noValue")} | {doc?.expDate || t("empty.noValue")} {doc?.file && <a href={doc.file}>{t("fields.file")}</a>}</p>}
  </div>
);
export default Employees_detail_legalDoc;
