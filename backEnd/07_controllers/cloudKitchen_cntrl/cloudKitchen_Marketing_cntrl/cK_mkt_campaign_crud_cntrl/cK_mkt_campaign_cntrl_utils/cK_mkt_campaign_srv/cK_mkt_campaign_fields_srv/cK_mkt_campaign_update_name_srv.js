import { Campaign } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_mkt_campaign_update_name_srv.js | ";

export const cK_mkt_campaign_update_name_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newRecord = new Campaign(sanitizedData);
    await newRecord.save();

    isDebug && console.log(`✅${displayName}Campaign created: ${newRecord._id}`);

    return {
      success: true,
      message: "Campaign created successfully",
      data: {},
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
