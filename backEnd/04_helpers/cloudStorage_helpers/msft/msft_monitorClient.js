import { MetricsQueryClient } from "@azure/monitor-query";
import { ClientSecretCredential } from "@azure/identity";
import {
  AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET,
  AZURE_SUBSCRIPTION_ID, AZURE_RESOURCE_GROUP, AZURE_STORAGE_ACCOUNT_NAME,
} from "../../../00_config/_config.index.js";

let _cache = null;

export const msft_monitorClient = () => {
  if (_cache) return { ok: true, ..._cache };

  if (!AZURE_TENANT_ID)            return { ok: false, message: "AZURE_TENANT_ID missing" };
  if (!AZURE_CLIENT_ID)            return { ok: false, message: "AZURE_CLIENT_ID missing" };
  if (!AZURE_CLIENT_SECRET)        return { ok: false, message: "AZURE_CLIENT_SECRET missing" };
  if (!AZURE_SUBSCRIPTION_ID)      return { ok: false, message: "AZURE_SUBSCRIPTION_ID missing" };
  if (!AZURE_RESOURCE_GROUP)       return { ok: false, message: "AZURE_RESOURCE_GROUP missing" };
  if (!AZURE_STORAGE_ACCOUNT_NAME) return { ok: false, message: "AZURE_STORAGE_ACCOUNT_NAME missing" };

  const credential = new ClientSecretCredential(AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET);
  const client     = new MetricsQueryClient(credential);
  const resourceId =
    `/subscriptions/${AZURE_SUBSCRIPTION_ID}/resourceGroups/${AZURE_RESOURCE_GROUP}` +
    `/providers/Microsoft.Storage/storageAccounts/${AZURE_STORAGE_ACCOUNT_NAME}/blobServices/default`;

  _cache = { client, resourceId };
  return { ok: true, client, resourceId };
};
