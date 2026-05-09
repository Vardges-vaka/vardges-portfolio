import { getBrandDisplayName } from "../../../brands/02_brands_helpers/_brands_helpers.index.js";

const Employees_brandsPicker = ({ value, brandsList, onToggle, t }) => {
  const selected = Array.isArray(value) ? value : [];
  if (!brandsList.length) return <p>{t("pickers.createBrandsFirst")}</p>;
  return <div className="employeesBrandsPicker">{brandsList.map((brand) => <button type="button" key={brand._id} className={selected.includes(brand._id) ? "employeesBrandsPicker__chip employeesBrandsPicker__chip--active" : "employeesBrandsPicker__chip"} onClick={() => onToggle(brand._id)}>{getBrandDisplayName(brand)}</button>)}</div>;
};
export default Employees_brandsPicker;
