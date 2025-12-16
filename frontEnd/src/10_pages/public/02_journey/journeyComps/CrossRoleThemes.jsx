import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * CrossRoleThemes Component
 * Displays recurring themes across all roles
 */
const CrossRoleThemes = ({ themes }) => {
  if (!themes || !themes.items || themes.items.length === 0) return null;

  return (
    <motion.section
      className="crossRoleThemes"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="crossRoleThemes__heading">{themes.title}</h2>
      
      <div className="crossRoleThemes__grid">
        {themes.items.map((theme, index) => (
          <motion.article
            key={index}
            className="crossRoleThemes__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="crossRoleThemes__cardTitle">{theme.title}</h3>
            <p className="crossRoleThemes__cardDescription">{theme.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

CrossRoleThemes.propTypes = {
  themes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired
  })
};

export default CrossRoleThemes;

