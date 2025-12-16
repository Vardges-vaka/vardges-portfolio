import React from "react";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useVision } from "./visionHooks/_visionHooks.index.js";
import {
  CareerVisionSection,
  EntrepreneurialAmbitionsSection,
  PersonalGoalsSection,
} from "./visionComps/_visionComps.index.js";
import "./styles/vision.css";

/**
 * Vision Page Component
 * Displays career vision, entrepreneurial ambitions, and personal goals
 */
const Vision = ({ variant = "full" }) => {
  const { profile } = useProfileContext();
  const { visionContent, loading } = useVision(profile);

  const visionClassName = `vision ${
    variant === "full" ? "vision--full" : "vision--short"
  }`;

  if (loading) {
    return (
      <div className={visionClassName}>
        <div className="vision__loading">Loading vision...</div>
      </div>
    );
  }

  if (!visionContent) {
    return (
      <div className={visionClassName}>
        <div className="vision__empty">
          <p>No vision data available.</p>
        </div>
      </div>
    );
  }

  const isShort = variant === "short";

  return (
    <div className={visionClassName}>
      {!isShort && (
        <header className="vision__header">
          <h1 className="vision__title">Vision & Goals</h1>
          <p className="vision__subtitle">
            Future direction, entrepreneurial ambitions, and personal
            aspirations.
          </p>
        </header>
      )}

      <div className="vision__content">
        {visionContent.careerVision && (
          <CareerVisionSection
            careerVision={visionContent.careerVision}
            variant={variant}
          />
        )}
        {!isShort && visionContent.entrepreneurialAmbitions && (
          <EntrepreneurialAmbitionsSection
            entrepreneurialAmbitions={visionContent.entrepreneurialAmbitions}
          />
        )}
        {!isShort && visionContent.personalGoals && (
          <PersonalGoalsSection personalGoals={visionContent.personalGoals} />
        )}
      </div>
    </div>
  );
};

export default Vision;
