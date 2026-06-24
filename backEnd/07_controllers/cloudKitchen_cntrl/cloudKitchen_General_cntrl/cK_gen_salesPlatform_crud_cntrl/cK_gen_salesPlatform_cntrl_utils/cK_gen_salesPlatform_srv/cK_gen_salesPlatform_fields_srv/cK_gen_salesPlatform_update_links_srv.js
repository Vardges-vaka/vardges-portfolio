import { SalesPlatform } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { pruneEmptyDeep } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";
import {
  deleteSalesPlatformLogoObject,
  isCloudStorageObjectKey,
  resolveNextLinksLogoUrl,
  resolveSalesPlatformStorageProvider,
  uploadSalesPlatformLogo,
} from "../../cK_gen_salesPlatform_hlpr/cK_gen_salesPlatform_links_hlprs.js";

const displayName = " | cK_gen_salesPlatform_update_links_srv.js | ";

export const cK_gen_salesPlatform_update_links_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, links, logoUpload } = req.body.sanitizedData || {};

    const platform = await SalesPlatform.findById(id);
    if (!platform) {
      return { success: false, message: "Sales platform not found", data: null };
    }

    const provider = await resolveSalesPlatformStorageProvider();
    const previousLogoKey = platform.links?.logoUrl || "";
    let uploadedObjectKey = "";

    if (logoUpload) {
      const uploadResult = await uploadSalesPlatformLogo({
        platformId: id,
        file: logoUpload,
        provider,
        isDebug,
      });

      if (!uploadResult.ok) {
        return {
          success: false,
          message: uploadResult.message,
          data: null,
        };
      }

      uploadedObjectKey = uploadResult.objectKey;
    }

    const nextLogoUrl = resolveNextLinksLogoUrl({
      currentLogoUrl: previousLogoKey,
      incomingLogoUrl: links?.logoUrl ?? previousLogoKey,
      uploadedObjectKey,
    });

    if (
      uploadedObjectKey &&
      isCloudStorageObjectKey(previousLogoKey) &&
      previousLogoKey !== nextLogoUrl
    ) {
      const deleteResult = await deleteSalesPlatformLogoObject({
        objectKey: previousLogoKey,
        provider,
        isDebug,
      });

      if (!deleteResult.ok) {
        return {
          success: false,
          message: deleteResult.message || "Failed to delete previous logo",
          data: null,
        };
      }
    }

    if (
      !uploadedObjectKey &&
      !nextLogoUrl &&
      isCloudStorageObjectKey(previousLogoKey)
    ) {
      const deleteResult = await deleteSalesPlatformLogoObject({
        objectKey: previousLogoKey,
        provider,
        isDebug,
      });

      if (!deleteResult.ok) {
        return {
          success: false,
          message: deleteResult.message || "Failed to delete removed logo",
          data: null,
        };
      }
    }

    const nextLinks = pruneEmptyDeep({
      ...links,
      logoUrl: nextLogoUrl,
    }) || { logoUrl: nextLogoUrl };

    platform.links = nextLinks;
    await platform.save();

    isDebug && console.log(`✅${displayName}Updated: ${platform._id}`);

    return {
      success: true,
      message: "Sales platform links updated successfully",
      data: platform,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
