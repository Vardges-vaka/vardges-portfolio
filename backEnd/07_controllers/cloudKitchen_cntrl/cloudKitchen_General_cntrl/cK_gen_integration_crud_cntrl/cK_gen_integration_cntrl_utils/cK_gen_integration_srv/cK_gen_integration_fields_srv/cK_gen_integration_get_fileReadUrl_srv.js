import { Integration } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { getCloudOps } from "../../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";
import { resolveIntegrationStorageProvider } from "../../cK_gen_integration_hlprs/cK_gen_integration_files_hlprs.js";

const displayName = " | cK_gen_integration_get_fileReadUrl_srv.js | ";

export const cK_gen_integration_get_fileReadUrl_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id, objectKey, wantsDownload, downloadFilename } =
      req.body.sanitizedData || {};

    const integration = await Integration.findById(id).lean();
    if (!integration) {
      return { success: false, message: "Integration not found", data: null };
    }

    const knownKeys = (integration.files?.items ?? [])
      .map((item) => item?.url)
      .filter(Boolean);

    if (!knownKeys.includes(objectKey)) {
      return {
        success: false,
        message: "File not found on this integration",
        data: null,
      };
    }

    const provider = await resolveIntegrationStorageProvider(
      integration.files?.cloudStorage,
    );
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
