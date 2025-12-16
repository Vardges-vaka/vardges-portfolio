import React from "react";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useSkills } from "./skillsHooks/_skillsHooks.index.js";
import { useEducation } from "../06_education/educationHooks/_educationHooks.index.js";
import { SkillsNav, SkillCategory } from "./skillsComps/_skillsComps.index.js";
import { CategorySection } from "../06_education/educationComps/_educationComps.index.js";
import "./styles/skills.css";

/**
 * Skills & Learning Page Component
 * Displays skills organized by categories with tabbed navigation
 * Includes Education & Certifications section
 * Content adapts based on current profile (dev/hospitality/both)
 */
const Skills = ({ variant = "full" }) => {
  const { profile } = useProfileContext();
  const { skillsContent, loading, activeCategory, handleCategoryChange } =
    useSkills(profile);
  const { educationContent, loading: educationLoading } = useEducation(profile);

  const skillsClassName = `skills ${
    variant === "full" ? "skills--full" : "skills--short"
  }`;

  if (loading) {
    return (
      <div className={skillsClassName}>
        <div className="skills__loading">Loading skills...</div>
      </div>
    );
  }

  if (
    !skillsContent ||
    !skillsContent.categories ||
    Object.keys(skillsContent.categories).length === 0
  ) {
    return (
      <div className={skillsClassName}>
        <div className="skills__empty">
          <p>No skills available for the selected profile.</p>
        </div>
      </div>
    );
  }

  const activeCategoryData = skillsContent.categories[activeCategory];

  return (
    <div className={skillsClassName}>
      <header className="skills__header">
        <h1 className="skills__title">Skills & Learning</h1>
        <p className="skills__subtitle">
          Technical skills, business expertise, and professional certifications.
        </p>
      </header>

      <div className="skills__content">
        <SkillsNav
          categories={skillsContent.categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="skills__categoryContainer">
          {activeCategoryData && (
            <SkillCategory
              category={activeCategoryData}
              categoryKey={activeCategory}
            />
          )}
        </div>
      </div>

      {/* Education & Certifications Section */}
      {!variant || variant === "full" ? (
        educationContent?.categories && educationContent.categories.length > 0 && (
          <section className="skills__education">
            <h2 className="skills__educationTitle">Education & Certifications</h2>
            <div className="skills__educationContent">
              {educationContent.categories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          </section>
        )
      ) : null}
    </div>
  );
};

export default Skills;
