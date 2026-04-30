import {
  DeliveryCoverage_Icon,
  Branches_Icon,
} from "../../../../../../../../../01_components/components.index";
import "../../../../_styles/branches_mapView_cntrls_header.css";

const Branches_mapView_cntrls_header = ({
  t,
  showBranches,
  handleToggleBranches,
  branchesTotalCount,
  mapControlsExpanded,
  handleToggleMapControls,
  children,
}) => {
  const branchesIconSrc = Branches_Icon();
  const coverageIconSrc = DeliveryCoverage_Icon();

  return (
    <aside
      className="branchesMapView__controls"
      aria-label={t("mapView.toolbarAria")}>
      <div className="branchesMapView__controlsToolbar">
        <div className="branchesMapView__controlsToolbarLeft">
          <button
            type="button"
            className={
              "branchesMapView__iconTool" +
              (showBranches ? " branchesMapView__iconTool--active" : "")
            }
            onClick={handleToggleBranches}
            aria-pressed={showBranches}
            aria-label={t("mapView.showBranches")}
            title={t("mapView.showBranches")}>
            <img
              src={branchesIconSrc}
              alt=""
              className="branchesMapView__iconToolImg"
              width={24}
              height={24}
              decoding="async"
              draggable={false}
            />
          </button>
          <button
            type="button"
            className="branchesMapView__iconTool branchesMapView__iconTool--disabled"
            disabled
            title={t("mapView.disabledHint")}
            aria-label={t("mapView.showCoverage")}
            aria-disabled="true">
            <img
              src={coverageIconSrc}
              alt=""
              className="branchesMapView__iconToolImg"
              width={24}
              height={24}
              decoding="async"
              draggable={false}
            />
          </button>
        </div>

        <div
          className="branchesMapView__controlsToolbarCenter"
          role="presentation">
          <div className="branchesMapView__toolbarStats">
            <span className="branchesMapView__toolbarStat">
              <strong className="branchesMapView__toolbarStatValue">
                {branchesTotalCount ?? 0}
              </strong>
              <span className="branchesMapView__toolbarStatLabel">
                {t("mapView.toolbarBranchLabel")}
              </span>
            </span>
            <span className="branchesMapView__toolbarDivider" aria-hidden>
              ·
            </span>
            <span className="branchesMapView__toolbarMuted">
              {t("mapView.toolbarSalesPlaceholder")}
            </span>
            <span className="branchesMapView__toolbarDivider" aria-hidden>
              ·
            </span>
            <span className="branchesMapView__toolbarMuted">
              {t("mapView.toolbarOrdersPlaceholder")}
            </span>
            <span className="branchesMapView__toolbarDivider" aria-hidden>
              ·
            </span>
          </div>
        </div>

        <div className="branchesMapView__controlsToolbarRight">
          <button
            type="button"
            className="branchesMapView__controlsToggle"
            onClick={handleToggleMapControls}
            aria-expanded={mapControlsExpanded}
            aria-controls="branches-map-view-controls-body"
            title={
              mapControlsExpanded
                ? t("mapView.controlsToggleCollapse")
                : t("mapView.controlsToggleExpand")
            }>
            <span className="branchesMapView__controlsToggleIcon" aria-hidden>
              {mapControlsExpanded ? "▾" : "▸"}
            </span>
          </button>
        </div>
      </div>

      {children && children}
    </aside>
  );
};

export default Branches_mapView_cntrls_header;
