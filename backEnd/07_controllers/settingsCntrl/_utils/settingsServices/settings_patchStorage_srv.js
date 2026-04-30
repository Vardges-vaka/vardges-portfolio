import { Settings } from "../../../../06_models/_models.index.js";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import { settings_get_srv } from "./settings_get_srv.js";

const displayName = " | settings_patchStorage_srv.js | ";

/** After toggles, enforce: at most one `isDefault`; if any provider enabled, exactly one default among enabled. */
const normalizeStorageDefaults = (storagePlain) => {
  const out = { ...storagePlain };
  for (const k of CLOUD_STORAGE_PROVIDERS) {
    out[k] = { ...out[k] };
  }

  const enabledKeys = CLOUD_STORAGE_PROVIDERS.filter((k) => out[k]?.isEnabled);

  if (enabledKeys.length === 0) {
    for (const k of CLOUD_STORAGE_PROVIDERS) {
      out[k].isDefault = false;
    }
    return out;
  }

  const defaultKeys = CLOUD_STORAGE_PROVIDERS.filter((k) => out[k]?.isDefault);
  if (defaultKeys.length === 1 && enabledKeys.includes(defaultKeys[0])) {
    for (const k of CLOUD_STORAGE_PROVIDERS) {
      if (k !== defaultKeys[0]) out[k].isDefault = false;
    }
    return out;
  }

  // Prefer first enabled in product order as default
  const winner = enabledKeys[0];
  for (const k of CLOUD_STORAGE_PROVIDERS) {
    out[k].isDefault = k === winner;
  }
  return out;
};

export const settings_patchStorage_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const { provider, isEnabled, isDefault } = req.body.sanitizedData;

    let doc = await Settings.findOne();
    if (!doc) {
      await settings_get_srv(req, isDebug);
      doc = await Settings.findOne();
    }

    const plain = doc.storage?.toObject
      ? doc.storage.toObject()
      : { ...(doc.storage ?? {}) };

    const node = { ...(plain[provider] || {}) };

    if (typeof isEnabled === "boolean") {
      node.isEnabled = isEnabled;
      if (isEnabled === false) {
        node.isDefault = false;
      }
    }

    if (typeof isDefault === "boolean") {
      if (isDefault === true) {
        node.isEnabled = true;
      }
      node.isDefault = isDefault;
    }

    plain[provider] = node;

    doc.storage = normalizeStorageDefaults(plain);
    doc.markModified("storage");
    await doc.save();

    const data = doc.toObject({ getters: false, versionKey: false });

    return {
      success: true,
      message: "Storage settings updated",
      data,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
