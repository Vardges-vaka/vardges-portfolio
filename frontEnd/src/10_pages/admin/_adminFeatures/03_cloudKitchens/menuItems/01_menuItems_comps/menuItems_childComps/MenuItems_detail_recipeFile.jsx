import "../../_styles/menuItems_detail_placeholder.css";

const MenuItems_detail_recipeFile = ({ t }) => (
  <div className="menuItemsDetailPlaceholder">
    <h3 className="menuItemsDetailPlaceholder__title">{t("sections.recipeFile")}</h3>
    <p className="menuItemsDetailPlaceholder__hint">{t("placeholders.recipeFileDescription")}</p>
  </div>
);

export default MenuItems_detail_recipeFile;
