import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Target, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { formatAchievementMetrics } from "../achievementsHelpers/_achievementsHelpers.index.js";

/**
 * AchievementModal Component
 * Detailed view of achievement in modal
 */
const AchievementModal = ({ achievement, isOpen, onClose }) => {
  const { t } = useTranslation("tempContent");

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  if (!achievement) return null;

  const metrics = formatAchievementMetrics(achievement.metrics);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="achievementModal__backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}>
          {/* Modal Content */}
          <motion.div
            className="achievementModal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-modal-title"
            onClick={(e) => e.stopPropagation()}>
            <div className="achievementModal__content">
              {/* Header */}
              <div className="achievementModal__header">
                <div>
                  <div className="achievementModal__titleGroup">
                    <Award size={28} className="achievementModal__headerIcon" />
                    <h2
                      id="achievement-modal-title"
                      className="achievementModal__title">
                      {achievement.title}
                    </h2>
                  </div>
                  {(achievement.company ||
                    achievement.venue ||
                    achievement.certification) && (
                    <span className="achievementModal__company">
                      {achievement.company ||
                        achievement.venue ||
                        achievement.certification}
                    </span>
                  )}
                </div>
                <button
                  className="achievementModal__closeButton"
                  onClick={onClose}
                  aria-label={t("ui.common.closeModal")}>
                  <X size={24} />
                </button>
              </div>

              {/* Description */}
              <div className="achievementModal__section">
                <p className="achievementModal__description">
                  {achievement.description}
                </p>
              </div>

              {/* Challenge/Context */}
              {achievement.challenge && (
                <div className="achievementModal__section">
                  <h3 className="achievementModal__sectionTitle">
                    <Target size={20} />
                    {t("ui.achievements.challenge")}
                  </h3>
                  <p className="achievementModal__text">
                    {achievement.challenge}
                  </p>
                </div>
              )}

              {/* Features */}
              {achievement.features && achievement.features.length > 0 && (
                <div className="achievementModal__section">
                  <h3 className="achievementModal__sectionTitle">
                    {t("ui.achievements.keyFeatures")}
                  </h3>
                  <ul className="achievementModal__list">
                    {achievement.features.map((feature, index) => (
                      <li key={index} className="achievementModal__listItem">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements/Accomplishments */}
              {achievement.achievements &&
                achievement.achievements.length > 0 && (
                  <div className="achievementModal__section">
                    <h3 className="achievementModal__sectionTitle">
                      {t("ui.achievements.accomplishments")}
                    </h3>
                    <ul className="achievementModal__list">
                      {achievement.achievements.map((item, index) => (
                        <li key={index} className="achievementModal__listItem">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Deliverables */}
              {achievement.deliverables &&
                achievement.deliverables.length > 0 && (
                  <div className="achievementModal__section">
                    <h3 className="achievementModal__sectionTitle">
                      {t("ui.achievements.deliverables")}
                    </h3>
                    <ul className="achievementModal__list">
                      {achievement.deliverables.map((item, index) => (
                        <li key={index} className="achievementModal__listItem">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="achievementModal__section">
                  <h3 className="achievementModal__sectionTitle">
                    <TrendingUp size={20} />
                    {t("ui.achievements.impactMetrics")}
                  </h3>
                  <div className="achievementModal__metrics">
                    {metrics.map((metric, index) => (
                      <div key={index} className="achievementModal__metric">
                        <span className="achievementModal__metricLabel">
                          {metric.label}:
                        </span>
                        <span className="achievementModal__metricValue">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact */}
              {achievement.impact && (
                <div className="achievementModal__section achievementModal__section--impact">
                  <h3 className="achievementModal__sectionTitle">
                    {t("ui.projects.sections.impact")}
                  </h3>
                  <p className="achievementModal__impact">
                    {achievement.impact}
                  </p>
                </div>
              )}

              {/* Skills */}
              {achievement.skills && achievement.skills.length > 0 && (
                <div className="achievementModal__section">
                  <h3 className="achievementModal__sectionTitle">
                    {t("ui.achievements.skillsDemonstrated")}
                  </h3>
                  <div className="achievementModal__skills">
                    {achievement.skills.map((skill, index) => (
                      <span key={index} className="achievementModal__skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AchievementModal.propTypes = {
  achievement: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AchievementModal;
