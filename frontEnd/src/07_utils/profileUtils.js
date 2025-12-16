/**
 * Profile Utility Functions
 * Helper functions for filtering and managing profile-based content
 */

/**
 * Filter content based on current profile
 * @param {Object} content - Content object with profile tags
 * @param {string} currentProfile - Current profile ('dev', 'hospitality', 'both')
 * @returns {Object} - Filtered content appropriate for current profile
 */
export const filterByProfile = (content, currentProfile) => {
  if (!content) return null;

  // If content has profile-specific versions
  if (content[currentProfile]) {
    return content[currentProfile];
  }

  // If content has profiles array, check if current profile is included
  if (Array.isArray(content.profiles)) {
    const shouldShow = content.profiles.includes(currentProfile) || 
                       content.profiles.includes('both');
    return shouldShow ? content : null;
  }

  // If no profile specification, return content as-is
  return content;
};

/**
 * Filter an array of items based on profile
 * @param {Array} items - Array of items with profile tags
 * @param {string} currentProfile - Current profile
 * @returns {Array} - Filtered array
 */
export const filterArrayByProfile = (items, currentProfile) => {
  if (!Array.isArray(items)) return [];

  return items.filter(item => {
    if (!item.profiles) return true;
    
    return item.profiles.includes(currentProfile) || 
           item.profiles.includes('both');
  });
};

/**
 * Get profile-specific content from an object
 * @param {Object} data - Data object with profile-specific keys
 * @param {string} profile - Current profile
 * @returns {*} - Content for the specified profile
 */
export const getProfileContent = (data, profile) => {
  if (!data) return null;

  // Check for profile-specific key
  if (data[profile]) {
    return data[profile];
  }

  // Fallback to 'both' if current profile not found
  if (data.both) {
    return data.both;
  }

  // Return data as-is if no profile keys
  return data;
};

/**
 * Check if content should be displayed for current profile
 * @param {Array|string} profiles - Profile tags
 * @param {string} currentProfile - Current profile
 * @returns {boolean} - Whether content should be displayed
 */
export const shouldShowForProfile = (profiles, currentProfile) => {
  if (!profiles) return true;

  if (Array.isArray(profiles)) {
    return profiles.includes(currentProfile) || profiles.includes('both');
  }

  if (typeof profiles === 'string') {
    return profiles === currentProfile || profiles === 'both';
  }

  return true;
};

/**
 * Filter data object recursively based on profile
 * @param {Object} data - Data object
 * @param {string} profile - Current profile
 * @returns {Object} - Filtered data
 */
export const filterDataByProfile = (data, profile) => {
  if (!data || typeof data !== 'object') return data;

  const result = {};

  for (const key in data) {
    const value = data[key];

    // If value has profile-specific versions
    if (value && typeof value === 'object' && (value.dev || value.hospitality || value.both)) {
      result[key] = getProfileContent(value, profile);
    }
    // If value is array, filter it
    else if (Array.isArray(value)) {
      result[key] = filterArrayByProfile(value, profile);
    }
    // If value is object, recurse
    else if (value && typeof value === 'object') {
      // Check for profiles array
      if (value.profiles && !shouldShowForProfile(value.profiles, profile)) {
        continue; // Skip this item
      }
      result[key] = filterDataByProfile(value, profile);
    }
    // Otherwise, include as-is
    else {
      result[key] = value;
    }
  }

  return result;
};

