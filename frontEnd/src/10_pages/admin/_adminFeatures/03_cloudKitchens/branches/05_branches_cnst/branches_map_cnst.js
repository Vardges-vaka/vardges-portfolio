import { googleMaps_mapId, googleMaps_useVector } from "../branches.config.js";

const DUBAI_CENTER = { lat: 25.2048, lng: 55.2708 };
const DEFAULT_ZOOM = 10;
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// console.log("googleMaps_mapId", googleMaps_mapId);

const MAP_OPTIONS = {
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  // Wheel zoom only with Ctrl+scroll; plain scroll can pass through / avoid accidental zoom.
  gestureHandling: "cooperative",
  // Vector map profile from Google Cloud → Map Management (same project as API key).
  ...(googleMaps_mapId.trim() ? { mapId: googleMaps_mapId.trim() } : {}),
};

/**
 * Call after the Maps script is loaded. With a Cloud `mapId`, Google otherwise follows the ID’s vector/raster
 * setting (often vector → WebGL attempt → “Falling back to Raster” on unsupported GPUs). Setting
 * `renderingType: "RASTER"` at create time skips that attempt; constants may be string literals per Maps API docs.
 */
function getBranchesMapOptions() {
  const opts = { ...MAP_OPTIONS };
  if (!googleMaps_useVector) {
    opts.renderingType =
      typeof google !== "undefined" && google.maps?.RenderingType
        ? google.maps.RenderingType.RASTER
        : "RASTER";
  }
  return opts;
}

export { DUBAI_CENTER, DEFAULT_ZOOM, mapContainerStyle, MAP_OPTIONS, getBranchesMapOptions };
