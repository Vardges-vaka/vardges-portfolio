import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  branchHasCoords,
  fitMapToBranches,
} from "../../02_branches_helpers/_branches_helpers.index.js";

// Stable reference — inline `["marker"]` on every render makes LoadScript reload the script.
const GOOGLE_MAPS_LIBRARIES = ["marker"];

export const useBranches_mapView = ({ branches, googleMaps_apiKey }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "admin-branches-google-map",
    googleMapsApiKey: googleMaps_apiKey,
    // Loads `google.maps.marker` (AdvancedMarkerElement, PinElement, …).
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const mapRef = useRef(null);

  const [showBranches, setShowBranches] = useState(true);
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [mapControlsExpanded, setMapControlsExpanded] = useState(false);
  const [mapSummaryPeriod, setMapSummaryPeriod] = useState(
    /** @type {"daily"|"weekly"|"monthly"} */ ("daily"),
  );
  const [infoPanelBranchId, setInfoPanelBranchId] = useState(null);
  const [mapInfoExpanded, setMapInfoExpanded] = useState(false);

  const withCoords = useMemo(
    () => (branches ?? []).filter(branchHasCoords),
    [branches],
  );

  const visibleBranches = showBranches ? withCoords : [];

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleToggleBranches = () => {
    setShowBranches((v) => !v);
    setActiveBranchId(null);
    setInfoPanelBranchId(null);
    setMapInfoExpanded(false);
  };

  const handleToggleMapControls = () => {
    setMapControlsExpanded((v) => !v);
  };

  const handleClearMapInfoBranch = () => {
    setInfoPanelBranchId(null);
    setMapInfoExpanded(false);
  };

  const handleToggleMapInfo = () => {
    setMapInfoExpanded((v) => !v);
  };

  /** Selecting branch detail from the map opens the info panel. */
  const handleSetInfoPanelBranchId = (id) => {
    setInfoPanelBranchId(id);
    if (id) setMapInfoExpanded(true);
  };

  const mapStates = {
    isLoaded,
    loadError,
    showBranches,
    activeBranchId,
    mapControlsExpanded,
    mapSummaryPeriod,
    infoPanelBranchId,
    mapInfoExpanded,
    withCoords,
    visibleBranches,
    googleMaps_apiKey,
  };
  const mapHandlers = {
    handleToggleBranches,
    handleToggleMapControls,
    handleToggleMapInfo,
    handleClearMapInfoBranch,
    onMapLoad,
    setActiveBranchId,
    setMapSummaryPeriod,
    setInfoPanelBranchId: handleSetInfoPanelBranchId,
  };

  //! ______________USE EFFECTS________________

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    fitMapToBranches(mapRef.current, visibleBranches);
  }, [isLoaded, visibleBranches, fitMapToBranches]);

  //____________________________________________

  return {
    states: mapStates,
    handlers: mapHandlers,
  };
};
