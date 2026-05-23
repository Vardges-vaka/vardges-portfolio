import { AdSpend } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_mkt_adSpend_update_source_srv.js | ";

export const cK_mkt_adSpend_update_source_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newRecord = new AdSpend(sanitizedData);
    await newRecord.save();

    isDebug && console.log(`✅${displayName}AdSpend created: ${newRecord._id}`);

    return {
      success: true,
      message: "AdSpend created successfully",
      data: {},
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
