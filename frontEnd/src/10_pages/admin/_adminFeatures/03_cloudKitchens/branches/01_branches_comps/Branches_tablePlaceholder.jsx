import "../_styles/branches_tablePlaceholder.css";

const Branches_tablePlaceholder = ({ t }) => {
  return (
    <div className="branchesTablePlaceholder" role="status">
      <div className="branchesTablePlaceholder__icon" aria-hidden="true">
        ▦
      </div>
      <h3 className="branchesTablePlaceholder__title">
        {t("placeholders.tableTitle")}
      </h3>
      <p className="branchesTablePlaceholder__description">
        {t("placeholders.tableDescription")}
      </p>
    </div>
  );
};

export default Branches_tablePlaceholder;
