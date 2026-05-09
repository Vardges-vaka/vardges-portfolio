import path from "path";
import { Brand } from "../../../../../06_models/_models.index.js";
import {
  catch_errorHandler_service,
  CS_GCS_put,
  CS_AWS_put,
  CS_CFLR_put,
  CS_MSFT_put,
} from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_uploadLogo_srv.js | ";

const PROVIDER_PUT = {
  gcs: CS_GCS_put,
  s3: CS_AWS_put,
  r2: CS_CFLR_put,
  blob: CS_MSFT_put,
};

export const brand_uploadLogo_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const { id, logoType, provider } = req.body.sanitizedData;
    const file = req.file;

    const brandRaw = await Brand.findById(id).select("files").lean();
    if (!brandRaw) return { success: false, message: "Brand not found", data: null };

    // Fix: reset files if stored as array or missing (legacy data initialised files: [])
    if (Array.isArray(brandRaw.files) || brandRaw.files === null || brandRaw.files === undefined) {
      await Brand.updateOne({ _id: id }, { $set: { files: {} } });
    }

    const ext = path.extname(file.originalname || "").toLowerCase() || "";
    const objectKey = `brands/${id}/logos/${logoType}${ext}`;

    const putFn = PROVIDER_PUT[provider];
    if (!putFn) return { success: false, message: `Provider "${provider}" not supported`, data: null };

    const putResult = await putFn(
      {
        objectKey,
        file: Buffer.isBuffer(file.buffer) ? file.buffer : file.path,
        size: file.size,
        contentType: file.mimetype,
      },
      isDebug,
    );

    if (!putResult.success) {
      return { success: false, message: putResult.message || "Upload failed", data: null };
    }

    await Brand.findByIdAndUpdate(
      id,
      {
        $set: {
          [`files.logos.${logoType}`]: objectKey,
          [`files.logosMeta.${logoType}.size`]: file.size,
          [`files.logosMeta.${logoType}.mimeType`]: file.mimetype,
          [`files.logosMeta.${logoType}.ext`]: ext,
          "files.logosProvider": provider,
        },
      },
      { new: true },
    );

    const populated = await populateBrandById(id);
    return { success: true, message: `Logo uploaded to ${provider}`, data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
