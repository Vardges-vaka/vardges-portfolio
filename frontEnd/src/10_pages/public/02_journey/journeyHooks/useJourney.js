import { useEffect } from 'react';
import { journeyData } from '../journeyConstances/_journeyConstances.index.js';
import { filterDataByProfile } from '../../../../07_utils/_utils.index.js';
import { sortRolesByDate, filterRolesByCategory } from '../journeyHelpers/_journeyHelpers.index.js';
import useJourney_states from './useJourney_states.js';
import useJourney_handlers from './useJourney_handlers.js';

/**
 * Main Journey Hook
 * Orchestrates all journey page logic
 * @param {string} currentProfile - Current profile
 * @returns {Object} - Journey content, state, and handlers
 */
const useJourney = (currentProfile) => {
  const states = useJourney_states();
  const { 
    journeyContent, 
    loading, 
    error,
    expandedRoleId,
    selectedCategory
  } = states;
  
  const handlers = useJourney_handlers(states);
  const { 
    loadJourneyData,
    toggleRoleExpansion,
    handleCategoryChange
  } = handlers;

  useEffect(() => {
    // Filter data based on profile
    const filteredData = filterDataByProfile(journeyData, currentProfile);
    
    // Sort roles by date
    if (filteredData && filteredData.roles) {
      filteredData.roles = sortRolesByDate(filteredData.roles);
    }
    
    loadJourneyData(filteredData, currentProfile);
  }, [currentProfile]);

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

