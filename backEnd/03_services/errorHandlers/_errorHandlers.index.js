/**
 * Error Handlers Module
 *
 * This module provides a comprehensive error handling system for the application.
 * It includes error types, custom error classes, helper functions, and handlers.
 *
 * @module errorHandlers
 */

// Export error types constant
export { ERROR_TYPES } from "./errorTypes.js";

// Export custom error class
export { AppError } from "./AppError.js";

// Export error helper factory functions
export {
  createValidationError,
  createUnauthorizedError,
  createNotFoundError,
  createDuplicateError,
  createForbiddenError,
  createRateLimitError,
} from "./errorHelpers.js";

// Export error categorizer
export { determineErrorResponse } from "./errorCategorizer.js";

// Export main error handler
export { catch_errorHandler_cntrl } from "./catch_errorHandler_cntrl.js";
