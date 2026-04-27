const IS_DEBUG = import.meta.env.VITE_IS_DEBUG_ADMIN_DASHBOARD;
const isDebug = IS_DEBUG === "true";
const googleMaps_apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const BRANCHES_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default BRANCHES_isDebug;

export { googleMaps_apiKey };
