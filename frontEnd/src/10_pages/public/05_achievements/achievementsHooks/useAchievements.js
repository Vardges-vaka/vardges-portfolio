/**
 * useAchievements Hook
 * Main custom hook for Achievements page
 * Handles data fetching and profile-based filtering
 */

import { useEffect } from "react";
import { achievementsData } from "../achievementsConstances/_achievementsConstances.index.js";
import { filterAchievementsByProfile } from "../achievementsHelpers/_achievementsHelpers.index.js";
import { useAchievements_states } from "./useAchievements_states.js";
import { useAchievements_handlers } from "./useAchievements_handlers.js";

export const useAchievements = (currentProfile) => {
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

  // Load and filter achievements data based on profile
  useEffect(() => {
    const loadAchievementsData = async () => {
      setLoading(true);

      // Simulate API call - will be replaced with actual fetch later
      try {
        // Filter data based on profile
        const filtered = filterAchievementsByProfile(
          achievementsData,
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
  }, [currentProfile, setAchievementsContent, setLoading]);

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

