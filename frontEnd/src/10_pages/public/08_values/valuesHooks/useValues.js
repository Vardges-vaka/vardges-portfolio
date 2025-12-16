import { useState, useEffect } from "react";
import { valuesData } from "../valuesConstances/_valuesConstances.index.js";
import { filterValuesByProfile } from "../valuesHelpers/_valuesHelpers.index.js";

export const useValues = (currentProfile) => {
  const [valuesContent, setValuesContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValuesData = async () => {
      setLoading(true);
      try {
        const filtered = filterValuesByProfile(valuesData, currentProfile);
        setValuesContent(filtered);
      } catch (error) {
        console.error("Error loading values data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadValuesData();
  }, [currentProfile]);

  return { valuesContent, loading };
};

