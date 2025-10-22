import { Access } from "../../../../../06_models/_models.index.js";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import {
  password_vld,
  email_vld,
} from "../../../../../09_validators/_validators.index.js";

import { findAccessCodeRole } from "../../../../../04_helpers/helpers.index.js";

const displayName = " | user_signUp_vld.js | ";
const isDebug = true;

export const user_signUp_vld = async (req) => {
  let sanitizedData = {};

  // Accept data from either body_Data or directly from body
  const data = req.body.body_Data || req.body;
  const { name, email, password, accessCode, rememberMe } = data;

  // Validate: name
  if (!name || typeof name !== "string") {
    return request_failed("Name is required", req.body, displayName, isDebug);
  }
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return request_failed(
      "Name must be at least 2 characters long",
      req.body,
      displayName,
      isDebug
    );
  }

  const email_validation = email_vld(email, isDebug);
  if (!email_validation.isValid) {
    return request_failed(
      email_validation.message,
      req.body,
      displayName,
      isDebug
    );
  }

  const password_validation = password_vld(password, isDebug);
  if (!password_validation.isValid) {
    return request_failed(
      password_validation.message,
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate: accessCode
  if (!accessCode || typeof accessCode !== "string") {
    return request_failed(
      "Access code is required",
      req.body,
      displayName,
      isDebug
    );
  }
  const trimmedAccessCode = accessCode.trim();
  if (trimmedAccessCode.length === 0) {
    return request_failed(
      "Access code cannot be empty",
      req.body,
      displayName,
      isDebug
    );
  }

  const accessDoc = await Access.findOne();
  if (!accessDoc) {
    return request_failed(
      "Access system not initialized. Please contact administrator.",
      req.body,
      displayName,
      isDebug
    );
  }

  // findAccessCodeRole now returns { role, hashedCode } and is async
  const { role, hashedCode } = await findAccessCodeRole(
    trimmedAccessCode,
    accessDoc
  );
  if (!role || !hashedCode) {
    return request_failed(
      "Invalid access code",
      trimmedAccessCode,
      displayName,
      isDebug
    );
  }
  isDebug &&
    console.log(`✅${displayName}Access code validated. Role: ${role}`);

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
    name: trimmedName,
    email: email.trim().toLowerCase(),
    password: password,
    accessCode: trimmedAccessCode, // Plain text code (for User.access.usedCode and Access.usedCodes)
    hashedCode: hashedCode, // Hashed code (to remove from Access.newCodes)
    rememberMe: rememberMe,
    role: role,
  };

  return request_success(displayName, isDebug, sanitizedData);
};
