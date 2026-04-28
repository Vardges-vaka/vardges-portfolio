import Branches_Icon from "../../../../../../../01_components/uiComponents/dashboard_Icons/Branches_Icon.jsx";
import DeliveryCoverage_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/DeliveryCoverage_Icon.jsx";
import { MapCoverage_Icon } from "../../../../../../../01_components/components.index.js";
import "../../_styles/branches_mapView_cntrls.css";

const Branches_mapView_cntrls = ({
  t,
  showBranches,
  handleToggleBranches,
  visibleBranches,
  mapControlsExpanded,
  handleToggleMapControls,
}) => {
  const branchesIconSrc = Branches_Icon();
  const coverageIconSrc = DeliveryCoverage_Icon();

  return (
    <aside
      className="branchesMapView__controls"
      aria-label={t("mapView.controlsTitle")}>
      <div className="branchesMapView__controlsToolbar">
        <span className="branchesMapView__controlsToolbarLabel">
          {t("mapView.controlsTitle")}
        </span>
        <div className="branchesMapView__controlsToolbarMain">
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

      <div
        id="branches-map-view-controls-body"
        className={
          "branchesMapView__controlsBody" +
          (mapControlsExpanded
            ? ""
            : " branchesMapView__controlsBody--collapsed")
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
    </aside>
  );
};

export default Branches_mapView_cntrls;
