import path from "path";
import { Settings } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";
import { settings_get_srv } from "./settings_get_srv.js";
import { getCloudOps } from "../cloudStorageDispatch.js";

const displayName = " | settings_uploadLogo_srv.js | ";

export const settings_uploadLogo_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const provider = req.params?.provider;
    const file = req.file;
    const ext = path.extname(file.originalname || "") || "";
    const objectKey = `settings/${provider}/logo${ext}`;

    const { put } = getCloudOps(provider);
    const putResult = await put(
      {
        objectKey,
        file: Buffer.isBuffer(file.buffer) ? file.buffer : file.path,
        size: file.size,
        contentType: file.mimetype,
      },
      isDebug,
    );

    if (!putResult.success) {
      return { success: false, message: `${displayName}${putResult.message}`, data: null };
    }

    let doc = await Settings.findOne();
    if (!doc) {
      await settings_get_srv(req, isDebug);
      doc = await Settings.findOne();
    }

    const plain = doc.storage?.toObject
      ? doc.storage.toObject()
      : { ...(doc.storage ?? {}) };
    plain[provider] = { ...(plain[provider] || {}), logo: objectKey };

    doc.storage = plain;
    doc.markModified("storage");
    await doc.save();

    const data = doc.toObject({ getters: false, versionKey: false });

    return {
      success: true,
      message: "Logo uploaded",
      data: { ...data, upload: putResult.data },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁${displayName}[COMPLETED]`);
  }
};
