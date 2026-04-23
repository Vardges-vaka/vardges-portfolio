import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../projectsConstances/_projectsConstances.index.js';
import { filterDataByProfile } from '../../../../07_utils/_utils.index.js';
import { getProjectsByCategory } from '../projectsHelpers/_projectsHelpers.index.js';
import useProjects_states from './useProjects_states.js';
import useProjects_handlers from './useProjects_handlers.js';
import {
  getResolvedLanguage,
  getTranslatedData,
} from '../../publicHelpers/publicI18n.js';

/**
 * Main Projects Hook
 * Orchestrates all projects page logic
 * @param {string} currentProfile - Current profile
 * @returns {Object} - Projects content, state, and handlers
 */
const useProjects = (currentProfile) => {
  const { t, i18n } = useTranslation('tempContent');
  const states = useProjects_states();
  const {
    projectsContent,
    loading,
    error,
    selectedCategory,
    selectedProject,
    isModalOpen
  } = states;
  const language = getResolvedLanguage(i18n);
  
  const handlers = useProjects_handlers(states);
  const {
    loadProjectsData,
    handleCategoryChange,
    openProjectModal,
    closeProjectModal
  } = handlers;

  useEffect(() => {
    const translatedProjectsData = getTranslatedData(t, 'projects', projectsData);
    // Filter data based on profile
    const filteredData = filterDataByProfile(translatedProjectsData, currentProfile);
    loadProjectsData(filteredData, currentProfile);
  }, [currentProfile, language, t]);

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

