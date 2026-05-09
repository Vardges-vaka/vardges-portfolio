import { ADMIN_endpoints } from "../../../../../../03_config/config.index";
import { runBrandRequest } from "./_Brand_request.js";

const Brand_unlinkEmployee = (id, employeeId) => {
  const config = ADMIN_endpoints.BRAND.UNLINK_EMPLOYEE;
  return runBrandRequest({
    displayName: config.DISPLAY_NAME,
    endpoint: config.ENDPOINT(id, employeeId),
    properties: config.PROPERTIES,
    fallbackMessage: "Failed to unlink brand employee",
  });
};

export default Brand_unlinkEmployee;
