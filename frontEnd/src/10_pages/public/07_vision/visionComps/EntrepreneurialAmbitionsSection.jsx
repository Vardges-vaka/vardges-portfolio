import React from "react";
import { motion } from "framer-motion";
import { Rocket, Package, Briefcase } from "lucide-react";
import PropTypes from "prop-types";

const EntrepreneurialAmbitionsSection = ({ entrepreneurialAmbitions }) => {
  if (!entrepreneurialAmbitions) return null;

  return (
    <motion.section
      className="entrepreneurialAmbitionsSection"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}>
      <div className="entrepreneurialAmbitionsSection__header">
        <Rocket size={32} className="entrepreneurialAmbitionsSection__icon" />
        <h2 className="entrepreneurialAmbitionsSection__title">
          {entrepreneurialAmbitions.title}
        </h2>
      </div>

      <p className="entrepreneurialAmbitionsSection__intro">
        {entrepreneurialAmbitions.intro}
      </p>

      {entrepreneurialAmbitions.brands && (
        <div className="entrepreneurialAmbitionsSection__brands">
          <h3>Active Brands & Ventures</h3>
          <ul>
            {entrepreneurialAmbitions.brands.map((brand, idx) => (
              <li key={idx}>{brand}</li>
            ))}
          </ul>
        </div>
      )}

      {entrepreneurialAmbitions.philosophy && (
        <div className="entrepreneurialAmbitionsSection__philosophy">
          <p>{entrepreneurialAmbitions.philosophy}</p>
        </div>
      )}

      {entrepreneurialAmbitions.infrastructure && (
        <div className="entrepreneurialAmbitionsSection__infrastructure">
          <Package size={24} />
          <div>
            <h3>Infrastructure Components</h3>
            <ul>
              {entrepreneurialAmbitions.infrastructure.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {entrepreneurialAmbitions.approach && (
        <p className="entrepreneurialAmbitionsSection__approach">
          {entrepreneurialAmbitions.approach}
        </p>
      )}

      {entrepreneurialAmbitions.consultingOffer && (
        <div className="entrepreneurialAmbitionsSection__consultingOffer">
          <Briefcase size={24} />
          <div>
            <h3>{entrepreneurialAmbitions.consultingOffer.title}</h3>
            <p>{entrepreneurialAmbitions.consultingOffer.description}</p>

            <ul>
              {entrepreneurialAmbitions.consultingOffer.deliverables.map(
                (item, idx) => (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>

            <p className="entrepreneurialAmbitionsSection__vision">
              {entrepreneurialAmbitions.consultingOffer.vision}
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
};

EntrepreneurialAmbitionsSection.propTypes = {
  entrepreneurialAmbitions: PropTypes.object.isRequired,
};

export default EntrepreneurialAmbitionsSection;

