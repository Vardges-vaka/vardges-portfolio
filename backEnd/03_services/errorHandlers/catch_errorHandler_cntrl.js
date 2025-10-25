import { logger } from "../_services.index.js";
import { determineErrorResponse } from "./errorCategorizer.js";

/**
 * Global error handler for controllers
 *
 * This function handles all errors thrown in controller functions by:
 * 1. Categorizing the error (determining type and status code)
 * 2. Logging the error with Winston logger
 * 3. Extracting metadata (user ID, IP address)
 * 4. Building and sending the error response
 *
 * @param {Object} res - Express response object
 * @param {string} name - Controller name for logging
 * @param {boolean} isDebug - Whether to include debug information in response
 * @param {Error} error - The error object to handle
 * @returns {Object} Express response with error details
 *
 * @example
 * try {
 *   // controller logic
 * } catch (error) {
 *   return catch_errorHandler_cntrl(res, displayName, isDebug, error);
 * }
 */
export const catch_errorHandler_cntrl = (res, name, isDebug, error) => {
  const displayName = name ? `⚠️ ☠️ 🚨${name}` : "UnSpecified Controller Field";

  // Determine error response (status code, message, type)
  const errorResponse = determineErrorResponse(error);

  // Extract metadata from request/response
  const userId = res.locals?.user?.id;
  const ip = res.req?.ip;

  // Log error using Winston logger
  logger.controller.error(displayName, error, {
    errorType: errorResponse.type,
    statusCode: errorResponse.status,
    userId,
    ip,
  });

  // Maintain backward compatibility with console.error
  isDebug && console.error(`${displayName}|<=>| [catch (ERROR)]`, error);

  // Build response object
  const response = {
    success: false,
    message: errorResponse.message,
    payload: null,
  };

  // Add debug information if in debug mode
  if (isDebug) {
    response.debug = {
      stack: error.stack,
      originalMessage: error.message,
    };
  }

  return res.status(errorResponse.status).json(response);
};
