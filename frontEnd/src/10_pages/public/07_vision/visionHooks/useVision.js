/**
 * useVision Hook
 */

import { useState, useEffect } from "react";
import { visionData } from "../visionConstances/_visionConstances.index.js";
import { filterVisionByProfile } from "../visionHelpers/_visionHelpers.index.js";

export const useVision = (currentProfile) => {
  const [visionContent, setVisionContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisionData = async () => {
      setLoading(true);
      try {
        const filtered = filterVisionByProfile(visionData, currentProfile);
        setVisionContent(filtered);
      } catch (error) {
        console.error("Error loading vision data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVisionData();
  }, [currentProfile]);

  return { visionContent, loading };
};
