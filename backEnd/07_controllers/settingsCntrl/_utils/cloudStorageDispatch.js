import CS_GCS_put from "../../../03_services/cloudStorage_srv/gcs/CS_GCS_put.js";
import CS_GCS_get from "../../../03_services/cloudStorage_srv/gcs/CS_GCS_get.js";
import CS_GCS_delete from "../../../03_services/cloudStorage_srv/gcs/CS_GCS_delete.js";

const stub = (label) => async () => ({
  success: false,
  message: `${label} cloud storage operations are not yet implemented`,
});

const DISPATCH = {
  gcs: { put: CS_GCS_put, get: CS_GCS_get, delete: CS_GCS_delete },
  s3: { put: stub("AWS S3"), get: stub("AWS S3"), delete: stub("AWS S3") },
  r2: { put: stub("Cloudflare R2"), get: stub("Cloudflare R2"), delete: stub("Cloudflare R2") },
  blob: { put: stub("Azure Blob"), get: stub("Azure Blob"), delete: stub("Azure Blob") },
};

export const getCloudOps = (provider) =>
  DISPATCH[provider] ?? { put: stub(provider), get: stub(provider), delete: stub(provider) };
