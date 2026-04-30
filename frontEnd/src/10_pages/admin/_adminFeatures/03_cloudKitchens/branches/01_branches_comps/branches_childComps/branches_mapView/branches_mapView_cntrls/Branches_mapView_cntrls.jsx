import {
  Branches_mapView_cntrls_header,
  Branches_mapView_cntrls_children,
} from "./_branches_mapView_cntrls.index.js";

import "../../../../_styles/branches_mapView_cntrls.css";

const Branches_mapView_cntrls = ({
  t,
  showBranches,
  handleToggleBranches,
  branchesTotalCount,
  mapControlsExpanded,
  handleToggleMapControls,
  visibleBranches,
}) => {
  return (
    <Branches_mapView_cntrls_header
      t={t}
      showBranches={showBranches}
      handleToggleBranches={handleToggleBranches}
      branchesTotalCount={branchesTotalCount}
      mapControlsExpanded={mapControlsExpanded}
      handleToggleMapControls={handleToggleMapControls}>
      <Branches_mapView_cntrls_children
        t={t}
        mapControlsExpanded={mapControlsExpanded}
        visibleBranches={visibleBranches}
      />
    </Branches_mapView_cntrls_header>
  );
};

export default Branches_mapView_cntrls;
