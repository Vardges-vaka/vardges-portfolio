import React from "react";
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
        <div className="achievements__loading">Loading achievements...</div>
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
          <p>No achievements available for the selected profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={achievementsClassName}>
      <header className="achievements__header">
        <h1 className="achievements__title">Achievements & Milestones</h1>
        <p className="achievements__subtitle">
          Key accomplishments across hospitality, technology, marketing, and
          leadership domains.
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
