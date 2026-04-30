import "../../../../_styles/branches_mapView_mapErrorLoading.css";

const Branches_mapView_mapErrorLoading = ({
  isLoading,
  error,
  t,
  withCoords,
}) => {
  return (
    <>
      {isLoading && (
        <div className="branchesMapView__banner" role="status">
          {t("loading")}
        </div>
      )}
      {error && !isLoading && (
        <div
          className="branchesMapView__banner branchesMapView__banner--error"
          role="alert">
          {error}
        </div>
      )}

      {!isLoading && withCoords.length === 0 && (
        <div className="branchesMapView__coordsHint" role="note">
          {t("mapView.noBranchesWithCoords")}
        </div>
      )}
    </>
  );
};

export default Branches_mapView_mapErrorLoading;
