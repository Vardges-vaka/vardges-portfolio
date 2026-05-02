import { Settings } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import { settings_get_srv } from "./settings_get_srv.js";
import { normalizeStorageDefaults } from "./normalizeStorageDefaults.js";

const displayName = " | settings_putProvider_srv.js | ";

export const settings_putProvider_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const { provider, isEnabled, isDefault, consoleUrl, customExpTime } =
      req.body.sanitizedData;

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
      if (!isEnabled) node.isDefault = false;
    }

    if (typeof isDefault === "boolean" && isDefault) {
      node.isEnabled = true;
      node.isDefault = true;
    }

    if (typeof consoleUrl === "string") {
      node.consoleUrl = consoleUrl;
    }

    if (typeof customExpTime === "boolean") {
      node.customExpTime = customExpTime;
    }

    plain[provider] = node;
    doc.storage = normalizeStorageDefaults(plain);
    doc.markModified("storage");
    await doc.save();

    const data = doc.toObject({ getters: false, versionKey: false });

    return { success: true, message: "Provider updated", data };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
