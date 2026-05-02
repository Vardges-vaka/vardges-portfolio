import validator from "validator";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";

const ALLOWED = new Set(CLOUD_STORAGE_PROVIDERS);
const MAX_URL_LEN = 500;

export const settings_putProvider_vld = async (req) => {
  const provider = req.params?.provider;

  if (!provider || !ALLOWED.has(provider)) {
    return {
      isValid: false,
      message: `Invalid provider. Must be one of: ${CLOUD_STORAGE_PROVIDERS.join(", ")}`,
      sanitizedData: null,
    };
  }

  const body = req.body?.body_Data ?? req.body ?? {};
  const { isEnabled, isDefault, consoleUrl, customExpTime } = body;

  const hasAny = [isEnabled, isDefault, consoleUrl, customExpTime].some(
    (v) => v !== undefined,
  );

  if (!hasAny) {
    return {
      isValid: false,
      message: "At least one field required: isEnabled, isDefault, consoleUrl, customExpTime",
      sanitizedData: null,
    };
  }

  const sanitized = { provider };

  if (isEnabled !== undefined) {
    if (typeof isEnabled !== "boolean") {
      return { isValid: false, message: "isEnabled must be a boolean", sanitizedData: null };
    }
    sanitized.isEnabled = isEnabled;
  }

  if (isDefault !== undefined) {
    if (typeof isDefault !== "boolean") {
      return { isValid: false, message: "isDefault must be a boolean", sanitizedData: null };
    }
    sanitized.isDefault = isDefault;
  }

  if (consoleUrl !== undefined) {
    if (typeof consoleUrl !== "string") {
      return { isValid: false, message: "consoleUrl must be a string", sanitizedData: null };
    }
    const trimmed = consoleUrl.trim();
    if (trimmed.length > MAX_URL_LEN) {
      return {
        isValid: false,
        message: `consoleUrl must not exceed ${MAX_URL_LEN} characters`,
        sanitizedData: null,
      };
    }
    if (trimmed.length > 0 && !validator.isURL(trimmed, { require_protocol: true })) {
      return { isValid: false, message: "consoleUrl must be a valid URL including protocol", sanitizedData: null };
    }
    sanitized.consoleUrl = trimmed;
  }

  if (customExpTime !== undefined) {
    if (typeof customExpTime !== "boolean") {
      return { isValid: false, message: "customExpTime must be a boolean", sanitizedData: null };
    }
    sanitized.customExpTime = customExpTime;
  }

  return { isValid: true, message: "OK", sanitizedData: sanitized };
};
