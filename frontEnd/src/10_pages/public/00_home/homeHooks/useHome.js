import { useState, useEffect } from "react";
import { homeData } from "../homeConstances/_homeConstances.index.js";

/**
 * useHome Hook
 * Manages home page data and state
 */
export const useHome = (currentProfile) => {
  console.log("currentProfile", currentProfile);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);

      // Simulate API call - will be replaced with actual fetch later
      // Filter hero content based on profile
      const profileHero = homeData.hero[currentProfile] || homeData.hero.both;

      setHeroContent(profileHero);
      setLoading(false);
    };

    loadHomeData();
  }, [currentProfile]);

  return { heroContent, loading };
};
