import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Shield, Layers, TrendingUp } from "lucide-react";

/**
 * ValuesSection Component
 * Displays core values (simplified from Values page)
 */
const ValuesSection = ({ values, variant = "full" }) => {
  if (!values || values.length === 0) return null;

  const isShort = variant === "short";
  const displayValues = isShort ? values.slice(0, 3) : values;

  const iconMap = {
    "shield-check": Shield,
    layers: Layers,
    "trending-up": TrendingUp,
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      className={`valuesSection ${
        isShort ? "valuesSection--short" : "valuesSection--full"
      }`}>
      <h2 className="valuesSection__heading">Core Values</h2>
      <div className="valuesSection__grid">
        {displayValues.map((value, index) => {
          const IconComponent = iconMap[value.icon] || Shield;

          return (
            <motion.article
              key={value.id}
              className="valuesSection__card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}>
              <div className="valuesSection__iconWrapper">
                <IconComponent className="valuesSection__icon" size={32} />
              </div>

              <h3 className="valuesSection__title">{value.title}</h3>
              <p className="valuesSection__description">
                {isShort && value.description && value.description.length > 120
                  ? `${value.description.substring(0, 120)}...`
                  : value.description || value.intro}
              </p>

              {!isShort && value.principles && value.principles.length > 0 && (
                <ul className="valuesSection__principles">
                  {value.principles.slice(0, 3).map((principle, idx) => (
                    <li key={idx} className="valuesSection__principle">
                      {principle}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

ValuesSection.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string,
      intro: PropTypes.string,
      principles: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  variant: PropTypes.oneOf(["short", "full"]),
};

export default ValuesSection;
