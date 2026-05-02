const displayName = " | settings_uploadLogo_vld.js | ";

/**
 * Validates that Multer attached a file to the request.
 * MIME whitelist intentionally omitted — accepts any type for testing.
 */
export const settings_uploadLogo_vld = async (req) => {
  const file = req.file;

  if (!file) {
    return {
      isValid: false,
      message: `${displayName}file is required (multipart field "file")`,
      sanitizedData: null,
    };
  }

  if (!Buffer.isBuffer(file.buffer) && !file.path) {
    return {
      isValid: false,
      message: `${displayName}uploaded file has neither buffer nor disk path`,
      sanitizedData: null,
    };
  }

  if (typeof file.size !== "number" || file.size <= 0) {
    return {
      isValid: false,
      message: `${displayName}invalid file size`,
      sanitizedData: null,
    };
  }

  return {
    isValid: true,
    message: "OK",
    sanitizedData: { hasFile: true },
  };
};
