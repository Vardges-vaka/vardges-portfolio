import { ManagerIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import {
  getEmployeeDisplayName,
  getRefDisplayName,
  hydrateBrandForm,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_addForm.css";
import "../../_styles/brands_detail_socials.css";

const toggleId = (list, id) =>
  list.includes(id) ? list.filter((item) => item !== id) : [...list, id];

const Brands_detail_relations = (props) => {
  const {
    brand,
    draft,
    onDraftChange,
    branchesList,
    employeesList,
    menusList,
    t,
  } = props;
  const source = draft ?? hydrateBrandForm(brand).relations;
  const branches = Array.isArray(source?.branches) ? source.branches : [];
  const employees = Array.isArray(source?.employees) ? source.employees : [];

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailRelations"
      title={t("sections.relations")}
      icon={<ManagerIcon />}
      renderReadonly={() => {
        const hydrated = hydrateBrandForm(brand).relations;
        return (
          <div className="brandsDetailSocials_rows">
            <p>
              <strong>{t("sections.branches")}:</strong>{" "}
              {(brand?.branches ?? []).map(getRefDisplayName).join(", ") ||
                t("empty.noValue")}
            </p>
            <p>
              <strong>{t("sections.employees")}:</strong>{" "}
              {(brand?.employees ?? [])
                .map(getEmployeeDisplayName)
                .join(", ") || t("empty.noValue")}
            </p>
            <p>
              <strong>{t("sections.menu")}:</strong>{" "}
              {getRefDisplayName(brand?.menu) ||
                hydrated.menu ||
                t("empty.noValue")}
            </p>
          </div>
        );
      }}
      renderEditable={() => (
        <div className="brandsDetailSocials_form">
          <label className="brandsDetailSocials_field">
            <span>{t("sections.menu")}</span>
            <select
              value={source?.menu ?? ""}
              onChange={(event) => onDraftChange("menu", event.target.value)}>
              <option value="">{t("empty.noValue")}</option>
              {(menusList ?? []).map((menu) => (
                <option key={menu._id} value={menu._id}>
                  {menu.name || menu._id}
                </option>
              ))}
            </select>
          </label>
          <div className="brandsAddForm_field">
            <span>{t("sections.branches")}</span>
            <div className="brandsAddForm_chips">
              {(branchesList ?? []).map((branch) => (
                <button
                  key={branch._id}
                  type="button"
                  className={
                    "brandsAddForm_chip" +
                    (branches.includes(branch._id)
                      ? " brandsAddForm_chip--active"
                      : "")
                  }
                  onClick={() =>
                    onDraftChange("branches", toggleId(branches, branch._id))
                  }>
                  {getRefDisplayName(branch)}
                </button>
              ))}
            </div>
          </div>
          <div className="brandsAddForm_field">
            <span>{t("sections.employees")}</span>
            <div className="brandsAddForm_chips">
              {(employeesList ?? []).map((employee) => (
                <button
                  key={employee._id}
                  type="button"
                  className={
                    "brandsAddForm_chip" +
                    (employees.includes(employee._id)
                      ? " brandsAddForm_chip--active"
                      : "")
                  }
                  onClick={() =>
                    onDraftChange(
                      "employees",
                      toggleId(employees, employee._id),
                    )
                  }>
                  {getEmployeeDisplayName(employee)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Brands_detail_relations;
