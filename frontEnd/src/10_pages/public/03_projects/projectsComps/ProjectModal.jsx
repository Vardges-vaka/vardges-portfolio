import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TechStackBadge from "./TechStackBadge.jsx";
import { formatMetrics } from "../projectsHelpers/_projectsHelpers.index.js";

/**
 * ProjectModal Component
 * Detailed view of project in modal
 */
const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t } = useTranslation("tempContent");

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  if (!project) return null;

  const metrics = formatMetrics(project.metrics);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="projectModal__backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}>
          {/* Modal Content */}
          <motion.div
            className="projectModal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}>
            <div className="projectModal__content">
              {/* Header */}
              <div className="projectModal__header">
                <div>
                  <h2 id="project-modal-title" className="projectModal__title">
                    {project.name}
                  </h2>
                  {project.type && (
                    <span className="projectModal__type">{project.type}</span>
                  )}
                </div>
                <button
                  className="projectModal__closeButton"
                  onClick={onClose}
                  aria-label={t("ui.common.closeModal")}>
                  <X size={24} />
                </button>
              </div>

              {/* Meta Information */}
              <div className="projectModal__meta">
                {project.venue && (
                  <div className="projectModal__metaItem">
                    <MapPin size={16} />
                    <span>{project.venue}</span>
                  </div>
                )}
                {project.period && (
                  <div className="projectModal__metaItem">
                    <Calendar size={16} />
                    <span>{project.period}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="projectModal__section">
                <p className="projectModal__description">
                  {project.description}
                </p>
              </div>

              {/* Challenge (for bar projects) */}
              {project.challenge && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    <Target size={20} />
                    {t("ui.projects.sections.challenge")}
                  </h3>
                  <p className="projectModal__text">{project.challenge}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.solution")}
                  </h3>
                  <ul className="projectModal__list">
                    {project.solution.map((item, index) => (
                      <li key={index} className="projectModal__listItem">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.keyFeatures")}
                  </h3>
                  <ul className="projectModal__list">
                    {project.features.map((feature, index) => (
                      <li key={index} className="projectModal__listItem">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.deliverables")}
                  </h3>
                  <ul className="projectModal__list">
                    {project.deliverables.map((item, index) => (
                      <li key={index} className="projectModal__listItem">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Approach */}
              {project.approach && project.approach.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.approach")}
                  </h3>
                  <ul className="projectModal__list">
                    {project.approach.map((item, index) => (
                      <li key={index} className="projectModal__listItem">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Components */}
              {project.components && project.components.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.components")}
                  </h3>
                  <ul className="projectModal__list">
                    {project.components.map((item, index) => (
                      <li key={index} className="projectModal__listItem">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Platforms */}
              {project.platforms && project.platforms.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.platforms")}
                  </h3>
                  <div className="projectModal__platforms">
                    {project.platforms.map((platform, index) => (
                      <span key={index} className="projectModal__platform">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.technologyStack")}
                  </h3>
                  <div className="projectModal__techStack">
                    {project.techStack.map((tech, index) => (
                      <TechStackBadge key={index} tech={tech} size="large" />
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.impactMetrics")}
                  </h3>
                  <div className="projectModal__metrics">
                    {metrics.map((metric, index) => (
                      <div key={index} className="projectModal__metric">
                        <span className="projectModal__metricLabel">
                          {metric.label}:
                        </span>
                        <span className="projectModal__metricValue">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="projectModal__section">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.highlights")}
                  </h3>
                  <ul className="projectModal__list projectModal__list--highlights">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="projectModal__listItem">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact */}
              {project.impact && (
                <div className="projectModal__section projectModal__section--impact">
                  <h3 className="projectModal__sectionTitle">
                    {t("ui.projects.sections.impact")}
                  </h3>
                  <p className="projectModal__impact">{project.impact}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
