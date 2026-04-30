import {
  Branches_map_loadError,
  Branches_map_loading,
  Branches_mapView_cntrls,
  Branches_mapView_map,
  Branches_mapView_info,
} from "./branches_childComps/_branches_childComps.index.js";
import { useBranches_mapView } from "../03_branches_hooks/_branches_hooks.index.js";

import "../_styles/branchesMapView.css";

const Branches_mapView = ({
  t,
  branches,
  isLoading,
  error,
  onViewBranch,
  googleMaps_apiKey,
}) => {
  const { states, handlers } = useBranches_mapView({
    branches,
    googleMaps_apiKey,
  });

  if (states.loadError) {
    return <Branches_map_loadError t={t} />;
  }

  if (!states.isLoaded) {
    return <Branches_map_loading t={t} />;
  }

  return (
    <div className="branchesMapView">
      <Branches_mapView_cntrls
        t={t}
        showBranches={states.showBranches}
        handleToggleBranches={handlers.handleToggleBranches}
        branchesTotalCount={(branches ?? []).length}
        mapControlsExpanded={states.mapControlsExpanded}
        handleToggleMapControls={handlers.handleToggleMapControls}
        visibleBranches={states.visibleBranches}
      />

      <Branches_mapView_map
        t={t}
        activeBranchId={states.activeBranchId}
        isLoading={isLoading}
        error={error}
        withCoords={states.withCoords}
        onLoad={handlers.onMapLoad}
        visibleBranches={states.visibleBranches}
        setActiveBranchId={handlers.setActiveBranchId}
        setInfoPanelBranchId={handlers.setInfoPanelBranchId}
        onViewBranch={onViewBranch}
      />

      <Branches_mapView_info
        t={t}
        branches={branches}
        mapSummaryPeriod={states.mapSummaryPeriod}
        onSummaryPeriodChange={handlers.setMapSummaryPeriod}
        infoPanelBranchId={states.infoPanelBranchId}
        onClearBranchInfo={handlers.handleClearMapInfoBranch}
        mapInfoExpanded={states.mapInfoExpanded}
        onToggleMapInfo={handlers.handleToggleMapInfo}
      />
    </div>
  );
};

export default Branches_mapView;
