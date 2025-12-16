import React from "react";
import { useProfileContext } from "../../../02_context/context.index.js";
import { useEducation } from "./educationHooks/_educationHooks.index.js";
import {
  CategoryFilter,
  CategorySection,
} from "./educationComps/_educationComps.index.js";
import "./styles/education.css";

/**
 * Education Page Component
 * Displays education and certifications organized by categories
 * Content adapts based on current profile (dev/hospitality/both)
 */
const Education = ({ variant = "full" }) => {
  const { profile } = useProfileContext();
  const { educationContent, loading, activeCategory, handleCategoryFilter } =
    useEducation(profile);

  const educationClassName = `education ${
    variant === "full" ? "education--full" : "education--short"
  }`;

  if (loading) {
    return (
      <div className={educationClassName}>
        <div className="education__loading">Loading education data...</div>
      </div>
    );
  }

  if (
    !educationContent ||
    !educationContent.categories ||
    educationContent.categories.length === 0
  ) {
    return (
      <div className={educationClassName}>
        <div className="education__empty">
          <p>No education data available for the selected profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={educationClassName}>
      <header className="education__header">
        <h1 className="education__title">Education & Certifications</h1>
        <p className="education__subtitle">
          Professional development across hospitality, technology, business, and
          marketing domains.
        </p>
      </header>

      <CategoryFilter
        categories={educationContent.categories.map((cat) => ({
          id: cat.id,
          title: cat.title,
        }))}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryFilter}
      />

      <div className="education__content">
        {educationContent.categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Education;
