/**
 * Authentication logging methods
 * Provides specialized logging for authentication events
 */

export const createAuthMethods = (logger) => ({
  /**
   * Log successful user login
   * @param {string} userId - User ID or identifier
   * @param {object} meta - Additional metadata (ip, userAgent, method, etc.)
   */
  login: (userId, meta = {}) => {
    logger.info(`🔐 User login: ${userId}`, {
      type: "auth_login",
      userId,
      ...meta,
    });
  },

  /**
   * Log user logout
   * @param {string} userId - User ID or identifier
   * @param {object} meta - Additional metadata (sessionDuration, etc.)
   */
  logout: (userId, meta = {}) => {
    logger.info(`🔐🚪 User logout: ${userId}`, {
      type: "auth_logout",
      userId,
      ...meta,
    });
  },

  /**
   * Log failed authentication attempt
   * @param {object} attempt - Details about the failed attempt (email, ip, reason, etc.)
   * @param {object} meta - Additional metadata
   */
  failed: (attempt, meta = {}) => {
    logger.warn(`🔐❌ Authentication failed`, {
      type: "auth_failed",
      attempt,
      ...meta,
    });
  },
});
