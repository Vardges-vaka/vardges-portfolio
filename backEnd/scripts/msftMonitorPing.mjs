/**
 * Run from repo `backEnd` folder:
 *   npm run msft:monitor:ping
 */

import "dotenv/config";
import { msft_monitorClient } from "../04_helpers/helpers.index.js";
import { AZURE_STORAGE_CONTAINER_NAME } from "../00_config/_config.index.js";

const mc = msft_monitorClient();

if (!mc.ok) {
  console.error(JSON.stringify({ success: false, message: mc.message }, null, 2));
  process.exit(1);
}

const now   = new Date();
const start = new Date(now.getTime() - 3 * 60 * 60 * 1000);

try {
  const result = await mc.client.queryResource(
    mc.resourceId,
    ["BlobCount"],
    { granularity: "PT1H", timespan: { startTime: start, endTime: now } },
  );

  const metric     = result.metrics.find((m) => m.name === "BlobCount");
  const datapoints = metric?.timeseries?.[0]?.data ?? [];

  console.log(JSON.stringify({
    success:        true,
    message:        "Azure Monitor access confirmed; metrics API reachable.",
    container:      AZURE_STORAGE_CONTAINER_NAME,
    datapointCount: datapoints.length,
    note: datapoints.length === 0
      ? "No metric data yet — container is new or empty. That is expected."
      : `Found ${datapoints.length} data point(s).`,
  }, null, 2));

  process.exit(0);
} catch (error) {
  console.error(JSON.stringify({ success: false, message: error?.message || String(error) }, null, 2));
  process.exit(1);
}
