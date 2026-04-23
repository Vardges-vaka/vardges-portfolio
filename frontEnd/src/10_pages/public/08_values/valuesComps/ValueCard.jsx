import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  TrendingUp,
  Target,
  MessageSquare,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ValueCard = ({ value, index }) => {
  const { t } = useTranslation("tempContent");

  const iconMap = {
    "shield-check": ShieldCheck,
    layers: Layers,
    "trending-up": TrendingUp,
    target: Target,
    "message-square": MessageSquare,
    users: Users,
  };

  const IconComponent = iconMap[value.icon] || ShieldCheck;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1 },
    },
  };

  return (
    <motion.article
      className="valueCard"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <div className="valueCard__header">
        <IconComponent size={32} className="valueCard__icon" />
        <h3 className="valueCard__title">{value.title}</h3>
      </div>

      <p className="valueCard__intro">{value.intro}</p>

      {value.description && (
        <p className="valueCard__description">{value.description}</p>
      )}

      {value.principles && (
        <ul className="valueCard__list">
          {value.principles.map((principle, idx) => (
            <li key={idx}>{principle}</li>
          ))}
        </ul>
      )}

      {value.approach && (
        <div className="valueCard__approach">
          <strong>{t("ui.values.approach")}</strong>
          <ul>
            {value.approach.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {value.method && (
        <div className="valueCard__method">
          <strong>{t("ui.values.method")}</strong>
          <ul>
            {value.method.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {value.characteristics && (
        <ul className="valueCard__list">
          {value.characteristics.map((char, idx) => (
            <li key={idx}>{char}</li>
          ))}
        </ul>
      )}

      {(value.context || value.philosophy || value.conclusion || value.rationale) && (
        <p className="valueCard__context">
          {value.context || value.philosophy || value.conclusion || value.rationale}
        </p>
      )}
    </motion.article>
  );
};

ValueCard.propTypes = {
  value: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default ValueCard;

