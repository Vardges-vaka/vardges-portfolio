import { AppError } from "./AppError.js";

/**
 * Error helper factory functions
 *
 * These functions provide a convenient way to create typed errors
 * with consistent error types and status codes throughout the application.
 *
 * Each function creates an AppError instance with:
 * - A predefined error type
 * - A custom message (or default if not provided)
 * - The appropriate HTTP status code
 */

/**
 * Create a validation error (400)
 * @param {string} message - Custom error message
 * @returns {AppError} AppError instance with VALIDATION_ERROR type
 *
 * @example
 * throw createValidationError('Email is required');
 */
export const createValidationError = (message) =>
  new AppError("VALIDATION_ERROR", message, 400);

/**
 * Create an unauthorized error (401)
 * @param {string} [message='Unauthorized'] - Custom error message
 * @returns {AppError} AppError instance with UNAUTHORIZED type
 *
 * @example
 * throw createUnauthorizedError('Invalid authentication token');
 */
export const createUnauthorizedError = (message = "Unauthorized") =>
  new AppError("UNAUTHORIZED", message, 401);

/**
 * Create a not found error (404)
 * @param {string} [message='Not found'] - Custom error message
 * @returns {AppError} AppError instance with NOT_FOUND type
 *
 * @example
 * throw createNotFoundError('User not found');
 */
export const createNotFoundError = (message = "Not found") =>
  new AppError("NOT_FOUND", message, 404);

/**
 * Create a duplicate entry error (409)
 * @param {string} [message='Already exists'] - Custom error message
 * @returns {AppError} AppError instance with DUPLICATE_ENTRY type
 *
 * @example
 * throw createDuplicateError('Email already registered');
 */
export const createDuplicateError = (message = "Already exists") =>
  new AppError("DUPLICATE_ENTRY", message, 409);

/**
 * Create a forbidden error (403)
 * @param {string} [message='Access denied'] - Custom error message
 * @returns {AppError} AppError instance with FORBIDDEN type
 *
 * @example
 * throw createForbiddenError('Insufficient permissions');
 */
export const createForbiddenError = (message = "Access denied") =>
  new AppError("FORBIDDEN", message, 403);

/**
 * Create a rate limit error (429)
 * @param {string} [message='Too many requests'] - Custom error message
 * @returns {AppError} AppError instance with RATE_LIMIT_EXCEEDED type
 *
 * @example
 * throw createRateLimitError('Too many login attempts');
 */
export const createRateLimitError = (message = "Too many requests") =>
  new AppError("RATE_LIMIT_EXCEEDED", message, 429);
