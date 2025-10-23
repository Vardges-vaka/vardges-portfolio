import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { password_vld } from "../../../../../09_validators/_validators.index.js";

const displayName = " | user_resetPassword_vld.js | |<=>| ";
const isDebug = false;

export const user_resetPassword_vld = (req) => {
  let sanitizedData = {};

  // Extract data from request body
  const data = req.body.body_Data || req.body;
  const { token, newPassword } = data;

  // Validate token
  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return request_failed(
      "Reset token is required",
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate new password using password_vld
  const password_validation = password_vld(newPassword);
  if (!password_validation.isValid) {
    return request_failed(
      password_validation.message,
      req.body,
      displayName,
      isDebug
    );
  }

  // Return sanitized data
  sanitizedData = {
    token: token.trim(),
    newPassword: newPassword,
  };

  return request_success(displayName, isDebug, sanitizedData);
};
