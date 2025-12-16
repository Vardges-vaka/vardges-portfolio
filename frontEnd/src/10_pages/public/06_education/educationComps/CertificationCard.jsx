import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Building } from "lucide-react";
import PropTypes from "prop-types";
import { getCertificationTypeColor } from "../educationHelpers/_educationHelpers.index.js";

/**
 * CertificationCard Component
 * Displays individual certification with details
 */
const CertificationCard = ({ certification, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.05 },
    },
  };

  const typeColor = getCertificationTypeColor(certification.type);

  return (
    <motion.article
      className="certificationCard"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <div className="certificationCard__header">
        <Award size={20} className="certificationCard__icon" />
        <div className="certificationCard__titleGroup">
          <h4 className="certificationCard__name">{certification.name}</h4>
          {certification.type && (
            <span className={`certificationCard__type ${typeColor}`}>
              {certification.type}
            </span>
          )}
        </div>
      </div>

      <div className="certificationCard__meta">
        {certification.issuer && (
          <div className="certificationCard__metaItem">
            <Building size={14} />
            <span>{certification.issuer}</span>
          </div>
        )}
        {certification.year && (
          <div className="certificationCard__metaItem">
            <Calendar size={14} />
            <span>{certification.year}</span>
          </div>
        )}
      </div>

      {certification.description && (
        <p className="certificationCard__description">
          {certification.description}
        </p>
      )}

      {certification.coverage && certification.coverage.length > 0 && (
        <div className="certificationCard__coverage">
          <h5 className="certificationCard__coverageTitle">Coverage:</h5>
          <ul className="certificationCard__coverageList">
            {certification.coverage.map((item, idx) => (
              <li key={idx} className="certificationCard__coverageItem">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {certification.focus && (
        <div className="certificationCard__focus">
          <strong>Focus:</strong> {certification.focus}
        </div>
      )}
    </motion.article>
  );
};

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string,
    year: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    coverage: PropTypes.arrayOf(PropTypes.string),
    focus: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CertificationCard;

