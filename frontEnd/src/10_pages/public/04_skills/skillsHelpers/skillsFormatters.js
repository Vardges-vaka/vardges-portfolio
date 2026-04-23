/**
 * Skills Helper Functions
 * Utility functions for Skills page
 */

/**
 * Get proficiency level display name
 * @param {string} level - Proficiency level (native, advanced, proficient, intermediate, beginner)
 * @returns {object} Display properties
 */
export const getProficiencyDisplay = (level) => {
  const proficiencyMap = {
    native: {
      label: "Native",
      percentage: 100,
      color: "proficiency-native",
    },
    advanced: {
      label: "Advanced",
      percentage: 90,
      color: "proficiency-advanced",
    },
    proficient: {
      label: "Proficient",
      percentage: 75,
      color: "proficiency-proficient",
    },
    intermediate: {
      label: "Intermediate",
      percentage: 60,
      color: "proficiency-intermediate",
    },
    beginner: {
      label: "Beginner",
      percentage: 40,
      color: "proficiency-beginner",
    },
  };

  return proficiencyMap[level] || proficiencyMap.intermediate;
};

/**
 * Get category icon name
 * @param {string} categoryId - Category identifier
 * @returns {string} Icon name
 */
export const getCategoryIcon = (categoryId) => {
  const iconMap = {
    technical: "code",
    marketing: "trending-up",
    business: "briefcase",
    soft: "users",
  };

  return iconMap[categoryId] || "circle";
};

/**
 * Filter skills by profile
 * @param {object} skillsData - Complete skills data
 * @param {string} currentProfile - Current profile (dev/hospitality/both)
 * @returns {object} Filtered skills data
 */
export const filterSkillsByProfile = (skillsData, currentProfile) => {
  if (!skillsData || !skillsData.categories) return { categories: {} };

  const filteredCategories = {};

  Object.keys(skillsData.categories).forEach((categoryKey) => {
    const category = skillsData.categories[categoryKey];

    // Check if category is relevant for current profile
    if (
      category.profiles &&
      (category.profiles.includes(currentProfile) ||
        category.profiles.includes("both"))
    ) {
      filteredCategories[categoryKey] = category;
    }
  });

  return { categories: filteredCategories };
};

/**
 * Get active categories for current profile
 * @param {object} skillsData - Complete skills data
 * @param {string} currentProfile - Current profile (dev/hospitality/both)
 * @returns {array} Array of active category IDs
 */
export const getActiveCategories = (skillsData, currentProfile) => {
  const filtered = filterSkillsByProfile(skillsData, currentProfile);
  return Object.keys(filtered.categories);
};

/**
 * Get total skills count for a category
 * @param {object} category - Category object
 * @returns {number} Total number of skills
 */
export const getTotalSkillsCount = (category) => {
  if (!category || !category.subcategories) return 0;

  let count = 0;
  Object.values(category.subcategories).forEach((subcategory) => {
    if (subcategory.skills && Array.isArray(subcategory.skills)) {
      count += subcategory.skills.length;
    }
  });

  return count;
};

/**
 * Format platforms array for display
 * @param {array} platforms - Array of platform names
 * @returns {string} Formatted string
 */
export const formatPlatforms = (platforms, moreLabel = "more") => {
  if (!platforms || platforms.length === 0) return "";

  if (platforms.length <= 3) {
    return platforms.join(", ");
  }

  return `${platforms.slice(0, 3).join(", ")} +${
    platforms.length - 3
  } ${moreLabel}`;
};

/**
 * Get category display name
 * @param {string} categoryId - Category ID
 * @returns {string} Display name
 */
export const getCategoryDisplayName = (categoryId) => {
  const nameMap = {
    technical: "Technical Skills",
    marketing: "Marketing & Growth",
    business: "Business & Operations",
    soft: "Soft Skills & Languages",
  };

  return nameMap[categoryId] || categoryId;
};

/**
 * Sort subcategories by a specific order
 * @param {object} subcategories - Subcategories object
 * @param {string} categoryId - Category ID
 * @returns {array} Sorted array of [key, subcategory] pairs
 */
export const getSortedSubcategories = (subcategories, categoryId) => {
  if (!subcategories) return [];

  const sortOrders = {
    technical: [
      "frontend",
      "backend",
      "databases",
      "integrations",
    ],
    marketing: [
      "foundations",
      "digital",
      "aggregators",
      "brand",
      "data",
    ],
    business: [
      "operations",
      "leadership",
      "financial",
      "customer",
      "process",
      "expansion",
      "coordination",
      "development",
    ],
    soft: ["languages", "core"],
  };

  const order = sortOrders[categoryId] || [];
  const entries = Object.entries(subcategories);

  if (order.length === 0) return entries;

  return entries.sort((a, b) => {
    const indexA = order.indexOf(a[0]);
    const indexB = order.indexOf(b[0]);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
};

