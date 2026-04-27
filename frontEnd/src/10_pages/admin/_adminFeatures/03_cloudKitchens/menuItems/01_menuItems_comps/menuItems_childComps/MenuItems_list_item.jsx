import "../../_styles/menuItems_item.css";

const MenuItems_list_item = ({ menuItem, onView, onEdit, t }) => {
  const isActive = menuItem?.isActive !== false;
  const displayName = menuItem?.name?.en || menuItem?.name?.ru || menuItem?.name?.ar || t("empty.noValue");
  const price = menuItem?.sellingPrice != null ? `$${menuItem.sellingPrice}` : t("empty.noValue");

  return (
    <div className="menuItemsListItem">
      <div className="menuItemsListItem__main">
        <div className="menuItemsListItem__nameBlock">
          <span className="menuItemsListItem__name">{displayName}</span>
          <span
            className={
              "menuItemsListItem__badge" +
              (isActive
                ? " menuItemsListItem__badge--active"
                : " menuItemsListItem__badge--inactive")
            }
          >
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
        </div>
        <span className="menuItemsListItem__price">{price}</span>
      </div>

      <div className="menuItemsListItem__actions">
        <button
          type="button"
          className="menuItemsListItem__btn menuItemsListItem__btn--primary"
          onClick={() => onView(menuItem._id)}
        >
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="menuItemsListItem__btn"
          onClick={() => onEdit(menuItem._id)}
        >
          {t("actions.edit")}
        </button>
      </div>
    </div>
  );
};

export default MenuItems_list_item;
