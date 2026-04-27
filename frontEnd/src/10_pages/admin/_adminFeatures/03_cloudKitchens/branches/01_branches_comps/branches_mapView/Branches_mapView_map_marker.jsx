import { InfoWindow, Marker } from "@react-google-maps/api";
import { Branches_mapView_mapErrorLoading } from "./_branches_mapView.index.js";
import {
  MAP_OPTIONS,
  DUBAI_CENTER,
  DEFAULT_ZOOM,
  mapContainerStyle,
} from "../../05_branches_cnst/_branches_cnst.index.js";
const Branches_mapView_map_marker = ({
  t,
  id,
  lat,
  lng,
  activeBranchId,
  onClick,
  onCloseClick,
  branch,
  btnOnCLick,
}) => {
  return (
    <Marker key={id} position={{ lat, lng }} onClick={onClick}>
      {activeBranchId === id && (
        <InfoWindow onCloseClick={onCloseClick}>
          <div className="branchesMapView__popup">
            <p className="branchesMapView__popupName">{branch.name}</p>
            {branch.location?.address && (
              <p className="branchesMapView__popupAddr">
                {branch.location.address}
              </p>
            )}
            <button
              type="button"
              className="branchesMapView__popupBtn"
              onClick={btnOnCLick}>
              {t("mapView.openDetails")}
            </button>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default Branches_mapView_map_marker;
