import { useMemo, useCallback, useRef, useEffect, memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "../../../../_styles/competitors_tableView_branches/competitors_tableView_branches_map.css";
import "../../../../_styles/competitors_mapView.css";
import {
  getBranchesMapOptions,
  DUBAI_CENTER,
  DEFAULT_ZOOM,
} from "../../../../../branches/05_branches_cnst/_branches_cnst.index.js";
import Competitors_tableView_branches_map_simpleMarker from "./Competitors_tableView_branches_map_simpleMarker.jsx";
import Competitors_tableView_branches_map_coverageLayer from "./Competitors_tableView_branches_map_coverageLayer.jsx";
import {
  getCompetitorMapSummary,
  toNum,
  getBranchColor,
} from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_tableView_branches_map = ({ states, handlers, t }) => {
  const {
    isLoaded,
    loadError,
    googleMaps_apiKey,
    displayCompetitor,
    competitorId,
    draftLocations,
    activeMarkerKey,
    editingBranchKey,
    editStep,
    coverageEditMode,
  } = states;

  const applyCoverageRef = useRef(handlers?.applyCoverageToDraft);
  applyCoverageRef.current = handlers?.applyCoverageToDraft;

  // Options must stay stable after mount — Google Maps rejects changing renderingType etc.
  const mapOptions = useMemo(() => getBranchesMapOptions(), []);

  const mapInstanceRef = useRef(null);

  const onMapLoad = useCallback(
    (map) => {
      mapInstanceRef.current = map;
      handlers?.onMapLoad?.(map);
    },
    [handlers],
  );

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || typeof map.setOptions !== "function") return;
    const useGreedy = editStep === "map" || Boolean(coverageEditMode);
    map.setOptions({
      gestureHandling: useGreedy ? "greedy" : "cooperative",
    });
  }, [editStep, coverageEditMode]);

  const mapContainerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      minHeight: "min(56vh, 560px)",
    }),
    [],
  );

  const onCoverageChange = useCallback((payload) => {
    if (!editingBranchKey) return;
    applyCoverageRef.current?.(editingBranchKey, payload);
  }, [editingBranchKey]);

  const mapLocked = editStep === "details";
  const mapEditActive = editStep === "map" && editingBranchKey;

  if (!googleMaps_apiKey?.trim()) {
    return (
      <div className="Competitors_tableView_branches_map Competitors_tableView_branches_map--loading">
        <div className="Competitors_mapView_fallback">
          <h2 className="Competitors_mapView_fallbackTitle">
            {t("mapView.noKeyTitle", { defaultValue: "Map is not available" })}
          </h2>
        </div>
      </div>
    );
  }

  if (loadError || !isLoaded) {
    return (
      <div className="Competitors_tableView_branches_map Competitors_tableView_branches_map--loading">
        <div className="Competitors_mapView_fallback">
          <h2 className="Competitors_mapView_fallbackTitle">
            {loadError
              ? t("mapView.loadErrorTitle", { defaultValue: "Map failed to load" })
              : t("mapView.loadingTitle", { defaultValue: "Loading map…" })}
          </h2>
        </div>
      </div>
    );
  }

  const competitor = displayCompetitor;
  const s = competitor ? getCompetitorMapSummary(competitor) : null;
  const locs = Array.isArray(draftLocations) ? draftLocations : [];

  return (
    <div className="Competitors_tableView_branches_map">
      {coverageEditMode && mapEditActive ? (
        <p className="Competitors_tableView_branches_map_coverageHint" role="status">
          {coverageEditMode === "radius"
            ? t("branchesTableSession.coverageEditRadiusHint", {
                defaultValue:
                  "Drag the circle or its edge to set delivery radius. Scroll to zoom the map.",
              })
            : t("branchesTableSession.coverageEditPolygonHint", {
                defaultValue:
                  "Drag polygon vertices to adjust coverage. Scroll to zoom the map.",
              })}
        </p>
      ) : null}
      <div
        className={`Competitors_tableView_branches_mapShell ${
          mapLocked ? "Competitors_tableView_branches_mapShell--locked" : ""
        }`}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={DUBAI_CENTER}
          zoom={DEFAULT_ZOOM}
          onLoad={onMapLoad}
          options={mapOptions}>
          {coverageEditMode && mapEditActive ? (
            <Competitors_tableView_branches_map_coverageLayer
              mode={coverageEditMode}
              editingBranchKey={editingBranchKey}
              draftLocations={draftLocations}
              onCoverageChange={onCoverageChange}
            />
          ) : null}
          {locs
            .map((loc, idx) => {
              const lat = toNum(loc?.coordinates?.lat);
              const lng = toNum(loc?.coordinates?.lng);
              if (lat == null || lng == null) return null;
              if (!competitorId) return null;

              const markerKey = `${competitorId}:${idx}`;
              const branchLine = [loc?.emirate, loc?.city, loc?.address]
                .filter(Boolean)
                .join(" · ");
              const isEditingThis =
                mapEditActive && editingBranchKey === markerKey;

              return (
                <Competitors_tableView_branches_map_simpleMarker
                  key={markerKey}
                  t={t}
                  markerKey={markerKey}
                  lat={lat}
                  lng={lng}
                  pinColor={getBranchColor(markerKey)}
                  summary={{
                    ...s,
                    addressLine: branchLine || s?.addressLine,
                  }}
                  activeMarkerKey={activeMarkerKey}
                  isDraggable={isEditingThis}
                  disablePopup={mapEditActive}
                  onClick={() => {
                    if (mapLocked) return;
                    handlers?.handleMarkerClick?.(markerKey);
                  }}
                  onCloseClick={() => handlers?.setActiveMarkerKey?.(null)}
                  onEdit={() => handlers?.startEditBranch?.(markerKey)}
                  onRemove={() => handlers?.openRemoveBranch?.(markerKey)}
                  onDragEnd={(newLat, newLng) =>
                    handlers?.updateDraftCoords?.(markerKey, newLat, newLng)
                  }
                />
              );
            })
            .filter(Boolean)}
        </GoogleMap>
        {mapLocked ? (
          <div
            className="Competitors_tableView_branches_map_lockOverlay"
            role="status"
            aria-live="polite">
            <p>{t("branchesTableSession.mapLockedHint", {
              defaultValue:
                "Map is locked while you complete branch details below. Use “Back to map” to adjust the pin or coverage.",
            })}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const branchMapPropsAreEqual = (prev, next) =>
  prev.states.draftLocations === next.states.draftLocations &&
  prev.states.editStep === next.states.editStep &&
  prev.states.editingBranchKey === next.states.editingBranchKey &&
  prev.states.coverageEditMode === next.states.coverageEditMode &&
  prev.states.activeMarkerKey === next.states.activeMarkerKey &&
  prev.states.isLoaded === next.states.isLoaded &&
  prev.states.loadError === next.states.loadError &&
  prev.states.competitorId === next.states.competitorId &&
  prev.states.displayCompetitor?._id === next.states.displayCompetitor?._id;

export default memo(Competitors_tableView_branches_map, branchMapPropsAreEqual);
