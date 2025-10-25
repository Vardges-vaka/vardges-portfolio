/**
 * Security logging methods
 * Provides specialized logging for security-related events
 */

export const createSecurityMethods = (logger) => ({
  /**
   * Log rate limit hit
   * @param {string} ip - IP address that hit the rate limit
   * @param {string} endpoint - Endpoint that was rate limited
   * @param {object} meta - Additional metadata (attempts, timeWindow, etc.)
   */
  rateLimitHit: (ip, endpoint, meta = {}) => {
    logger.warn(`🚨 Rate limit hit: ${ip} on ${endpoint}`, {
      type: "security_rate_limit",
      ip,
      endpoint,
      ...meta,
    });
  },

  /**
   * Log suspicious activity
   * @param {string} activity - Description of the suspicious activity
   * @param {object} meta - Additional metadata (ip, userAgent, riskScore, etc.)
   */
  suspiciousActivity: (activity, meta = {}) => {
    logger.error(`🚨🔍 Suspicious activity detected: ${activity}`, {
      type: "security_suspicious",
      activity,
      ...meta,
    });
  },
});
