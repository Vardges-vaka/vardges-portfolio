import { Branch } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | branch_delete_srv.js | ";

export const branch_delete_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.body.sanitizedData;

    const deletedBranch = await Branch.findByIdAndDelete(id);
    if (!deletedBranch) {
      return { success: false, message: "Branch not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Branch deleted: ${id}`);

    return {
      success: true,
      message: "Branch deleted successfully",
      data: { _id: id },
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
