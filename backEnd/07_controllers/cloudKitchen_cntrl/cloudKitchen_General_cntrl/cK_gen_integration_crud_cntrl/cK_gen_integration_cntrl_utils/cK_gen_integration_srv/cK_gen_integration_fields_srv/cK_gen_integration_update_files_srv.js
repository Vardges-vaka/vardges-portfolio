import { Integration } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { getCloudOps } from "../../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";
import {
  buildIntegrationFileObjectKey,
  coerceFileFormat,
  deleteIntegrationFileObjects,
  findRemovedIntegrationFileKeys,
  resolveIntegrationStorageProvider,
} from "../../cK_gen_integration_hlprs/cK_gen_integration_files_hlprs.js";

const displayName = " | cK_gen_integration_update_files_srv.js | ";

const applyUploadsToItems = async ({
  integrationId,
  items,
  uploads,
  uploadItemIndexes,
  provider,
  userId,
  isDebug,
}) => {
  if (!uploads.length) {
    return { ok: true, items };
  }

  const { put } = getCloudOps(provider);
  const nextItems = items.map((item) => ({ ...item }));

  for (let uploadIndex = 0; uploadIndex < uploads.length; uploadIndex += 1) {
    const file = uploads[uploadIndex];
    const itemIndex = uploadItemIndexes[uploadIndex];
    const currentItem = nextItems[itemIndex] ?? {};
    const objectKey = buildIntegrationFileObjectKey(integrationId, currentItem, file);

    const putResult = await put(
      {
        objectKey,
        file: Buffer.isBuffer(file.buffer) ? file.buffer : file.path,
        size: file.size,
        contentType: file.mimetype || "application/octet-stream",
      },
      isDebug,
    );

    if (!putResult.success) {
      return {
        ok: false,
        message: putResult.message || "File upload failed",
      };
    }

    nextItems[itemIndex] = {
      ...currentItem,
      url: putResult.data?.objectKey || objectKey,
      format: coerceFileFormat(currentItem, file),
      sizeIn_KB: Math.max(1, Math.round(file.size / 1024)),
      updatedBy: userId || currentItem.updatedBy,
      createdBy: currentItem.createdBy || userId,
    };
  }

  return { ok: true, items: nextItems };
};

export const cK_gen_integration_update_files_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, files, uploads = [], uploadItemIndexes = [] } =
      req.body.sanitizedData || {};

    const integration = await Integration.findById(id);
    if (!integration) {
      return { success: false, message: "Integration not found", data: null };
    }

    const provider = await resolveIntegrationStorageProvider(files.cloudStorage);
    const userId = req.session?.user?._id;

    const uploadResult = await applyUploadsToItems({
      integrationId: id,
      items: files.items,
      uploads,
      uploadItemIndexes,
      provider,
      userId,
      isDebug,
    });

    if (!uploadResult.ok) {
      return {
        success: false,
        message: uploadResult.message,
        data: null,
      };
    }

    const previousItems = integration.files?.items ?? [];
    const removedKeys = findRemovedIntegrationFileKeys(
      previousItems,
      uploadResult.items,
    );

    if (removedKeys.length) {
      const deleteResult = await deleteIntegrationFileObjects({
        objectKeys: removedKeys,
        provider,
        isDebug,
      });

      if (!deleteResult.ok) {
        return {
          success: false,
          message: deleteResult.message,
          data: null,
        };
      }
    }

    const nextFiles = {
      cloudStorage: {
        isDefault: files.cloudStorage?.isDefault !== false,
        value: provider,
      },
      items: uploadResult.items.map((item) => ({
        ...item,
        updatedBy: item.updatedBy || userId,
        createdBy: item.createdBy || userId,
      })),
    };

    integration.files = nextFiles;
    integration.markModified("files");
    integration.updatedBy = userId || integration.updatedBy;
    await integration.save({ validateModifiedOnly: true });

    isDebug &&
      console.log(`✅${displayName}Integration files updated: ${integration._id}`);

    return {
      success: true,
      message: "Integration files updated successfully",
      data: integration.toObject({ getters: false, versionKey: false }),
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
