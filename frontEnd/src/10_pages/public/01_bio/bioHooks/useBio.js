import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { bioData } from '../bioConstances/_bioConstances.index.js';
import { filterDataByProfile } from '../../../../07_utils/_utils.index.js';
import useBio_states from './useBio_states.js';
import useBio_handlers from './useBio_handlers.js';
import {
  getResolvedLanguage,
  getTranslatedData,
} from '../../publicHelpers/publicI18n.js';

/**
 * Main Bio Hook
 * Orchestrates all bio page logic
 * @param {string} currentProfile - Current profile
 * @returns {Object} - Bio content and state
 */
const useBio = (currentProfile) => {
  const { t, i18n } = useTranslation('tempContent');
  const states = useBio_states();
  const { bioContent, loading, error } = states;
  const language = getResolvedLanguage(i18n);
  
  const handlers = useBio_handlers(states);
  const { loadBioData } = handlers;

  useEffect(() => {
    const translatedBioData = getTranslatedData(t, 'bio', bioData);
    // Filter data based on profile
    const filteredData = filterDataByProfile(translatedBioData, currentProfile);
    loadBioData(filteredData, currentProfile);
  }, [currentProfile, language, t]);

  return {
    bioContent,
    loading,
    error
  };
};

export default useBio;

