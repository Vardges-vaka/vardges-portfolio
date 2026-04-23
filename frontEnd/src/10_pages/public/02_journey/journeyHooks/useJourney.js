import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { journeyData } from '../journeyConstances/_journeyConstances.index.js';
import { filterDataByProfile } from '../../../../07_utils/_utils.index.js';
import { sortRolesByDate, filterRolesByCategory } from '../journeyHelpers/_journeyHelpers.index.js';
import useJourney_states from './useJourney_states.js';
import useJourney_handlers from './useJourney_handlers.js';
import {
  getResolvedLanguage,
  getTranslatedData,
} from '../../publicHelpers/publicI18n.js';

/**
 * Main Journey Hook
 * Orchestrates all journey page logic
 * @param {string} currentProfile - Current profile
 * @returns {Object} - Journey content, state, and handlers
 */
const useJourney = (currentProfile) => {
  const { t, i18n } = useTranslation('tempContent');
  const states = useJourney_states();
  const { 
    journeyContent, 
    loading, 
    error,
    expandedRoleId,
    selectedCategory
  } = states;
  const language = getResolvedLanguage(i18n);
  
  const handlers = useJourney_handlers(states);
  const { 
    loadJourneyData,
    toggleRoleExpansion,
    handleCategoryChange
  } = handlers;

  useEffect(() => {
    const translatedJourneyData = getTranslatedData(t, 'journey', journeyData);
    // Filter data based on profile
    const filteredData = filterDataByProfile(translatedJourneyData, currentProfile);
    
    // Sort roles by date
    if (filteredData && filteredData.roles) {
      filteredData.roles = sortRolesByDate(filteredData.roles);
    }
    
    loadJourneyData(filteredData, currentProfile);
  }, [currentProfile, language, t]);

  // Get filtered roles based on selected category
  const filteredRoles = journeyContent && journeyContent.roles 
    ? filterRolesByCategory(journeyContent.roles, selectedCategory)
    : [];

  return {
    journeyContent,
    loading,
    error,
    expandedRoleId,
    selectedCategory,
    filteredRoles,
    toggleRoleExpansion,
    handleCategoryChange
  };
};

export default useJourney;

