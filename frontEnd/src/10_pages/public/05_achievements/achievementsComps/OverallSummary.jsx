import React from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import PropTypes from "prop-types";

/**
 * OverallSummary Component
 * Displays the overall achievements summary
 */
const OverallSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <motion.section
      className="overallSummary"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <div className="overallSummary__header">
        <Target size={32} className="overallSummary__icon" />
        <h2 className="overallSummary__title">{summary.title}</h2>
      </div>

      <ul className="overallSummary__points">
        {summary.points.map((point, index) => (
          <motion.li
            key={index}
            className="overallSummary__point"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}>
            {point}
          </motion.li>
        ))}
      </ul>

      <div className="overallSummary__conclusion">
        <p>{summary.conclusion}</p>
      </div>
    </motion.section>
  );
};

OverallSummary.propTypes = {
  summary: PropTypes.shape({
    title: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
    conclusion: PropTypes.string.isRequired,
  }),
};

export default OverallSummary;

