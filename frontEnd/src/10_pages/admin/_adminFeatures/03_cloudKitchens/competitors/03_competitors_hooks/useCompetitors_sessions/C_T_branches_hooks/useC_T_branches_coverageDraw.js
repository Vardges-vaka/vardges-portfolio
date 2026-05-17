import { useEffect, useRef } from "react";
import { toNum } from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import {
  defaultPolygonAround,
  getLocationFromDraft,
} from "../../../02_competitors_helpers/competitors_branches_helpers.js";

/**
 * Editable circle or polygon on the map while editing branch coverage.
 * Does not re-mount when draftLocations updates (only mode / branch key changes).
 */
export const useC_T_branches_coverageDraw = ({
  map,
  mode,
  editingBranchKey,
  draftLocations,
  color,
  onCoverageChange,
}) => {
  const shapeRef = useRef(null);
  const listenersRef = useRef([]);
  const onChangeRef = useRef(onCoverageChange);
  onChangeRef.current = onCoverageChange;

  const draftRef = useRef(draftLocations);
  draftRef.current = draftLocations;

  useEffect(() => {
    if (!map || !mode || !editingBranchKey || typeof google === "undefined") {
      return undefined;
    }

    const loc = getLocationFromDraft(draftRef.current, editingBranchKey);
    if (!loc) return undefined;

    const lat = toNum(loc?.coordinates?.lat);
    const lng = toNum(loc?.coordinates?.lng);
    if (lat == null || lng == null) return undefined;

    listenersRef.current.forEach((l) => google.maps.event.removeListener(l));
    listenersRef.current = [];
    if (shapeRef.current) {
      shapeRef.current.setMap(null);
      shapeRef.current = null;
    }

    const emitRadius = (circle) => {
      const center = circle.getCenter();
      const rM = circle.getRadius();
      if (!center || rM == null) return;
      onChangeRef.current?.({
        center: { lat: center.lat(), lng: center.lng() },
        radiusKm: rM / 1000,
      });
    };

    const emitPolygon = (polygon) => {
      const path = polygon.getPath();
      const pts = [];
      for (let i = 0; i < path.getLength(); i += 1) {
        const p = path.getAt(i);
        pts.push({ lat: p.lat(), lng: p.lng() });
      }
      onChangeRef.current?.({
        center: { lat, lng },
        polygon: pts,
      });
    };

    if (mode === "radius") {
      const existingKm = toNum(loc?.coverageAreas?.byDistance?.radius?.km);
      const centerLat =
        toNum(loc?.coverageAreas?.byDistance?.radius?.center?.lat) ?? lat;
      const centerLng =
        toNum(loc?.coverageAreas?.byDistance?.radius?.center?.lng) ?? lng;
      const circle = new google.maps.Circle({
        map,
        center: { lat: centerLat, lng: centerLng },
        radius: (existingKm ?? 3) * 1000,
        strokeColor: color,
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.18,
        editable: true,
        draggable: true,
      });
      shapeRef.current = circle;
      listenersRef.current.push(
        google.maps.event.addListener(circle, "radius_changed", () =>
          emitRadius(circle),
        ),
        google.maps.event.addListener(circle, "center_changed", () =>
          emitRadius(circle),
        ),
      );
      emitRadius(circle);
    }

    if (mode === "polygon") {
      const existing = loc?.coverageAreas?.byDistance?.polygon;
      let path = (Array.isArray(existing) ? existing : [])
        .map((p) => ({ lat: toNum(p?.lat), lng: toNum(p?.lng) }))
        .filter((p) => p.lat != null && p.lng != null);
      if (path.length < 3) {
        path = defaultPolygonAround(lat, lng, 3);
      }
      const polygon = new google.maps.Polygon({
        map,
        paths: path,
        strokeColor: color,
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.18,
        editable: true,
        draggable: true,
      });
      shapeRef.current = polygon;
      const polyPath = polygon.getPath();
      const onPathChange = () => emitPolygon(polygon);
      listenersRef.current.push(
        google.maps.event.addListener(polyPath, "set_at", onPathChange),
        google.maps.event.addListener(polyPath, "insert_at", onPathChange),
        google.maps.event.addListener(polyPath, "remove_at", onPathChange),
        google.maps.event.addListener(polygon, "dragend", onPathChange),
      );
      emitPolygon(polygon);
    }

    return () => {
      listenersRef.current.forEach((l) => google.maps.event.removeListener(l));
      listenersRef.current = [];
      if (shapeRef.current) {
        shapeRef.current.setMap(null);
        shapeRef.current = null;
      }
    };
  }, [map, mode, editingBranchKey, color]);
};
