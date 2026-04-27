import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.EMPLOYEE.ADD;
const isDebug = true;

const Employee_add = async (payload) => {
  const endpoint = ENDPOINT;
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...PROPERTIES(payload) });
    const backendResponse = await response.json();

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to add employee",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to add employee", data: null };
  }
};

export default Employee_add;
