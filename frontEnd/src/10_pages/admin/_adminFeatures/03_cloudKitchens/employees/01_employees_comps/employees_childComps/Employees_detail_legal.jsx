import { ShieldIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell, Employees_detail_legalDoc } from "./_employees_childComps.index.js";
const docs = ["visa","emiratesId","medical","hygieneCert","healthCard"];
const Employees_detail_legal = (props) => {
  const { employee, draft, onDraftChange, t } = props; const source = draft ?? employee?.legal ?? {};
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailLegal" title={t("sections.legal")} icon={<ShieldIcon />} renderReadonly={() => <div>{docs.map((key) => <Employees_detail_legalDoc key={key} docKey={key} doc={source[key]} isEditing={false} onChange={onDraftChange} t={t} />)}</div>} renderEditable={() => <div>{docs.map((key) => <Employees_detail_legalDoc key={key} docKey={key} doc={source[key]} isEditing onChange={onDraftChange} t={t} />)}</div>} />;
};
export default Employees_detail_legal;
