import React from "react";
import { useTranslation } from "react-i18next";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useJourney } from "./journeyHooks/_journeyHooks.index.js";
import {
  TimelineContainer,
  CategoryFilter,
  ProfessionalDevelopment,
  CrossRoleThemes,
} from "./journeyComps/_journeyComps.index.js";
import { getUniqueCategories } from "./journeyHelpers/_journeyHelpers.index.js";
import "./styles/journey.css";

/**
 * Journey Page Component
 * Displays professional journey timeline with role cards
 * Content adapts based on current profile (dev/hospitality/both)
 */
const Journey = ({ variant = "full" }) => {
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const {
    journeyContent,
    loading,
    error,
    expandedRoleId,
    selectedCategory,
    filteredRoles,
    toggleRoleExpansion,
    handleCategoryChange,
  } = useJourney(profile);

  const journeyClassName = `journey ${
    variant === "full" ? "journey--full" : "journey--short"
  }`;
  const isShort = variant === "short";

  if (loading) {
    return (
      <div className={journeyClassName}>
        <div className="journey__loading">{t("ui.common.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={journeyClassName}>
        <div className="journey__error">
          {t("ui.common.errorPrefix")} {error}
        </div>
      </div>
    );
  }

  if (!journeyContent) {
    return null;
  }

  // Get unique categories for filter
  const categories = getUniqueCategories(journeyContent.roles || []);

  return (
    <div className={journeyClassName}>
      <div className="journey__container">
        {/* Page Header - Only in full variant */}
        {!isShort && (
          <header className="journey__header">
            <h1 className="journey__title">{t("ui.pages.journey.title")}</h1>
            {journeyContent.narrative && (
              <div className="journey__narrative">
                <p className="journey__overview">
                  {journeyContent.narrative.overview}
                </p>
                <p className="journey__currentFocus">
                  {journeyContent.narrative.currentFocus}
                </p>
              </div>
            )}
          </header>
        )}

        {/* Category Filter - Only in full variant */}
        {!isShort && categories && categories.length > 1 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {/* Timeline */}
        <TimelineContainer
          roles={filteredRoles}
          expandedRoleId={expandedRoleId}
          onToggleRole={toggleRoleExpansion}
          variant={variant}
        />

        {/* Professional Development Section - Only in full variant */}
        {!isShort && journeyContent.professionalDevelopment && (
          <ProfessionalDevelopment
            development={journeyContent.professionalDevelopment}
          />
        )}

        {/* Cross-Role Themes - Only in full variant */}
        {!isShort && journeyContent.themes && (
          <CrossRoleThemes themes={journeyContent.themes} />
        )}
      </div>
    </div>
  );
};

export default Journey;
