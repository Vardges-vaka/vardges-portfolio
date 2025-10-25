/**
 * Controller logging methods
 * Provides specialized logging for controller lifecycle events
 */

export const createControllerMethods = (logger) => ({
  /**
   * Log controller start
   * @param {string} controllerName - Name of the controller
   * @param {object} meta - Additional metadata (userId, ip, etc.)
   */
  start: (controllerName, meta = {}) => {
    logger.info(`🛑 ↘️ 🏃‍➡️ ${controllerName} |<=>| [STARTED]`, {
      type: "controller_start",
      controller: controllerName,
      ...meta,
    });
  },

  /**
   * Log controller success
   * @param {string} controllerName - Name of the controller
   * @param {*} data - Response data (optional)
   * @param {object} meta - Additional metadata
   */
  success: (controllerName, data = null, meta = {}) => {
    logger.info(`⛟ 📦 🚚 ${controllerName} |<=>| [SUCCESS]`, {
      type: "controller_success",
      controller: controllerName,
      data,
      ...meta,
    });
  },

  /**
   * Log controller error
   * @param {string} controllerName - Name of the controller
   * @param {Error} error - Error object
   * @param {object} meta - Additional metadata
   */
  error: (controllerName, error, meta = {}) => {
    logger.error(`⚠️ ☠️ 🚨 ${controllerName} |<=>| [ERROR]`, {
      type: "controller_error",
      controller: controllerName,
      error: error.message,
      stack: error.stack,
      ...meta,
    });
  },

  /**
   * Log controller completion
   * @param {string} controllerName - Name of the controller
   * @param {object} meta - Additional metadata
   */
  complete: (controllerName, meta = {}) => {
    logger.info(`🚩 🚩 🚩 ${controllerName} |<=>| [COMPLETED]`, {
      type: "controller_complete",
      controller: controllerName,
      ...meta,
    });
  },
});
