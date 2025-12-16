import { useEffect } from "react";
import { workData } from "../workConstances/_workConstances.index.js";
import { filterDataByProfile } from "../../../../07_utils/_utils.index.js";
import useWork_states from "./useWork_states.js";
import useWork_handlers from "./useWork_handlers.js";

/**
 * Main Work Hook
 * Orchestrates all work page logic
 */
const useWork = (currentProfile) => {
  const states = useWork_states();
  const { workContent, loading, error, selectedProject, selectedCategory } =
    states;

  const handlers = useWork_handlers(states);
  const {
    loadWorkData,
    handleProjectClick,
    handleCloseProject,
    handleCategoryChange,
  } = handlers;

  useEffect(() => {
    // Filter data based on profile (but don't use it for filtering - just get data)
    const filteredData = filterDataByProfile(workData, currentProfile);
    loadWorkData(filteredData, currentProfile);
  }, [currentProfile]);

  return {
    workContent,
    loading,
    error,
    selectedProject,
    selectedCategory,
    handleProjectClick,
    handleCloseProject,
    handleCategoryChange,
  };
};

export default useWork;
