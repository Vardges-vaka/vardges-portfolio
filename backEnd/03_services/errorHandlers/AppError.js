/**
 * Custom error class with type and status code properties
 *
 * This class extends the native Error class to include additional
 * properties for error categorization and HTTP status codes.
 *
 * @class AppError
 * @extends Error
 *
 * @property {string} type - The error type (e.g., 'VALIDATION_ERROR', 'UNAUTHORIZED')
 * @property {number} statusCode - The HTTP status code (e.g., 400, 401, 404)
 * @property {string} name - Always set to 'AppError'
 *
 * @example
 * throw new AppError('VALIDATION_ERROR', 'Email is required', 400);
 */
export class AppError extends Error {
  constructor(type, message, statusCode) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}
