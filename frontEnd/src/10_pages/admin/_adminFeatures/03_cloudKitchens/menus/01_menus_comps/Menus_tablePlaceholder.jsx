import "../_styles/menus_tablePlaceholder.css";

const Menus_tablePlaceholder = ({ t }) => (
  <div className="menusTablePlaceholder">
    <h2 className="menusTablePlaceholder__title">
      {t("placeholders.tableTitle")}
    </h2>
    <p className="menusTablePlaceholder__description">
      {t("placeholders.tableDescription")}
    </p>
  </div>
);

export default Menus_tablePlaceholder;
