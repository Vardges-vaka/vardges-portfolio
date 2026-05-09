import { Brands_table_row } from "./brands_childComps/_brands_childComps.index.js";
import "../_styles/brands_table.css";

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Brands_table = ({
  brands,
  isLoading,
  error,
  branchesList,
  employeesList,
  menusList,
  activeTooltip,
  logoUrls,
  onShowAddForm,
  onTooltipToggle,
  onTooltipClose,
  onUpdateAll,
  onUpdateSection,
  onViewAll,
  onGoToLogoView,
  onGoToLogoEdit,
  t,
}) => (
  <div className="Brands_table">
    <div className="Brands_table_header">
      <h2 className="Brands_table_title">{t("title")}</h2>
      <button
        type="button"
        className="Brands_table_addBtn"
        onClick={onShowAddForm}>
        + {t("addBrand")}
      </button>
    </div>

    {error && <p className="Brands_table_error">{error}</p>}
    {isLoading && <p className="Brands_table_loading">{t("loading")}</p>}
    {!isLoading && brands.length === 0 && (
      <p className="Brands_table_empty">{t("empty.noBrands")}</p>
    )}

    {activeTooltip && (
      <div className="Brands_table_overlay" onClick={onTooltipClose} />
    )}

    {brands.length > 0 && (
      <div className="Brands_table_wrap">
        <table className="Brands_table_tbl">
          <thead>
            <tr className="Brands_table_thead_row">
              <th className="Brands_table_th Brands_table_th--num">{t("table.headers.num")}</th>
              <th className="Brands_table_th Brands_table_th--num">Name</th>
              <th className="Brands_table_th">{t("table.headers.logo")}</th>
              <th className="Brands_table_th">{t("table.headers.branches")}</th>
              <th className="Brands_table_th">{t("table.headers.employees")}</th>
              <th className="Brands_table_th">{t("table.headers.equipment")}</th>
              <th className="Brands_table_th">{t("table.headers.competitors")}</th>
              <th className="Brands_table_th">{t("table.headers.menu")}</th>
              <th className="Brands_table_th Brands_table_th--icon" title={t("actions.edit")}>
                <EditIcon />
              </th>
              <th className="Brands_table_th Brands_table_th--icon" title={t("actions.view")}>
                <EyeIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <Brands_table_row
                key={brand._id}
                index={index}
                brand={brand}
                branchesList={branchesList}
                employeesList={employeesList}
                menusList={menusList}
                activeTooltip={activeTooltip}
                logoUrl={logoUrls?.[brand._id] || null}
                onTooltipToggle={onTooltipToggle}
                onUpdateAll={onUpdateAll}
                onUpdateSection={onUpdateSection}
                onViewAll={onViewAll}
                onGoToLogoView={onGoToLogoView}
                onGoToLogoEdit={onGoToLogoEdit}
                t={t}
              />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default Brands_table;
