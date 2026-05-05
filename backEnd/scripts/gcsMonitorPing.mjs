/**
 * Verifies the service account has Monitoring Viewer access.
 * Run from the `backEnd` folder:
 *   npm run gcs:monitor:ping
 */

import "dotenv/config";

import { gcs_monitoringClient } from "../04_helpers/helpers.index.js";

const mc = gcs_monitoringClient();

if (!mc.ok) {
  console.error(JSON.stringify({ success: false, message: mc.message }, null, 2));
  process.exit(1);
}
// 
const { client, projectId } = mc;

const now   = new Date();
const start = new Date(now.getTime() - 60 * 60 * 1000); // last 1 hour

try {
  const [series] = await client.listTimeSeries({
    name: `projects/${projectId}`,
    filter: 'metric.type = "storage.googleapis.com/storage/object_count"',
    interval: {
      startTime: { seconds: Math.floor(start.getTime() / 1000) },
      endTime:   { seconds: Math.floor(now.getTime()   / 1000) },
    },
    aggregation: {
      alignmentPeriod:    { seconds: 3600 },
      perSeriesAligner:   "ALIGN_MEAN",
      crossSeriesReducer: "REDUCE_SUM",
    },
  });

  console.log(JSON.stringify({
    success:    true,
    message:    "Monitoring Viewer access confirmed; Cloud Monitoring API reachable.",
    projectId,
    seriesCount: series.length,
    note: series.length === 0
      ? "No metric data yet — bucket is new or empty. That is expected."
      : `Found ${series.length} time-series data point(s).`,
  }, null, 2));

  process.exit(0);
} catch (error) {
  console.error(JSON.stringify({
    success: false,
    message: error?.message || String(error),
  }, null, 2));
  process.exit(1);
}
