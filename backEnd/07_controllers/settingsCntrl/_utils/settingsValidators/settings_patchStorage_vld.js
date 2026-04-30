import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";

const displayName = " | settings_patchStorage_vld.js | ";

const allowed = new Set(CLOUD_STORAGE_PROVIDERS);

export const settings_patchStorage_vld = async (req) => {
  const body = req.body.body_Data ?? req.body;
  const provider = body?.provider;
  const { isEnabled, isDefault } = body ?? {};

  if (!provider || !allowed.has(provider)) {
    return {
      isValid: false,
      message: `Invalid or missing provider. Use one of: ${CLOUD_STORAGE_PROVIDERS.join(", ")}`,
      sanitizedData: null,
    };
  }

  if (typeof isEnabled !== "boolean" && typeof isDefault !== "boolean") {
    return {
      isValid: false,
      message:
        "Send at least one of isEnabled or isDefault as booleans.",
      sanitizedData: null,
    };
  }

  return {
    isValid: true,
    message: "OK",
    sanitizedData: {
      provider,
      ...(typeof isEnabled === "boolean" ? { isEnabled } : {}),
      ...(typeof isDefault === "boolean" ? { isDefault } : {}),
    },
  };
};
