import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * CareerDirection Component
 * Displays career direction based on profile
 */
const CareerDirection = ({ directions, profile }) => {
  const { t } = useTranslation('tempContent');

  if (!directions) return null;

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      className="careerDirection"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      <h2 className="careerDirection__heading">
        {t('ui.bio.careerDirection')}
      </h2>
      
      <div className="careerDirection__content">
        <h3 className="careerDirection__title">{directions.title}</h3>
        <p className="careerDirection__description">{directions.description}</p>
        
        {directions.focus && directions.focus.length > 0 && (
          <div className="careerDirection__section">
            <h4 className="careerDirection__subheading">
              {t('ui.bio.currentFocus')}
            </h4>
            <ul className="careerDirection__list">
              {directions.focus.map((item, index) => (
                <motion.li 
                  key={index}
                  className="careerDirection__listItem"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        
        {directions.questions && directions.questions.length > 0 && (
          <div className="careerDirection__section">
            <h4 className="careerDirection__subheading">
              {t('ui.bio.keyQuestions')}
            </h4>
            <ul className="careerDirection__list careerDirection__list--questions">
              {directions.questions.map((item, index) => (
                <li key={index} className="careerDirection__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {directions.openTo && directions.openTo.length > 0 && (
          <div className="careerDirection__section">
            <h4 className="careerDirection__subheading">
              {t('ui.bio.openTo')}
            </h4>
            <ul className="careerDirection__list">
              {directions.openTo.map((item, index) => (
                <li key={index} className="careerDirection__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {directions.philosophy && (
          <blockquote className="careerDirection__philosophy">
            {directions.philosophy}
          </blockquote>
        )}
      </div>
    </motion.section>
  );
};

CareerDirection.propTypes = {
  directions: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    focus: PropTypes.arrayOf(PropTypes.string),
    questions: PropTypes.arrayOf(PropTypes.string),
    openTo: PropTypes.arrayOf(PropTypes.string),
    philosophy: PropTypes.string
  }),
  profile: PropTypes.oneOf(['dev', 'hospitality', 'both']).isRequired
};

export default CareerDirection;

