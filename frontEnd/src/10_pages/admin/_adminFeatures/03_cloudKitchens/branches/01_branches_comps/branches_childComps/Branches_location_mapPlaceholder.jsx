import { MapIcon } from "../Branches_icons/_branches_icons.index.js";
import "../../_styles/branches_location_mapPlaceholder.css";

// Inline "map" view inside the Location section. Rendered when the user
// toggles the section's list/map view switch. Real interactive map is
// deferred to the Coverage/Maps plan.
const Branches_location_mapPlaceholder = ({ t }) => {
  return (
    <div className="branchesLocationMapPlaceholder" role="status">
      <div className="branchesLocationMapPlaceholder__icon" aria-hidden="true">
        <MapIcon size={32} />
      </div>
      <p className="branchesLocationMapPlaceholder__title">
        {t("locationMapPlaceholder.title")}
      </p>
      <p className="branchesLocationMapPlaceholder__description">
        {t("locationMapPlaceholder.description")}
      </p>
    </div>
  );
};

export default Branches_location_mapPlaceholder;
