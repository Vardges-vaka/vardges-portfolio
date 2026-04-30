import { Branch } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | branch_update_srv.js | ";

export const branch_update_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;

    const mongoOp = {};

    /** `cloudStorage: null` clears branch storage choice (validated in branch_fields_vld). */
    if (
      Object.prototype.hasOwnProperty.call(updateFields, "cloudStorage") &&
      updateFields.cloudStorage === null
    ) {
      mongoOp.$unset = { cloudStorage: "" };
    }

    const { cloudStorage: _drop, ...setFields } = updateFields;

    if (Object.keys(setFields).length > 0) {
      mongoOp.$set = setFields;
    }

    if (!mongoOp.$set && !mongoOp.$unset) {
      return { success: false, message: "No valid fields to update", data: null };
    }

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      mongoOp,
      { new: true, runValidators: true },
    );

    if (!updatedBranch) {
      return { success: false, message: "Branch not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Branch updated: ${updatedBranch._id}`);

    return {
      success: true,
      message: "Branch updated successfully",
      data: updatedBranch,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
