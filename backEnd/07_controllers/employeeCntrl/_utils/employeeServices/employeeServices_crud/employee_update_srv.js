import { Employee } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { syncEmployeeAssociatedBrands } from "../../../../brandCntrl/_utils/brandServices/brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | employee_update_srv.js | ";

export const employee_update_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id, ...updateFields } = req.body.sanitizedData;
    const previousEmployee = await Employee.findById(id).select("associatedBrands");
    if (!previousEmployee) {
      return { success: false, message: "Employee not found", data: null };
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true },
    )
      .populate("workingBranch", "name")
      .populate("associatedBrands", "name files.logos isActive");

    if (!updatedEmployee) {
      return { success: false, message: "Employee not found", data: null };
    }

    if (Object.prototype.hasOwnProperty.call(updateFields, "associatedBrands")) {
      await syncEmployeeAssociatedBrands(
        id,
        previousEmployee.associatedBrands,
        updateFields.associatedBrands,
      );
    }

    return {
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
