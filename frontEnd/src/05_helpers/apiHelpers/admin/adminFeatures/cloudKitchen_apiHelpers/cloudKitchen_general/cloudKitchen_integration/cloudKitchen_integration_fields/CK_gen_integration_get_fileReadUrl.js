import { CK_INTEGRATION_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_INTEGRATION_CONFIG.FIELDS.GET_FILE_READ_URL;
const isDebug = false;

const CK_gen_integration_get_fileReadUrl = async ({
  id,
  objectKey,
  download = false,
  filename = "",
}) => {
  if (!id || !objectKey) {
    return {
      success: false,
      message: "Integration id and objectKey are required",
      data: null,
    };
  }

  isDebug &&
    console.log(`${DISPLAY_NAME} [CALLED] | id: ${id} | key: ${objectKey}`);

  try {
    const response = await fetch(
      ENDPOINT(id, objectKey, { download, filename }),
      PROPERTIES(),
    );
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to resolve file URL",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to resolve file URL",
      data: null,
    };
  }
};

export default CK_gen_integration_get_fileReadUrl;
