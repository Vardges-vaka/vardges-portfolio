import { MenuCategories_list_item } from "./menuCategories_childComps/_menuCategories_childComps.index.js";
import "../_styles/menuCategories_list.css";

const MenuCategories_list = ({
  menuCategories,
  isLoading,
  error,
  onShowAddForm,
  onView,
  onEdit,
  t,
}) => (
  <div className="menuCategoriesList">
    <div className="menuCategoriesList__header">
      <h2 className="menuCategoriesList__title">{t("title")}</h2>
      <button type="button" className="menuCategoriesList__addBtn" onClick={onShowAddForm}>
        + {t("addCategory")}
      </button>
    </div>

    {error && <p className="menuCategoriesList__error">{error}</p>}
    {isLoading && <p className="menuCategoriesList__loading">{t("loading")}</p>}
    {!isLoading && menuCategories.length === 0 && (
      <p className="menuCategoriesList__empty">{t("empty.noCategories")}</p>
    )}

    <div className="menuCategoriesList__items">
      {menuCategories.map((cat) => (
        <MenuCategories_list_item
          key={cat._id}
          category={cat}
          onView={onView}
          onEdit={onEdit}
          t={t}
        />
      ))}
    </div>
  </div>
);

export default MenuCategories_list;
