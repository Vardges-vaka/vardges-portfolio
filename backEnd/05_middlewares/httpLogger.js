import { logger } from "../03_services/_services.index.js";

/**
 * HTTP Request Logging Middleware
 * Logs all incoming HTTP requests with response time
 */
const httpLoggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  // Log the incoming request
  logger.debug(`Incoming ${req.method} request to ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    timestamp: new Date().toISOString(),
  });

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function (...args) {
    const responseTime = Date.now() - startTime;

    // Log the HTTP request with response details
    logger.httpRequest(req, res, responseTime);

    // Call the original end method
    originalEnd.apply(this, args);
  };

  next();
};

export default httpLoggerMiddleware;
