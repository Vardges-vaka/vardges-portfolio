import { User } from "../../../../../06_models/_models.index.js";
import {
  createValidationError,
  createUnauthorizedError,
  createNotFoundError,
  createDuplicateError,
} from "../../../../../03_services/_services.index.js";

const displayName = " | user_typedErrorExample_srv.js | |<=>| ";

/**
 * Example service demonstrating typed error usage
 * This service validates input, checks authentication, finds users, and handles duplicates
 *
 * @param {Object} req - Request object with body containing email, password, and action
 * @param {boolean} isDebug - Debug flag
 * @returns {Object} Service response with success, message, and data
 */
export const user_typedErrorExample_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  const { email, password, action } = req.body;

  // Example 1: Validation Error (400)
  // Demonstrates createValidationError with custom message
  if (!email) {
    throw createValidationError("Email is required");
  }

  if (!email.includes("@")) {
    throw createValidationError("Email must be a valid email address");
  }

  // Example 2: Unauthorized Error (401)
  // Demonstrates createUnauthorizedError with custom message
  if (action === "protected" && !password) {
    throw createUnauthorizedError("Password is required for this action");
  }

  // Simulate token validation
  if (action === "protected" && password !== "valid-token") {
    throw createUnauthorizedError("Invalid authentication token");
  }

  // Example 3: Not Found Error (404)
  // Demonstrates createNotFoundError with custom message
  if (action === "find") {
    const user = await User.findOne({ email });

    if (!user) {
      throw createNotFoundError(`User with email ${email} not found`);
    }

    return {
      success: true,
      message: "User found successfully",
      data: user,
    };
  }

  // Example 4: Duplicate Error (409)
  // Demonstrates createDuplicateError with custom message
  if (action === "create") {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createDuplicateError(`User with email ${email} already exists`);
    }

    // Simulate user creation
    const newUser = { email, createdAt: new Date() };

    return {
      success: true,
      message: "User created successfully",
      data: newUser,
    };
  }

  // Default success response
  return {
    success: true,
    message: "Validation passed",
    data: { email, action },
  };
};
