import { gcs_monitoringClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_monitor_storage.js | ";

function lastHourWindow() {
  const now = new Date();
  const start = new Date(now.getTime() - 60 * 60 * 1000);
  return {
    startTime: { seconds: Math.floor(start.getTime() / 1000) },
    endTime:   { seconds: Math.floor(now.getTime() / 1000) },
  };
}

export const CS_GCS_monitor_storage = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);

  const mc = gcs_monitoringClient();
  if (!mc.ok) return { error: mc.message };

  const { client, projectId } = mc;
  const interval = lastHourWindow();

  try {
    // total_bytes grouped by bucket + storage_class
    const [byteSeries] = await client.listTimeSeries({
      name: `projects/${projectId}`,
      filter:
        'metric.type = "storage.googleapis.com/storage/total_bytes"',
      interval,
      aggregation: {
        alignmentPeriod: { seconds: 3600 },
        perSeriesAligner: "ALIGN_MEAN",
        crossSeriesReducer: "REDUCE_SUM",
        groupByFields: [
          "resource.labels.bucket_name",
          "metric.labels.storage_class",
        ],
      },
    });

    // object_count
    const [countSeries] = await client.listTimeSeries({
      name: `projects/${projectId}`,
      filter:
        'metric.type = "storage.googleapis.com/storage/object_count"',
      interval,
      aggregation: {
        alignmentPeriod: { seconds: 3600 },
        perSeriesAligner: "ALIGN_MEAN",
        crossSeriesReducer: "REDUCE_SUM",
      },
    });

    // Aggregate bytes per bucket + storage class
    const bucketBytes = {};
    const classBytes  = { standard: 0, nearline: 0, coldline: 0, archive: 0 };

    for (const ts of byteSeries) {
      const bucket  = ts.resource?.labels?.bucket_name || "unknown";
      const klass   = (ts.metric?.labels?.storage_class || "standard").toLowerCase();
      const val     = Number(ts.points?.[0]?.value?.doubleValue || ts.points?.[0]?.value?.int64Value || 0);

      bucketBytes[bucket] = (bucketBytes[bucket] || 0) + val;
      if (klass in classBytes) classBytes[klass] += val;
      else classBytes.standard += val;
    }

    const totalBytes = Object.values(bucketBytes).reduce((s, v) => s + v, 0);
    const totalGb    = totalBytes / 1e9;
    const classTotalBytes = Object.values(classBytes).reduce((s, v) => s + v, 0) || 1;

    const buckets = Object.entries(bucketBytes).map(([name, bytes]) => ({
      name,
      size: `${(bytes / 1e9).toFixed(1)} GB`,
      pct: Math.round((bytes / (totalBytes || 1)) * 100),
    }));

    const objects = countSeries.reduce((sum, ts) => {
      return sum + Number(ts.points?.[0]?.value?.doubleValue || ts.points?.[0]?.value?.int64Value || 0);
    }, 0);

    return {
      used:    parseFloat(totalGb.toFixed(2)),
      total:   100,
      unit:    "GB",
      objects: Math.round(objects),
      buckets,
      classes: {
        standard: Math.round((classBytes.standard / classTotalBytes) * 100),
        nearline: Math.round((classBytes.nearline / classTotalBytes) * 100),
        coldline: Math.round((classBytes.coldline / classTotalBytes) * 100),
        archive:  Math.round((classBytes.archive  / classTotalBytes) * 100),
      },
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
