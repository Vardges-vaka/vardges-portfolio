/**
 * Achievements States Hook
 * Manages state for Achievements page
 */

import { useState } from "react";

export const useAchievements_states = () => {
  const [achievementsContent, setAchievementsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return {
    achievementsContent,
    setAchievementsContent,
    loading,
    setLoading,
    activeCategory,
    setActiveCategory,
    selectedAchievement,
    setSelectedAchievement,
  };
};

