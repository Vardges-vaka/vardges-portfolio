import { useEffect, useRef } from "react";

/**
 * AdvancedMarkerElement lifecycle: pin + PinElement styling + gmp-click.
 * Keeps the marker instance in a ref so a sibling effect can anchor an InfoWindow.
 *
 * onClick is read from a ref each tick so the pin is not recreated when the parent
 * passes a new function identity on every render.
 */
export const useBranches_map_marker = ({
  map,
  lat,
  lng,
  id,
  branchName,
  onClick,
}) => {
  const markerRef = useRef(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    if (!map || lat == null || lng == null) return;

    const AdvancedMarkerElement = window.google?.maps?.marker?.AdvancedMarkerElement;
    if (!AdvancedMarkerElement) return;

    // PinElement extends HTMLElement; use the instance as content — not pin.element (deprecated on <gmp-pin>).
    let pinContent = null;
    try {
      const PinElement = window.google?.maps?.marker?.PinElement;
      if (PinElement) {
        pinContent = new PinElement({
          background: "#c62828",
          borderColor: "#8e0000",
          glyphColor: "#ffffff",
        });
      }
    } catch {
      pinContent = null;
    }

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
      title: branchName,
      ...(pinContent ? { content: pinContent } : {}),
    });
    markerRef.current = marker;

    const onGmpClick = () => {
      onClickRef.current?.();
    };

    let mapsClickListener = null;
    let usedDomClick = false;
    if (typeof marker.addListener === "function") {
      mapsClickListener = marker.addListener("gmp-click", onGmpClick);
    }
    if (!mapsClickListener && typeof marker.addEventListener === "function") {
      marker.addEventListener("gmp-click", onGmpClick);
      usedDomClick = true;
    }

    return () => {
      if (mapsClickListener) {
        google.maps.event.removeListener(mapsClickListener);
      }
      if (usedDomClick) {
        marker.removeEventListener("gmp-click", onGmpClick);
      }
      marker.map = null;
      markerRef.current = null;
    };
  }, [map, lat, lng, id, branchName]);

  return markerRef;
};
