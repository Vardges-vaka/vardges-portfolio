import { useEffect, useRef } from "react";

/**
 * AdvancedMarkerElement lifecycle: uses competitor logo as marker content and
 * keeps the marker instance in a ref so a sibling effect can anchor an InfoWindow.
 *
 * onClick is read from a ref so the marker is not recreated when the parent
 * passes a new function identity on every render.
 */
export const useCompetitors_map_marker = ({
  map,
  lat,
  lng,
  id,
  title,
  logoSrc,
  onClick,
}) => {
  const markerRef = useRef(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    if (!map || lat == null || lng == null) return;

    const AdvancedMarkerElement = window.google?.maps?.marker?.AdvancedMarkerElement;
    if (!AdvancedMarkerElement) return;

    // Custom content: small logo in a circular tile.
    const wrap = document.createElement("div");
    wrap.className = "Competitors_mapView_marker";
    wrap.setAttribute("role", "button");
    wrap.setAttribute("tabindex", "0");

    const fallback = document.createElement("span");
    fallback.className = "Competitors_mapView_markerFallback";
    fallback.textContent =
      typeof title === "string" && title.trim()
        ? title.trim().slice(0, 1).toUpperCase()
        : "•";

    const img = document.createElement("img");
    img.className = "Competitors_mapView_markerImg";
    img.alt = "";
    img.decoding = "async";
    img.loading = "lazy";
    img.src = logoSrc || "";
    img.addEventListener("error", () => {
      // If logo fails, keep the initial badge visible.
      img.style.display = "none";
      fallback.style.display = "flex";
    });

    // Default: show image if we have a URL; otherwise show initial.
    if (logoSrc) {
      fallback.style.display = "none";
      wrap.appendChild(img);
      wrap.appendChild(fallback);
    } else {
      img.style.display = "none";
      wrap.appendChild(fallback);
    }

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
      title: title || "",
      content: wrap,
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

    // Keyboard access for the marker tile itself.
    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onGmpClick();
      }
    };
    wrap.addEventListener("keydown", onKeyDown);

    return () => {
      if (mapsClickListener) google.maps.event.removeListener(mapsClickListener);
      if (usedDomClick) marker.removeEventListener("gmp-click", onGmpClick);
      wrap.removeEventListener("keydown", onKeyDown);
      marker.map = null;
      markerRef.current = null;
    };
  }, [map, lat, lng, id, title, logoSrc]);

  return markerRef;
};

