import { useState } from 'react';

/**
 * Projects States Hook
 * Manages all state for the Projects page
 */
const useProjects_states = () => {
  const [projectsContent, setProjectsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    projectsContent,
    setProjectsContent,
    loading,
    setLoading,
    error,
    setError,
    selectedCategory,
    setSelectedCategory,
    selectedProject,
    setSelectedProject,
    isModalOpen,
    setIsModalOpen
  };
};

export default useProjects_states;

