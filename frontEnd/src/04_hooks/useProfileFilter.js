import { useMemo } from 'react';
import { useProfileContext } from '../02_context/context.index.js';
import { filterDataByProfile, filterArrayByProfile, getProfileContent } from '../07_utils/_utils.index.js';

/**
 * Custom hook for filtering content based on current profile
 * @param {Object|Array} data - Data to filter
 * @returns {Object} - Filtered data and profile information
 */
const useProfileFilter = (data) => {
  const { profile, isDeveloper, isHospitality, isBoth } = useProfileContext();

  // Memoize filtered data to avoid unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!data) return null;

    if (Array.isArray(data)) {
      return filterArrayByProfile(data, profile);
    }

    return filterDataByProfile(data, profile);
  }, [data, profile]);

  return {
    data: filteredData,
    profile,
    isDeveloper,
    isHospitality,
    isBoth,
    getContent: (content) => getProfileContent(content, profile)
  };
};

export default useProfileFilter;

