import { Branch } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | branch_getAll_srv.js | ";

export const branch_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const branches = await Branch.find()
      .populate("brands", "name files.logos isActive")
      .sort({ createdAt: -1 });

    isDebug && console.log(`✅${displayName}Found ${branches.length} branches`);

    return {
      success: true,
      message: "Branches fetched successfully",
      data: branches,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
