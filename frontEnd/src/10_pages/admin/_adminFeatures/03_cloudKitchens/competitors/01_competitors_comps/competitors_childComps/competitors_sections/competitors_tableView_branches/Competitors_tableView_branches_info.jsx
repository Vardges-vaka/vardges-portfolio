import { useMemo, useEffect, useRef } from "react";
import "../../../../_styles/competitors_mapView_info.css";
import "../../../../_styles/competitors_tableView_branches/competitors_tableView_branches_info.css";
import {
  getCompetitorMapSummary,
  toNum,
  formatPriceRangeLabel,
  getLocationFromDraft,
  branchAddressLine,
  branchHasValidCoordinates,
} from "../../../../02_competitors_helpers/_competitors_helpers.index.js";
import Competitors_tableView_branches_info_detailsStep from "./Competitors_tableView_branches_info_detailsStep.jsx";

const Competitors_tableView_branches_info = ({ states, handlers, t }) => {
  const {
    text,
    competitor,
    draftLocations,
    activeMarkerKey,
    editingBranchKey,
    editStep,
    showAllPolygon,
    showAllRadius,
    polygonByMarkerKey,
    radiusByMarkerKey,
  } = states;

  const summary = useMemo(
    () => (competitor ? getCompetitorMapSummary(competitor) : null),
    [competitor],
  );

  const activeBranch = useMemo(
    () => getLocationFromDraft(draftLocations, activeMarkerKey),
    [draftLocations, activeMarkerKey],
  );

  const isEditingActive =
    editingBranchKey && activeMarkerKey && editingBranchKey === activeMarkerKey;
  const isMapStep = isEditingActive && editStep === "map";
  const isDetailsStep = isEditingActive && editStep === "details";

  const effectiveCoverage = useMemo(() => {
    const key = activeMarkerKey ? String(activeMarkerKey) : "";
    const polyOv = key ? polygonByMarkerKey?.[key] : undefined;
    const radOv = key ? radiusByMarkerKey?.[key] : undefined;
    return {
      polygonOn:
        polyOv === "show" ? true : polyOv === "hide" ? false : !!showAllPolygon,
      radiusOn:
        radOv === "show" ? true : radOv === "hide" ? false : !!showAllRadius,
    };
  }, [
    activeMarkerKey,
    polygonByMarkerKey,
    radiusByMarkerKey,
    showAllPolygon,
    showAllRadius,
  ]);

  const priceLabel = useMemo(
    () => (competitor ? formatPriceRangeLabel(competitor?.priceRange, t) : "—"),
    [competitor, t],
  );

  const isDubai = String(activeBranch?.emirate || "").trim() === "Dubai";
  const canContinueMap =
    activeBranch && branchHasValidCoordinates(activeBranch);

  const dineInVal =
    activeBranch?.hasDineIn !== undefined
      ? activeBranch.hasDineIn
      : activeBranch?.dineIn;

  const bodyRef = useRef(null);

  useEffect(() => {
    if (editStep !== "details") return undefined;
    const timer = window.setTimeout(() => {
      bodyRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }, 200);
    return () => window.clearTimeout(timer);
  }, [editStep, editingBranchKey]);

  return (
    <div className="Competitors_tableView_branches_info Competitors_mapView_info">
      <div className="Competitors_mapView_info_bar">
        <div className="Competitors_mapView_info_barMain">
          <span className="Competitors_mapView_info_barTitle">
            {isMapStep
              ? text.mapStepTitle
              : isDetailsStep
                ? text.detailsStepTitle
                : text.pinDetailsTitle}
          </span>
          <span className="Competitors_mapView_info_barValue">
            {activeBranch ? branchAddressLine(activeBranch) : "—"}
          </span>
        </div>
        <div className="Competitors_mapView_info_barActions">
          <button
            type="button"
            className="Competitors_mapView_info_barBtn"
            onClick={() => handlers?.onClearBranchSelection?.()}
            disabled={!activeMarkerKey || isEditingActive}
            title={text.clearSelectionTitle}
            aria-label={text.clearSelectionTitle}>
            ×
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="Competitors_mapView_info_body Competitors_tableView_branches_info_body">
        {!activeMarkerKey ? (
          <p className="Competitors_mapView_info_muted">{text.selectPinHint}</p>
        ) : null}

        {activeMarkerKey && !activeBranch ? (
          <p className="Competitors_mapView_info_muted">{text.pinNotFound}</p>
        ) : null}

        {isMapStep && activeBranch ? (
          <div className="Competitors_tableView_branches_info_mapStep">
            <p className="Competitors_tableView_branches_info_editHint">
              {text.mapStepInstructions}
            </p>
            <p className="Competitors_tableView_branches_info_editHint">
              {text.dragPinHint}
            </p>
            {!isDubai ? (
              <p className="Competitors_tableView_branches_info_note">
                {text.coverageDubaiOnlyNote}
              </p>
            ) : (
              <p className="Competitors_tableView_branches_info_note">
                {text.mapStepCoverageNote}
              </p>
            )}
            <div className="Competitors_tableView_branches_info_editActions">
              <button
                type="button"
                className="Competitors_tableView_branches_info_saveBtn"
                disabled={!canContinueMap}
                onClick={() => handlers?.confirmMapStep?.()}>
                {text.continueToDetailsLabel}
              </button>
              <button
                type="button"
                className="Competitors_tableView_branches_info_cancelBtn"
                onClick={() => handlers?.cancelEditBranch?.()}>
                {text.cancelEditLabel}
              </button>
            </div>
          </div>
        ) : null}

        {isDetailsStep && activeBranch ? (
          <Competitors_tableView_branches_info_detailsStep
            key={activeMarkerKey}
            activeBranch={activeBranch}
            activeMarkerKey={activeMarkerKey}
            text={text}
            handlers={handlers}
          />
        ) : null}

        {activeBranch && !isEditingActive ? (
          <>
            <div className="Competitors_mapView_info_header">
              <div className="Competitors_mapView_info_headerLeft">
                {summary?.logo ? (
                  <img
                    className="Competitors_mapView_info_logo"
                    src={summary.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <div className="Competitors_mapView_info_titleStack">
                  <h3 className="Competitors_mapView_info_name">
                    {summary?.name || "—"}
                  </h3>
                  <p className="Competitors_mapView_info_addr">
                    {branchAddressLine(activeBranch)}
                  </p>
                </div>
              </div>
            </div>

            <div className="Competitors_mapView_info_grid">
              <div className="Competitors_mapView_info_card Competitors_mapView_info_cardFull">
                <span className="Competitors_mapView_info_label">
                  {t("mapView.cardSelectedBranch", {
                    defaultValue: "Selected pin (branch)",
                  })}
                </span>
                <span className="Competitors_mapView_info_value">
                  {branchAddressLine(activeBranch)}
                </span>
                <div className="Competitors_mapView_info_miniGrid">
                  <div className="Competitors_mapView_info_miniRow">
                    <span className="Competitors_mapView_info_miniLabel">
                      {t("mapView.cardCoords", { defaultValue: "Coords" })}
                    </span>
                    <span className="Competitors_mapView_info_miniValue">
                      {toNum(activeBranch?.coordinates?.lat) == null ||
                      toNum(activeBranch?.coordinates?.lng) == null
                        ? "—"
                        : `${toNum(activeBranch.coordinates.lat).toFixed(5)}, ${toNum(
                            activeBranch.coordinates.lng,
                          ).toFixed(5)}`}
                    </span>
                  </div>
                  <div className="Competitors_mapView_info_miniRow">
                    <span className="Competitors_mapView_info_miniLabel">
                      {text.dineInLabel}
                    </span>
                    <span
                      className={`Competitors_mapView_info_pill ${
                        dineInVal === true
                          ? "Competitors_mapView_info_pillOn"
                          : "Competitors_mapView_info_pillOff"
                      }`}>
                      {dineInVal === true
                        ? text.dineInYes
                        : dineInVal === false
                          ? text.dineInNo
                          : "—"}
                    </span>
                  </div>
                  <div className="Competitors_mapView_info_miniRow">
                    <span className="Competitors_mapView_info_miniLabel">
                      {t("mapView.cardCoveragePolygon", {
                        defaultValue: "Polygon",
                      })}
                    </span>
                    <span
                      className={`Competitors_mapView_info_pill ${
                        effectiveCoverage.polygonOn
                          ? "Competitors_mapView_info_pillOn"
                          : "Competitors_mapView_info_pillOff"
                      }`}>
                      {effectiveCoverage.polygonOn ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="Competitors_mapView_info_miniRow">
                    <span className="Competitors_mapView_info_miniLabel">
                      {t("mapView.cardCoverageRadius", {
                        defaultValue: "Radius",
                      })}
                    </span>
                    <span
                      className={`Competitors_mapView_info_pill ${
                        effectiveCoverage.radiusOn
                          ? "Competitors_mapView_info_pillOn"
                          : "Competitors_mapView_info_pillOff"
                      }`}>
                      {effectiveCoverage.radiusOn ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="Competitors_mapView_info_miniRow">
                    <span className="Competitors_mapView_info_miniLabel">
                      {text.hasOwnDeliveryLabel}
                    </span>
                    <span
                      className={`Competitors_mapView_info_pill ${
                        activeBranch?.hasOwnDelivery
                          ? "Competitors_mapView_info_pillOn"
                          : "Competitors_mapView_info_pillOff"
                      }`}>
                      {activeBranch?.hasOwnDelivery
                        ? text.hasOwnDeliveryYes
                        : text.hasOwnDeliveryNo}
                    </span>
                  </div>
                </div>
                {!isDubai ? (
                  <p className="Competitors_tableView_branches_info_note">
                    {text.coverageDubaiOnlyNote}
                  </p>
                ) : null}
              </div>

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t("mapView.cardBranches", { defaultValue: "Branches" })}
                </span>
                <span className="Competitors_mapView_info_value">
                  {summary?.branchesTotalQnt == null
                    ? "—"
                    : summary.branchesTotalQnt}
                </span>
              </div>

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t("mapView.cardPriceRange", {
                    defaultValue: "Price range",
                  })}
                </span>
                <span className="Competitors_mapView_info_value">
                  {priceLabel}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Competitors_tableView_branches_info;
