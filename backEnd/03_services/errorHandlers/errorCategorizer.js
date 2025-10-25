import { ERROR_TYPES } from "./errorTypes.js";

/**
 * Determine error response based on error type and message patterns
 *
 * This function categorizes errors using a priority-based approach:
 * 1. Check for custom error type (from AppError instances)
 * 2. Pattern match on error message
 * 3. Check error name for database errors
 * 4. Default to internal error
 *
 * @param {Error} error - The error object to categorize
 * @returns {Object} Object with type, status, and message properties
 *
 * @example
 * const errorResponse = determineErrorResponse(error);
 * // Returns: { type: 'VALIDATION_ERROR', status: 400, message: 'Email is required' }
 */
export function determineErrorResponse(error) {
  // Priority 1: Check for custom error type
  if (error.type && ERROR_TYPES[error.type]) {
    return {
      ...ERROR_TYPES[error.type],
      type: error.type,
      message: error.message || ERROR_TYPES[error.type].message,
    };
  }

  // Priority 2: Pattern matching on error message
  const message = error.message?.toLowerCase() || "";

  // Validation patterns
  if (message.includes("validation") || message.includes("required")) {
    return { ...ERROR_TYPES.VALIDATION_ERROR, type: "VALIDATION_ERROR" };
  }

  // Auth patterns
  if (message.includes("unauthorized") || message.includes("token")) {
    return { ...ERROR_TYPES.UNAUTHORIZED, type: "UNAUTHORIZED" };
  }

  // Not found patterns
  if (message.includes("not found")) {
    return { ...ERROR_TYPES.NOT_FOUND, type: "NOT_FOUND" };
  }

  // Duplicate patterns
  if (message.includes("duplicate") || message.includes("already exists")) {
    return { ...ERROR_TYPES.DUPLICATE_ENTRY, type: "DUPLICATE_ENTRY" };
  }

  // Priority 3: Check error name for database errors
  if (error.name === "MongoError" || error.name === "ValidationError") {
    return { ...ERROR_TYPES.DATABASE_ERROR, type: "DATABASE_ERROR" };
  }

  // Priority 4: Default to internal error
  return { ...ERROR_TYPES.INTERNAL_ERROR, type: "INTERNAL_ERROR" };
}
