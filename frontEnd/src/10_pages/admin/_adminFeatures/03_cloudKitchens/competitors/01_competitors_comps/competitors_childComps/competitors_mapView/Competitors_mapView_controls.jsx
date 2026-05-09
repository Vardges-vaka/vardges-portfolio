import "../../../_styles/competitors_mapView_controls.css";

const Competitors_mapView_controls = ({
  t,
  showCompetitors,
  onToggleCompetitors,
  showAllPolygon,
  showAllRadius,
  onToggleAllPolygon,
  onToggleAllRadius,
  mapControlsExpanded,
  onToggleMapControls,
  competitorsTotalCount,
  visibleCompetitorsCount,
}) => {
  return (
    <div className="competitorsMapViewControls">
      <div className="competitorsMapViewControls__toolbar">
        <div className="competitorsMapViewControls__toolbarLeft">
          <button
            type="button"
            className={`competitorsMapViewControls__toggle ${
              showCompetitors ? "competitorsMapViewControls__toggle--active" : ""
            }`}
            onClick={onToggleCompetitors}
            aria-pressed={showCompetitors}>
            {t
              ? t("mapView.toggleCompetitors", {
                  defaultValue: "Competitors",
                })
              : "Competitors"}
          </button>

          <button
            type="button"
            className={`competitorsMapViewControls__toggle ${
              showAllPolygon ? "competitorsMapViewControls__toggle--active" : ""
            }`}
            onClick={onToggleAllPolygon}
            aria-pressed={showAllPolygon}
            title={
              t
                ? t("mapView.toggleAllPolygonTitle", {
                    defaultValue: "Show / hide polygon coverages (all)",
                  })
                : "Show / hide polygon coverages (all)"
            }>
            {t ? t("mapView.allPolygon", { defaultValue: "Polygon (all)" }) : "Polygon (all)"}
          </button>

          <button
            type="button"
            className={`competitorsMapViewControls__toggle ${
              showAllRadius ? "competitorsMapViewControls__toggle--active" : ""
            }`}
            onClick={onToggleAllRadius}
            aria-pressed={showAllRadius}
            title={
              t
                ? t("mapView.toggleAllRadiusTitle", {
                    defaultValue: "Show / hide radius coverages (all)",
                  })
                : "Show / hide radius coverages (all)"
            }>
            {t ? t("mapView.allRadius", { defaultValue: "Radius (all)" }) : "Radius (all)"}
          </button>
        </div>

        <div className="competitorsMapViewControls__toolbarCenter">
          <div className="competitorsMapViewControls__stats">
            <span className="competitorsMapViewControls__stat">
              <span className="competitorsMapViewControls__statValue">
                {visibleCompetitorsCount}
              </span>
              <span className="competitorsMapViewControls__statLabel">
                {t
                  ? t("mapView.visible", { defaultValue: "visible" })
                  : "visible"}
              </span>
            </span>
            <span className="competitorsMapViewControls__divider">/</span>
            <span className="competitorsMapViewControls__stat">
              <span className="competitorsMapViewControls__statValue">
                {competitorsTotalCount}
              </span>
              <span className="competitorsMapViewControls__statLabel">
                {t ? t("mapView.total", { defaultValue: "total" }) : "total"}
              </span>
            </span>
          </div>
        </div>

        <div className="competitorsMapViewControls__toolbarRight">
          <button
            type="button"
            className="competitorsMapViewControls__expand"
            onClick={onToggleMapControls}
            aria-expanded={mapControlsExpanded}
            title={
              t
                ? t("mapView.controlsToggleTitle", {
                    defaultValue: "Toggle map controls",
                  })
                : "Toggle map controls"
            }>
            {mapControlsExpanded ? "▴" : "▾"}
          </button>
        </div>
      </div>

      <div
        className={`competitorsMapViewControls__body ${
          mapControlsExpanded ? "" : "competitorsMapViewControls__body--collapsed"
        }`}>
        <p className="competitorsMapViewControls__hint">
          {t
            ? t("mapView.hint", {
                defaultValue:
                  "Click a competitor logo marker to open details in the info panel.",
              })
            : "Click a competitor logo marker to open details in the info panel."}
        </p>
      </div>
    </div>
  );
};

export default Competitors_mapView_controls;
