import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.EMPLOYEE.GET_ALL;
const isDebug = true;

const Employee_getAll = async () => {
  const endpoint = ENDPOINT;
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...PROPERTIES });
    const backendResponse = await response.json();

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to fetch employees",
      data: backendResponse.payload || [],
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to fetch employees", data: [] };
  }
};

export default Employee_getAll;
