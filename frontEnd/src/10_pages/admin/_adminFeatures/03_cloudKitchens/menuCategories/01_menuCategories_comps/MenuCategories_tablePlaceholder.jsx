import "../_styles/menuCategories_tablePlaceholder.css";

const MenuCategories_tablePlaceholder = ({ t }) => (
  <div className="menuCategoriesTablePlaceholder">
    <h2 className="menuCategoriesTablePlaceholder__title">
      {t("placeholders.tableTitle")}
    </h2>
    <p className="menuCategoriesTablePlaceholder__description">
      {t("placeholders.tableDescription")}
    </p>
  </div>
);

export default MenuCategories_tablePlaceholder;
