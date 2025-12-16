/**
 * Bio Helper Functions
 * Formatting and utility functions for Bio page
 */

/**
 * Format language list into readable string
 * @param {Array} languages - Array of language objects
 * @returns {string} - Formatted string
 */
export const formatLanguages = (languages) => {
  if (!Array.isArray(languages)) return '';
  
  return languages
    .map(lang => `${lang.name} (${lang.level})`)
    .join(', ');
};

/**
 * Get icon name for principle
 * @param {string} iconKey - Icon key from data
 * @returns {string} - Icon component name
 */
export const getPrincipleIcon = (iconKey) => {
  const iconMap = {
    'target': 'Target',
    'handshake': 'Handshake',
    'layers': 'Layers',
    'shield-check': 'ShieldCheck'
  };
  
  return iconMap[iconKey] || 'Circle';
};

/**
 * Filter content by profile
 * @param {Object} content - Content with profile variants
 * @param {string} profile - Current profile
 * @returns {Object} - Profile-specific content
 */
export const filterByProfile = (content, profile) => {
  if (!content) return null;
  
  // If content has profile-specific versions
  if (content[profile]) {
    return content[profile];
  }
  
  // If content has profiles array
  if (content.profiles) {
    const shouldShow = content.profiles.includes(profile) || 
                       content.profiles.includes('both');
    return shouldShow ? content : null;
  }
  
  return content;
};

/**
 * Extract highlights from intro based on profile
 * @param {Object} intro - Intro object with profile variants
 * @param {string} profile - Current profile
 * @returns {Array} - Highlights array
 */
export const getIntroHighlights = (intro, profile) => {
  const profileContent = filterByProfile(intro, profile);
  return profileContent?.highlights || [];
};

