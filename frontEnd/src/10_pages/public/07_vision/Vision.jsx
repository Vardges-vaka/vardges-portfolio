import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const { visionContent, loading } = useVision(profile);

  const visionClassName = `vision ${
    variant === "full" ? "vision--full" : "vision--short"
  }`;

  if (loading) {
    return (
      <div className={visionClassName}>
        <div className="vision__loading">{t("ui.loading.vision")}</div>
      </div>
    );
  }

  if (!visionContent) {
    return (
      <div className={visionClassName}>
        <div className="vision__empty">
          <p>{t("ui.empty.vision")}</p>
        </div>
      </div>
    );
  }

  const isShort = variant === "short";

  return (
    <div className={visionClassName}>
      {!isShort && (
        <header className="vision__header">
          <h1 className="vision__title">{t("ui.pages.vision.title")}</h1>
          <p className="vision__subtitle">{t("ui.pages.vision.subtitle")}</p>
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
