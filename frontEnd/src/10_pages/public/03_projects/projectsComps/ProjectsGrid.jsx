import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard.jsx";

/**
 * ProjectsGrid Component
 * Grid container for project cards
 */
const ProjectsGrid = ({ projects, onProjectClick }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="projectsGrid__empty">
        <p>No projects found for the selected category.</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="projectsGrid"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onViewDetails={onProjectClick}
        />
      ))}
    </motion.div>
  );
};

ProjectsGrid.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProjectClick: PropTypes.func.isRequired,
};

export default ProjectsGrid;
