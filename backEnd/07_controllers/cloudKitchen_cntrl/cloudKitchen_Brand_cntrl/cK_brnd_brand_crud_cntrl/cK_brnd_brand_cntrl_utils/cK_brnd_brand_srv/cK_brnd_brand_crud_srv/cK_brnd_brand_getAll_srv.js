import { Brand } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_brand_getAll_srv.js | ";

export const cK_brnd_brand_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newRecord = new Brand(sanitizedData);
    await newRecord.save();

    isDebug && console.log(`✅${displayName}Brand saved: ${newRecord._id}`);

    return {
      success: true,
      message: "Brand operation completed successfully",
      data: {},
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
