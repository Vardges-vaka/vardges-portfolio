import { GetMetricStatisticsCommand } from "@aws-sdk/client-cloudwatch";
import { s3_cloudWatchClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_AWS_monitor_network.js | ";
const FREE_EGRESS_BYTES = 100 * 1e9; // 100 GB free tier

function currentMonthWindow() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return { StartTime: start, EndTime: now };
}

function formatBytes(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function sumDatapoints(datapoints) {
  return (datapoints ?? []).reduce((s, d) => s + (d.Sum ?? 0), 0);
}

export const CS_AWS_monitor_network = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const mc = s3_cloudWatchClient();
  if (!mc.ok) return { error: mc.message };

  const { client, bucket } = mc;
  const window = currentMonthWindow();
  const dims   = [{ Name: "BucketName", Value: bucket }, { Name: "FilterId", Value: "EntireBucket" }];
  const base   = { Namespace: "AWS/S3", Period: 86400, Statistics: ["Sum"], Dimensions: dims, ...window };

  try {
    const [dlRes, ulRes] = await Promise.all([
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "BytesDownloaded" })),
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "BytesUploaded" })),
    ]);

    if (!dlRes.Datapoints?.length && !ulRes.Datapoints?.length) {
      return {
        available: false,
        reason: "S3 request metrics not yet enabled for this bucket. Enable them under S3 → Metrics → Request metrics → Create filter.",
      };
    }

    const egressBytes  = sumDatapoints(dlRes.Datapoints);
    const ingressBytes = sumDatapoints(ulRes.Datapoints);

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
