import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  competitorHasCoords,
  toNum,
  fitMapToCompetitors,
} from "../../02_competitors_helpers/_competitors_helpers.index.js";

// Stable reference — inline `["marker"]` on every render makes LoadScript reload the script.
const GOOGLE_MAPS_LIBRARIES = ["marker"];

export const useCompetitors_mapView = ({ competitors, googleMaps_apiKey }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "admin-competitors-google-map",
    googleMapsApiKey: googleMaps_apiKey,
    // Loads `google.maps.marker` (AdvancedMarkerElement, PinElement, …).
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const mapRef = useRef(null);
  const coverageRef = useRef({
    // markerKey -> google.maps.Circle
    circlesByMarkerKey: new Map(),
    // markerKey -> google.maps.Polygon
    polygonsByMarkerKey: new Map(),
  });

  const [showCompetitors, setShowCompetitors] = useState(true);
  const [activeMarkerKey, setActiveMarkerKey] = useState(null);
  const [mapControlsExpanded, setMapControlsExpanded] = useState(false);
  const [infoPanelCompetitorId, setInfoPanelCompetitorId] = useState(null);
  const [mapInfoExpanded, setMapInfoExpanded] = useState(false);
  const [showAllRadius, setShowAllRadius] = useState(false);
  const [showAllPolygon, setShowAllPolygon] = useState(false);

  /**
   * Per-pin coverage overrides:
   * - undefined: inherit global control
   * - "show": force show for this pin
   * - "hide": force hide for this pin
   */
  const [radiusByMarkerKey, setRadiusByMarkerKey] = useState(
    /** @type {Record<string, "show"|"hide">} */ ({}),
  );
  const [polygonByMarkerKey, setPolygonByMarkerKey] = useState(
    /** @type {Record<string, "show"|"hide">} */ ({}),
  );

  const withCoords = useMemo(
    () => (competitors ?? []).filter(competitorHasCoords),
    [competitors],
  );

  const visibleCompetitors = showCompetitors ? withCoords : [];

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleToggleCompetitors = () => {
    setShowCompetitors((v) => !v);
    setActiveMarkerKey(null);
    setInfoPanelCompetitorId(null);
    setMapInfoExpanded(false);
  };

  const handleToggleMapControls = () => {
    setMapControlsExpanded((v) => !v);
  };

  const handleToggleAllRadius = () => {
    setShowAllRadius((v) => !v);
  };

  const handleToggleAllPolygon = () => {
    setShowAllPolygon((v) => !v);
  };

  const getEffectiveCoverage = useCallback(
    (type, markerKey) => {
      const key = String(markerKey || "");
      if (!key) return false;
      const ov =
        type === "radius" ? radiusByMarkerKey[key] : polygonByMarkerKey[key];
      if (ov === "show") return true;
      if (ov === "hide") return false;
      return type === "radius" ? showAllRadius : showAllPolygon;
    },
    [radiusByMarkerKey, polygonByMarkerKey, showAllRadius, showAllPolygon],
  );

  const toggleMarkerCoverage = useCallback(
    (type, markerKey) => {
      const key = String(markerKey || "");
      if (!key) return;

      const isOn = getEffectiveCoverage(type, key);
      const nextOverride = isOn ? "hide" : "show";

      if (type === "radius") {
        setRadiusByMarkerKey((prev) => ({ ...prev, [key]: nextOverride }));
      } else {
        setPolygonByMarkerKey((prev) => ({ ...prev, [key]: nextOverride }));
      }
    },
    [getEffectiveCoverage],
  );

  const handleMarkerClick = (markerKey, competitorId) => {
    setActiveMarkerKey(markerKey);
    if (competitorId != null) {
      setInfoPanelCompetitorId(String(competitorId));
      setMapInfoExpanded(true);
    }
  };

  const handleTogglePinRadius = (markerKey) => {
    // Pin-level toggle always affects only this pin.
    toggleMarkerCoverage("radius", markerKey);
  };

  const handleTogglePinPolygon = (markerKey) => {
    toggleMarkerCoverage("polygon", markerKey);
  };

  const handleClearMapInfoCompetitor = () => {
    setInfoPanelCompetitorId(null);
    setMapInfoExpanded(false);
  };

  const handleToggleMapInfo = () => {
    setMapInfoExpanded((v) => !v);
  };

  /** Selecting competitor detail from the map opens the info panel. */
  const handleSetInfoPanelCompetitorId = (id) => {
    setInfoPanelCompetitorId(id);
    if (id) setMapInfoExpanded(true);
  };

  const getCoverageColor = useCallback((id) => {
    const palette = [
      "#1976d2",
      "#d32f2f",
      "#388e3c",
      "#7b1fa2",
      "#f57c00",
      "#00796b",
      "#5d4037",
      "#455a64",
      "#c2185b",
      "#512da8",
      "#0288d1",
    ];
    const s = String(id || "");
    let hash = 0;
    for (let i = 0; i < s.length; i += 1) {
      hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
    }
    return palette[hash % palette.length];
  }, []);

  const ensureCircleForMarker = useCallback(
    ({ markerKey, competitorId, loc }) => {
      const map = mapRef.current;
      if (!map || typeof google === "undefined") return null;
      if (!markerKey) return null;

      const existing = coverageRef.current.circlesByMarkerKey.get(markerKey);
      if (existing) return existing;

      const emirate = String(loc?.emirate || "").trim();
      if (emirate !== "Dubai") return null;

      const color = getCoverageColor(competitorId);
      const centerLat = toNum(
        loc?.coverageAreas?.byDistance?.radius?.center?.lat,
      );
      const centerLng = toNum(
        loc?.coverageAreas?.byDistance?.radius?.center?.lng,
      );
      const km = toNum(loc?.coverageAreas?.byDistance?.radius?.km);
      if (centerLat == null || centerLng == null || km == null) return null;

      const circle = new google.maps.Circle({
        center: { lat: centerLat, lng: centerLng },
        radius: km * 1000,
        strokeColor: color,
        strokeOpacity: 0.85,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.12,
        clickable: false,
        map: null,
      });
      coverageRef.current.circlesByMarkerKey.set(markerKey, circle);
      return circle;
    },
    [getCoverageColor],
  );

  const ensurePolygonForMarker = useCallback(
    ({ markerKey, competitorId, loc }) => {
      const map = mapRef.current;
      if (!map || typeof google === "undefined") return null;
      if (!markerKey) return null;

      const existing = coverageRef.current.polygonsByMarkerKey.get(markerKey);
      if (existing) return existing;

      const emirate = String(loc?.emirate || "").trim();
      if (emirate !== "Dubai") return null;

      const color = getCoverageColor(competitorId);
      const poly = loc?.coverageAreas?.byDistance?.polygon;
      const pts = Array.isArray(poly) ? poly : [];
      const path = pts
        .map((p) => ({ lat: toNum(p?.lat), lng: toNum(p?.lng) }))
        .filter((p) => p.lat != null && p.lng != null);
      if (path.length < 3) return null;

      const polygon = new google.maps.Polygon({
        paths: path,
        strokeColor: color,
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.12,
        clickable: false,
        map: null,
      });
      coverageRef.current.polygonsByMarkerKey.set(markerKey, polygon);
      return polygon;
    },
    [getCoverageColor],
  );

  // Keep overlay visibility in sync with global + per-competitor toggles.
  useEffect(() => {
    const map = mapRef.current;
    if (!isLoaded || !map || typeof google === "undefined") return;

    // Hide everything first.
    coverageRef.current.circlesByMarkerKey.forEach((c) => c.setMap(null));
    coverageRef.current.polygonsByMarkerKey.forEach((p) => p.setMap(null));

    (competitors ?? []).forEach((c) => {
      const competitorId = c?._id != null ? String(c._id) : "";
      if (!competitorId) return;

      const locs = Array.isArray(c?.branches?.locations)
        ? c.branches.locations
        : [];
      const dubaiLocs = locs.filter(
        (l) => String(l?.emirate || "").trim() === "Dubai",
      );

      dubaiLocs.forEach((loc, idx) => {
        const markerKey = `${competitorId}:${idx}`;

        // Polygon visibility
        const polygonVisible = getEffectiveCoverage("polygon", markerKey);
        if (polygonVisible) {
          const poly = ensurePolygonForMarker({ markerKey, competitorId, loc });
          if (poly) poly.setMap(map);
        }

        // Radius visibility
        const radiusVisible = getEffectiveCoverage("radius", markerKey);
        if (radiusVisible) {
          const circle = ensureCircleForMarker({
            markerKey,
            competitorId,
            loc,
          });
          if (circle) circle.setMap(map);
        }
      });
    });
  }, [
    isLoaded,
    competitors,
    showAllRadius,
    showAllPolygon,
    radiusByMarkerKey,
    polygonByMarkerKey,
    ensureCircleForMarker,
    ensurePolygonForMarker,
    getEffectiveCoverage,
  ]);

  // Fit bounds whenever visible set changes (after script load).
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    fitMapToCompetitors(mapRef.current, visibleCompetitors);
  }, [isLoaded, visibleCompetitors]);

  // Cleanup circles on unmount.
  useEffect(() => {
    return () => {
      coverageRef.current.circlesByMarkerKey.forEach((c) => c.setMap(null));
      coverageRef.current.circlesByMarkerKey.clear();

      coverageRef.current.polygonsByMarkerKey.forEach((p) => p.setMap(null));
      coverageRef.current.polygonsByMarkerKey.clear();
    };
  }, []);

  return {
    mapStates: {
      isLoaded,
      loadError,
      showCompetitors,
      activeMarkerKey,
      mapControlsExpanded,
      withCoords,
      visibleCompetitors,
      infoPanelCompetitorId,
      mapInfoExpanded,
      showAllRadius,
      showAllPolygon,
      radiusByMarkerKey,
      polygonByMarkerKey,
    },
    mapHandlers: {
      onMapLoad,
      handleToggleCompetitors,
      handleToggleMapControls,
      handleToggleAllRadius,
      handleToggleAllPolygon,
      handleMarkerClick,
      handleTogglePinRadius,
      handleTogglePinPolygon,
      handleClearMapInfoCompetitor,
      handleToggleMapInfo,
      setActiveMarkerKey,
      setInfoPanelCompetitorId: handleSetInfoPanelCompetitorId,
    },
  };
};
