import { Employee } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { syncEmployeeAssociatedBrands } from "../../../../brandCntrl/_utils/brandServices/brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | employee_add_srv.js | ";

export const employee_add_srv = async (req, isDebug) => {
  try {
    const newEmployee = new Employee(req.body.sanitizedData);
    await newEmployee.save();
    await syncEmployeeAssociatedBrands(
      newEmployee._id,
      [],
      newEmployee.associatedBrands,
    );
    return { success: true, message: "Employee created successfully", data: newEmployee };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
