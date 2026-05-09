const VALID_LOGO_TYPES = ["highRes", "svg", "png", "jpg", "pdf", "ico"];
const VALID_PROVIDERS = ["gcs", "s3", "r2", "blob"];

const displayName = " | brand_uploadLogo_vld.js | ";

export const brand_uploadLogo_vld = async (req) => {
  const id = req.params?.id;
  const logoType = req.params?.logoType;
  const provider = req.body?.provider || req.query?.provider;
  const file = req.file;

  if (!id) {
    return { isValid: false, message: `${displayName}brand id is required`, sanitizedData: null };
  }

  if (!VALID_LOGO_TYPES.includes(logoType)) {
    return {
      isValid: false,
      message: `${displayName}invalid logoType "${logoType}". Must be one of: ${VALID_LOGO_TYPES.join(", ")}`,
      sanitizedData: null,
    };
  }

  if (!VALID_PROVIDERS.includes(provider)) {
    return {
      isValid: false,
      message: `${displayName}invalid provider "${provider}". Must be one of: ${VALID_PROVIDERS.join(", ")}`,
      sanitizedData: null,
    };
  }

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

  return {
    isValid: true,
    message: "OK",
    sanitizedData: { id, logoType, provider, hasFile: true },
  };
};
