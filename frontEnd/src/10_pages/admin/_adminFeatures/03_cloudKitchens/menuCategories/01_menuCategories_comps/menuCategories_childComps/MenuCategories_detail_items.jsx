import { MenuCategories_detail_sectionShell } from "./_menuCategories_childComps.index.js";
import "../../_styles/menuCategories_detail_items.css";

const idStr = (val) => (typeof val === "object" && val?._id ? String(val._id) : String(val));

const MenuCategories_detail_items = (props) => {
  const { category, draft, menuItemsList, onItemToggle, t } = props;

  const currentIds = Array.isArray(draft)
    ? draft.map(idStr)
    : (category?.menuItems ?? []).map(idStr);

  return (
    <MenuCategories_detail_sectionShell
      {...props}
      rootClass="menuCategoriesDetailItems"
      title={t("sections.items")}
      renderReadonly={() => {
        const items = category?.menuItems ?? [];
        if (items.length === 0) {
          return <p className="menuCategoriesDetailItems__empty">{t("empty.noItems")}</p>;
        }

        return (
          <div className="menuCategoriesDetailItems__chips">
            {items.map((item) => (
              <span key={item._id || item} className="menuCategoriesDetailItems__chip">
                {item?.name?.en ?? String(item)} · {item?.sellingPrice ?? "–"}
              </span>
            ))}
          </div>
        );
      }}
      renderEditable={() => {
        if (!menuItemsList || menuItemsList.length === 0) {
          return <p className="menuCategoriesDetailItems__empty">{t("empty.noMenuItems")}</p>;
        }

        return (
          <div className="menuCategoriesDetailItems__picker">
            {menuItemsList.map((item) => {
              const itemId = String(item._id);
              const selected = currentIds.includes(itemId);
              return (
                <button
                  key={itemId}
                  type="button"
                  className={
                    "menuCategoriesDetailItems__chip" +
                    (selected ? " menuCategoriesDetailItems__chip--selected" : "")
                  }
                  onClick={() => onItemToggle(itemId)}
                >
                  {item?.name?.en ?? itemId} · {item?.sellingPrice ?? "–"}
                </button>
              );
            })}
          </div>
        );
      }}
    />
  );
};

export default MenuCategories_detail_items;
