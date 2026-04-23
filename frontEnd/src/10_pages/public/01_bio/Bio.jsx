import React from "react";
import { useTranslation } from "react-i18next";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useBio } from "./bioHooks/_bioHooks.index.js";
import {
  BioIntro,
  PrinciplesCards,
  LanguageJourney,
  CareerDirection,
} from "./bioComps/_bioComps.index.js";
import { getProfileContent } from "../../../07_utils/_utils.index.js";
import "./styles/bio.css";

/**
 * Bio Page Component
 * Displays personal bio, principles, language journey, and career direction
 * Content adapts based on current profile (dev/hospitality/both)
 */
const Bio = ({ variant = "full" }) => {
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const { bioContent, loading, error } = useBio(profile);

  const bioClassName = `bio ${variant === "full" ? "bio--full" : "bio--short"}`;

  if (loading) {
    return (
      <div className={bioClassName}>
        <div className="bio__loading">{t("ui.common.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={bioClassName}>
        <div className="bio__error">
          {t("ui.common.errorPrefix")} {error}
        </div>
      </div>
    );
  }

  if (!bioContent) {
    return null;
  }

  // Get profile-specific intro content
  const introContent = getProfileContent(bioContent.intro, profile);
  const careerContent = getProfileContent(bioContent.careerDirection, profile);
  const isShort = variant === "short";

  return (
    <div className={bioClassName}>
      <div className="bio__container">
        {/* Header - Only show in full variant */}
        {!isShort && (
          <header className="bio__header">
            <h1 className="bio__title">{t("ui.pages.bio.title")}</h1>
          </header>
        )}

        {/* Personal Info Section - Only in full variant */}
        {!isShort && bioContent.personalInfo && (
          <section className="bio__personalInfo">
            <h2 className="bio__name">{bioContent.personalInfo.name}</h2>
            <p className="bio__location">{bioContent.personalInfo.location}</p>
            {bioContent.personalInfo.languages && (
              <p className="bio__languages">
                {t("ui.common.languages")}:{" "}
                {bioContent.personalInfo.languages
                  .map((lang) => `${lang.name} (${lang.level})`)
                  .join(", ")}
              </p>
            )}
          </section>
        )}

        {/* Intro Section */}
        {introContent && (
          <BioIntro data={introContent} profile={profile} variant={variant} />
        )}

        {/* Principles Section */}
        {bioContent.principles && (
          <PrinciplesCards
            principles={bioContent.principles}
            variant={variant}
          />
        )}

        {/* Language Journey Section - Only in full variant */}
        {!isShort && bioContent.languageJourney && (
          <LanguageJourney
            story={bioContent.languageJourney}
            variant={variant}
          />
        )}

        {/* Career Direction Section - Only in full variant */}
        {!isShort && careerContent && (
          <CareerDirection
            directions={careerContent}
            profile={profile}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
};

export default Bio;
