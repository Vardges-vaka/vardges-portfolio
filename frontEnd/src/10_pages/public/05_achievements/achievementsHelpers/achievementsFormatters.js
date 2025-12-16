/**
 * Achievements Helper Functions
 * Utility functions for Achievements page
 */

/**
 * Filter achievements by profile
 * @param {object} achievementsData - Complete achievements data
 * @param {string} currentProfile - Current profile (dev/hospitality/both)
 * @returns {object} Filtered achievements data
 */
export const filterAchievementsByProfile = (achievementsData, currentProfile) => {
  if (!achievementsData || !achievementsData.categories) return { categories: [] };

  const filteredCategories = achievementsData.categories.filter((category) => {
    return (
      category.profiles &&
      (category.profiles.includes(currentProfile) ||
        category.profiles.includes("both"))
    );
  });

  return {
    categories: filteredCategories,
    overallSummary: achievementsData.overallSummary,
  };
};

/**
 * Get category icon name
 * @param {string} icon - Icon identifier
 * @returns {string} Icon name for lucide-react
 */
export const getCategoryIconName = (icon) => {
  const iconMap = {
    wine: "Wine",
    code: "Code",
    "trending-up": "TrendingUp",
    users: "Users",
    briefcase: "Briefcase",
  };

  return iconMap[icon] || "Award";
};

/**
 * Get total achievements count for a category
 * @param {object} category - Category object
 * @returns {number} Total number of achievements
 */
export const getTotalAchievementsCount = (category) => {
  if (!category || !category.achievements) return 0;
  return category.achievements.length;
};

/**
 * Format metrics object for display
 * @param {object} metrics - Metrics object
 * @returns {array} Array of formatted metric objects
 */
export const formatAchievementMetrics = (metrics) => {
  if (!metrics || typeof metrics !== "object") return [];

  return Object.entries(metrics).map(([key, value]) => ({
    label: key
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase()),
    value: value,
  }));
};

/**
 * Get category display color
 * @param {string} categoryId - Category ID
 * @returns {string} Color class
 */
export const getCategoryColor = (categoryId) => {
  const colorMap = {
    hospitality: "category-hospitality",
    technology: "category-technology",
    marketing: "category-marketing",
    leadership: "category-leadership",
  };

  return colorMap[categoryId] || "category-default";
};

/**
 * Truncate text to specific length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

