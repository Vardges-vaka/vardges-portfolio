import React from "react";
import { motion } from "framer-motion";
import { Compass, DollarSign, Activity, Star } from "lucide-react";
import PropTypes from "prop-types";

const PersonalGoalsSection = ({ personalGoals }) => {
  if (!personalGoals) return null;

  return (
    <motion.section
      className="personalGoalsSection"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}>
      <div className="personalGoalsSection__header">
        <Compass size={32} className="personalGoalsSection__icon" />
        <h2 className="personalGoalsSection__title">{personalGoals.title}</h2>
      </div>

      <p className="personalGoalsSection__intro">{personalGoals.intro}</p>

      <div className="personalGoalsSection__goals">
        {personalGoals.financial && (
          <div className="personalGoalsSection__goal">
            <DollarSign size={24} />
            <div>
              <h3>{personalGoals.financial.title}</h3>
              <p>{personalGoals.financial.description}</p>
              <ul>
                {personalGoals.financial.plan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="personalGoalsSection__philosophy">
                {personalGoals.financial.philosophy}
              </p>
            </div>
          </div>
        )}

        {personalGoals.lifeOS && (
          <div className="personalGoalsSection__goal">
            <Activity size={24} />
            <div>
              <h3>{personalGoals.lifeOS.title}</h3>
              <p>{personalGoals.lifeOS.description}</p>
              <ul>
                {personalGoals.lifeOS.areas.map((area, idx) => (
                  <li key={idx}>{area}</li>
                ))}
              </ul>
              <p className="personalGoalsSection__philosophy">
                {personalGoals.lifeOS.goal}
              </p>
            </div>
          </div>
        )}
      </div>

      {personalGoals.coreDirection && (
        <div className="personalGoalsSection__coreDirection">
          <Star size={32} />
          <div>
            <h3>{personalGoals.coreDirection.title}</h3>
            <p>{personalGoals.coreDirection.description}</p>

            <div className="personalGoalsSection__building">
              <strong>Building:</strong>
              <ul>
                {personalGoals.coreDirection.building.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="personalGoalsSection__outcomes">
              <strong>To achieve:</strong>
              <ul>
                {personalGoals.coreDirection.outcomes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="personalGoalsSection__ultimate">
              <strong>Ultimately, a life where I:</strong>
              <ul>
                {personalGoals.coreDirection.ultimate.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="personalGoalsSection__conclusion">
              {personalGoals.coreDirection.conclusion}
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
};

PersonalGoalsSection.propTypes = {
  personalGoals: PropTypes.object.isRequired,
};

export default PersonalGoalsSection;

