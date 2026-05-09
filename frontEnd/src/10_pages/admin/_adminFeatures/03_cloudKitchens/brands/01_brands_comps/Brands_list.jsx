import { Brands_list_item } from "./brands_childComps/_brands_childComps.index.js";
import "../_styles/brands_list.css";

const Brands_list = ({
  brands,
  isLoading,
  error,
  onShowAddForm,
  onView,
  onEdit,
  onAddLogo,
  onAddFiles,
  t,
}) => (
  <div className="brandsList">
    <div className="brandsList_header">
      <h2 className="brandsList_title">{t("title")}</h2>
      <button
        type="button"
        className="brandsList_addBtn"
        onClick={onShowAddForm}>
        + {t("addBrand")}
      </button>
    </div>

    {error && <p className="brandsList_error">{error}</p>}
    {isLoading && <p className="brandsList_loading">{t("loading")}</p>}
    {!isLoading && brands.length === 0 && (
      <p className="brandsList_empty">{t("empty.noBrands")}</p>
    )}

    <div className="brandsList_items">
      {brands.map((brand) => (
        <Brands_list_item
          key={brand._id}
          brand={brand}
          onView={onView}
          onEdit={onEdit}
          onAddLogo={onAddLogo}
          onAddFiles={onAddFiles}
          t={t}
        />
      ))}
    </div>
  </div>
);

export default Brands_list;
