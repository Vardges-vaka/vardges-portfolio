/**
 * Error type mappings with HTTP status codes and default messages
 *
 * This constant defines all supported error types in the application,
 * mapping each to its corresponding HTTP status code and default message.
 */
export const ERROR_TYPES = {
  // Validation Errors (400)
  VALIDATION_ERROR: { status: 400, message: "Validation failed" },
  MISSING_REQUIRED_FIELD: { status: 400, message: "Required field missing" },
  INVALID_INPUT: { status: 400, message: "Invalid input provided" },

  // Authentication Errors (401)
  UNAUTHORIZED: { status: 401, message: "Authentication required" },
  INVALID_TOKEN: { status: 401, message: "Invalid or expired token" },
  INVALID_CREDENTIALS: { status: 401, message: "Invalid credentials" },

  // Authorization Errors (403)
  FORBIDDEN: { status: 403, message: "Access denied" },
  INSUFFICIENT_PERMISSIONS: {
    status: 403,
    message: "Insufficient permissions",
  },

  // Not Found Errors (404)
  NOT_FOUND: { status: 404, message: "Resource not found" },
  USER_NOT_FOUND: { status: 404, message: "User not found" },

  // Conflict Errors (409)
  DUPLICATE_ENTRY: { status: 409, message: "Resource already exists" },
  EMAIL_ALREADY_EXISTS: { status: 409, message: "Email already registered" },

  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED: { status: 429, message: "Too many requests" },

  // Server Errors (500)
  DATABASE_ERROR: { status: 500, message: "Database operation failed" },
  EXTERNAL_SERVICE_ERROR: {
    status: 500,
    message: "External service unavailable",
  },
  INTERNAL_ERROR: { status: 500, message: "Internal server error" },
};
