import { useState } from 'react';

/**
 * Bio States Hook
 * Manages all state for the Bio page
 */
const useBio_states = () => {
  const [bioContent, setBioContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return {
    bioContent,
    setBioContent,
    loading,
    setLoading,
    error,
    setError
  };
};

export default useBio_states;

