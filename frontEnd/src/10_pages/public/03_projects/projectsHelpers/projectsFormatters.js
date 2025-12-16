/**
 * Projects Helper Functions
 * Formatting and utility functions for Projects page
 */

/**
 * Get category display name
 * @param {string} category - Category key
 * @returns {string} - Display name
 */
export const getCategoryDisplayName = (category) => {
  const displayNames = {
    'tech': 'Technology',
    'brands': 'Brand Development',
    'bar': 'Bar & Beverage',
    'marketing': 'Marketing & Growth',
    'all': 'All Projects'
  };
  return displayNames[category] || category;
};

/**
 * Get category icon class
 * @param {string} category - Category key
 * @returns {string} - Icon class name
 */
export const getCategoryIcon = (category) => {
  const icons = {
    'tech': 'Code',
    'brands': 'Palette',
    'bar': 'Wine',
    'marketing': 'TrendingUp',
    'all': 'Grid'
  };
  return icons[category] || 'Circle';
};

/**
 * Filter projects by category
 * @param {Object} categories - Categories object
 * @param {string} selectedCategory - Selected category
 * @returns {Array} - Filtered projects
 */
export const getProjectsByCategory = (categories, selectedCategory) => {
  if (!categories) return [];
  
  if (selectedCategory === 'all') {
    // Return all projects from all categories
    return Object.values(categories).flatMap(cat => cat.projects || []);
  }
  
  const category = categories[selectedCategory];
  return category?.projects || [];
};

/**
 * Get all available categories
 * @param {Object} categories - Categories object
 * @returns {Array} - Array of category keys
 */
export const getAvailableCategories = (categories) => {
  if (!categories) return ['all'];
  return ['all', ...Object.keys(categories)];
};

/**
 * Get tech stack color
 * @param {string} tech - Tech name
 * @returns {string} - Color class
 */
export const getTechStackColor = (tech) => {
  const colorMap = {
    'React': 'tech--react',
    'Node.js': 'tech--node',
    'MongoDB': 'tech--mongo',
    'Express': 'tech--express',
    'AWS': 'tech--aws',
    'Stripe': 'tech--stripe',
    'Socket.io': 'tech--socket'
  };
  return colorMap[tech] || 'tech--default';
};

/**
 * Format metrics for display
 * @param {Object} metrics - Metrics object
 * @returns {Array} - Array of formatted metric objects
 */
export const formatMetrics = (metrics) => {
  if (!metrics) return [];
  
  return Object.entries(metrics).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value
  }));
};

/**
 * Truncate description
 * @param {string} description - Full description
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated description
 */
export const truncateDescription = (description, maxLength = 150) => {
  if (!description || description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

