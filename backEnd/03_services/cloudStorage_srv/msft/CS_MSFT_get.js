import { generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
import { AZURE_STORAGE_CONTAINER_NAME } from "../../../00_config/_config.index.js";
import { msft_resolveClientKey, msft_getExpTime } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_MSFT_get.js | ";

const CS_MSFT_get = async (params, isDebug = false) => {
  const resolved = msft_resolveClientKey(params?.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  try {
    const expiresOn = await msft_getExpTime(params?.timeInHours ?? null);

    const sasOptions = {
      containerName: resolved.container,
      blobName: resolved.key,
      permissions: BlobSASPermissions.parse("r"),
      startsOn: new Date(),
      expiresOn,
    };

    if (params?.downloadFilename) {
      sasOptions.contentDisposition = `attachment; filename="${String(params.downloadFilename).replace(/"/g, "'")}"`;
    }

    const sasToken = generateBlobSASQueryParameters(
      sasOptions,
      resolved.credential,
    ).toString();

    const readUrl = `https://${resolved.accountName}.blob.core.windows.net`
      + `/${resolved.container}/${resolved.key}?${sasToken}`;

    return {
      success: true,
      message: "Signed read URL issued",
      data: {
        bucket: AZURE_STORAGE_CONTAINER_NAME, objectKey: resolved.key,
        readUrl, expiresAt: expiresOn.toISOString(), method: "GET",
      },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_MSFT_get;
