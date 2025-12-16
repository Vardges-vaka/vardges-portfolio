import { useState } from "react";

/**
 * About Page State Management
 */
const useAbout_states = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return {
    aboutContent,
    setAboutContent,
    loading,
    setLoading,
    error,
    setError,
  };
};

export default useAbout_states;
