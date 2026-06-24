import { Brand } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { getCloudOps } from "../../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";
import {
  buildBrandFileObjectKey,
  coerceFileFormat,
  deleteBrandFileObjects,
  findRemovedBrandFileKeys,
  resolveBrandStorageProvider,
} from "../../cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

const displayName = " | cK_brnd_brand_update_files_srv.js | ";

const applyUploadsToItems = async ({
  brandId,
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
    const objectKey = buildBrandFileObjectKey(brandId, currentItem, file);

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

export const cK_brnd_brand_update_files_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, files, uploads = [], uploadItemIndexes = [] } =
      req.body.sanitizedData || {};

    const brand = await Brand.findById(id);
    if (!brand) {
      return { success: false, message: "Brand not found", data: null };
    }

    const provider = await resolveBrandStorageProvider(files.cloudStorage);
    const userId = req.session?.user?._id;

    const uploadResult = await applyUploadsToItems({
      brandId: id,
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

    const previousItems = brand.files?.items ?? [];
    const removedKeys = findRemovedBrandFileKeys(previousItems, uploadResult.items);

    if (removedKeys.length) {
      const deleteResult = await deleteBrandFileObjects({
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

    brand.files = nextFiles;
    brand.markModified("files");
    brand.updatedBy = userId || brand.updatedBy;
    await brand.save({ validateModifiedOnly: true });

    isDebug && console.log(`✅${displayName}Brand files updated: ${brand._id}`);

    return {
      success: true,
      message: "Brand files updated successfully",
      data: brand.toObject({ getters: false, versionKey: false }),
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
