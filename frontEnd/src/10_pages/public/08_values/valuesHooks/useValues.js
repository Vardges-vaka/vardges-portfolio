import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { valuesData } from "../valuesConstances/_valuesConstances.index.js";
import { filterValuesByProfile } from "../valuesHelpers/_valuesHelpers.index.js";
import {
  getResolvedLanguage,
  getTranslatedData,
} from "../../publicHelpers/publicI18n.js";

export const useValues = (currentProfile) => {
  const { t, i18n } = useTranslation("tempContent");
  const [valuesContent, setValuesContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = getResolvedLanguage(i18n);

  useEffect(() => {
    const loadValuesData = async () => {
      setLoading(true);
      try {
        const translatedValuesData = getTranslatedData(t, "values", valuesData);
        const filtered = filterValuesByProfile(
          translatedValuesData,
          currentProfile
        );
        setValuesContent(filtered);
      } catch (error) {
        console.error("Error loading values data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadValuesData();
  }, [currentProfile, language, t]);

  return { valuesContent, loading };
};

