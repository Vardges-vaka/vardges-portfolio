import bcrypt from "bcrypt";

/**
 * Searches for an access code across all role arrays in Access document
 * Compares plain text access code against bcrypt hashed codes
 * @param {string} accessCode - The plain text access code to search for
 * @param {Object} accessDoc - The Access document from MongoDB
 * @returns {Promise<{role: string|null, hashedCode: string|null}>} Object with role name and matched hash, or nulls if not found
 */
export const findAccessCodeRole = async (accessCode, accessDoc) => {
  if (!accessDoc || !accessDoc.newCodes) {
    return { role: null, hashedCode: null };
  }

  const roles = ["guest", "user", "admin", "superAdmin"];

  // Search each role array for the access code
  for (const role of roles) {
    if (accessDoc.newCodes[role] && accessDoc.newCodes[role].length > 0) {
      // Compare plain text code against each hashed code in the role array
      for (const hashedCode of accessDoc.newCodes[role]) {
        const isMatch = await bcrypt.compare(accessCode, hashedCode);
        if (isMatch) {
          // Return both role and the hashed code that matched
          return { role, hashedCode };
        }
      }
    }
  }

  return { role: null, hashedCode: null }; // Code not found in any role array
};
