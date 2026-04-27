const Employees_branchPicker = ({ value, branchesList, onChange, t }) => (
  <label><span>{t("fields.workingBranch")}</span><select value={value ?? ""} onChange={(e) => onChange(e.target.value)}><option value="">{branchesList.length ? t("empty.noValue") : t("pickers.noBranches")}</option>{branchesList.map((branch) => <option key={branch._id} value={branch._id}>{branch.name}</option>)}</select></label>
);
export default Employees_branchPicker;
