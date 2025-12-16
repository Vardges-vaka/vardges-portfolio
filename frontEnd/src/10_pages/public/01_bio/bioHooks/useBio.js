import { useEffect } from 'react';
import { bioData } from '../bioConstances/_bioConstances.index.js';
import { filterDataByProfile } from '../../../../07_utils/_utils.index.js';
import useBio_states from './useBio_states.js';
import useBio_handlers from './useBio_handlers.js';

/**
 * Main Bio Hook
 * Orchestrates all bio page logic
 * @param {string} currentProfile - Current profile
 * @returns {Object} - Bio content and state
 */
const useBio = (currentProfile) => {
  const states = useBio_states();
  const { bioContent, loading, error } = states;
  
  const handlers = useBio_handlers(states);
  const { loadBioData } = handlers;

  useEffect(() => {
    // Filter data based on profile
    const filteredData = filterDataByProfile(bioData, currentProfile);
    loadBioData(filteredData, currentProfile);
  }, [currentProfile]);

  return {
    bioContent,
    loading,
    error
  };
};

export default useBio;

