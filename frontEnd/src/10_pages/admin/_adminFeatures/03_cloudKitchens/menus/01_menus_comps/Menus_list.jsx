import { Menus_list_item } from "./menus_childComps/_menus_childComps.index.js";
import "../_styles/menus_list.css";

const Menus_list = ({
  menus,
  isLoading,
  error,
  onShowAddForm,
  onView,
  onEdit,
  t,
}) => (
  <div className="menusList">
    <div className="menusList__header">
      <h2 className="menusList__title">{t("title")}</h2>
      <button type="button" className="menusList__addBtn" onClick={onShowAddForm}>
        + {t("addMenu")}
      </button>
    </div>

    {error && <p className="menusList__error">{error}</p>}
    {isLoading && <p className="menusList__loading">{t("loading")}</p>}
    {!isLoading && menus.length === 0 && (
      <p className="menusList__empty">{t("empty.noMenus")}</p>
    )}

    <div className="menusList__items">
      {menus.map((menu) => (
        <Menus_list_item
          key={menu._id}
          menu={menu}
          onView={onView}
          onEdit={onEdit}
          t={t}
        />
      ))}
    </div>
  </div>
);

export default Menus_list;
