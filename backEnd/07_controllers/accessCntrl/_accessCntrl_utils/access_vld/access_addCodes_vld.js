import {
  request_failed,
  request_success,
} from "../../../../03_services/_services.index.js";

const displayName = " | access_addCodes_vld.js | ";
const isDebug = true;

export const access_addCodes_vld = (req) => {
  let sanitizedData = {};

  // Accept codes from either body_Data or directly from body for flexibility
  const codes = req.body.body_Data?.codes || req.body.codes;

  // Validate: codes must exist
  if (!codes) {
    return request_failed(
      "Codes array is required",
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate: codes must be an array
  if (!Array.isArray(codes)) {
    return request_failed(
      "Codes must be an array",
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate: array must contain between 1 and 10 items
  if (codes.length === 0 || codes.length > 10) {
    return request_failed(
      "Codes array must contain between 1 and 10 items",
      req.body,
      displayName,
      isDebug
    );
  }

  // Validate: all items must be non-empty strings
  for (let i = 0; i < codes.length; i++) {
    if (typeof codes[i] !== "string" || codes[i].trim() === "") {
      return request_failed(
        `Code at index ${i} must be a non-empty string`,
        req.body,
        displayName,
        isDebug
      );
    }
  }

  // Sanitize: trim all codes and store in sanitizedData
  sanitizedData.codes = codes.map((code) => code.trim());

  return request_success(displayName, isDebug, sanitizedData);
};
