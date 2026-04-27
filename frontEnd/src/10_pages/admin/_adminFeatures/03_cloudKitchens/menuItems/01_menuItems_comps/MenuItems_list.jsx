import { MenuItems_list_item } from "./menuItems_childComps/_menuItems_childComps.index.js";
import "../_styles/menuItems_list.css";

const MenuItems_list = ({
  menuItems,
  isLoading,
  error,
  onShowAddForm,
  onView,
  onEdit,
  t,
}) => (
  <div className="menuItemsList">
    <div className="menuItemsList__header">
      <h2 className="menuItemsList__title">{t("title")}</h2>
      <button type="button" className="menuItemsList__addBtn" onClick={onShowAddForm}>
        + {t("addMenuItem")}
      </button>
    </div>

    {error && <p className="menuItemsList__error">{error}</p>}
    {isLoading && <p className="menuItemsList__loading">{t("loading")}</p>}
    {!isLoading && menuItems.length === 0 && (
      <p className="menuItemsList__empty">{t("empty.noMenuItems")}</p>
    )}

    <div className="menuItemsList__items">
      {menuItems.map((item) => (
        <MenuItems_list_item
          key={item._id}
          menuItem={item}
          onView={onView}
          onEdit={onEdit}
          t={t}
        />
      ))}
    </div>
  </div>
);

export default MenuItems_list;
