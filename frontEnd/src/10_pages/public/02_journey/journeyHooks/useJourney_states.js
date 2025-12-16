import { useState } from 'react';

/**
 * Journey States Hook
 * Manages all state for the Journey page
 */
const useJourney_states = () => {
  const [journeyContent, setJourneyContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRoleId, setExpandedRoleId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  return {
    journeyContent,
    setJourneyContent,
    loading,
    setLoading,
    error,
    setError,
    expandedRoleId,
    setExpandedRoleId,
    selectedCategory,
    setSelectedCategory
  };
};

export default useJourney_states;

