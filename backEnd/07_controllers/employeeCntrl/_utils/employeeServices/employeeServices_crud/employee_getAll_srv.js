import { Employee } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | employee_getAll_srv.js | ";

export const employee_getAll_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const employees = await Employee.find()
      .populate("workingBranch", "name")
      .populate("associatedBrands", "name files.logos isActive")
      .sort({ createdAt: -1 });

    return {
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
