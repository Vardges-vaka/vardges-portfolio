import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { User } from "../../../../../06_models/_models.index.js";
import { email_vld } from "../../../../../09_validators/_validators.index.js";

const displayName = " | user_forgotPassword_vld.js | |<=>| ";
const isDebug = false;

export const user_forgotPassword_vld = async (req) => {
  let sanitizedData = {};

  // Extract email from request body
  const data = req.body.body_Data || req.body;
  const { email } = data;

  // Validate email
  const email_validation = email_vld(email, isDebug);
  if (!email_validation.isValid) {
    return request_failed(
      email_validation.message,
      req.body,
      displayName,
      isDebug
    );
  }

  const user = await User.findOne({ email: email });

  // If user doesn't exist, still return success (security: don't reveal if email exists)
  if (!user) {
    return request_failed(
      "If an account with that email exists, a password reset link has been sent.",
      email,
      displayName,
      isDebug
    );
  }

  // Return sanitized data
  sanitizedData = {
    email: email.trim().toLowerCase(),
  };

  return request_success(displayName, isDebug, sanitizedData);
};
