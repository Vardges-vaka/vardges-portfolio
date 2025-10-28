const IS_DEBUG_MapTools = import.meta.env.VITE_IS_DEBUG_MapTools;

const isDebug = IS_DEBUG_MapTools === "true";

const MapTools_isDebug = {
  hooks: isDebug,
  ui: isDebug,
  vld: isDebug,
  hlpr: isDebug,
  memo: isDebug,
  api: isDebug,
};

export default MapTools_isDebug;
