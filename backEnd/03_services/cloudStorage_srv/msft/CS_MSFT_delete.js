import { AZURE_STORAGE_CONTAINER_NAME } from "../../../00_config/_config.index.js";
import { msft_resolveClientKey } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_MSFT_delete.js | ";

const CS_MSFT_delete = async (params, isDebug = false) => {
  const resolved = msft_resolveClientKey(params?.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  const ignoreNotFound = params?.ignoreNotFound === true;
  const blobClient = resolved.containerClient.getBlockBlobClient(resolved.key);

  try {
    await blobClient.delete();
    return {
      success: true, message: "Object deleted",
      data: { bucket: AZURE_STORAGE_CONTAINER_NAME, objectKey: resolved.key },
    };
  } catch (error) {
    const is404 =
      error?.statusCode === 404 ||
      error?.code === "BlobNotFound" ||
      String(error?.message || "").includes("BlobNotFound");

    if (ignoreNotFound && is404) {
      return {
        success: true, message: "Object not found (ignored)",
        data: { bucket: AZURE_STORAGE_CONTAINER_NAME, objectKey: resolved.key },
      };
    }
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_MSFT_delete;
