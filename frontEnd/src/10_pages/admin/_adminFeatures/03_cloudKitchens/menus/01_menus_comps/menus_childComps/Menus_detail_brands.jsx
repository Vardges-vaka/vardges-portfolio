import { Menus_detail_sectionShell } from "./_menus_childComps.index.js";
import { getBrandDisplayName } from "../../../brands/02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/menus_detail_picker.css";

const Menus_detail_brands = (props) => {
  const { menu, draft, brandsList, onIdToggle, t } = props;

  const selectedIds = Array.isArray(draft) ? draft : [];
  const readonlyBrands = Array.isArray(menu?.brands) ? menu.brands : [];

  return (
    <Menus_detail_sectionShell
      {...props}
      rootClass="menusDetailBrands"
      title={t("sections.brands")}
      renderReadonly={() => (
        <div className="menusDetailPicker__readonly">
          {readonlyBrands.length === 0 && (
            <p className="menusDetailPicker__empty">{t("pickers.noBrands")}</p>
          )}
          <div className="menusDetailPicker__chips">
            {readonlyBrands.map((brand) => (
              <span key={brand._id || brand} className="menusDetailPicker__chip">
                {getBrandDisplayName(brand) || brand._id || brand}
              </span>
            ))}
          </div>
        </div>
      )}
      renderEditable={() => (
        <div className="menusDetailPicker__edit">
          {brandsList.length === 0 && (
            <p className="menusDetailPicker__empty">{t("pickers.noBrands")}</p>
          )}
          <div className="menusDetailPicker__chips">
            {brandsList.map((brand) => {
              const id = brand._id;
              const isSelected = selectedIds.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={
                    "menusDetailPicker__chip" +
                    (isSelected ? " menusDetailPicker__chip--selected" : "")
                  }
                  onClick={() => onIdToggle(id)}
                >
                  {getBrandDisplayName(brand) || id}
                </button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
};

export default Menus_detail_brands;
