import "../../../../_styles/branches_mapView_cntrls_children.css";

const Branches_mapView_cntrls_children = ({
  t,
  mapControlsExpanded,
  visibleBranches,
}) => {
  if (!mapControlsExpanded) {
    return null;
  }
  return (
    <div
      id="branches-map-view-controls-body"
      className={
        "branchesMapView__controlsBody" +
        (mapControlsExpanded ? "" : " branchesMapView__controlsBody--collapsed")
      }
      hidden={!mapControlsExpanded}>
      <p className="branchesMapView__controlsHint">
        {t("mapView.controlsMoreHint")}
      </p>

      <div className="branchesMapView__controlsPlaceholderGrid">
        <button
          type="button"
          className="branchesMapView__ctrlBtn branchesMapView__ctrlBtn--disabled"
          disabled
          title={t("mapView.disabledHint")}>
          {t("mapView.controlsPlaceholder.measure")}
        </button>
        <button
          type="button"
          className="branchesMapView__ctrlBtn branchesMapView__ctrlBtn--disabled"
          disabled
          title={t("mapView.disabledHint")}>
          {t("mapView.controlsPlaceholder.draw")}
        </button>
        <button
          type="button"
          className="branchesMapView__ctrlBtn branchesMapView__ctrlBtn--disabled"
          disabled
          title={t("mapView.disabledHint")}>
          {t("mapView.controlsPlaceholder.layers")}
        </button>
        <button
          type="button"
          className="branchesMapView__ctrlBtn branchesMapView__ctrlBtn--disabled"
          disabled
          title={t("mapView.disabledHint")}>
          {t("mapView.controlsPlaceholder.workMode")}
        </button>
      </div>
      <p className="branchesMapView__meta">
        {t("mapView.branchesCount", { count: visibleBranches.length })}
      </p>
    </div>
  );
};

export default Branches_mapView_cntrls_children;
