/** Shown when `VITE_GOOGLE_MAPS_API_KEY` is not set — avoids calling map loader hooks with an empty key. */
import "../../_styles/branches_mapViewNoKey.css";

const Branches_mapViewNoKey = ({ t }) => (
  <div className="branchesMapView">
    <div className="branchesMapView__fallback" role="status">
      <p className="branchesMapView__fallbackTitle">
        {t("mapView.noApiKeyTitle")}
      </p>
      <p className="branchesMapView__fallbackText">{t("mapView.noApiKey")}</p>
    </div>
  </div>
);

export default Branches_mapViewNoKey;
