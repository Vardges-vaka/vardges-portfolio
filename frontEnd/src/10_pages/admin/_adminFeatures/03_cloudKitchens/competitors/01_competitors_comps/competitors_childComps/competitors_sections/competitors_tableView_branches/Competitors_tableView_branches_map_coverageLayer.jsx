import { useGoogleMap } from "@react-google-maps/api";
import { useC_T_branches_coverageDraw } from "../../../../03_competitors_hooks/useCompetitors_sessions/C_T_branches_hooks/useC_T_branches_coverageDraw.js";
import { getBranchColor } from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_tableView_branches_map_coverageLayer = ({
  mode,
  editingBranchKey,
  draftLocations,
  onCoverageChange,
}) => {
  const map = useGoogleMap();
  const color = getBranchColor(editingBranchKey);

  useC_T_branches_coverageDraw({
    map,
    mode,
    editingBranchKey,
    draftLocations,
    color,
    onCoverageChange,
  });

  return null;
};

export default Competitors_tableView_branches_map_coverageLayer;
