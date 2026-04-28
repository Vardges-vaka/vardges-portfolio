import { useEffect, useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";

import { createBranches_mapView_infoWindowContent } from "../../02_branches_helpers/_branches_helpers.index.js";
import { useBranches_map_marker } from "../../03_branches_hooks/Branches_mapView_hooks/_Branches_mapView_hooks.index.js";

/**
 * Advanced marker + imperative InfoWindow (classic Marker is deprecated).
 * Pin lifecycle lives in useBranches_map_marker; popup is anchored to markerRef.
 */
const Branches_mapView_map_marker = ({
  t,
  id,
  lat,
  lng,
  activeBranchId,
  onClick,
  onCloseClick,
  branch,
  btnOnClick,
  onViewBranchInfo,
}) => {
  const map = useGoogleMap();
  const handlersRef = useRef({ onClick, onCloseClick, btnOnClick, onViewBranchInfo });
  handlersRef.current = { onClick, onCloseClick, btnOnClick, onViewBranchInfo };

  const branchName = branch?.name ?? "";
  const branchAddress = branch?.location?.address ?? "";

  const markerRef = useBranches_map_marker({
    map,
    lat,
    lng,
    id,
    branchName,
    onClick,
  });

  useEffect(() => {
    const marker = markerRef.current;
    if (!map || !marker) return;

    let infoWindow = null;

    if (activeBranchId === id) {
      const content = createBranches_mapView_infoWindowContent({
        branchName,
        branchAddress,
        labels: {
          viewBranch: t("mapView.popupViewBranch"),
          viewBranchInfo: t("mapView.popupViewBranchInfo"),
          viewCoverage: t("mapView.popupViewCoverage"),
        },
        handlers: {
          onViewBranch: () => handlersRef.current.btnOnClick(),
          onViewBranchInfo: () => handlersRef.current.onViewBranchInfo?.(),
        },
        coverage: { disabledHint: t("mapView.disabledHint") },
      });

      infoWindow = new google.maps.InfoWindow({ content });
      infoWindow.addListener("closeclick", () => {
        handlersRef.current.onCloseClick();
      });
      infoWindow.open({ map, anchor: marker });
    }

    return () => {
      if (infoWindow) {
        google.maps.event.clearInstanceListeners(infoWindow);
        infoWindow.close();
      }
    };
  }, [map, markerRef, id, lat, lng, activeBranchId, branchName, branchAddress, t]);

  return null;
};

export default Branches_mapView_map_marker;
