import { Settings } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import { getCloudOps } from "../settingshelpers/cloudStorageDispatch.js";

const displayName = " | settings_getLogo_srv.js | ";

export const settings_getLogo_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const provider = req.params?.provider;

    const doc = await Settings.findOne();
    const objectKey = doc?.storage?.[provider]?.logo || "";

    if (!objectKey) {
      return {
        success: true,
        message: "No logo set",
        data: { provider, objectKey: "", readUrl: "", expiresAt: null },
      };
    }

    const { get } = getCloudOps(provider);
    const getResult = await get({ objectKey }, isDebug);

    if (!getResult.success) {
      return {
        success: false,
        message: `${displayName}${getResult.message}`,
        data: null,
      };
    }

    return {
      success: true,
      message: "Signed URL issued",
      data: {
        provider,
        objectKey,
        readUrl: getResult.data.readUrl,
        expiresAt: getResult.data.expiresAt,
      },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
