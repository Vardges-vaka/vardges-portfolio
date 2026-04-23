import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "../styles/sectionDevider.css";

/**
 * SectionDivider Component
 * Enhanced visual divider between home sections with CTA
 */
const SectionDivider = ({ title, link }) => {
  const { t } = useTranslation("tempContent");

  return (
    <motion.div
      className="sectionDivider"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <h2 className="sectionDivider__title">{title}</h2>
      <Link to={link} className="sectionDivider__link">
        {t("ui.common.viewFullPage")}
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
