import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { email_vld } from "../../../../../09_validators/_validators.index.js";

const displayName = " | user_forgotPassword_vld.js | |<=>| ";
const isDebug = false;

export const user_forgotPassword_vld = (req) => {
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

  // Return sanitized data
  sanitizedData = {
    email: email.trim().toLowerCase(),
  };

  return request_success(displayName, isDebug, sanitizedData);
};
