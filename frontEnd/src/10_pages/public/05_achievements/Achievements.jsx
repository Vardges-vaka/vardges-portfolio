import React from "react";
import { useTranslation } from "react-i18next";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useAchievements } from "./achievementsHooks/_achievementsHooks.index.js";
import {
  CategoryFilter,
  CategorySection,
  OverallSummary,
  AchievementModal,
} from "./achievementsComps/_achievementsComps.index.js";
import "./styles/achievements.css";


const Achievements = ({ variant = "full" }) => {
  const { t } = useTranslation("tempContent");
  const { profile } = useProfileContext();
  const {
    achievementsContent,
    loading,
    activeCategory,
    selectedAchievement,
    handleCategoryFilter,
    handleAchievementClick,
    handleCloseDetail,
  } = useAchievements(profile);

  const achievementsClassName = `achievements ${
    variant === "full" ? "achievements--full" : "achievements--short"
  }`;

  if (loading) {
    return (
      <div className={achievementsClassName}>
        <div className="achievements__loading">
          {t("ui.loading.achievements")}
        </div>
      </div>
    );
  }

  if (
    !achievementsContent ||
    !achievementsContent.categories ||
    achievementsContent.categories.length === 0
  ) {
    return (
      <div className={achievementsClassName}>
        <div className="achievements__empty">
          <p>{t("ui.empty.achievements")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={achievementsClassName}>
      <header className="achievements__header">
        <h1 className="achievements__title">
          {t("ui.pages.achievements.title")}
        </h1>
        <p className="achievements__subtitle">
          {t("ui.pages.achievements.subtitle")}
        </p>
      </header>

      <CategoryFilter
        categories={achievementsContent.categories.map((cat) => ({
          id: cat.id,
          title: cat.title,
        }))}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryFilter}
      />

      <div className="achievements__content">
        {achievementsContent.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onAchievementClick={handleAchievementClick}
          />
        ))}
      </div>

      {achievementsContent.overallSummary && (
        <OverallSummary summary={achievementsContent.overallSummary} />
      )}

      {/* Achievement Detail Modal */}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Achievements;
