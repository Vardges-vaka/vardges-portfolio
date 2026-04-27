import { Menus_detail_sectionShell } from "./_menus_childComps.index.js";
import "../../_styles/menus_detail_picker.css";

const Menus_detail_categories = (props) => {
  const { menu, draft, categoriesList, onIdToggle, t } = props;

  const selectedIds = Array.isArray(draft) ? draft : [];
  const readonlyCategories = Array.isArray(menu?.categories) ? menu.categories : [];

  return (
    <Menus_detail_sectionShell
      {...props}
      rootClass="menusDetailCategories"
      title={t("sections.categories")}
      renderReadonly={() => (
        <div className="menusDetailPicker__readonly">
          {readonlyCategories.length === 0 && (
            <p className="menusDetailPicker__empty">{t("pickers.noCategories")}</p>
          )}
          <div className="menusDetailPicker__chips">
            {readonlyCategories.map((cat) => (
              <span key={cat._id || cat} className="menusDetailPicker__chip">
                {cat?.name?.en || cat?.name || cat._id || cat}
              </span>
            ))}
          </div>
        </div>
      )}
      renderEditable={() => (
        <div className="menusDetailPicker__edit">
          {categoriesList.length === 0 && (
            <p className="menusDetailPicker__empty">{t("pickers.noCategories")}</p>
          )}
          <div className="menusDetailPicker__chips">
            {categoriesList.map((cat) => {
              const id = cat._id;
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
                  {cat?.name?.en || cat?.name || id}
                </button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
};

export default Menus_detail_categories;
