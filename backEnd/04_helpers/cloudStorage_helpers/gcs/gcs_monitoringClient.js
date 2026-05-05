import { MetricServiceClient } from "@google-cloud/monitoring";
import {
  GCS_APP_CRED_PATH,
  GCP_PROJECT_ID,
} from "../../../00_config/_config.index.js";

let _cache = null;

export const gcs_monitoringClient = () => {
  if (_cache) return { ok: true, ..._cache };

  if (!GCS_APP_CRED_PATH)
    return { ok: false, message: "GOOGLE_APPLICATION_CREDENTIALS missing" };
  if (!GCP_PROJECT_ID)
    return { ok: false, message: "GCP_PROJECT_ID missing" };

  const client = new MetricServiceClient();
  _cache = { client, projectId: GCP_PROJECT_ID };
  return { ok: true, client, projectId: GCP_PROJECT_ID };
};
