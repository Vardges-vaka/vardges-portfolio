import {
  DUBAI_CENTER,
  DEFAULT_ZOOM,
} from "../05_branches_cnst/_branches_cnst.index";

const fitMapToBranches = (map, list) => {
  const g = window.google?.maps;
  if (!map || !g) return;

  if (!list.length) {
    map.setCenter(DUBAI_CENTER);
    map.setZoom(DEFAULT_ZOOM);
    return;
  }

  if (list.length === 1) {
    const b = list[0];
    map.setCenter({
      lat: toNum(b.location.coordinates.lat),
      lng: toNum(b.location.coordinates.lng),
    });
    map.setZoom(12);
    return;
  }

  const bounds = new g.LatLngBounds();
  for (const b of list) {
    bounds.extend({
      lat: toNum(b.location.coordinates.lat),
      lng: toNum(b.location.coordinates.lng),
    });
  }
  map.fitBounds(bounds, { top: 56, right: 56, bottom: 56, left: 56 });
  g.event.addListenerOnce(map, "bounds_changed", () => {
    const z = map.getZoom();
    if (z > 14) map.setZoom(14);
    if (z < 8) map.setZoom(8);
  });
};

export default fitMapToBranches;
