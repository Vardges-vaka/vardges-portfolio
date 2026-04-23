import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { aboutData } from "../aboutConstances/_aboutConstances.index.js";
import { filterDataByProfile } from "../../../../07_utils/_utils.index.js";
import useAbout_states from "./useAbout_states.js";
import useAbout_handlers from "./useAbout_handlers.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

/**
 * Main About Hook
 * Orchestrates all about page logic
 */
const useAbout = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const states = useAbout_states();
  const { aboutContent, loading, error } = states;
  const language = getResolvedLanguage(i18n);

  const handlers = useAbout_handlers(states);
  const { loadAboutData } = handlers;

  useEffect(() => {
    const translatedAboutData = getTranslatedData(t, "about", aboutData);
    // Filter data based on profile (but don't use it for filtering - just get data)
    const filteredData = filterDataByProfile(translatedAboutData, currentProfile);
    loadAboutData(filteredData, currentProfile);
  }, [currentProfile, language, t]);

  return {
    aboutContent,
    loading,
    error,
  };
};

export default useAbout;
