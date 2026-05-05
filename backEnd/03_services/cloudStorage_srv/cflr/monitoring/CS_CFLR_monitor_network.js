import { r2_analyticsClient } from "../../../../04_helpers/helpers.index.js";
import { R2_BUCKET_NAME } from "../../../../00_config/_config.index.js";

const displayName = " | CS_CFLR_monitor_network.js | ";

const NET_QUERY = `
query R2Net($accountId: String!, $bucketName: String!, $startDate: Date!, $endDate: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountId }) {
      r2OperationsAdaptiveGroups(
        filter: { date_geq: $startDate, date_leq: $endDate, bucketName: $bucketName,
                  actionType: "GetObject" }
        limit: 10000
      ) {
        sum { responseObjectSize }
      }
    }
  }
}`;

function dateStr(d) { return d.toISOString().split("T")[0]; }

function formatBytes(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

export const CS_CFLR_monitor_network = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const ac = r2_analyticsClient();
  if (!ac.ok) return { error: ac.message };

  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const data = await ac.query(NET_QUERY, {
      accountId: ac.accountId, bucketName: R2_BUCKET_NAME,
      startDate: dateStr(start), endDate: dateStr(now),
    });

    const groups = data?.viewer?.accounts?.[0]?.r2OperationsAdaptiveGroups ?? [];
    const egressBytes = groups.reduce((s, g) => s + (g.sum?.responseObjectSize ?? 0), 0);

    return {
      ingress:     "N/A",
      egress:      formatBytes(egressBytes),
      egressPct:   0,
      egressFree:  true,
      interRegion: "0 B",
      cdnHitRate:  null,
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
