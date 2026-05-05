import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import {
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY,
  AZURE_STORAGE_CONTAINER_NAME,
} from "../../../00_config/_config.index.js";

let _cache = null;

export const msft_resolveClient = () => {
  if (_cache) return { ok: true, ..._cache };

  if (!AZURE_STORAGE_ACCOUNT_NAME)   return { ok: false, message: "AZURE_STORAGE_ACCOUNT_NAME missing — check .env" };
  if (!AZURE_STORAGE_ACCOUNT_KEY)    return { ok: false, message: "AZURE_STORAGE_ACCOUNT_KEY missing — check .env" };
  if (!AZURE_STORAGE_CONTAINER_NAME) return { ok: false, message: "AZURE_STORAGE_CONTAINER_NAME missing — check .env" };

  const credential    = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY);
  const serviceClient = new BlobServiceClient(
    `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    credential,
  );
  const containerClient = serviceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

  _cache = {
    credential,
    serviceClient,
    containerClient,
    accountName: AZURE_STORAGE_ACCOUNT_NAME,
    container:   AZURE_STORAGE_CONTAINER_NAME,
  };
  return { ok: true, ..._cache };
};
