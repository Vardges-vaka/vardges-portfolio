import { toNum } from "./competitors_map_helpers.js";

export const BRANCH_COVERAGE_COLORS = [
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
  "#6d4c41",
];

/** @returns {{ competitorId: string, idx: number } | null} */
export const parseMarkerKey = (markerKey) => {
  const raw = String(markerKey || "");
  const sep = raw.indexOf(":");
  if (sep < 0) return null;
  const competitorId = raw.slice(0, sep);
  const idx = Number(raw.slice(sep + 1));
  if (!competitorId || !Number.isFinite(idx) || idx < 0) return null;
  return { competitorId, idx };
};

export const getBranchColor = (markerKey) => {
  const parsed = parseMarkerKey(markerKey);
  const idx = parsed?.idx ?? 0;
  return BRANCH_COVERAGE_COLORS[idx % BRANCH_COVERAGE_COLORS.length];
};

export const cloneLocation = (loc) => {
  if (!loc || typeof loc !== "object") return null;
  return JSON.parse(JSON.stringify(loc));
};

export const cloneLocations = (locs) =>
  (Array.isArray(locs) ? locs : []).map((l) => cloneLocation(l)).filter(Boolean);

/** Build a default hex polygon around a point (km). */
export const defaultPolygonAround = (lat, lng, km = 3, points = 12) => {
  const latN = toNum(lat);
  const lngN = toNum(lng);
  const kmN = toNum(km);
  if (latN == null || lngN == null || kmN == null) return [];
  const latRad = (latN * Math.PI) / 180;
  const dLat = kmN / 111;
  const dLng = kmN / (111 * Math.cos(latRad) || 1);
  const out = [];
  for (let i = 0; i < points; i += 1) {
    const a = (2 * Math.PI * i) / points;
    out.push({
      lat: latN + dLat * Math.sin(a),
      lng: lngN + dLng * Math.cos(a),
    });
  }
  return out;
};

export const buildDraftCompetitor = (competitor, draftLocations) => {
  if (!competitor) return null;
  const totalQnt = draftLocations.length;
  return {
    ...competitor,
    branches: {
      ...(competitor.branches && typeof competitor.branches === "object"
        ? competitor.branches
        : {}),
      totalQnt,
      locations: draftLocations,
    },
  };
};

export const getLocationFromDraft = (draftLocations, markerKey) => {
  const parsed = parseMarkerKey(markerKey);
  if (!parsed) return null;
  return draftLocations[parsed.idx] ?? null;
};

export const branchAddressLine = (loc) =>
  [loc?.emirate, loc?.city, loc?.address].filter(Boolean).join(" • ") || "—";

/** Ensures a draft row matches `branches.locations[]` in Competitor.js */
export const normalizeBranchLocation = (loc) => {
  const base = cloneLocation(loc) || {};
  const lat = toNum(base?.coordinates?.lat);
  const lng = toNum(base?.coordinates?.lng);
  const center = {
    lat: toNum(base?.coverageAreas?.byDistance?.radius?.center?.lat) ?? lat,
    lng: toNum(base?.coverageAreas?.byDistance?.radius?.center?.lng) ?? lng,
  };
  return {
    country: base.country ?? "United Arab Emirates",
    hasDineIn: Boolean(base.hasDineIn),
    hasOwnDelivery: Boolean(base.hasOwnDelivery),
    emirate: base.emirate ?? "",
    state: base.state ?? "",
    city: base.city ?? "",
    address: base.address ?? "",
    coordinates: lat != null && lng != null ? { lat, lng } : base.coordinates,
    coverageAreas: {
      byDistance: {
        polygon: Array.isArray(base?.coverageAreas?.byDistance?.polygon)
          ? base.coverageAreas.byDistance.polygon
          : [],
        radius: {
          km: base?.coverageAreas?.byDistance?.radius?.km ?? null,
          center,
        },
      },
      byDriveTime: {
        polygon: Array.isArray(base?.coverageAreas?.byDriveTime?.polygon)
          ? base.coverageAreas.byDriveTime.polygon
          : [],
        radius: {
          minutes: base?.coverageAreas?.byDriveTime?.radius?.minutes ?? null,
          center: base?.coverageAreas?.byDriveTime?.radius?.center ?? center,
        },
      },
    },
    links: Array.isArray(base.links) ? base.links : [],
    platforms: Array.isArray(base.platforms) ? base.platforms : [],
    promos: Array.isArray(base.promos) ? base.promos : [],
  };
};

export const branchHasValidCoordinates = (loc) => {
  const lat = toNum(loc?.coordinates?.lat);
  const lng = toNum(loc?.coordinates?.lng);
  return lat != null && lng != null;
};

export const branchCoverageSummary = (loc) => {
  const km = toNum(loc?.coverageAreas?.byDistance?.radius?.km);
  const poly = Array.isArray(loc?.coverageAreas?.byDistance?.polygon)
    ? loc.coverageAreas.byDistance.polygon
    : [];
  const pts = poly.filter((p) => toNum(p?.lat) != null && toNum(p?.lng) != null);
  return { km, polygonPoints: pts.length };
};

export const branchHasPolygonCoverage = (loc) =>
  branchCoverageSummary(loc).polygonPoints >= 3;

export const branchHasRadiusCoverage = (loc) =>
  branchCoverageSummary(loc).km != null;

/** Whether a pin’s polygon/radius overlay is visible (per-pin override or “all” toggles). */
export const getEffectiveBranchCoverageVisible = (
  type,
  markerKey,
  { polygonByMarkerKey = {}, radiusByMarkerKey = {}, showAllPolygon = false, showAllRadius = false } = {},
) => {
  const key = String(markerKey || "");
  if (!key) return false;
  const ov =
    type === "radius" ? radiusByMarkerKey[key] : polygonByMarkerKey[key];
  if (ov === "show") return true;
  if (ov === "hide") return false;
  return type === "radius" ? showAllRadius : showAllPolygon;
};
