import {
  CS_MSFT_monitor,
  CS_GCS_put,
  CS_GCS_get,
  CS_GCS_delete,
  CS_GCS_monitor,
  CS_AWS_put,
  CS_AWS_get,
  CS_AWS_delete,
  CS_AWS_monitor,
  CS_CFLR_put,
  CS_CFLR_get,
  CS_CFLR_delete,
  CS_CFLR_monitor,
  CS_MSFT_put,
  CS_MSFT_get,
  CS_MSFT_delete,
} from "../../../../03_services/_services.index.js";

const stub = (label) => async () => ({
  success: false,
  message: `${label} cloud storage operations are not yet implemented`,
});

const DISPATCH = {
  gcs: {
    put: CS_GCS_put,
    get: CS_GCS_get,
    delete: CS_GCS_delete,
    monitor: CS_GCS_monitor,
  },
  s3: {
    put: CS_AWS_put,
    get: CS_AWS_get,
    delete: CS_AWS_delete,
    monitor: CS_AWS_monitor,
  },
  r2: {
    put: CS_CFLR_put,
    get: CS_CFLR_get,
    delete: CS_CFLR_delete,
    monitor: CS_CFLR_monitor,
  },
  blob: {
    put: CS_MSFT_put,
    get: CS_MSFT_get,
    delete: CS_MSFT_delete,
    monitor: CS_MSFT_monitor,
  },
};

export const getCloudOps = (provider) =>
  DISPATCH[provider] ?? {
    put: stub(provider),
    get: stub(provider),
    delete: stub(provider),
    monitor: stub(provider),
  };
