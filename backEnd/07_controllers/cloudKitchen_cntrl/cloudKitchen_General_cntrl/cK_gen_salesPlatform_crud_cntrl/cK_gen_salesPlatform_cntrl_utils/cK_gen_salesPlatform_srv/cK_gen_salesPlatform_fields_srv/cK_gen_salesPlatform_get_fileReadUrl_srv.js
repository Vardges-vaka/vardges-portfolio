import { SalesPlatform } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { getCloudOps } from "../../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";
import { resolveBrandStorageProvider } from "../../../../../cloudKitchen_Brand_cntrl/cK_brnd_brand_crud_cntrl/cK_brnd_brand_cntrl_utils/cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

const displayName = " | cK_gen_salesPlatform_get_fileReadUrl_srv.js | ";

export const cK_gen_salesPlatform_get_fileReadUrl_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id, objectKey, wantsDownload, downloadFilename } =
      req.body.sanitizedData || {};

    const platform = await SalesPlatform.findById(id).lean();
    if (!platform) {
      return { success: false, message: "Sales platform not found", data: null };
    }

    const storedLogoKey = platform.links?.logoUrl?.trim?.() ?? "";
    if (!storedLogoKey || storedLogoKey !== objectKey) {
      return {
        success: false,
        message: "Logo not found on this sales platform",
        data: null,
      };
    }

    const provider = await resolveBrandStorageProvider({});
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
