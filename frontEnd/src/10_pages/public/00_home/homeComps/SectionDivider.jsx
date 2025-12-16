import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "../styles/sectionDevider.css";

/**
 * SectionDivider Component
 * Enhanced visual divider between home sections with CTA
 */
const SectionDivider = ({ title, link }) => {
  return (
    <motion.div
      className="sectionDivider"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <h2 className="sectionDivider__title">{title}</h2>
      <Link to={link} className="sectionDivider__link">
        View Full Page
        <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
};

SectionDivider.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SectionDivider;
