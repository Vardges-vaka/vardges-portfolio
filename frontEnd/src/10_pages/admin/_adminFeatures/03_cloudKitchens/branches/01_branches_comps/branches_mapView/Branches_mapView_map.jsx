import { GoogleMap } from "@react-google-maps/api";
import {
  Branches_mapView_mapErrorLoading,
  Branches_mapView_map_marker,
} from "./_branches_mapView.index.js";
import {
  MAP_OPTIONS,
  DUBAI_CENTER,
  DEFAULT_ZOOM,
  mapContainerStyle,
} from "../../05_branches_cnst/_branches_cnst.index.js";
import { toNum } from "../../02_branches_helpers/_branches_helpers.index.js";
const Branches_mapView_map = ({
  t,
  isLoading,
  error,
  withCoords,
  onMapLoad,
  visibleBranches,

  onViewBranch,
  setActiveBranchId,
  setInfoPanelBranchId,
  activeBranchId,
}) => {
  return (
    <div className="branchesMapView__mapShell">
      <Branches_mapView_mapErrorLoading
        isLoading={isLoading}
        error={error}
        t={t}
        withCoords={withCoords}
      />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={DUBAI_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={onMapLoad}
        options={MAP_OPTIONS}>
        {visibleBranches?.map((b) => {
          const lat = toNum(b.location.coordinates.lat);
          const lng = toNum(b.location.coordinates.lng);
          const id = String(b._id);
          return (
            <Branches_mapView_map_marker
              key={id}
              t={t}
              id={id}
              lat={lat}
              lng={lng}
              activeBranchId={activeBranchId}
              onClick={() => setActiveBranchId(id)}
              onCloseClick={() => setActiveBranchId(null)}
              branch={b}
              btnOnClick={() => {
                onViewBranch(b._id);
                setActiveBranchId(null);
              }}
              onViewBranchInfo={() => {
                setInfoPanelBranchId(id);
                setActiveBranchId(null);
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Branches_mapView_map;
