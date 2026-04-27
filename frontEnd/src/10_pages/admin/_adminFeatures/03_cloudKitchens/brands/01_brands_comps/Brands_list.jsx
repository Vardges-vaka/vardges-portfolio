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
    <div className="brandsList__header">
      <h2 className="brandsList__title">{t("title")}</h2>
      <button type="button" className="brandsList__addBtn" onClick={onShowAddForm}>
        + {t("addBrand")}
      </button>
    </div>

    {error && <p className="brandsList__error">{error}</p>}
    {isLoading && <p className="brandsList__loading">{t("loading")}</p>}
    {!isLoading && brands.length === 0 && (
      <p className="brandsList__empty">{t("empty.noBrands")}</p>
    )}

    <div className="brandsList__items">
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
