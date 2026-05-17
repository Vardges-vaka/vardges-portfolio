import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  fitMapToLocations,
  toNum,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import {
  getBranchColor,
  parseMarkerKey,
  branchHasPolygonCoverage,
  branchHasRadiusCoverage,
} from "../../../02_competitors_helpers/competitors_branches_helpers.js";

const GOOGLE_MAPS_LIBRARIES = ["marker"];

const collectLocationsWithCoords = (competitor) => {
  const locs = Array.isArray(competitor?.branches?.locations)
    ? competitor.branches.locations
    : [];
  return locs.filter((loc) => {
    const lat = toNum(loc?.coordinates?.lat);
    const lng = toNum(loc?.coordinates?.lng);
    return lat != null && lng != null;
  });
};

/**
 * Map + coverage overlay state for the table-view “branches” session (single competitor).
 * Mirrors `useCompetitors_mapView` toggles; coverage polygons/radius only apply to Dubai
 * locations (same data rules as the full map view).
 */
export const useC_T_branches_map = ({
  competitor,
  draftLocations,
  googleMaps_apiKey,
  activeMarkerKey,
  setActiveMarkerKey,
  editingBranchKey,
  editStep,
  coverageEditMode,
  setCoverageEditMode,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "admin-competitors-google-map",
    googleMapsApiKey: googleMaps_apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const mapRef = useRef(null);
  const hasInitialFitRef = useRef(false);
  const lastFitCompetitorIdRef = useRef("");
  const coverageRef = useRef({
    circlesByMarkerKey: new Map(),
    polygonsByMarkerKey: new Map(),
  });

  const [showAllRadius, setShowAllRadius] = useState(false);
  const [showAllPolygon, setShowAllPolygon] = useState(false);
  const [radiusByMarkerKey, setRadiusByMarkerKey] = useState({});
  const [polygonByMarkerKey, setPolygonByMarkerKey] = useState({});

  const competitorId = competitor?._id != null ? String(competitor._id) : "";

  const displayCompetitor = useMemo(() => {
    if (!competitor) return null;
    return {
      ...competitor,
      branches: {
        ...(competitor.branches && typeof competitor.branches === "object"
          ? competitor.branches
          : {}),
        locations: draftLocations ?? [],
        totalQnt: (draftLocations ?? []).length,
      },
    };
  }, [competitor, draftLocations]);

  const locationsWithCoords = useMemo(() => {
    if (!competitorId) return [];
    const locs = Array.isArray(draftLocations) ? draftLocations : [];
    return locs.filter((loc) => {
      const lat = toNum(loc?.coordinates?.lat);
      const lng = toNum(loc?.coordinates?.lng);
      return lat != null && lng != null;
    });
  }, [competitorId, draftLocations]);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleToggleAllRadius = useCallback(() => {
    setShowAllRadius((v) => !v);
  }, []);

  const handleToggleAllPolygon = useCallback(() => {
    setShowAllPolygon((v) => !v);
  }, []);

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

  const handleMarkerClick = useCallback(
    (markerKey) => {
      setActiveMarkerKey?.(markerKey);
    },
    [setActiveMarkerKey],
  );

  const handleTogglePinRadius = useCallback(
    (markerKey) => toggleMarkerCoverage("radius", markerKey),
    [toggleMarkerCoverage],
  );

  const handleTogglePinPolygon = useCallback(
    (markerKey) => toggleMarkerCoverage("polygon", markerKey),
    [toggleMarkerCoverage],
  );

  /** When user edits a branch, show existing Dubai polygon/radius on the map immediately. */
  useEffect(() => {
    if (!editingBranchKey || !editStep) return;
    const key = String(editingBranchKey);
    const parsed = parseMarkerKey(key);
    if (!parsed || String(parsed.competitorId) !== competitorId) return;
    const loc = Array.isArray(draftLocations) ? draftLocations[parsed.idx] : null;
    if (!loc || String(loc?.emirate || "").trim() !== "Dubai") return;

    if (branchHasPolygonCoverage(loc)) {
      setPolygonByMarkerKey((prev) => {
        if (prev[key] === "hide") return prev;
        return prev[key] === "show" ? prev : { ...prev, [key]: "show" };
      });
    }
    if (branchHasRadiusCoverage(loc)) {
      setRadiusByMarkerKey((prev) => {
        if (prev[key] === "hide") return prev;
        return prev[key] === "show" ? prev : { ...prev, [key]: "show" };
      });
    }
  }, [editingBranchKey, editStep, competitorId, draftLocations]);

  const hideEditingBranchCoverage = useCallback(
    (type) => {
      const key = String(editingBranchKey || "");
      if (!key) return;
      const hidePolygon = type === "polygon" || type === "all";
      const hideRadius = type === "radius" || type === "all";
      if (hidePolygon) {
        setPolygonByMarkerKey((prev) => ({ ...prev, [key]: "hide" }));
        if (coverageEditMode === "polygon") setCoverageEditMode?.(null);
      }
      if (hideRadius) {
        setRadiusByMarkerKey((prev) => ({ ...prev, [key]: "hide" }));
        if (coverageEditMode === "radius") setCoverageEditMode?.(null);
      }
    },
    [editingBranchKey, coverageEditMode, setCoverageEditMode],
  );

  const dropCircleForMarker = useCallback((markerKey) => {
    const existing = coverageRef.current.circlesByMarkerKey.get(markerKey);
    if (existing) {
      existing.setMap(null);
      coverageRef.current.circlesByMarkerKey.delete(markerKey);
    }
  }, []);

  const dropPolygonForMarker = useCallback((markerKey) => {
    const existing = coverageRef.current.polygonsByMarkerKey.get(markerKey);
    if (existing) {
      existing.setMap(null);
      coverageRef.current.polygonsByMarkerKey.delete(markerKey);
    }
  }, []);

  const ensureCircleForMarker = useCallback(
    ({ markerKey, loc }) => {
      if (!mapRef.current || typeof google === "undefined") return null;
      if (!markerKey) return null;

      const emirate = String(loc?.emirate || "").trim();
      if (emirate !== "Dubai") {
        dropCircleForMarker(markerKey);
        return null;
      }

      const centerLat = toNum(
        loc?.coverageAreas?.byDistance?.radius?.center?.lat,
      );
      const centerLng = toNum(
        loc?.coverageAreas?.byDistance?.radius?.center?.lng,
      );
      const km = toNum(loc?.coverageAreas?.byDistance?.radius?.km);
      if (centerLat == null || centerLng == null || km == null) {
        dropCircleForMarker(markerKey);
        return null;
      }

      const color = getBranchColor(markerKey);
      const existing = coverageRef.current.circlesByMarkerKey.get(markerKey);
      if (existing) {
        existing.setCenter({ lat: centerLat, lng: centerLng });
        existing.setRadius(km * 1000);
        return existing;
      }

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
    [dropCircleForMarker],
  );

  const ensurePolygonForMarker = useCallback(
    ({ markerKey, loc }) => {
      if (!mapRef.current || typeof google === "undefined") return null;
      if (!markerKey) return null;

      const emirate = String(loc?.emirate || "").trim();
      if (emirate !== "Dubai") {
        dropPolygonForMarker(markerKey);
        return null;
      }

      const poly = loc?.coverageAreas?.byDistance?.polygon;
      const pts = Array.isArray(poly) ? poly : [];
      const path = pts
        .map((p) => ({ lat: toNum(p?.lat), lng: toNum(p?.lng) }))
        .filter((p) => p.lat != null && p.lng != null);
      if (path.length < 3) {
        dropPolygonForMarker(markerKey);
        return null;
      }

      const color = getBranchColor(markerKey);
      const existing = coverageRef.current.polygonsByMarkerKey.get(markerKey);
      if (existing) {
        existing.setPaths(path);
        return existing;
      }

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
    [dropPolygonForMarker],
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!isLoaded || !map || typeof google === "undefined" || !competitorId)
      return;

    coverageRef.current.circlesByMarkerKey.forEach((c) => c.setMap(null));
    coverageRef.current.polygonsByMarkerKey.forEach((p) => p.setMap(null));

    const locs = Array.isArray(draftLocations) ? draftLocations : [];

    locs.forEach((loc, idx) => {
      if (String(loc?.emirate || "").trim() !== "Dubai") return;
      const markerKey = `${competitorId}:${idx}`;
      const isEditingThis =
        editingBranchKey != null && String(editingBranchKey) === markerKey;

      const showPolygon =
        getEffectiveCoverage("polygon", markerKey) &&
        !(isEditingThis && coverageEditMode === "polygon");
      if (showPolygon) {
        const poly = ensurePolygonForMarker({ markerKey, loc });
        if (poly) poly.setMap(map);
      }

      const showRadius =
        getEffectiveCoverage("radius", markerKey) &&
        !(isEditingThis && coverageEditMode === "radius");
      if (showRadius) {
        const circle = ensureCircleForMarker({ markerKey, loc });
        if (circle) circle.setMap(map);
      }
    });
  }, [
    isLoaded,
    draftLocations,
    competitorId,
    showAllRadius,
    showAllPolygon,
    radiusByMarkerKey,
    polygonByMarkerKey,
    editingBranchKey,
    coverageEditMode,
    ensureCircleForMarker,
    ensurePolygonForMarker,
    getEffectiveCoverage,
  ]);

  useEffect(() => {
    if (lastFitCompetitorIdRef.current !== competitorId) {
      lastFitCompetitorIdRef.current = competitorId;
      hasInitialFitRef.current = false;
    }
  }, [competitorId]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !competitorId) return;
    if (editingBranchKey || editStep) return;
    if (hasInitialFitRef.current) return;
    if (locationsWithCoords.length === 0) return;

    fitMapToLocations(mapRef.current, locationsWithCoords);
    hasInitialFitRef.current = true;
  }, [
    isLoaded,
    competitorId,
    locationsWithCoords,
    editingBranchKey,
    editStep,
  ]);

  useEffect(() => {
    return () => {
      coverageRef.current.circlesByMarkerKey.forEach((c) => c.setMap(null));
      coverageRef.current.circlesByMarkerKey.clear();
      coverageRef.current.polygonsByMarkerKey.forEach((p) => p.setMap(null));
      coverageRef.current.polygonsByMarkerKey.clear();
    };
  }, []);

  useEffect(() => {
    setActiveMarkerKey?.(null);
    setRadiusByMarkerKey({});
    setPolygonByMarkerKey({});
    setShowAllRadius(false);
    setShowAllPolygon(false);
  }, [competitorId, setActiveMarkerKey]);

  return {
    mapStates: {
      isLoaded,
      loadError,
      activeMarkerKey,
      showAllRadius,
      showAllPolygon,
      radiusByMarkerKey,
      polygonByMarkerKey,
      displayCompetitor,
      competitor,
      competitorId,
      locationsWithCoords,
      draftLocations,
    },
    mapHandlers: {
      onMapLoad,
      handleToggleAllRadius,
      handleToggleAllPolygon,
      handleMarkerClick,
      handleTogglePinRadius,
      handleTogglePinPolygon,
      hideEditingBranchCoverage,
      setActiveMarkerKey,
    },
  };
};
