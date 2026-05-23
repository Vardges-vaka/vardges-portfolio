import { Competitor } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_competitor_update_socialMedia_srv.js | ";

export const cK_brnd_competitor_update_socialMedia_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newRecord = new Competitor(sanitizedData);
    await newRecord.save();

    isDebug && console.log(`✅${displayName}Competitor saved: ${newRecord._id}`);

    return {
      success: true,
      message: "Competitor operation completed successfully",
      data: {},
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
