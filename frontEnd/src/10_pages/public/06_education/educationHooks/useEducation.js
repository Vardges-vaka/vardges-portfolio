/**
 * useEducation Hook
 * Main custom hook for Education page
 * Handles data fetching and profile-based filtering
 */

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { educationData } from "../educationConstances/_educationConstances.index.js";
import {
  filterEducationByProfile,
  sortCategoriesByOrder,
} from "../educationHelpers/_educationHelpers.index.js";
import { useEducation_states } from "./useEducation_states.js";
import { useEducation_handlers } from "./useEducation_handlers.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

export const useEducation = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const {
    educationContent,
    setEducationContent,
    loading,
    setLoading,
    activeCategory,
    setActiveCategory,
  } = useEducation_states();

  const { handleCategoryFilter } = useEducation_handlers(setActiveCategory);
  const language = getResolvedLanguage(i18n);

  // Load and filter education data based on profile
  useEffect(() => {
    const loadEducationData = async () => {
      setLoading(true);

      // Simulate API call - will be replaced with actual fetch later
      try {
        const translatedEducationData = getTranslatedData(
          t,
          "education",
          educationData
        );
        // Filter data based on profile
        const filtered = filterEducationByProfile(
          translatedEducationData,
          currentProfile
        );

        // Sort categories
        const sorted = sortCategoriesByOrder(filtered.categories);

        setEducationContent({ categories: sorted });
      } catch (error) {
        console.error("Error loading education data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEducationData();
  }, [currentProfile, language, setEducationContent, setLoading, t]);

  // Filter categories by active category
  const filteredCategories = educationContent?.categories.filter((category) => {
    if (!activeCategory) return true;
    return category.id === activeCategory;
  });

  return {
    educationContent: {
      ...educationContent,
      categories: filteredCategories || [],
    },
    loading,
    activeCategory,
    handleCategoryFilter,
  };
};

