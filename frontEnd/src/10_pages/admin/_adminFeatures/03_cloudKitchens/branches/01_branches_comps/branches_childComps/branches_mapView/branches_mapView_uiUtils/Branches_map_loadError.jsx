import "../../../../_styles/branchesMapView.css";

const Branches_map_loadError = ({ t }) => {
  return (
    <div className="branchesMapView">
      <div className="branchesMapView__fallback" role="alert">
        <p className="branchesMapView__fallbackTitle">
          {t("mapView.loadError")}
        </p>
      </div>
    </div>
  );
};

export default Branches_map_loadError;
