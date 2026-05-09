import { Brand, Settings } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { getCloudOps } from "../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";

const displayName = " | brand_getLogo_srv.js | ";
const PROVIDER_ORDER = ["gcs", "s3", "r2", "blob"];

const getDefaultProvider = async () => {
  try {
    const settings = await Settings.findOne().select("storage").lean();
    if (!settings?.storage) return null;
    for (const pid of PROVIDER_ORDER) {
      const p = settings.storage[pid];
      if (p?.isDefault && p?.isEnabled) return pid;
    }
    for (const pid of PROVIDER_ORDER) {
      if (settings.storage[pid]?.isEnabled) return pid;
    }
  } catch (_) {}
  return null;
};

export const brand_getLogo_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const { id, logoType } = req.body.sanitizedData;

    // Use .lean() so files/logos are plain JS objects — Mongoose subdoc proxies
    // can behave unexpectedly with optional-chain bracket access.
    const brandDoc = await Brand.findById(id).select("files").lean();
    if (!brandDoc) return { success: false, message: "Brand not found", data: null };

    const objectKey = brandDoc.files?.logos?.[logoType];
    const storedProvider = brandDoc.files?.logosProvider;

    isDebug &&
      console.log(
        `${displayName}logoType: ${logoType} | objectKey: ${objectKey} | storedProvider: ${storedProvider}`,
      );

    if (!objectKey) {
      return { success: true, message: "No logo set", data: { readUrl: "", objectKey: "" } };
    }

    const provider = storedProvider || (await getDefaultProvider()) || "gcs";
    isDebug && console.log(`${displayName}resolved provider: ${provider}`);

    const { get } = getCloudOps(provider);
    const getResult = await get({ objectKey }, isDebug);

    isDebug &&
      console.log(`${displayName}getResult.success: ${getResult.success} | ${getResult.message}`);

    if (!getResult.success) {
      return { success: false, message: getResult.message, data: null };
    }

    return {
      success: true,
      message: "Signed URL issued",
      data: {
        logoType,
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
