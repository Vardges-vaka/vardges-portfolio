import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Calendar, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { placeholder } from "../../../../00_assets/_assets.index.js";
import {
  calculateDuration,
  getCategoryColorClass,
  getTypeBadgeText,
} from "../journeyHelpers/_journeyHelpers.index.js";

/**
 * TimelineCard Component
 * Displays individual role card with expand/collapse functionality
 * Supports short and full variants
 */
const TimelineCard = ({ role, isExpanded, onToggle, variant = "full" }) => {
  const { t } = useTranslation("tempContent");
  const durationLabels = t("ui.journey.duration", { returnObjects: true });
  const duration = calculateDuration(
    role.startDate,
    role.endDate,
    durationLabels
  );
  const categoryClass = getCategoryColorClass(role.category);
  const typeBadge = t(`ui.journey.typeBadges.${role.type}`, {
    defaultValue: getTypeBadgeText(role.type),
  });
  const isShort = variant === "short";

  const cardVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" },
  };

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.article
      className={`timelineCard ${categoryClass} ${
        isShort ? "timelineCard--short" : "timelineCard--full"
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      variants={cardVariants}>
      {/* Card Header - Always Visible */}
      <div
        className="timelineCard__header"
        onClick={() => !isShort && onToggle(role.id)}
        role={isShort ? "article" : "button"}
        tabIndex={isShort ? -1 : 0}
        onKeyPress={(e) => {
          if (!isShort && (e.key === "Enter" || e.key === " ")) {
            onToggle(role.id);
          }
        }}>
        {/* Company Logo/Image - Only in full variant */}
        {!isShort && (
          <div className="timelineCard__image">
            <img src={placeholder} alt={role.company} loading="lazy" />
          </div>
        )}

        <div className="timelineCard__headerContent">
          <div className="timelineCard__titleRow">
            <h3 className="timelineCard__title">{role.title}</h3>
            {!isShort && (
              <motion.div
                className="timelineCard__expandIcon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}>
                <ChevronDown size={24} />
              </motion.div>
            )}
          </div>

          <div className="timelineCard__company">
            <Briefcase size={16} />
            <span>{role.company}</span>
            {role.subCompany && (
              <span className="timelineCard__subCompany">
                {" "}
                • {role.subCompany}
              </span>
            )}
          </div>

          <div className="timelineCard__meta">
            <div className="timelineCard__metaItem">
              <MapPin size={14} />
              <span>{role.location}</span>
            </div>
            <div className="timelineCard__metaItem">
              <Calendar size={14} />
              <span>{role.period}</span>
              {duration && (
                <span className="timelineCard__duration"> ({duration})</span>
              )}
            </div>
          </div>

          {role.type && (
            <span className={`timelineCard__typeBadge typeBadge--${role.type}`}>
              {typeBadge}
            </span>
          )}
        </div>
      </div>

      {/* Card Content - Expandable (only in full variant) */}
      {!isShort && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="timelineCard__content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={contentVariants}>
              {role.scope && (
                <div className="timelineCard__section">
                  <h4 className="timelineCard__sectionTitle">
                    {t("ui.journey.sections.scope")}
                  </h4>
                  <p className="timelineCard__text">{role.scope}</p>
                </div>
              )}

              {role.responsibilities && role.responsibilities.length > 0 && (
                <div className="timelineCard__section">
                  <h4 className="timelineCard__sectionTitle">
                    {t("ui.journey.sections.keyResponsibilities")}
                  </h4>
                  <ul className="timelineCard__list">
                    {role.responsibilities.map((item, index) => (
                      <li key={index} className="timelineCard__listItem">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {role.achievements && role.achievements.length > 0 && (
                <div className="timelineCard__section">
                  <h4 className="timelineCard__sectionTitle">
                    {t("ui.journey.sections.selectedContributions")}
                  </h4>
                  <ul className="timelineCard__list timelineCard__list--achievements">
                    {role.achievements.map((item, index) => (
                      <li key={index} className="timelineCard__listItem">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {role.tags && role.tags.length > 0 && (
                <div className="timelineCard__tags">
                  {role.tags.map((tag, index) => (
                    <span key={index} className="timelineCard__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.article>
  );
};

TimelineCard.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    subCompany: PropTypes.string,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    period: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    scope: PropTypes.string,
    responsibilities: PropTypes.arrayOf(PropTypes.string),
    achievements: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["short", "full"]),
};

export default TimelineCard;
