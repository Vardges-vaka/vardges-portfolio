import { msft_monitorClient } from "../../../../04_helpers/helpers.index.js";
import { AZURE_STORAGE_CONTAINER_NAME } from "../../../../00_config/_config.index.js";

const displayName = " | CS_MSFT_monitor_storage.js | ";

function latestAverage(metric) {
  const series = metric?.timeseries?.[0]?.data ?? [];
  const valid  = series.filter((d) => d.average != null);
  return valid.length ? valid[valid.length - 1].average : 0;
}

export const CS_MSFT_monitor_storage = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const mc = msft_monitorClient();
  if (!mc.ok) return { error: mc.message };

  const now   = new Date();
  const start = new Date(now.getTime() - 3 * 60 * 60 * 1000); // last 3 hours

  try {
    const result = await mc.client.queryResource(
      mc.resourceId,
      ["BlobCapacity", "BlobCount"],
      { granularity: "PT1H", timespan: { startTime: start, endTime: now } },
    );

    const capacityMetric = result.metrics.find((m) => m.name === "BlobCapacity");
    const countMetric    = result.metrics.find((m) => m.name === "BlobCount");

    const totalBytes = latestAverage(capacityMetric);
    const totalGb    = totalBytes / 1e9;
    const objects    = Math.round(latestAverage(countMetric));

    return {
      used:    parseFloat(totalGb.toFixed(2)),
      total:   5,
      unit:    "GB",
      objects,
      buckets: [{ name: AZURE_STORAGE_CONTAINER_NAME, size: `${totalGb.toFixed(1)} GB`, pct: 100 }],
      classes: { standard: 100, nearline: 0, coldline: 0, archive: 0 },
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
