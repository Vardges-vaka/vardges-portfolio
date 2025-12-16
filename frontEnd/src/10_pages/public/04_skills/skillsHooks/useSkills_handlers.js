/**
 * Skills Handlers Hook
 * Event handlers for Skills page
 */

import { useCallback } from "react";

export const useSkills_handlers = (setActiveCategory, setActiveSubcategory) => {
  /**
   * Handle category change
   * @param {string} categoryId - Category ID to activate
   */
  const handleCategoryChange = useCallback(
    (categoryId) => {
      setActiveCategory(categoryId);
      setActiveSubcategory(null); // Reset subcategory when category changes
    },
    [setActiveCategory, setActiveSubcategory]
  );

  /**
   * Handle subcategory change
   * @param {string} subcategoryId - Subcategory ID to activate
   */
  const handleSubcategoryChange = useCallback(
    (subcategoryId) => {
      setActiveSubcategory(subcategoryId);
    },
    [setActiveSubcategory]
  );

  return {
    handleCategoryChange,
    handleSubcategoryChange,
  };
};
