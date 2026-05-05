import { msft_monitorClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_MSFT_monitor_network.js | ";
const FREE_EGRESS_BYTES = 10 * 1e9;

function formatBytes(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function sumMetric(result, metricName) {
  const metric = result.metrics.find((m) => m.name === metricName);
  const data   = metric?.timeseries?.[0]?.data ?? [];
  return data.reduce((s, d) => s + (d.total ?? d.sum ?? 0), 0);
}

export const CS_MSFT_monitor_network = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const mc = msft_monitorClient();
  if (!mc.ok) return { error: mc.message };

  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const result = await mc.client.queryResource(
      mc.resourceId, ["Ingress", "Egress"],
      { granularity: "PT1H", timespan: { startTime: start, endTime: now } },
    );

    const ingressBytes = sumMetric(result, "Ingress");
    const egressBytes  = sumMetric(result, "Egress");

    return {
      ingress:     formatBytes(ingressBytes),
      egress:      formatBytes(egressBytes),
      egressPct:   Math.round((egressBytes / FREE_EGRESS_BYTES) * 100),
      interRegion: "0 B",
      cdnHitRate:  null,
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
