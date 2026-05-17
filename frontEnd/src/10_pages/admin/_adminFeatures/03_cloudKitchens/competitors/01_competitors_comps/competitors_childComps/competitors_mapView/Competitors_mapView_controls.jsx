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
    <div className="Competitors_mapView_controls">
      <div className="Competitors_mapView_controls_toolbar">
        <div className="Competitors_mapView_controls_toolbarLeft">
          <button
            type="button"
            className={`Competitors_mapView_controls_toggle ${
              showCompetitors ? "Competitors_mapView_controls_toggleActive" : ""
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
            className={`Competitors_mapView_controls_toggle ${
              showAllPolygon ? "Competitors_mapView_controls_toggleActive" : ""
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
            className={`Competitors_mapView_controls_toggle ${
              showAllRadius ? "Competitors_mapView_controls_toggleActive" : ""
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

        <div className="Competitors_mapView_controls_toolbarCenter">
          <div className="Competitors_mapView_controls_stats">
            <span className="Competitors_mapView_controls_stat">
              <span className="Competitors_mapView_controls_statValue">
                {visibleCompetitorsCount}
              </span>
              <span className="Competitors_mapView_controls_statLabel">
                {t
                  ? t("mapView.visible", { defaultValue: "visible" })
                  : "visible"}
              </span>
            </span>
            <span className="Competitors_mapView_controls_divider">/</span>
            <span className="Competitors_mapView_controls_stat">
              <span className="Competitors_mapView_controls_statValue">
                {competitorsTotalCount}
              </span>
              <span className="Competitors_mapView_controls_statLabel">
                {t ? t("mapView.total", { defaultValue: "total" }) : "total"}
              </span>
            </span>
          </div>
        </div>

        <div className="Competitors_mapView_controls_toolbarRight">
          <button
            type="button"
            className="Competitors_mapView_controls_expand"
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
        className={`Competitors_mapView_controls_body ${
          mapControlsExpanded ? "" : "Competitors_mapView_controls_bodyCollapsed"
        }`}>
        <p className="Competitors_mapView_controls_hint">
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
