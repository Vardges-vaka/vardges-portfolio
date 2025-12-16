/**
 * Skills States Hook
 * Manages state for Skills page
 */

import { useState } from "react";

export const useSkills_states = () => {
  const [skillsContent, setSkillsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("technical");
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  return {
    skillsContent,
    setSkillsContent,
    loading,
    setLoading,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
  };
};
