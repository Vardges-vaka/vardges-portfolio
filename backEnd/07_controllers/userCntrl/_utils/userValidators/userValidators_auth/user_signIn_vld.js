import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { email_vld } from "../../../../../09_validators/_validators.index.js";

const displayName = " | user_signIn_vld.js | ";
const isDebug = true;

export const user_signIn_vld = (req) => {
  let sanitizedData = {};

  // Accept data from either body_Data or directly from body
  const data = req.body.body_Data || req.body;
  const { email, password, rememberMe } = data;

  // Validate: email
  const email_validation = email_vld(email, isDebug);
  if (!email_validation.isValid) {
    return request_failed(
      email_validation.message,
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate: password (just check if present - actual verification in service)
  if (!password || typeof password !== "string") {
    return request_failed(
      "Password is required",
      req.body,
      displayName,
      isDebug
    );
  }
  if (password.trim().length === 0) {
    return request_failed(
      "Password cannot be empty",
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate: rememberMe
  if (typeof rememberMe !== "boolean") {
    return request_failed(
      "RememberMe must be a boolean value",
      req.body,
      displayName,
      isDebug
    );
  }

  // Sanitize and validated data
  sanitizedData = {
    email: email.trim().toLowerCase(),
    password: password,
    rememberMe: rememberMe,
  };

  return request_success(displayName, isDebug, sanitizedData);
};
