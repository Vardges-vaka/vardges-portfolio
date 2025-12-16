/**
 * Achievements Handlers Hook
 * Event handlers for Achievements page
 */

import { useCallback } from "react";

export const useAchievements_handlers = (
  setActiveCategory,
  setSelectedAchievement
) => {
  /**
   * Handle category filter change
   * @param {string} categoryId - Category ID to filter by (or 'all')
   */
  const handleCategoryFilter = useCallback(
    (categoryId) => {
      setActiveCategory(categoryId === "all" ? null : categoryId);
    },
    [setActiveCategory]
  );

  /**
   * Handle achievement selection
   * @param {object} achievement - Achievement object to display in detail
   */
  const handleAchievementClick = useCallback(
    (achievement) => {
      setSelectedAchievement(achievement);
    },
    [setSelectedAchievement]
  );

  /**
   * Close achievement detail modal
   */
  const handleCloseDetail = useCallback(() => {
    setSelectedAchievement(null);
  }, [setSelectedAchievement]);

  return {
    handleCategoryFilter,
    handleAchievementClick,
    handleCloseDetail,
  };
};

