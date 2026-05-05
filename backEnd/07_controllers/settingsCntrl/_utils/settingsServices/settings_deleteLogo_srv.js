import { Settings } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import { settings_get_srv } from "./settings_get_srv.js";
import { getCloudOps } from "../settingshelpers/cloudStorageDispatch.js";

const displayName = " | settings_deleteLogo_srv.js | ";

export const settings_deleteLogo_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const provider = req.params?.provider;

    let doc = await Settings.findOne();
    if (!doc) {
      await settings_get_srv(req, isDebug);
      doc = await Settings.findOne();
    }

    const plain = doc.storage?.toObject
      ? doc.storage.toObject()
      : { ...(doc.storage ?? {}) };
    const currentKey = plain?.[provider]?.logo || "";

    if (!currentKey) {
      return {
        success: true,
        message: "No logo to delete",
        data: doc.toObject({ getters: false, versionKey: false }),
      };
    }

    const { delete: deleteFn } = getCloudOps(provider);
    const delResult = await deleteFn(
      { objectKey: currentKey, ignoreNotFound: true },
      isDebug,
    );

    if (!delResult.success) {
      return {
        success: false,
        message: `${displayName}${delResult.message}`,
        data: null,
      };
    }

    plain[provider] = { ...(plain[provider] || {}), logo: "" };
    doc.storage = plain;
    doc.markModified("storage");
    await doc.save();

    return {
      success: true,
      message: "Logo deleted",
      data: doc.toObject({ getters: false, versionKey: false }),
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
