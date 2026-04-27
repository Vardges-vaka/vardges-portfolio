import "../_styles/brands_tablePlaceholder.css";

const Brands_tablePlaceholder = ({ t }) => (
  <div className="brandsTablePlaceholder">
    <h2 className="brandsTablePlaceholder__title">
      {t("placeholders.tableTitle")}
    </h2>
    <p className="brandsTablePlaceholder__description">
      {t("placeholders.tableDescription")}
    </p>
  </div>
);

export default Brands_tablePlaceholder;
