import { Brand, Employee } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";

const displayName = " | employee_delete_srv.js | ";

export const employee_delete_srv = async (req, isDebug) => {
  try {
    const { id } = req.body.sanitizedData;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return { success: false, message: "Employee not found", data: null };
    await Brand.updateMany({ employees: id }, { $pull: { employees: id } });
    return { success: true, message: "Employee deleted successfully", data: { _id: id } };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
