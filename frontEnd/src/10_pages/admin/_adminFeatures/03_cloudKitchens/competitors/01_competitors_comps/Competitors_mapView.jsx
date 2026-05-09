import "../_styles/competitors_mapView.css";
import {
  Competitors_mapView_controls,
  Competitors_mapView_info,
  Competitors_mapView_map,
} from "./competitors_childComps/_competitors_childComps.index.js";
import { useCompetitors_mapView } from "../03_competitors_hooks/Competitors_mapView_hooks/_Competitors_mapView_hooks.index.js";
import { googleMaps_apiKey } from "../../branches/branches.config.js";

const Competitors_mapView = ({ states, handlers, compProps, t }) => {
  if (states?.session !== "view_competitors_map") return null;

  const { competitors = [] } = states ?? {};

  const { mapStates, mapHandlers } = useCompetitors_mapView({
    competitors,
    googleMaps_apiKey,
  });

  if (!googleMaps_apiKey?.trim()) {
    return (
      <div className="competitorsMapView competitorsMapView--noKey">
        <div className="competitorsMapView__fallback">
          <h2 className="competitorsMapView__fallbackTitle">
            {t
              ? t("mapView.noKeyTitle", { defaultValue: "Map is not available" })
              : "Map is not available"}
          </h2>
          <p className="competitorsMapView__fallbackText">
            {t
              ? t("mapView.noKeyText", {
                  defaultValue:
                    "Missing Google Maps API key (VITE_GOOGLE_MAPS_API_KEY).",
                })
              : "Missing Google Maps API key (VITE_GOOGLE_MAPS_API_KEY)."}
          </p>
        </div>
      </div>
    );
  }

  if (mapStates.loadError) {
    return (
      <div className="competitorsMapView">
        <div className="competitorsMapView__fallback">
          <h2 className="competitorsMapView__fallbackTitle">
            {t
              ? t("mapView.loadErrorTitle", {
                  defaultValue: "Map failed to load",
                })
              : "Map failed to load"}
          </h2>
          <p className="competitorsMapView__fallbackText">
            {t
              ? t("mapView.loadErrorText", {
                  defaultValue:
                    "Google Maps script could not be loaded. Check your API key and network.",
                })
              : "Google Maps script could not be loaded. Check your API key and network."}
          </p>
        </div>
      </div>
    );
  }

  if (!mapStates.isLoaded) {
    return (
      <div className="competitorsMapView">
        <div className="competitorsMapView__fallback">
          <h2 className="competitorsMapView__fallbackTitle">
            {t
              ? t("mapView.loadingTitle", { defaultValue: "Loading map…" })
              : "Loading map…"}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="competitorsMapView">
      <Competitors_mapView_controls
        t={t}
        showCompetitors={mapStates.showCompetitors}
        onToggleCompetitors={mapHandlers.handleToggleCompetitors}
        showAllPolygon={mapStates.showAllPolygon}
        showAllRadius={mapStates.showAllRadius}
        onToggleAllPolygon={mapHandlers.handleToggleAllPolygon}
        onToggleAllRadius={mapHandlers.handleToggleAllRadius}
        mapControlsExpanded={mapStates.mapControlsExpanded}
        onToggleMapControls={mapHandlers.handleToggleMapControls}
        competitorsTotalCount={competitors.length}
        visibleCompetitorsCount={mapStates.visibleCompetitors.length}
      />

      <Competitors_mapView_map
        t={t}
        competitors={mapStates.visibleCompetitors}
        onLoad={mapHandlers.onMapLoad}
        activeMarkerKey={mapStates.activeMarkerKey}
        onMarkerClick={mapHandlers.handleMarkerClick}
        onTogglePinRadius={mapHandlers.handleTogglePinRadius}
        onTogglePinPolygon={mapHandlers.handleTogglePinPolygon}
        showAllRadius={mapStates.showAllRadius}
        showAllPolygon={mapStates.showAllPolygon}
        radiusByMarkerKey={mapStates.radiusByMarkerKey}
        polygonByMarkerKey={mapStates.polygonByMarkerKey}
        setActiveMarkerKey={mapHandlers.setActiveMarkerKey}
        setInfoPanelCompetitorId={mapHandlers.setInfoPanelCompetitorId}
      />

      <Competitors_mapView_info
        t={t}
        competitors={competitors}
        infoPanelCompetitorId={mapStates.infoPanelCompetitorId}
        activeMarkerKey={mapStates.activeMarkerKey}
        showAllPolygon={mapStates.showAllPolygon}
        showAllRadius={mapStates.showAllRadius}
        polygonByMarkerKey={mapStates.polygonByMarkerKey}
        radiusByMarkerKey={mapStates.radiusByMarkerKey}
        onClearCompetitorInfo={mapHandlers.handleClearMapInfoCompetitor}
        mapInfoExpanded={mapStates.mapInfoExpanded}
        onToggleMapInfo={mapHandlers.handleToggleMapInfo}
        onOpenCompetitor={handlers?.handleCompetitorTableAction}
      />
    </div>
  );
};

export default Competitors_mapView;

/*
import TemporaryTesting from "./TemporaryTesting.jsx";

      <TemporaryTesting handler={handlers.temp} />


*/
