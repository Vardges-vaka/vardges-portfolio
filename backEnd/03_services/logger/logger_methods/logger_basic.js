/**
 * Basic logging methods
 * Provides direct access to Winston's standard logging methods
 */

export const createBasicMethods = (logger) => ({
  /**
   * Log error message
   * @param {string} message - Error message
   * @param {object} meta - Additional metadata
   */
  error: (message, meta = {}) => logger.error(message, meta),

  /**
   * Log warning message
   * @param {string} message - Warning message
   * @param {object} meta - Additional metadata
   */
  warn: (message, meta = {}) => logger.warn(message, meta),

  /**
   * Log info message
   * @param {string} message - Info message
   * @param {object} meta - Additional metadata
   */
  info: (message, meta = {}) => logger.info(message, meta),

  /**
   * Log HTTP message
   * @param {string} message - HTTP message
   * @param {object} meta - Additional metadata
   */
  http: (message, meta = {}) => logger.http(message, meta),

  /**
   * Log debug message
   * @param {string} message - Debug message
   * @param {object} meta - Additional metadata
   */
  debug: (message, meta = {}) => logger.debug(message, meta),
});
