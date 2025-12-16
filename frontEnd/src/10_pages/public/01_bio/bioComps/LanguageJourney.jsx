import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * LanguageJourney Component
 * Displays the language learning journey narrative
 */
const LanguageJourney = ({ story }) => {
  if (!story) return null;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.section
      className="languageJourney"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <h2 className="languageJourney__heading">{story.title}</h2>
      
      <div className="languageJourney__content">
        <motion.p 
          className="languageJourney__initial"
          variants={itemVariants}
        >
          {story.initialState}
        </motion.p>
        
        <motion.p 
          className="languageJourney__challenge"
          variants={itemVariants}
        >
          {story.challenge}
        </motion.p>
        
        {story.approach && story.approach.length > 0 && (
          <motion.div 
            className="languageJourney__section"
            variants={itemVariants}
          >
            <h3 className="languageJourney__subheading">How I Approached It:</h3>
            <ul className="languageJourney__list">
              {story.approach.map((item, index) => (
                <li key={index} className="languageJourney__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {story.outcomes && story.outcomes.length > 0 && (
          <motion.div 
            className="languageJourney__section"
            variants={itemVariants}
          >
            <h3 className="languageJourney__subheading">Outcomes:</h3>
            <ul className="languageJourney__list">
              {story.outcomes.map((item, index) => (
                <li key={index} className="languageJourney__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {story.lessonsLearned && story.lessonsLearned.length > 0 && (
          <motion.div 
            className="languageJourney__section"
            variants={itemVariants}
          >
            <h3 className="languageJourney__subheading">Lessons Learned:</h3>
            <ul className="languageJourney__list">
              {story.lessonsLearned.map((item, index) => (
                <li key={index} className="languageJourney__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {story.impact && (
          <motion.p 
            className="languageJourney__impact"
            variants={itemVariants}
          >
            {story.impact}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
};

LanguageJourney.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    initialState: PropTypes.string.isRequired,
    challenge: PropTypes.string.isRequired,
    approach: PropTypes.arrayOf(PropTypes.string),
    outcomes: PropTypes.arrayOf(PropTypes.string),
    lessonsLearned: PropTypes.arrayOf(PropTypes.string),
    impact: PropTypes.string
  })
};

export default LanguageJourney;

