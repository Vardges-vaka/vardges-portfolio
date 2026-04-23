import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { workData } from "../workConstances/_workConstances.index.js";
import { filterDataByProfile } from "../../../../07_utils/_utils.index.js";
import useWork_states from "./useWork_states.js";
import useWork_handlers from "./useWork_handlers.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

/**
 * Main Work Hook
 * Orchestrates all work page logic
 */
const useWork = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const states = useWork_states();
  const { workContent, loading, error, selectedProject, selectedCategory } =
    states;
  const language = getResolvedLanguage(i18n);

  const handlers = useWork_handlers(states);
  const {
    loadWorkData,
    handleProjectClick,
    handleCloseProject,
    handleCategoryChange,
  } = handlers;

  useEffect(() => {
    const translatedWorkData = getTranslatedData(t, "work", workData);
    // Filter data based on profile (but don't use it for filtering - just get data)
    const filteredData = filterDataByProfile(translatedWorkData, currentProfile);
    loadWorkData(filteredData, currentProfile);
  }, [currentProfile, language, t]);

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
