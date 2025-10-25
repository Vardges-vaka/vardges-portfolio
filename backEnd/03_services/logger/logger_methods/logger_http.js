/**
 * HTTP request logging methods
 * Provides specialized logging for HTTP requests and responses
 */

export const createHttpMethods = (logger) => ({
  /**
   * Log HTTP request with response details
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {number} responseTime - Response time in milliseconds
   */
  httpRequest: (req, res, responseTime) => {
    logger.http("HTTP Request", {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });
  },
});
