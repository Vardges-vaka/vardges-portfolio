import { Branch } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | branch_getOne_srv.js | ";

export const branch_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const branch = await Branch.findById(id);
    if (!branch) {
      return { success: false, message: "Branch not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Branch found: ${branch._id}`);

    return {
      success: true,
      message: "Branch fetched successfully",
      data: branch,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
