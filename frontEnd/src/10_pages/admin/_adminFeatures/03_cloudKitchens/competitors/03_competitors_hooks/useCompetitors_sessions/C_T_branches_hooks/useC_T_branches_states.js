import { useEffect, useState } from "react";
import { cloneLocations } from "../../../02_competitors_helpers/competitors_branches_helpers.js";

export const useC_T_branches_states = (selectedCompetitor) => {
  const [draftLocations, setDraftLocations] = useState([]);
  const [activeMarkerKey, setActiveMarkerKey] = useState(null);
  const [editingBranchKey, setEditingBranchKey] = useState(null);
  /** @type {null | 'map' | 'details'} */
  const [editStep, setEditStep] = useState(null);
  /** @type {null | 'polygon' | 'radius'} */
  const [coverageEditMode, setCoverageEditMode] = useState(null);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [removeMarkerKey, setRemoveMarkerKey] = useState(null);

  const competitorId =
    selectedCompetitor?._id != null ? String(selectedCompetitor._id) : "";

  // Sync draft only when the selected competitor changes — not when `locations`
  // gets a new array reference (would reset the form on every keystroke during edit).
  useEffect(() => {
    const locs = Array.isArray(selectedCompetitor?.branches?.locations)
      ? selectedCompetitor.branches.locations
      : [];
    setDraftLocations(cloneLocations(locs));
    setActiveMarkerKey(null);
    setEditingBranchKey(null);
    setEditStep(null);
    setCoverageEditMode(null);
    setConfirmRemoveOpen(false);
    setRemoveMarkerKey(null);
  }, [competitorId]);

  return {
    C_T_br_states: {
      draftLocations,
      activeMarkerKey,
      editingBranchKey,
      editStep,
      coverageEditMode,
      confirmRemoveOpen,
      removeMarkerKey,
      competitorId,
    },
    C_T_br_setters: {
      setDraftLocations,
      setActiveMarkerKey,
      setEditingBranchKey,
      setEditStep,
      setCoverageEditMode,
      setConfirmRemoveOpen,
      setRemoveMarkerKey,
    },
  };
};
