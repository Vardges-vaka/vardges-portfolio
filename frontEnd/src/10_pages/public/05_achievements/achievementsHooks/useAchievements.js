/**
 * useAchievements Hook
 * Main custom hook for Achievements page
 * Handles data fetching and profile-based filtering
 */

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { achievementsData } from "../achievementsConstances/_achievementsConstances.index.js";
import { filterAchievementsByProfile } from "../achievementsHelpers/_achievementsHelpers.index.js";
import { useAchievements_states } from "./useAchievements_states.js";
import { useAchievements_handlers } from "./useAchievements_handlers.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

export const useAchievements = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const {
    achievementsContent,
    setAchievementsContent,
    loading,
    setLoading,
    activeCategory,
    setActiveCategory,
    selectedAchievement,
    setSelectedAchievement,
  } = useAchievements_states();

  const {
    handleCategoryFilter,
    handleAchievementClick,
    handleCloseDetail,
  } = useAchievements_handlers(setActiveCategory, setSelectedAchievement);
  const language = getResolvedLanguage(i18n);

  // Load and filter achievements data based on profile
  useEffect(() => {
    const loadAchievementsData = async () => {
      setLoading(true);

      // Simulate API call - will be replaced with actual fetch later
      try {
        const translatedAchievementsData = getTranslatedData(
          t,
          "achievements",
          achievementsData
        );
        // Filter data based on profile
        const filtered = filterAchievementsByProfile(
          translatedAchievementsData,
          currentProfile
        );
        setAchievementsContent(filtered);
      } catch (error) {
        console.error("Error loading achievements data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievementsData();
  }, [currentProfile, language, setAchievementsContent, setLoading, t]);

  // Filter categories by active category
  const filteredCategories = achievementsContent?.categories.filter((category) => {
    if (!activeCategory) return true;
    return category.id === activeCategory;
  });

  return {
    achievementsContent: {
      ...achievementsContent,
      categories: filteredCategories || [],
    },
    loading,
    activeCategory,
    selectedAchievement,
    handleCategoryFilter,
    handleAchievementClick,
    handleCloseDetail,
  };
};

