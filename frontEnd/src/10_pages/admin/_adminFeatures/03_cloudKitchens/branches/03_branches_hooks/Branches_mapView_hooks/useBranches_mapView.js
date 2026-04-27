import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  branchHasCoords,
  fitMapToBranches,
} from "../../02_branches_helpers/_branches_helpers.index.js";

export const useBranches_mapView = ({
//   fitMapToBranches,
  branches,
  googleMaps_apiKey,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "admin-branches-google-map",
    googleMapsApiKey: googleMaps_apiKey,
  });

  const mapRef = useRef(null);

  const [showBranches, setShowBranches] = useState(true);
  const [activeBranchId, setActiveBranchId] = useState(null);

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
  };

  const mapStates = {
    isLoaded,
    loadError,
    showBranches,
    activeBranchId,
    withCoords,
    visibleBranches,
    googleMaps_apiKey,
  };
  const mapHandlers = {
    handleToggleBranches,
    onMapLoad,
    setActiveBranchId,
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
