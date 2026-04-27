import "../../_styles/menuItems_detail_placeholder.css";

const MenuItems_detail_ingredients = ({ t }) => (
  <div className="menuItemsDetailPlaceholder">
    <h3 className="menuItemsDetailPlaceholder__title">{t("sections.ingredients")}</h3>
    <p className="menuItemsDetailPlaceholder__hint">{t("placeholders.ingredientsDescription")}</p>
  </div>
);

export default MenuItems_detail_ingredients;
