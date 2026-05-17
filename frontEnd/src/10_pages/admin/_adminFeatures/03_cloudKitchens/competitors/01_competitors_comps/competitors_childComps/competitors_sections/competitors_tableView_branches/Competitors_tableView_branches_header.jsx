import Competitors_sections_controlBtn from "../Competitors_sections_controlBtn.jsx";
import {
  getLocationFromDraft,
  branchHasPolygonCoverage,
  branchHasRadiusCoverage,
  getEffectiveBranchCoverageVisible,
} from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

import "../../../../_styles/competitors_mapView_controls.css";
import "../../../../_styles/competitors_tableView_branches/competitors_tableView_branches_header.css";

const Competitors_tableView_branches_header = ({ states, handlers, t }) => {
  const {
    text,
    competitor,
    competitorLogo,
    branchesCount,
    isEditing,
    showAllPolygon,
    showAllRadius,
    editingBranchKey,
    editStep,
    coverageEditMode,
    draftLocations,
    polygonByMarkerKey,
    radiusByMarkerKey,
  } = states;

  const name = competitor?.name?.trim() || "—";
  const initial = name !== "—" ? name.slice(0, 1).toUpperCase() : "—";

  const editingLoc = editingBranchKey
    ? getLocationFromDraft(draftLocations, editingBranchKey)
    : null;
  const isDubaiEdit =
    String(editingLoc?.emirate || "").trim() === "Dubai" && editStep === "map";
  const hasPolygonCoverage = branchHasPolygonCoverage(editingLoc);
  const hasRadiusCoverage = branchHasRadiusCoverage(editingLoc);
  const editKey = editingBranchKey ? String(editingBranchKey) : "";
  const polygonVisible =
    hasPolygonCoverage &&
    getEffectiveBranchCoverageVisible("polygon", editKey, {
      polygonByMarkerKey,
      radiusByMarkerKey,
    });
  const radiusVisible =
    hasRadiusCoverage &&
    getEffectiveBranchCoverageVisible("radius", editKey, {
      polygonByMarkerKey,
      radiusByMarkerKey,
    });
  const canHideAny =
    polygonVisible || radiusVisible;

  return (
    <div className="Competitors_tableView_branches_header">
      <div className="Competitors_tableView_branches_headerTop">
        <div className="Competitors_tableView_branches_headerBrand">
          {competitorLogo ? (
            <img
              className="Competitors_tableView_branches_headerLogo"
              src={competitorLogo}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="Competitors_tableView_branches_headerLogoFallback"
              aria-hidden="true">
              {initial}
            </div>
          )}
          <div className="Competitors_tableView_branches_headerText">
            <h2 className="Competitors_tableView_branches_title">{text.title}</h2>
            <p className="Competitors_tableView_branches_subTitle">{name}</p>
            <p
              className="Competitors_tableView_branches_branchCount"
              aria-label={t("branchesTableSession.branchesCountAria", {
                count: branchesCount ?? 0,
                defaultValue: `Branches: ${branchesCount ?? 0}`,
              })}>
              {text.branchesCountLabel}
            </p>
            <p className="Competitors_tableView_branches_hint">
              {editStep === "map"
                ? text.mapStepSubtitle
                : editStep === "details"
                  ? text.detailsStepSubtitle
                  : text.subtitle}
            </p>
          </div>
        </div>
        <Competitors_sections_controlBtn
          isEditing={isEditing}
          onUpdate={() => handlers?.handleToggleEditingMode?.()}
          onCancel={() => handlers?.handleStopEditing?.()}
          onConfirm={handlers?.openConfirmSave}
          text={{
            updateLabel: text.updateLabel,
            editLabel: text.editLabel,
            cancelLabel: text.cancelLabel,
            confirmLabel: text.confirmLabel,
          }}
        />
      </div>

      <div
        className="Competitors_tableView_branches_headerToggles"
        role="toolbar"
        aria-label={t("branchesTableSession.coverageToolbarAria", {
          defaultValue: "Branch coverage overlays",
        })}>
        {editStep === "map" && editingBranchKey ? (
          <>
            <span className="Competitors_tableView_branches_headerStepBadge">
              {text.mapStepBadge}
            </span>
            {isDubaiEdit ? (
              <>
                <button
                  type="button"
                  className={`Competitors_mapView_controls_toggle ${
                    coverageEditMode === "polygon"
                      ? "Competitors_mapView_controls_toggleActive"
                      : ""
                  }`}
                  onClick={() => handlers?.startCoverageEdit?.("polygon")}
                  aria-pressed={coverageEditMode === "polygon"}>
                  {text.coveragePolygonBtn}
                </button>
                <button
                  type="button"
                  className={`Competitors_mapView_controls_toggle ${
                    coverageEditMode === "radius"
                      ? "Competitors_mapView_controls_toggleActive"
                      : ""
                  }`}
                  onClick={() => handlers?.startCoverageEdit?.("radius")}
                  aria-pressed={coverageEditMode === "radius"}>
                  {text.coverageRadiusBtn}
                </button>
                {coverageEditMode ? (
                  <button
                    type="button"
                    className="Competitors_mapView_controls_toggle"
                    onClick={() => handlers?.cancelCoverageEdit?.()}>
                    {text.coverageCancelBtn}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="Competitors_mapView_controls_toggle Competitors_tableView_branches_header_clearBtn"
                  disabled={!hasPolygonCoverage}
                  onClick={() => handlers?.clearBranchCoverage?.("polygon")}
                  title={t("branchesTableSession.coverageClearPolygonTitle", {
                    defaultValue: "Remove polygon coverage for this branch",
                  })}>
                  {text.coverageClearPolygonBtn}
                </button>
                <button
                  type="button"
                  className="Competitors_mapView_controls_toggle Competitors_tableView_branches_header_clearBtn"
                  disabled={!hasRadiusCoverage}
                  onClick={() => handlers?.clearBranchCoverage?.("radius")}
                  title={t("branchesTableSession.coverageClearRadiusTitle", {
                    defaultValue: "Remove radius coverage for this branch",
                  })}>
                  {text.coverageClearRadiusBtn}
                </button>
                <button
                  type="button"
                  className="Competitors_mapView_controls_toggle Competitors_tableView_branches_header_hideBtn"
                  disabled={!polygonVisible}
                  onClick={() => handlers?.hideBranchCoverage?.("polygon")}
                  title={t("branchesTableSession.coverageHidePolygonTitle", {
                    defaultValue: "Hide polygon overlay on the map",
                  })}>
                  {text.coverageHidePolygonBtn}
                </button>
                <button
                  type="button"
                  className="Competitors_mapView_controls_toggle Competitors_tableView_branches_header_hideBtn"
                  disabled={!radiusVisible}
                  onClick={() => handlers?.hideBranchCoverage?.("radius")}
                  title={t("branchesTableSession.coverageHideRadiusTitle", {
                    defaultValue: "Hide radius overlay on the map",
                  })}>
                  {text.coverageHideRadiusBtn}
                </button>
                <button
                  type="button"
                  className="Competitors_mapView_controls_toggle Competitors_tableView_branches_header_hideBtn"
                  disabled={!canHideAny}
                  onClick={() => handlers?.hideBranchCoverage?.("all")}
                  title={t("branchesTableSession.coverageHideAllTitle", {
                    defaultValue: "Hide polygon and radius overlays on the map",
                  })}>
                  {text.coverageHideAllBtn}
                </button>
              </>
            ) : null}
          </>
        ) : (
          <>
            <button
              type="button"
              className={`Competitors_mapView_controls_toggle ${
                showAllPolygon ? "Competitors_mapView_controls_toggleActive" : ""
              }`}
              onClick={handlers?.handleToggleAllPolygon}
              aria-pressed={showAllPolygon}
              disabled={!!editStep}
              title={t("mapView.toggleAllPolygonTitle", {
                defaultValue: "Show / hide polygon coverages (all)",
              })}>
              {t("mapView.allPolygon", { defaultValue: "Polygon (all)" })}
            </button>
            <button
              type="button"
              className={`Competitors_mapView_controls_toggle ${
                showAllRadius ? "Competitors_mapView_controls_toggleActive" : ""
              }`}
              onClick={handlers?.handleToggleAllRadius}
              aria-pressed={showAllRadius}
              disabled={!!editStep}
              title={t("mapView.toggleAllRadiusTitle", {
                defaultValue: "Show / hide radius coverages (all)",
              })}>
              {t("mapView.allRadius", { defaultValue: "Radius (all)" })}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Competitors_tableView_branches_header;
