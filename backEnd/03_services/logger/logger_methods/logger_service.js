/**
 * Service logging methods
 * Provides specialized logging for service lifecycle events
 */

export const createServiceMethods = (logger) => ({
  /**
   * Log service start
   * @param {string} serviceName - Name of the service
   * @param {object} meta - Additional metadata
   */
  start: (serviceName, meta = {}) => {
    logger.info(`▄︻デ══━一💥 ${serviceName} |<=>| [STARTED]`, {
      type: "service_start",
      service: serviceName,
      ...meta,
    });
  },

  /**
   * Log service request
   * @param {string} serviceName - Name of the service
   * @param {*} request - Request data
   * @param {object} meta - Additional metadata
   */
  request: (serviceName, request, meta = {}) => {
    logger.debug(`💾 💾 💾 ${serviceName} |<=>| [REQUEST]`, {
      type: "service_request",
      service: serviceName,
      request,
      ...meta,
    });
  },

  /**
   * Log service error
   * @param {string} serviceName - Name of the service
   * @param {Error} error - Error object
   * @param {object} meta - Additional metadata
   */
  error: (serviceName, error, meta = {}) => {
    logger.error(`🚫 🚫 🚫 ${serviceName} |<=>| [ERROR]`, {
      type: "service_error",
      service: serviceName,
      error: error.message,
      stack: error.stack,
      ...meta,
    });
  },

  /**
   * Log service completion
   * @param {string} serviceName - Name of the service
   * @param {object} meta - Additional metadata
   */
  complete: (serviceName, meta = {}) => {
    logger.info(`🏁 🏁 🏁 ${serviceName} |<=>| [COMPLETED]`, {
      type: "service_complete",
      service: serviceName,
      ...meta,
    });
  },
});
