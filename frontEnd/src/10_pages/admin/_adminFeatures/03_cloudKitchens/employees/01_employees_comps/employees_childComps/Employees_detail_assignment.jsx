import { BuildingIcon } from "../Employees_icons/_employees_icons.index.js";
import { Employees_detail_sectionShell, Employees_branchPicker, Employees_brandsPicker } from "./_employees_childComps.index.js";
const Employees_detail_assignment = (props) => {
  const { employee, draft, branchesList, brandsList, onWorkingBranchChange, onAssociatedBrandsToggle, t } = props; const source = draft ?? {};
  return <Employees_detail_sectionShell {...props} rootClass="employeesDetailAssignment" title={t("sections.assignment")} icon={<BuildingIcon />} renderReadonly={() => <div><p>{t("fields.workingBranch")}: {employee?.workingBranch?.name || t("empty.noValue")}</p><p>{t("fields.associatedBrands")}: {(employee?.associatedBrands ?? []).map((brand) => brand.name).join(", ") || t("empty.noValue")}</p></div>} renderEditable={() => <div className="employeesSectionForm"><Employees_branchPicker value={source.workingBranch} branchesList={branchesList} onChange={onWorkingBranchChange} t={t} /><Employees_brandsPicker value={source.associatedBrands} brandsList={brandsList} onToggle={onAssociatedBrandsToggle} t={t} /></div>} />;
};
export default Employees_detail_assignment;
