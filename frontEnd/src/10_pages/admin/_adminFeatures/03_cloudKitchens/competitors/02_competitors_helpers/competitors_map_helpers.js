import { getCuisineDisplayLabelForRowItem } from "./competitors_cuisineTags_helpers.js";

const DUBAI_EMIRATE = "Dubai";

export const toNum = (v) => {
  if (v == null) return null;
  const n = typeof v === "number" ? v : Number(String(v).trim());
  return Number.isFinite(n) ? n : null;
};

export const getCompetitorPinLocation = (competitor) => {
  const locations = competitor?.branches?.locations;
  if (!Array.isArray(locations) || locations.length === 0) return null;

  // Prefer a Dubai point so the map is “Dubai + competitors”.
  const dubaiLoc = locations.find(
    (l) => String(l?.emirate || "").trim() === DUBAI_EMIRATE,
  );
  return dubaiLoc || locations[0] || null;
};

export const competitorHasCoords = (competitor) => {
  const loc = getCompetitorPinLocation(competitor);
  const lat = toNum(loc?.coordinates?.lat);
  const lng = toNum(loc?.coordinates?.lng);
  return lat != null && lng != null;
};

export const fitMapToCompetitors = (map, competitors) => {
  if (!map || typeof google === "undefined") return;
  const rows = Array.isArray(competitors) ? competitors : [];
  if (rows.length === 0) return;

  const bounds = new google.maps.LatLngBounds();
  let added = 0;

  rows.forEach((c) => {
    const loc = getCompetitorPinLocation(c);
    const lat = toNum(loc?.coordinates?.lat);
    const lng = toNum(loc?.coordinates?.lng);
    if (lat == null || lng == null) return;
    bounds.extend({ lat, lng });
    added += 1;
  });

  if (added === 0) return;

  try {
    map.fitBounds(bounds, 72);
  } catch {
    map.fitBounds(bounds);
  }
};

/**
 * Fits the map to an arbitrary list of points (e.g. every branch of one competitor).
 * Accepts `{ lat, lng }` or `{ coordinates: { lat, lng } }` per entry.
 */
export const fitMapToLocations = (map, locations) => {
  if (!map || typeof google === "undefined") return;
  const list = Array.isArray(locations) ? locations : [];
  if (list.length === 0) return;

  const bounds = new google.maps.LatLngBounds();
  let added = 0;

  list.forEach((item) => {
    const lat = toNum(item?.lat ?? item?.coordinates?.lat);
    const lng = toNum(item?.lng ?? item?.coordinates?.lng);
    if (lat == null || lng == null) return;
    bounds.extend({ lat, lng });
    added += 1;
  });

  if (added === 0) return;

  try {
    map.fitBounds(bounds, 72);
  } catch {
    map.fitBounds(bounds);
  }
};

export const getCompetitorMapSummary = (competitor) => {
  const loc = getCompetitorPinLocation(competitor);
  const addressParts = [
    loc?.emirate,
    loc?.city,
    loc?.address,
  ].filter(Boolean);

  return {
    id: competitor?._id != null ? String(competitor._id) : "",
    name: competitor?.name || "—",
    logo: competitor?.logo || "",
    addressLine: addressParts.length ? addressParts.join(" • ") : "—",
    hasOwnDeliveryDubai: competitor?.hasOwnDeliveryDubai === true,
    branchesTotalQnt:
      typeof competitor?.branches?.totalQnt === "number"
        ? competitor.branches.totalQnt
        : null,
    cuisineTags: Array.isArray(competitor?.cuisineTypes)
      ? competitor.cuisineTypes
          .map((x) => getCuisineDisplayLabelForRowItem(x))
          .filter(Boolean)
          .slice(0, 4)
      : [],
    menuName: competitor?.menu?.name || null,
    lat: toNum(loc?.coordinates?.lat),
    lng: toNum(loc?.coordinates?.lng),
  };
};

