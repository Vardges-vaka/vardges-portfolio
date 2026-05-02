import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";

/**
 * Ensures consistent default/enabled state across all storage providers.
 * - If no providers are enabled → all isDefault = false
 * - If providers are enabled → exactly one of them must be isDefault
 *   (if ambiguous, the first enabled in CLOUD_STORAGE_PROVIDERS order wins)
 */
export const normalizeStorageDefaults = (storagePlain) => {
  const out = {};
  for (const k of CLOUD_STORAGE_PROVIDERS) {
    out[k] = { ...(storagePlain[k] || {}) };
  }

  const enabledKeys = CLOUD_STORAGE_PROVIDERS.filter((k) => out[k]?.isEnabled);

  if (enabledKeys.length === 0) {
    for (const k of CLOUD_STORAGE_PROVIDERS) out[k].isDefault = false;
    return out;
  }

  const defaultKeys = CLOUD_STORAGE_PROVIDERS.filter((k) => out[k]?.isDefault);
  if (defaultKeys.length === 1 && enabledKeys.includes(defaultKeys[0])) {
    for (const k of CLOUD_STORAGE_PROVIDERS) {
      if (k !== defaultKeys[0]) out[k].isDefault = false;
    }
    return out;
  }

  const winner = enabledKeys[0];
  for (const k of CLOUD_STORAGE_PROVIDERS) {
    out[k].isDefault = k === winner;
  }
  return out;
};
