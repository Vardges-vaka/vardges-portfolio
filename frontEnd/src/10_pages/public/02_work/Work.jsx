import React from "react";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useWork } from "./workHooks/_workHooks.index.js";
import {
  ProjectsGrid,
  ProjectModal,
} from "../03_projects/projectsComps/_projectsComps.index.js";
import { TimelineContainer } from "../02_journey/journeyComps/_journeyComps.index.js";
import "./styles/work.css";

/**
 * Work Page Component
 * Merged from Projects + Journey
 * Displays development projects and professional experience
 */
const Work = ({ variant = "full" }) => {
  const { profile } = useProfileContext();
  const {
    workContent,
    loading,
    error,
    selectedProject,
    selectedCategory,
    handleProjectClick,
    handleCloseProject,
    handleCategoryChange,
  } = useWork(profile);

  const workClassName = `work ${
    variant === "full" ? "work--full" : "work--short"
  }`;

  if (loading) {
    return (
      <div className={workClassName}>
        <div className="work__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={workClassName}>
        <div className="work__error">Error: {error}</div>
      </div>
    );
  }

  if (!workContent) {
    return null;
  }

  const isShort = variant === "short";
  const projects = workContent.projects?.categories?.tech?.projects || [];
  const roles = workContent.journey?.roles || [];

  return (
    <div className={workClassName}>
      <div className="work__container">
        {/* Header - Only show in full variant */}
        {!isShort && (
          <header className="work__header">
            <h1 className="work__title">Projects & Experience</h1>
            <p className="work__subtitle">
              Development projects and professional journey
            </p>
          </header>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="work__projects">
            {!isShort && (
              <h2 className="work__sectionTitle">Development Projects</h2>
            )}
            <ProjectsGrid
              projects={isShort ? projects.slice(0, 4) : projects}
              onProjectClick={handleProjectClick}
              variant={variant}
            />
          </section>
        )}

        {/* Journey Section - Condensed Timeline */}
        {!isShort && roles.length > 0 && (
          <section className="work__journey">
            <h2 className="work__sectionTitle">Professional Journey</h2>
            {workContent.journey?.summary && (
              <div className="work__summary">
                <p className="work__summaryText">
                  {workContent.journey.summary.overview}
                </p>
              </div>
            )}
            <TimelineContainer roles={roles} variant="full" />
          </section>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseProject} />
      )}
    </div>
  );
};

export default Work;
