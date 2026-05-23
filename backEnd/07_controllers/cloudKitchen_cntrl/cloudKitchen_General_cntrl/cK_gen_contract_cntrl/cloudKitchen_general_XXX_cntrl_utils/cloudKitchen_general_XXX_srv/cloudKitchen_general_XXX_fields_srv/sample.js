import { Branch } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";

const displayName = " | XXX_srv.js | ";

export const XXX_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const sanitizedData = req.body.sanitizedData;

    const newBranch = new Branch(sanitizedData);
    await newBranch.save();

    isDebug && console.log(`✅${displayName}Branch created: ${newBranch._id}`);

    return {
      success: true,
      message: "Branch created successfully", // needs to be edited properly, to be added a proper internationalizated message.
      data: {},
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
