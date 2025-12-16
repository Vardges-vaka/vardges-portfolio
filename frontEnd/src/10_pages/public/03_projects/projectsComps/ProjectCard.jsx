import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import TechStackBadge from "./TechStackBadge.jsx";
import { truncateDescription } from "../projectsHelpers/_projectsHelpers.index.js";

/**
 * ProjectCard Component
 * Displays individual project card in grid
 */
const ProjectCard = ({ project, onViewDetails }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.article
      className={`projectCard projectCard--${project.category}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}>
      <div className="projectCard__header">
        <h3 className="projectCard__name">{project.name}</h3>
        {project.type && (
          <span className="projectCard__type">{project.type}</span>
        )}
      </div>

      {(project.venue || project.period) && (
        <div className="projectCard__meta">
          {project.venue && (
            <span className="projectCard__venue">{project.venue}</span>
          )}
          {project.period && (
            <span className="projectCard__period">{project.period}</span>
          )}
        </div>
      )}

      <p className="projectCard__description">
        {truncateDescription(project.description, 120)}
      </p>

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="projectCard__techStack">
          {project.techStack.slice(0, 5).map((tech, index) => (
            <TechStackBadge key={index} tech={tech} />
          ))}
          {project.techStack.length > 5 && (
            <span className="projectCard__techMore">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Key Metrics Preview */}
      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <div className="projectCard__metricsPreview">
          {Object.entries(project.metrics)
            .slice(0, 2)
            .map(([key, value], index) => (
              <div key={index} className="projectCard__metric">
                <span className="projectCard__metricLabel">{key}:</span>
                <span className="projectCard__metricValue">{value}</span>
              </div>
            ))}
        </div>
      )}

      <button
        className="projectCard__viewButton"
        onClick={() => onViewDetails(project)}
        aria-label={`View details for ${project.name}`}>
        View Details
        <ChevronRight size={16} />
      </button>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string,
    venue: PropTypes.string,
    period: PropTypes.string,
    description: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string),
    metrics: PropTypes.object,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ProjectCard;
