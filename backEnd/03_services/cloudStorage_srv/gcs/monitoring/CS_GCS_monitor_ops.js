import { gcs_monitoringClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_monitor_ops.js | ";

const CLASS_A_METHODS = new Set([
  "InsertObject", "MultipartUpload", "ComposeObject", "RewriteObject",
  "PatchObject", "UpdateBucketIAMPolicy", "InsertBucket", "DeleteObject",
]);
const CLASS_B_METHODS = new Set([
  "GetObject", "ListObjects", "ListBuckets", "GetBucketMetadata",
  "GetBucketIAMPolicy", "GetServiceAccount",
]);

function currentMonthWindow() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return {
    startTime: { seconds: Math.floor(start.getTime() / 1000) },
    endTime:   { seconds: Math.floor(now.getTime() / 1000) },
  };
}

function sumPoints(seriesList) {
  return seriesList.reduce((total, ts) => {
    return total + ts.points.reduce((s, p) => s + Number(p.value?.int64Value || p.value?.doubleValue || 0), 0);
  }, 0);
}

export const CS_GCS_monitor_ops = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);

  const mc = gcs_monitoringClient();
  if (!mc.ok) return { error: mc.message };

  const { client, projectId } = mc;
  const interval = currentMonthWindow();

  try {
    // request_count grouped by method
    const [methodSeries] = await client.listTimeSeries({
      name: `projects/${projectId}`,
      filter: 'metric.type = "storage.googleapis.com/api/request_count"',
      interval,
      aggregation: {
        alignmentPeriod: { seconds: 86400 },
        perSeriesAligner: "ALIGN_SUM",
        crossSeriesReducer: "REDUCE_SUM",
        groupByFields: ["metric.labels.method"],
      },
    });

    // request_count grouped by response_code for failures
    const [codeSeries] = await client.listTimeSeries({
      name: `projects/${projectId}`,
      filter: 'metric.type = "storage.googleapis.com/api/request_count"',
      interval,
      aggregation: {
        alignmentPeriod: { seconds: 86400 },
        perSeriesAligner: "ALIGN_SUM",
        crossSeriesReducer: "REDUCE_SUM",
        groupByFields: ["metric.labels.response_code"],
      },
    });

    let classA = 0, classB = 0;
    for (const ts of methodSeries) {
      const method = ts.metric?.labels?.method || "";
      const count  = sumPoints([ts]);
      if (CLASS_A_METHODS.has(method)) classA += count;
      else if (CLASS_B_METHODS.has(method)) classB += count;
    }

    const failed = codeSeries.reduce((sum, ts) => {
      const code = String(ts.metric?.labels?.response_code || "200");
      if (!code.startsWith("2")) return sum + sumPoints([ts]);
      return sum;
    }, 0);

    return {
      classA:      Math.round(classA),
      classALimit: 5000,
      classB:      Math.round(classB),
      classBLimit: 50000,
      total:       Math.round(classA + classB),
      failed:      Math.round(failed),
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
