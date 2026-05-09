import { Brand, Employee } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_unlinkEmployee_srv.js | ";

export const brand_unlinkEmployee_srv = async (req, isDebug) => {
  try {
    const { id, employeeId } = req.body.sanitizedData;
    await Promise.all([
      Brand.findByIdAndUpdate(id, { $pull: { employees: employeeId } }),
      Employee.findByIdAndUpdate(employeeId, {
        $pull: { associatedBrands: id },
      }),
    ]);

    const populated = await populateBrandById(id);
    if (!populated) return { success: false, message: "Brand not found", data: null };
    return { success: true, message: "Employee unlinked successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
