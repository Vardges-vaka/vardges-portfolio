import { Brand } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { getCloudOps } from "../../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";
import { resolveBrandStorageProvider } from "../../cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

const displayName = " | cK_brnd_brand_get_fileReadUrl_srv.js | ";

export const cK_brnd_brand_get_fileReadUrl_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id, objectKey, wantsDownload, downloadFilename } =
      req.body.sanitizedData || {};

    const brand = await Brand.findById(id).lean();
    if (!brand) {
      return { success: false, message: "Brand not found", data: null };
    }

    const knownKeys = (brand.files?.items ?? [])
      .map((item) => item?.url)
      .filter(Boolean);

    if (!knownKeys.includes(objectKey)) {
      return {
        success: false,
        message: "File not found on this brand",
        data: null,
      };
    }

    const provider = await resolveBrandStorageProvider(brand.files?.cloudStorage);
    const { get } = getCloudOps(provider);
    const fallbackName = objectKey.split("/").pop() || "download";
    const getResult = await get(
      {
        objectKey,
        downloadFilename: wantsDownload
          ? downloadFilename || fallbackName
          : undefined,
      },
      isDebug,
    );

    if (!getResult.success) {
      return {
        success: false,
        message: getResult.message || "Failed to resolve file URL",
        data: null,
      };
    }

    return {
      success: true,
      message: "Signed URL issued",
      data: {
        provider,
        objectKey,
        readUrl: getResult.data?.readUrl || "",
        expiresAt: getResult.data?.expiresAt ?? null,
      },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
