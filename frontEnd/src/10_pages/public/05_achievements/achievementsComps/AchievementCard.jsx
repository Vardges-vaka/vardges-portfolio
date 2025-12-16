import React from "react";
import { motion } from "framer-motion";
import { Check, Award, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import {
  formatAchievementMetrics,
  truncateText,
} from "../achievementsHelpers/_achievementsHelpers.index.js";

/**
 * AchievementCard Component
 * Displays individual achievement with details
 */
const AchievementCard = ({ achievement, onClick, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.05 },
    },
  };

  const metrics = formatAchievementMetrics(achievement.metrics);

  return (
    <motion.article
      className="achievementCard"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={() => onClick && onClick(achievement)}>
      <div className="achievementCard__header">
        <Award size={24} className="achievementCard__icon" />
        <div className="achievementCard__titleGroup">
          <h4 className="achievementCard__title">{achievement.title}</h4>
          {achievement.company && (
            <span className="achievementCard__company">{achievement.company}</span>
          )}
          {achievement.certification && (
            <span className="achievementCard__company">
              {achievement.certification}
            </span>
          )}
        </div>
      </div>

      <p className="achievementCard__description">
        {truncateText(achievement.description, 180)}
      </p>

      {/* Features/Deliverables Preview */}
      {(achievement.features || achievement.deliverables || achievement.achievements) && (
        <div className="achievementCard__listPreview">
          {(achievement.features || achievement.deliverables || achievement.achievements)
            ?.slice(0, 3)
            .map((item, idx) => (
              <div key={idx} className="achievementCard__listItem">
                <Check size={14} className="achievementCard__checkIcon" />
                <span>{truncateText(item, 80)}</span>
              </div>
            ))}
        </div>
      )}

      {/* Metrics Preview */}
      {metrics.length > 0 && (
        <div className="achievementCard__metrics">
          {metrics.map((metric, idx) => (
            <div key={idx} className="achievementCard__metric">
              <span className="achievementCard__metricLabel">{metric.label}:</span>
              <span className="achievementCard__metricValue">{metric.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Impact Preview */}
      {achievement.impact && (
        <div className="achievementCard__impact">
          <strong>Impact:</strong> {truncateText(achievement.impact, 120)}
        </div>
      )}

      {onClick && (
        <button className="achievementCard__viewMore">
          View Details
          <ChevronRight size={16} />
        </button>
      )}
    </motion.article>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    company: PropTypes.string,
    certification: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    deliverables: PropTypes.arrayOf(PropTypes.string),
    achievements: PropTypes.arrayOf(PropTypes.string),
    metrics: PropTypes.object,
    impact: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  index: PropTypes.number.isRequired,
};

export default AchievementCard;

