import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";

const defaultStorageLeaf = () => ({
  isEnabled: false,
  logo: "",
  consoleUrl: "",
  isDefault: false,
});

const seedStorageDefaults = () => {
  const storage = {};
  for (const key of CLOUD_STORAGE_PROVIDERS) {
    storage[key] =
      key === "s3"
        ? {
            isEnabled: true,
            logo: "",
            consoleUrl: "",
            isDefault: true,
          }
        : defaultStorageLeaf();
  }
  return storage;
};

const ensureStoragePlainShape = (plain) => {
  const out = { ...(plain || {}) };
  let mutated = false;
  for (const key of CLOUD_STORAGE_PROVIDERS) {
    if (!out[key]) {
      out[key] = defaultStorageLeaf();
      mutated = true;
    }
  }
  const anyEnabled = CLOUD_STORAGE_PROVIDERS.some((k) => out[k].isEnabled);
  if (anyEnabled) {
    const defaults = CLOUD_STORAGE_PROVIDERS.filter((k) => out[k].isDefault);
    if (defaults.length === 0) {
      const pick = CLOUD_STORAGE_PROVIDERS.find((k) => out[k].isEnabled);
      out[pick].isDefault = true;
      mutated = true;
    }
  }
  return { out, mutated };
};

export { seedStorageDefaults, ensureStoragePlainShape };
