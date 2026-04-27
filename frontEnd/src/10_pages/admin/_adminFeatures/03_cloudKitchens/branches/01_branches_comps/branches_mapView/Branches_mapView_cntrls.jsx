import "../../_styles/branches_mapView_cntrls.css";



const Branches_mapView_cntrls = ({
  t,
  showBranches,
  handleToggleBranches,
  visibleBranches,
}) => {
  return (
    <aside
      className="branchesMapView__controls"
      aria-label={t("mapView.controlsTitle")}>
      <h3 className="branchesMapView__controlsTitle">
        {t("mapView.controlsTitle")}
      </h3>
      <p className="branchesMapView__controlsHint">
        {t("mapView.controlsHint")}
      </p>

      <button
        type="button"
        className={
          "branchesMapView__ctrlBtn" +
          (showBranches ? " branchesMapView__ctrlBtn--active" : "")
        }
        onClick={handleToggleBranches}
        aria-pressed={showBranches}>
        {t("mapView.showBranches")}
      </button>

      <button
        type="button"
        className="branchesMapView__ctrlBtn branchesMapView__ctrlBtn--disabled"
        disabled
        title={t("mapView.disabledHint")}>
        {t("mapView.showCoverage")}
      </button>

      <button
        type="button"
        className="branchesMapView__ctrlBtn branchesMapView__ctrlBtn--disabled"
        disabled
        title={t("mapView.disabledHint")}>
        {t("mapView.showCompetitors")}
      </button>

      <p className="branchesMapView__meta">
        {t("mapView.branchesCount", { count: visibleBranches.length })}
      </p>
    </aside>
  );
};

export default Branches_mapView_cntrls;
