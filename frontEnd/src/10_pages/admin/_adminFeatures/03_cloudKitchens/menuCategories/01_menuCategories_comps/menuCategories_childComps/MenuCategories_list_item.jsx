import "../../_styles/menuCategories_item.css";

const MenuCategories_list_item = ({ category, onView, onEdit, t }) => {
  const isActive = category?.isActive !== false;
  const itemCount = Array.isArray(category?.menuItems) ? category.menuItems.length : 0;

  return (
    <div className="menuCategoriesListItem">
      <div className="menuCategoriesListItem__main">
        <div className="menuCategoriesListItem__nameBlock">
          <span className="menuCategoriesListItem__name">
            {category?.name?.en || t("empty.noValue")}
          </span>
          <span
            className={
              "menuCategoriesListItem__badge" +
              (isActive
                ? " menuCategoriesListItem__badge--active"
                : " menuCategoriesListItem__badge--inactive")
            }
          >
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
        </div>
        <span className="menuCategoriesListItem__itemCount">
          {itemCount} {t("fields.items")}
        </span>
      </div>

      <div className="menuCategoriesListItem__actions">
        <button
          type="button"
          className="menuCategoriesListItem__btn menuCategoriesListItem__btn--primary"
          onClick={() => onView(category._id)}
        >
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="menuCategoriesListItem__btn"
          onClick={() => onEdit(category._id)}
        >
          {t("actions.edit")}
        </button>
      </div>
    </div>
  );
};

export default MenuCategories_list_item;
