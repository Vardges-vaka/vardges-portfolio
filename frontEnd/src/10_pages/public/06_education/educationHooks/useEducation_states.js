/**
 * Education States Hook
 * Manages state for Education page
 */

import { useState } from "react";

export const useEducation_states = () => {
  const [educationContent, setEducationContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  return {
    educationContent,
    setEducationContent,
    loading,
    setLoading,
    activeCategory,
    setActiveCategory,
  };
};

