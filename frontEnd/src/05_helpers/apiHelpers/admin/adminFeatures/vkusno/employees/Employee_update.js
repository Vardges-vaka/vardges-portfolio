import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.EMPLOYEE.UPDATE;
const isDebug = true;

const Employee_update = async (id, payload) => {
  const endpoint = ADMIN_endpoints.EMPLOYEE.UPDATE.ENDPOINT(id);
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...ADMIN_endpoints.EMPLOYEE.UPDATE.PROPERTIES(payload) });
    const backendResponse = await response.json();

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to update employee",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to update employee", data: null };
  }
};

export default Employee_update;
