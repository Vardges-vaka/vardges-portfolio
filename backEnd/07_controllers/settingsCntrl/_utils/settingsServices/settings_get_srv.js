import { Settings } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import {
  seedStorageDefaults,
  ensureStoragePlainShape,
} from "../settingshelpers/_settingshelpers.index.js";

const displayName = " | settings_get_srv.js | ";

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
