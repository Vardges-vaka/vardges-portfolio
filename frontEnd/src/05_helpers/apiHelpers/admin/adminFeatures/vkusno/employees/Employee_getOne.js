import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.EMPLOYEE.GET_ONE;
const isDebug = true;

const Employee_getOne = async (id) => {
  const endpoint = ADMIN_endpoints.EMPLOYEE.GET_ONE.ENDPOINT(id);
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...ADMIN_endpoints.EMPLOYEE.GET_ONE.PROPERTIES });
    const backendResponse = await response.json();

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to fetch employee",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to fetch employee", data: null };
  }
};

export default Employee_getOne;
