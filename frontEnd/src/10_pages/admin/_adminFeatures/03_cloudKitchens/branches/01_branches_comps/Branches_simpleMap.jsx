import { LocationIcon } from "./Branches_icons/_branches_icons.index.js";
import "../_styles/branches_simpleMap.css";

// Minimal "map" panel: a grid-lined background with a pin at a position
// derived from the branch's lat/lng. NOT a real map — a real Google Maps
// integration will land in the Coverage plan.
//
// Position logic: we project lat ([-90,90]) and lng ([-180,180]) onto the
// panel's 0–100% coordinates. If coords are missing/invalid, we show a
// centered empty state instead.

const toNum = (v) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const Branches_simpleMap = ({ branch, t }) => {
  const lat = toNum(branch?.location?.coordinates?.lat);
  const lng = toNum(branch?.location?.coordinates?.lng);
  const address = branch?.location?.address ?? "";

  const hasCoords =
    lat !== null && lng !== null && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

  // Project lat/lng to 0–100%. Lat is inverted (higher latitudes go UP on the map).
  const pinX = hasCoords ? ((lng + 180) / 360) * 100 : 50;
  const pinY = hasCoords ? ((90 - lat) / 180) * 100 : 50;

  return (
    <div className="branchesSimpleMap" role="img" aria-label={address || t("simpleMap.aria")}>
      <div className="branchesSimpleMap__grid" aria-hidden="true" />
      {hasCoords ? (
        <div
          className="branchesSimpleMap__pin"
          style={{ left: `${pinX}%`, top: `${pinY}%` }}
          aria-hidden="true"
        >
          <LocationIcon size={28} />
        </div>
      ) : (
        <div className="branchesSimpleMap__empty">
          <LocationIcon size={28} />
          <span>{t("simpleMap.noCoords")}</span>
        </div>
      )}
      {address && (
        <div className="branchesSimpleMap__addressCard">
          <span className="branchesSimpleMap__addressLabel">
            {t("fields.address")}
          </span>
          <span className="branchesSimpleMap__addressValue">{address}</span>
        </div>
      )}
    </div>
  );
};

export default Branches_simpleMap;
