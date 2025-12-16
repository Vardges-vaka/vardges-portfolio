import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import PropTypes from "prop-types";

const CoreDriversSection = ({ coreDrivers }) => {
  if (!coreDrivers) return null;

  return (
    <motion.section
      className="coreDriversSection"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <div className="coreDriversSection__header">
        <Zap size={32} />
        <h2>{coreDrivers.title}</h2>
      </div>

      <p className="coreDriversSection__intro">{coreDrivers.intro}</p>

      <div className="coreDriversSection__drivers">
        {coreDrivers.drivers.map((driver) => (
          <div key={driver.id} className="coreDriversSection__driver">
            <h3>{driver.title}</h3>
            <p>{driver.description}</p>
            {driver.examples && (
              <ul>
                {driver.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

CoreDriversSection.propTypes = {
  coreDrivers: PropTypes.object.isRequired,
};

export default CoreDriversSection;

