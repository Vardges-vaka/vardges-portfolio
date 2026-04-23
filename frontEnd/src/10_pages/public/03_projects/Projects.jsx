import React from "react";
import { useTranslation } from "react-i18next";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useProjects } from "./projectsHooks/_projectsHooks.index.js";
import {
  ProjectsGrid,
  ProjectCategoryFilter,
  ProjectModal,
} from "./projectsComps/_projectsComps.index.js";
import { getAvailableCategories } from "./projectsHelpers/_projectsHelpers.index.js";
import "./styles/projects.css";

/**
 * Projects Page Component
 * Displays portfolio projects organized by category
 * Content adapts based on current profile (dev/hospitality/both)
 */
const Projects = ({ variant = "full" }) => {
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const {
    projectsContent,
    loading,
    error,
    selectedCategory,
    selectedProject,
    isModalOpen,
    filteredProjects,
    handleCategoryChange,
    openProjectModal,
    closeProjectModal,
  } = useProjects(profile);

  const projectsClassName = `projects ${
    variant === "full" ? "projects--full" : "projects--short"
  }`;

  if (loading) {
    return (
      <div className={projectsClassName}>
        <div className="projects__loading">{t("ui.common.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={projectsClassName}>
        <div className="projects__error">
          {t("ui.common.errorPrefix")} {error}
        </div>
      </div>
    );
  }

  if (!projectsContent) {
    return null;
  }

  // Get available categories for filter
  const categories = getAvailableCategories(projectsContent.categories);
  const isShort = variant === "short";

  // Limit projects in short variant
  const displayProjects = isShort
    ? filteredProjects.slice(0, 6)
    : filteredProjects;

  return (
    <div className={projectsClassName}>
      <div className="projects__container">
        {/* Page Header - Only in full variant */}
        {!isShort && (
          <header className="projects__header">
            <h1 className="projects__title">{t("ui.pages.projects.title")}</h1>
            {projectsContent.overview && (
              <p className="projects__overview">
                {projectsContent.overview.statement}
              </p>
            )}
          </header>
        )}

        {/* Category Filter - Only in full variant */}
        {!isShort && categories && categories.length > 1 && (
          <ProjectCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {/* Projects Grid */}
        <ProjectsGrid
          projects={displayProjects}
          onProjectClick={openProjectModal}
          variant={variant}
        />

        {/* Project Detail Modal - Only in full variant */}
        {!isShort && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeProjectModal}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
