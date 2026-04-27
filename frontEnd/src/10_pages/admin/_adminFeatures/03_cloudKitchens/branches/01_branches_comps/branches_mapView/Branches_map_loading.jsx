import "../../_styles/branchesMapView.css";

const Branches_map_loading = ({ t }) => {
  return (
    <div className="branchesMapView">
      <div className="branchesMapView__fallback" role="status">
        <p className="branchesMapView__fallbackText">
          {t("mapView.loadingMap")}
        </p>
      </div>
    </div>
  );
};

export default Branches_map_loading;
