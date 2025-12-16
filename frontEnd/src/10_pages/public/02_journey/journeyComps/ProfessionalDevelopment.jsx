import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * ProfessionalDevelopment Component
 * Displays professional development section (e.g., Mixology Bus Tour)
 */
const ProfessionalDevelopment = ({ development }) => {
  if (!development) return null;

  return (
    <motion.section
      className="professionalDevelopment"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="professionalDevelopment__header">
        <GraduationCap className="professionalDevelopment__icon" size={32} />
        <div>
          <h3 className="professionalDevelopment__title">{development.title}</h3>
          <p className="professionalDevelopment__period">{development.period}</p>
          {development.details && (
            <p className="professionalDevelopment__details">{development.details}</p>
          )}
        </div>
      </div>
      
      {development.description && development.description.length > 0 && (
        <ul className="professionalDevelopment__list">
          {development.description.map((item, index) => (
            <motion.li
              key={index}
              className="professionalDevelopment__listItem"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      )}
      
      {development.tags && development.tags.length > 0 && (
        <div className="professionalDevelopment__tags">
          {development.tags.map((tag, index) => (
            <span key={index} className="professionalDevelopment__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.section>
  );
};

ProfessionalDevelopment.propTypes = {
  development: PropTypes.shape({
    title: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    details: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  })
};

export default ProfessionalDevelopment;

