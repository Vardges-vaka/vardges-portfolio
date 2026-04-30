import { Settings } from "../../../../06_models/_models.index.js";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";

const displayName = " | settings_get_srv.js | ";

const defaultStorageLeaf = () => ({
  isEnabled: false,
  logo: "",
  consoleUrl: "",
  isDefault: false,
});

const seedStorageDefaults = () => {
  /** @type {Record<string, ReturnType<typeof defaultStorageLeaf>>} */
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

function ensureStoragePlainShape(plain) {
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
}

export const settings_get_srv = async (_req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    let doc = await Settings.findOne();
    if (!doc) {
      doc = await Settings.create({ storage: seedStorageDefaults() });
      isDebug && console.log(`✅${displayName} seeded new Settings`);
    } else {
      const plain = doc.storage?.toObject
        ? doc.storage.toObject()
        : { ...(doc.storage ?? {}) };
      const { out: fixed, mutated } = ensureStoragePlainShape(plain);
      if (mutated) {
        doc.storage = fixed;
        doc.markModified("storage");
        await doc.save();
      }
    }

    const fresh = await Settings.findOne();
    const data = fresh.toObject({ getters: false, versionKey: false });

    return {
      success: true,
      message: "Settings loaded",
      data,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
