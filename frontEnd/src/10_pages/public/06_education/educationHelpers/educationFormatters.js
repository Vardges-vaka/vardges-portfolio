/**
 * Education Helper Functions
 * Utility functions for Education page
 */

/**
 * Filter education data by profile
 * @param {object} educationData - Complete education data
 * @param {string} currentProfile - Current profile (dev/hospitality/both)
 * @returns {object} Filtered education data
 */
export const filterEducationByProfile = (educationData, currentProfile) => {
  if (!educationData || !educationData.categories) return { categories: [] };

  const filteredCategories = educationData.categories.filter((category) => {
    return (
      category.profiles &&
      (category.profiles.includes(currentProfile) ||
        category.profiles.includes("both"))
    );
  });

  return { categories: filteredCategories };
};

/**
 * Get category icon name
 * @param {string} icon - Icon identifier
 * @returns {string} Icon name
 */
export const getCategoryIconName = (icon) => {
  const iconMap = {
    wine: "Wine",
    "glass-water": "GlassWater",
    code: "Code",
    briefcase: "Briefcase",
    "trending-up": "TrendingUp",
    "file-check": "FileCheck",
  };

  return iconMap[icon] || "GraduationCap";
};

/**
 * Get total certifications count for a category
 * @param {object} category - Category object
 * @returns {number} Total number of certifications
 */
export const getTotalCertificationsCount = (category) => {
  if (!category || !category.certifications) return 0;
  return category.certifications.length;
};

/**
 * Group certifications by year
 * @param {array} certifications - Array of certification objects
 * @returns {object} Certifications grouped by year
 */
export const groupByYear = (certifications) => {
  if (!certifications || certifications.length === 0) return {};

  const grouped = {};

  certifications.forEach((cert) => {
    const year = cert.year || "Ongoing";
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(cert);
  });

  return grouped;
};

/**
 * Get certification type badge color
 * @param {string} type - Certification type
 * @returns {string} Color class
 */
export const getCertificationTypeColor = (type) => {
  const colorMap = {
    "Advanced Certification": "cert-advanced",
    Diploma: "cert-diploma",
    "Professional Certificate": "cert-professional",
    Course: "cert-course",
    Credential: "cert-credential",
  };

  return colorMap[type] || "cert-default";
};

/**
 * Sort categories by display order
 * @param {array} categories - Array of category objects
 * @returns {array} Sorted categories
 */
export const sortCategoriesByOrder = (categories) => {
  const order = [
    "hospitality",
    "beverage",
    "technology",
    "business",
    "marketing",
    "other",
  ];

  return [...categories].sort((a, b) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
};

