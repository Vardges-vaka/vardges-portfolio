import "../_styles/branches_mapPlaceholder.css";

const Branches_mapPlaceholder = ({ t }) => {
  return (
    <div className="branchesMapPlaceholder" role="status">
      <div className="branchesMapPlaceholder__icon" aria-hidden="true">
        ⌖
      </div>
      <h3 className="branchesMapPlaceholder__title">
        {t("placeholders.mapTitle")}
      </h3>
      <p className="branchesMapPlaceholder__description">
        {t("placeholders.mapDescription")}
      </p>
    </div>
  );
};

export default Branches_mapPlaceholder;
