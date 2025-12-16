import { useEffect } from 'react';
import { projectsData } from '../projectsConstances/_projectsConstances.index.js';
import { filterDataByProfile } from '../../../../07_utils/_utils.index.js';
import { getProjectsByCategory } from '../projectsHelpers/_projectsHelpers.index.js';
import useProjects_states from './useProjects_states.js';
import useProjects_handlers from './useProjects_handlers.js';

/**
 * Main Projects Hook
 * Orchestrates all projects page logic
 * @param {string} currentProfile - Current profile
 * @returns {Object} - Projects content, state, and handlers
 */
const useProjects = (currentProfile) => {
  const states = useProjects_states();
  const {
    projectsContent,
    loading,
    error,
    selectedCategory,
    selectedProject,
    isModalOpen
  } = states;
  
  const handlers = useProjects_handlers(states);
  const {
    loadProjectsData,
    handleCategoryChange,
    openProjectModal,
    closeProjectModal
  } = handlers;

  useEffect(() => {
    // Filter data based on profile
    const filteredData = filterDataByProfile(projectsData, currentProfile);
    loadProjectsData(filteredData, currentProfile);
  }, [currentProfile]);

  // Get filtered projects based on selected category
  const filteredProjects = projectsContent?.categories
    ? getProjectsByCategory(projectsContent.categories, selectedCategory)
    : [];

  return {
    projectsContent,
    loading,
    error,
    selectedCategory,
    selectedProject,
    isModalOpen,
    filteredProjects,
    handleCategoryChange,
    openProjectModal,
    closeProjectModal
  };
};

export default useProjects;

