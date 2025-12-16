/**
 * useSkills Hook
 * Main custom hook for Skills page
 * Handles data fetching and profile-based filtering
 */

import { useEffect } from "react";
import { skillsData } from "../skillsConstances/_skillsConstances.index.js";
import { filterSkillsByProfile } from "../skillsHelpers/_skillsHelpers.index.js";
import { useSkills_states } from "./useSkills_states.js";
import { useSkills_handlers } from "./useSkills_handlers.js";

export const useSkills = (currentProfile) => {
  const {
    skillsContent,
    setSkillsContent,
    loading,
    setLoading,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
  } = useSkills_states();

  const { handleCategoryChange, handleSubcategoryChange } = useSkills_handlers(
    setActiveCategory,
    setActiveSubcategory
  );

  // Load and filter skills data based on profile
  useEffect(() => {
    const loadSkillsData = async () => {
      setLoading(true);

      // Simulate API call - will be replaced with actual fetch later
      try {
        // Filter data based on profile
        const filtered = filterSkillsByProfile(skillsData, currentProfile);
        setSkillsContent(filtered);

        // Set first available category as active if current is not available
        const availableCategories = Object.keys(filtered.categories);
        if (availableCategories.length > 0) {
          if (!availableCategories.includes(activeCategory)) {
            setActiveCategory(availableCategories[0]);
          }
        }
      } catch (error) {
        console.error("Error loading skills data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkillsData();
  }, [currentProfile]); // Only re-run when profile changes

  return {
    skillsContent,
    loading,
    activeCategory,
    activeSubcategory,
    handleCategoryChange,
    handleSubcategoryChange,
  };
};
