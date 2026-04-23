import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { homeData } from "../homeConstances/_homeConstances.index.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

/**
 * useHome Hook
 * Manages home page data and state
 */
export const useHome = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = getResolvedLanguage(i18n);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      const translatedHomeData = getTranslatedData(t, "home", homeData);

      // Simulate API call - will be replaced with actual fetch later
      // Filter hero content based on profile
      const profileHero =
        translatedHomeData.hero[currentProfile] || translatedHomeData.hero.both;

      setHeroContent(profileHero);
      setLoading(false);
    };

    loadHomeData();
  }, [currentProfile, language, t]);

  return { heroContent, loading };
};
