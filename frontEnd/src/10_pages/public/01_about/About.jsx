import React from "react";
import { useTranslation } from "react-i18next";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useAbout } from "./aboutHooks/_aboutHooks.index.js";
import {
  AboutIntro,
  PrinciplesSection,
  ValuesSection,
  CurrentFocusSection,
} from "./aboutComps/_aboutComps.index.js";
import { getProfileContent } from "../../../07_utils/_utils.index.js";
import "./styles/about.css";

/**
 * About Page Component
 * Merged from Bio + Values + Vision
 * Displays personal info, intro, principles, values, and current focus
 */
const About = ({ variant = "full" }) => {
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const { aboutContent, loading, error } = useAbout(profile);

  const aboutClassName = `about ${
    variant === "full" ? "about--full" : "about--short"
  }`;

  if (loading) {
    return (
      <div className={aboutClassName}>
        <div className="about__loading">{t("ui.common.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={aboutClassName}>
        <div className="about__error">
          {t("ui.common.errorPrefix")} {error}
        </div>
      </div>
    );
  }

  if (!aboutContent) {
    return null;
  }

  const isShort = variant === "short";

  return (
    <div className={aboutClassName}>
      <div className="about__container">
        {/* Header - Only show in full variant */}
        {!isShort && (
          <header className="about__header">
            <h1 className="about__title">{t("ui.pages.about.title")}</h1>
          </header>
        )}

        {/* Personal Info Section - Only in full variant */}
        {!isShort && aboutContent.personalInfo && (
          <section className="about__personalInfo">
            <h2 className="about__name">{aboutContent.personalInfo.name}</h2>
            <p className="about__location">
              {aboutContent.personalInfo.location}
            </p>
            {aboutContent.personalInfo.languages && (
              <p className="about__languages">
                {t("ui.common.languages")}:{" "}
                {aboutContent.personalInfo.languages
                  .map((lang) => `${lang.name} (${lang.level})`)
                  .join(", ")}
              </p>
            )}
          </section>
        )}

        {/* Intro Section */}
        {aboutContent.intro && (
          <AboutIntro
            data={aboutContent.intro}
            profile={profile}
            variant={variant}
          />
        )}

        {/* Principles Section */}
        {aboutContent.principles && (
          <PrinciplesSection
            principles={aboutContent.principles}
            variant={variant}
          />
        )}

        {/* Values Section */}
        {aboutContent.coreValues && (
          <ValuesSection values={aboutContent.coreValues} variant={variant} />
        )}

        {/* Current Focus Section */}
        {aboutContent.currentFocus && (
          <CurrentFocusSection
            data={aboutContent.currentFocus}
            profile={profile}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
};

export default About;
