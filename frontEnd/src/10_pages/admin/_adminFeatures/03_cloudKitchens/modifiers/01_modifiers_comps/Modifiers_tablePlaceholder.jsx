import "../_styles/modifiers_tablePlaceholder.css";

const Modifiers_tablePlaceholder = ({ t }) => (
  <div className="modifiersTablePlaceholder">
    <h2 className="modifiersTablePlaceholder__title">
      {t("placeholders.tableTitle")}
    </h2>
    <p className="modifiersTablePlaceholder__description">
      {t("placeholders.tableDescription")}
    </p>
  </div>
);

export default Modifiers_tablePlaceholder;
