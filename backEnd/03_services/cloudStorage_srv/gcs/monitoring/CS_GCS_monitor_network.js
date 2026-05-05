import { gcs_monitoringClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_monitor_network.js | ";

const FREE_EGRESS_BYTES = 1e9; // 1 GB free tier

function currentMonthWindow() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return {
    startTime: { seconds: Math.floor(start.getTime() / 1000) },
    endTime:   { seconds: Math.floor(now.getTime() / 1000) },
  };
}

function formatBytes(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function sumPoints(seriesList) {
  return seriesList.reduce((total, ts) => {
    return total + ts.points.reduce((s, p) => s + Number(p.value?.int64Value || p.value?.doubleValue || 0), 0);
  }, 0);
}

export const CS_GCS_monitor_network = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);

  const mc = gcs_monitoringClient();
  if (!mc.ok) return { error: mc.message };

  const { client, projectId } = mc;
  const interval = currentMonthWindow();

  try {
    const [ingressSeries] = await client.listTimeSeries({
      name: `projects/${projectId}`,
      filter: 'metric.type = "storage.googleapis.com/network/received_bytes_count"',
      interval,
      aggregation: {
        alignmentPeriod: { seconds: 86400 },
        perSeriesAligner: "ALIGN_SUM",
        crossSeriesReducer: "REDUCE_SUM",
      },
    });

    const [egressSeries] = await client.listTimeSeries({
      name: `projects/${projectId}`,
      filter: 'metric.type = "storage.googleapis.com/network/sent_bytes_count"',
      interval,
      aggregation: {
        alignmentPeriod: { seconds: 86400 },
        perSeriesAligner: "ALIGN_SUM",
        crossSeriesReducer: "REDUCE_SUM",
      },
    });

    const ingressBytes  = sumPoints(ingressSeries);
    const egressBytes   = sumPoints(egressSeries);
    const egressPct     = Math.round((egressBytes / FREE_EGRESS_BYTES) * 100);

    return {
      ingress:     formatBytes(ingressBytes),
      egress:      formatBytes(egressBytes),
      egressPct,
      interRegion: "0 B",   // Storage API alone can't distinguish; flag for future
      cdnHitRate:  null,
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
