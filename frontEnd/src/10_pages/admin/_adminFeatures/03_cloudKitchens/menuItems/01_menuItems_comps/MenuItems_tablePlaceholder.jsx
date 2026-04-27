import "../_styles/menuItems_tablePlaceholder.css";

const MenuItems_tablePlaceholder = ({ t }) => (
  <div className="menuItemsTablePlaceholder">
    <h2 className="menuItemsTablePlaceholder__title">
      {t("placeholders.tableTitle")}
    </h2>
    <p className="menuItemsTablePlaceholder__description">
      {t("placeholders.tableDescription")}
    </p>
  </div>
);

export default MenuItems_tablePlaceholder;
