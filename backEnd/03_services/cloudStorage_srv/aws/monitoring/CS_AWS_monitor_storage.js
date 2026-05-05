import { GetMetricStatisticsCommand } from "@aws-sdk/client-cloudwatch";
import { s3_cloudWatchClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_AWS_monitor_storage.js | ";

function threeDayWindow() {
  const now   = new Date();
  const start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  return { StartTime: start, EndTime: now };
}

function latestValue(datapoints) {
  if (!datapoints?.length) return 0;
  return datapoints.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp))[0].Average ?? 0;
}

export const CS_AWS_monitor_storage = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const mc = s3_cloudWatchClient();
  if (!mc.ok) return { error: mc.message };

  const { client, bucket } = mc;
  const window = threeDayWindow();
  const base = { Namespace: "AWS/S3", Period: 86400, Statistics: ["Average"], ...window };

  try {
    const [bytesRes, countRes] = await Promise.all([
      client.send(new GetMetricStatisticsCommand({
        ...base,
        MetricName: "BucketSizeBytes",
        Dimensions: [
          { Name: "BucketName",   Value: bucket },
          { Name: "StorageType",  Value: "StandardStorage" },
        ],
      })),
      client.send(new GetMetricStatisticsCommand({
        ...base,
        MetricName: "NumberOfObjects",
        Dimensions: [
          { Name: "BucketName",   Value: bucket },
          { Name: "StorageType",  Value: "AllStorageTypes" },
        ],
      })),
    ]);

    const totalBytes = latestValue(bytesRes.Datapoints);
    const totalGb    = totalBytes / 1e9;
    const objects    = Math.round(latestValue(countRes.Datapoints));

    return {
      used:    parseFloat(totalGb.toFixed(2)),
      total:   5,      // S3 free tier: 5 GB
      unit:    "GB",
      objects,
      buckets: [{ name: bucket, size: `${totalGb.toFixed(1)} GB`, pct: 100 }],
      classes: { standard: 100, nearline: 0, coldline: 0, archive: 0 },
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
