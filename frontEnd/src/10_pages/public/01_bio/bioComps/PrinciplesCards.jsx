import React from "react";
import { motion } from "framer-motion";
import { Target, Handshake, Layers } from "lucide-react";
import PropTypes from "prop-types";

/**
 * PrinciplesCards Component
 * Displays core principles as cards
 * Supports short and full variants
 */
const PrinciplesCards = ({ principles, variant = "full" }) => {
  if (!principles || principles.length === 0) return null;

  const isShort = variant === "short";
  const displayPrinciples = isShort ? principles.slice(0, 3) : principles;

  const iconMap = {
    target: Target,
    handshake: Handshake,
    layers: Layers,
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
      className={`principlesCards ${
        isShort ? "principlesCards--short" : "principlesCards--full"
      }`}>
      <h2 className="principlesCards__heading">Core Principles</h2>
      <div className="principlesCards__grid">
        {displayPrinciples.map((principle, index) => {
          const IconComponent = iconMap[principle.icon] || Target;

          return (
            <motion.article
              key={principle.id}
              className="principlesCards__card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}>
              <div className="principlesCards__iconWrapper">
                <IconComponent className="principlesCards__icon" size={32} />
              </div>

              <h3 className="principlesCards__title">{principle.title}</h3>
              <p className="principlesCards__description">
                {isShort && principle.description.length > 120
                  ? `${principle.description.substring(0, 120)}...`
                  : principle.description}
              </p>

              {!isShort && principle.quote && (
                <blockquote className="principlesCards__quote">
                  "{principle.quote}"
                </blockquote>
              )}

              {!isShort &&
                principle.practical &&
                principle.practical.length > 0 && (
                  <ul className="principlesCards__practical">
                    {principle.practical.map((item, idx) => (
                      <li key={idx} className="principlesCards__practicalItem">
                        {item}
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

PrinciplesCards.propTypes = {
  principles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      quote: PropTypes.string,
      practical: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  variant: PropTypes.oneOf(["short", "full"]),
};

export default PrinciplesCards;
