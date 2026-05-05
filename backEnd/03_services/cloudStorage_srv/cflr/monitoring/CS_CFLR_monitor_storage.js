import { r2_analyticsClient } from "../../../../04_helpers/helpers.index.js";
import { R2_BUCKET_NAME } from "../../../../00_config/_config.index.js";

const displayName = " | CS_CFLR_monitor_storage.js | ";

const STORAGE_QUERY = `
query R2Storage($accountId: String!, $bucketName: String!, $startDate: Date!, $endDate: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountId }) {
      r2StorageAdaptiveGroups(
        filter: { date_geq: $startDate, date_leq: $endDate, bucketName: $bucketName }
        limit: 1
      ) {
        max { payloadSize objectCount }
        dimensions { bucketName }
      }
    }
  }
}`;

function dateStr(d) {
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

export const CS_CFLR_monitor_storage = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const ac = r2_analyticsClient();
  if (!ac.ok) return { error: ac.message };

  const now   = new Date();
  const start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  try {
    const data = await ac.query(STORAGE_QUERY, {
      accountId: ac.accountId,
      bucketName: R2_BUCKET_NAME,
      startDate: dateStr(start),
      endDate:   dateStr(now),
    });

    const groups = data?.viewer?.accounts?.[0]?.r2StorageAdaptiveGroups ?? [];
    const latest = groups[0]?.max ?? {};
    const totalBytes = latest.payloadSize ?? 0;
    const totalGb    = totalBytes / 1e9;
    const objects    = Math.round(latest.objectCount ?? 0);

    return {
      used:    parseFloat(totalGb.toFixed(2)),
      total:   10,
      unit:    "GB",
      objects,
      buckets: [{ name: R2_BUCKET_NAME, size: `${totalGb.toFixed(1)} GB`, pct: 100 }],
      classes: { standard: 100, nearline: 0, coldline: 0, archive: 0 },
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
