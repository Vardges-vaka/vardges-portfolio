const IS_DEBUG = import.meta.env.VITE_IS_DEBUG_ADMIN_DASHBOARD;
const isDebug = IS_DEBUG === "true";
const googleMaps_apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
/** Cloud Map ID (Map Management) — required for vector map + Advanced Markers. */
const googleMaps_mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";
/**
 * If true, omit `renderingType` so the Cloud Map ID chooses vector vs raster (may log a WebGL fallback on some GPUs).
 * Default is raster-first so the map does not attempt vector/WebGL unless you opt in here.
 */
const googleMaps_useVector = import.meta.env.VITE_GOOGLE_MAPS_USE_VECTOR === "true";

const BRANCHES_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default BRANCHES_isDebug;

export { googleMaps_apiKey, googleMaps_mapId, googleMaps_useVector };
