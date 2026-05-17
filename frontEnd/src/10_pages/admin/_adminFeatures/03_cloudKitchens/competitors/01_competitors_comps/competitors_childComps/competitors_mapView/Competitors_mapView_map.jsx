import { useMemo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "../../../_styles/competitors_mapView_map.css";
import {
  getBranchesMapOptions,
  DUBAI_CENTER,
  DEFAULT_ZOOM,
  mapContainerStyle,
} from "../../../../branches/05_branches_cnst/_branches_cnst.index.js";
import Competitors_mapView_map_marker from "./competitors_mapView_map/Competitors_mapView_map_marker.jsx";
import {
  getCompetitorMapSummary,
  toNum,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_mapView_map = ({
  t,
  competitors,
  onLoad,
  activeMarkerKey,
  onMarkerClick,
  setActiveMarkerKey,
  setInfoPanelCompetitorId,
  onTogglePinRadius,
  onTogglePinPolygon,
  showAllRadius,
  showAllPolygon,
  radiusByMarkerKey,
  polygonByMarkerKey,
}) => {
  const mapOptions = useMemo(() => getBranchesMapOptions(), []);

  return (
    <div className="Competitors_mapView_mapShell">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={DUBAI_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={onLoad}
        options={mapOptions}>
        {(competitors ?? []).flatMap((c) => {
          const s = getCompetitorMapSummary(c);
          const competitorId = s.id;
          if (!competitorId) return [];

          const locs = Array.isArray(c?.branches?.locations)
            ? c.branches.locations
            : [];

          const dubaiLocs = locs.filter(
            (l) => String(l?.emirate || "").trim() === "Dubai",
          );

          return dubaiLocs.map((loc, idx) => {
            const lat = toNum(loc?.coordinates?.lat);
            const lng = toNum(loc?.coordinates?.lng);
            if (lat == null || lng == null) return null;

            const markerKey = `${competitorId}:${idx}`;
            const branchLine = [loc?.emirate, loc?.city, loc?.address]
              .filter(Boolean)
              .join(" · ");

            const radiusOv = radiusByMarkerKey?.[String(markerKey)];
            const polyOv = polygonByMarkerKey?.[String(markerKey)];

            const isRadiusOn =
              radiusOv === "show"
                ? true
                : radiusOv === "hide"
                  ? false
                  : !!showAllRadius;
            const isPolygonOn =
              polyOv === "show"
                ? true
                : polyOv === "hide"
                  ? false
                  : !!showAllPolygon;

            return (
              <Competitors_mapView_map_marker
                key={markerKey}
                t={t}
                markerKey={markerKey}
                competitorId={competitorId}
                lat={lat}
                lng={lng}
                competitor={c}
                summary={{
                  ...s,
                  addressLine: branchLine || s.addressLine,
                }}
                activeMarkerKey={activeMarkerKey}
                onClick={() =>
                  onMarkerClick
                    ? onMarkerClick(markerKey, competitorId)
                    : setActiveMarkerKey(markerKey)
                }
                onCloseClick={() => setActiveMarkerKey(null)}
                onViewCompetitorInfo={() => {
                  setInfoPanelCompetitorId(competitorId);
                  setActiveMarkerKey(null);
                }}
                onToggleRadius={() => onTogglePinRadius?.(markerKey)}
                onTogglePolygon={() => onTogglePinPolygon?.(markerKey)}
                isRadiusOn={isRadiusOn}
                isPolygonOn={isPolygonOn}
              />
            );
          });
        }).filter(Boolean)}
      </GoogleMap>
    </div>
  );
};

export default Competitors_mapView_map;
