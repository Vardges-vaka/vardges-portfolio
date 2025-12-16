import { useEffect } from "react";
import { aboutData } from "../aboutConstances/_aboutConstances.index.js";
import { filterDataByProfile } from "../../../../07_utils/_utils.index.js";
import useAbout_states from "./useAbout_states.js";
import useAbout_handlers from "./useAbout_handlers.js";

/**
 * Main About Hook
 * Orchestrates all about page logic
 */
const useAbout = (currentProfile) => {
  const states = useAbout_states();
  const { aboutContent, loading, error } = states;

  const handlers = useAbout_handlers(states);
  const { loadAboutData } = handlers;

  useEffect(() => {
    // Filter data based on profile (but don't use it for filtering - just get data)
    const filteredData = filterDataByProfile(aboutData, currentProfile);
    loadAboutData(filteredData, currentProfile);
  }, [currentProfile]);

  return {
    aboutContent,
    loading,
    error,
  };
};

export default useAbout;
