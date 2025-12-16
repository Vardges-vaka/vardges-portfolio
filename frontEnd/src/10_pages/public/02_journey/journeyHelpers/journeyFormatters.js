/**
 * Journey Helper Functions
 * Formatting and utility functions for Journey/Timeline page
 */

/**
 * Parse date string to Date object
 * @param {string} dateStr - Date string in YYYY-MM format
 * @returns {Date} - Date object
 */
export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1);
};

/**
 * Format date for display
 * @param {string} dateStr - Date string in YYYY-MM format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'Present';
  const date = parseDate(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Calculate duration between two dates
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string (null for current)
 * @returns {string} - Duration string
 */
export const calculateDuration = (startDate, endDate) => {
  const start = parseDate(startDate);
  const end = endDate ? parseDate(endDate) : new Date();
  
  if (!start) return '';
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0 && remainingMonths > 0) {
    return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? 's' : ''}`;
  } else {
    return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
  }
};

/**
 * Sort roles by start date (most recent first)
 * @param {Array} roles - Array of role objects
 * @returns {Array} - Sorted array
 */
export const sortRolesByDate = (roles) => {
  return [...roles].sort((a, b) => {
    const dateA = parseDate(a.startDate);
    const dateB = parseDate(b.startDate);
    return dateB - dateA; // Most recent first
  });
};

/**
 * Filter roles by category
 * @param {Array} roles - Array of role objects
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered array
 */
export const filterRolesByCategory = (roles, category) => {
  if (!category || category === 'all') return roles;
  return roles.filter(role => role.category === category);
};

/**
 * Get unique categories from roles
 * @param {Array} roles - Array of role objects
 * @returns {Array} - Array of unique categories
 */
export const getUniqueCategories = (roles) => {
  const categories = roles.map(role => role.category);
  return ['all', ...new Set(categories)];
};

/**
 * Get category color class
 * @param {string} category - Category name
 * @returns {string} - CSS class name
 */
export const getCategoryColorClass = (category) => {
  const colorMap = {
    'tech': 'category--tech',
    'hospitality': 'category--hospitality',
    'hybrid': 'category--hybrid',
    'consulting': 'category--consulting'
  };
  return colorMap[category] || 'category--default';
};

/**
 * Get type badge text
 * @param {string} type - Role type
 * @returns {string} - Display text
 */
export const getTypeBadgeText = (type) => {
  const typeMap = {
    'operations': 'Operations',
    'service': 'Service',
    'premium': 'Premium',
    'foundation': 'Foundation',
    'consulting': 'Consulting',
    'hybrid': 'Hybrid',
    'tech': 'Technology'
  };
  return typeMap[type] || type;
};

