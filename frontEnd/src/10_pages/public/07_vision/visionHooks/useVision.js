/**
 * useVision Hook
 */

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { visionData } from "../visionConstances/_visionConstances.index.js";
import { filterVisionByProfile } from "../visionHelpers/_visionHelpers.index.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

export const useVision = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const [visionContent, setVisionContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = getResolvedLanguage(i18n);

  useEffect(() => {
    const loadVisionData = async () => {
      setLoading(true);
      try {
        const translatedVisionData = getTranslatedData(t, "vision", visionData);
        const filtered = filterVisionByProfile(
          translatedVisionData,
          currentProfile
        );
        setVisionContent(filtered);
      } catch (error) {
        console.error("Error loading vision data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVisionData();
  }, [currentProfile, language, t]);

  return { visionContent, loading };
};
