import { Brand, Employee } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_linkEmployee_srv.js | ";

export const brand_linkEmployee_srv = async (req, isDebug) => {
  try {
    const { id, employeeId } = req.body.sanitizedData;
    const [brand, employee] = await Promise.all([
      Brand.findById(id),
      Employee.findById(employeeId),
    ]);
    if (!brand) return { success: false, message: "Brand not found", data: null };
    if (!employee) return { success: false, message: "Employee not found", data: null };

    await Promise.all([
      Brand.findByIdAndUpdate(id, { $addToSet: { employees: employeeId } }),
      Employee.findByIdAndUpdate(employeeId, {
        $addToSet: { associatedBrands: id },
      }),
    ]);

    const populated = await populateBrandById(id);
    return { success: true, message: "Employee linked successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
