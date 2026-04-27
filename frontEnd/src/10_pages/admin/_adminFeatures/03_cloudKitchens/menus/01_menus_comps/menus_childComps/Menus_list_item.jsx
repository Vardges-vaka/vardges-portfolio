import "../../_styles/menus_item.css";

const Menus_list_item = ({ menu, onView, onEdit, t }) => {
  const isActive = menu?.isActive !== false;
  const nameEn = menu?.name?.en || t("empty.noValue");
  const catCount = Array.isArray(menu?.categories) ? menu.categories.length : 0;

  return (
    <div className="menusListItem">
      <div className="menusListItem__main">
        <div className="menusListItem__nameBlock">
          <span className="menusListItem__name">{nameEn}</span>
          <span
            className={
              "menusListItem__badge" +
              (isActive
                ? " menusListItem__badge--active"
                : " menusListItem__badge--inactive")
            }
          >
            {isActive ? t("badges.active") : t("badges.inactive")}
          </span>
        </div>
        <span className="menusListItem__meta">
          {catCount} {t("fields.categoriesCount")}
        </span>
      </div>

      <div className="menusListItem__actions">
        <button
          type="button"
          className="menusListItem__btn menusListItem__btn--primary"
          onClick={() => onView(menu._id)}
        >
          {t("actions.view")}
        </button>
        <button
          type="button"
          className="menusListItem__btn"
          onClick={() => onEdit(menu._id)}
        >
          {t("actions.edit")}
        </button>
      </div>
    </div>
  );
};

export default Menus_list_item;
