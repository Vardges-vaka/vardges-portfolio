/**
 * Handles the response for a failed validation or request.
 *
 * @function request_failed
 * @param {string} msg - The failure message to return.
 * @param {*} data - Optional. The data or payload related to the failure (e.g., invalid inputs).
 * @param {string} name - Optional. A display identifier, such as a filename or middleware name.
 * @param {boolean} isDebug - If true, logs details to the console for debugging.
 * @returns {Object} Object with isValid set to false and the provided message under 'msg'.
 *
 * @example
 *   return request_failed("Validation error", req.body, "my_middleware.js", true);
 */
export const request_failed = (msg, data, name, isDebug) => {
  const display = name ? name : "UnSpecified Middleware Field";
  const payload = data !== undefined ? data : "No Data to Display";

  isDebug && console.log(`📢👮🚨${display}[FAILED] |<Msg>|${msg}|`, payload);

  return { isValid: false, msg, message: msg, sanitizedData: data };
};

/**
 * Handles the response for a successful validation or request.
 *
 * @function request_success
 * @param {string} displayName - A display identifier, such as a filename or validator name.
 * @param {boolean} isDebug - If true, logs success details to the console.
 * @param {*} payload - Optional. The validated and sanitized data to return.
 * @returns {Object} Object with isValid true, a success message, and the sanitized payload.
 *
 * @example
 *   return request_success("my_validator.js", true, sanitizedData);
 */
export const request_success = (displayName, isDebug, payload) => {
  isDebug && console.log(`✅👍♻️${displayName}|<VALIDATOR>| [PASSED] |`);

  return {
    isValid: true,
    message: "Data Validated Successfully ✅",
    sanitizedData: payload,
  };
};
