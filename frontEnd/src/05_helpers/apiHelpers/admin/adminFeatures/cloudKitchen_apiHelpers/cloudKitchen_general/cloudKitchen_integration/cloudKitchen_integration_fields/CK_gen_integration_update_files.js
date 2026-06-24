import { CK_INTEGRATION_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_INTEGRATION_CONFIG.FIELDS.UPDATE_FILES;
const isDebug = true;

export const buildIntegrationFilesFormData = (filesDraft = {}) => {
  const items = Array.isArray(filesDraft.items) ? filesDraft.items : [];
  const uploadItemIndexes = [];
  const formData = new FormData();

  const metaItems = items.map((item, index) => {
    const pending = item?._pendingFile;
    const clean = { ...item };
    delete clean._pendingFile;

    if (pending instanceof File) {
      uploadItemIndexes.push(index);
      formData.append("files", pending);

      if (typeof clean.url === "string" && clean.url.startsWith("blob:")) {
        clean.url = "";
      }
    }

    return clean;
  });

  formData.append(
    "filesMeta",
    JSON.stringify({
      cloudStorage: filesDraft.cloudStorage ?? { isDefault: true, value: "" },
      items: metaItems,
    }),
  );
  formData.append("uploadItemIndexes", JSON.stringify(uploadItemIndexes));

  return formData;
};

const CK_gen_integration_update_files = async (payload) => {
  const { id, files } = payload;
  const url = ENDPOINT(id);
  const formData = buildIntegrationFilesFormData(files);

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${url}]`);
  isDebug &&
    console.log(`${DISPLAY_NAME} [PAYLOAD]`, {
      id,
      itemCount: files?.items?.length ?? 0,
      uploadCount: formData.getAll("files").length,
    });

  try {
    const response = await fetch(url, PROPERTIES(formData));
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to update integration files",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update integration files",
      data: null,
    };
  }
};

export default CK_gen_integration_update_files;
