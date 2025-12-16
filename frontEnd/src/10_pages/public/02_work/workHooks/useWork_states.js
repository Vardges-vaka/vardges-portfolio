import { useState } from "react";

/**
 * Work Page State Management
 */
const useWork_states = () => {
  const [workContent, setWorkContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("tech");

  return {
    workContent,
    setWorkContent,
    loading,
    setLoading,
    error,
    setError,
    selectedProject,
    setSelectedProject,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useWork_states;
