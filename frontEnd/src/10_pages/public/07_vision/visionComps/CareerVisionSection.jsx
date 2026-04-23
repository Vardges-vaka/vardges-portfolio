import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const CareerVisionSection = ({ careerVision }) => {
  const { t } = useTranslation("tempContent");

  if (!careerVision) return null;

  return (
    <motion.section
      className="careerVisionSection"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <div className="careerVisionSection__header">
        <Target size={32} className="careerVisionSection__icon" />
        <h2 className="careerVisionSection__title">{careerVision.title}</h2>
      </div>

      <p className="careerVisionSection__intro">{careerVision.intro}</p>

      {careerVision.foundations && (
        <div className="careerVisionSection__foundations">
          <h3>{t("ui.vision.coreFoundations")}</h3>
          <ul>
            {careerVision.foundations.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {careerVision.nextLayer && (
        <div className="careerVisionSection__nextLayer">
          <Zap size={24} />
          <div>
            <h3>{careerVision.nextLayer.title}</h3>
            <p>{careerVision.nextLayer.description}</p>
          </div>
        </div>
      )}

      {careerVision.direction && (
        <div className="careerVisionSection__direction">
          <h3>{careerVision.direction.title}</h3>
          <p>{careerVision.direction.description}</p>

          {careerVision.direction.goals && (
            <ul className="careerVisionSection__goals">
              {careerVision.direction.goals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))}
            </ul>
          )}

          {careerVision.direction.applications && (
            <div className="careerVisionSection__applications">
              {careerVision.direction.applications.map((app, idx) => (
                <div key={idx} className="careerVisionSection__application">
                  <h4>{app.title}</h4>
                  <p>{app.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {careerVision.longTerm && (
        <div className="careerVisionSection__longTerm">
          <TrendingUp size={24} />
          <p>{careerVision.longTerm}</p>
        </div>
      )}
    </motion.section>
  );
};

CareerVisionSection.propTypes = {
  careerVision: PropTypes.object.isRequired,
};

export default CareerVisionSection;

