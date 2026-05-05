/**
 * Verifies the IAM user has CloudWatch read access for S3 metrics.
 * Run from the `backEnd` folder:
 *   npm run s3:monitor:ping
 */

import "dotenv/config";
import { GetMetricStatisticsCommand } from "@aws-sdk/client-cloudwatch";
import { s3_cloudWatchClient } from "../04_helpers/helpers.index.js";

const mc = s3_cloudWatchClient();

if (!mc.ok) {
  console.error(JSON.stringify({ success: false, message: mc.message }, null, 2));
  process.exit(1);
}

const { client, bucket } = mc;

const now   = new Date();
const start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

try {
  const response = await client.send(new GetMetricStatisticsCommand({
    Namespace:  "AWS/S3",
    MetricName: "BucketSizeBytes",
    Dimensions: [
      { Name: "BucketName",  Value: bucket },
      { Name: "StorageType", Value: "StandardStorage" },
    ],
    StartTime:  start,
    EndTime:    now,
    Period:     86400,
    Statistics: ["Average"],
  }));

  console.log(JSON.stringify({
    success:         true,
    message:         "CloudWatch access confirmed; S3 metrics API reachable.",
    bucket,
    datapointCount:  response.Datapoints?.length ?? 0,
    note: response.Datapoints?.length === 0
      ? "No storage metric data yet — bucket is new or empty. That is expected."
      : `Found ${response.Datapoints.length} data point(s).`,
  }, null, 2));

  process.exit(0);
} catch (error) {
  console.error(JSON.stringify({ success: false, message: error?.message || String(error) }, null, 2));
  process.exit(1);
}
