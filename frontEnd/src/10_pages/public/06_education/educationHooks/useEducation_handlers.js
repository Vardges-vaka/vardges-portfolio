/**
 * Education Handlers Hook
 * Event handlers for Education page
 */

import { useCallback } from "react";

export const useEducation_handlers = (setActiveCategory) => {
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

  return {
    handleCategoryFilter,
  };
};

