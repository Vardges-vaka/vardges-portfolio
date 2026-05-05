import { GetMetricStatisticsCommand } from "@aws-sdk/client-cloudwatch";
import { s3_cloudWatchClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_AWS_monitor_ops.js | ";

function currentMonthWindow() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return { StartTime: start, EndTime: now };
}

function sumDatapoints(datapoints) {
  return (datapoints ?? []).reduce((s, d) => s + (d.Sum ?? 0), 0);
}

export const CS_AWS_monitor_ops = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const mc = s3_cloudWatchClient();
  if (!mc.ok) return { error: mc.message };

  const { client, bucket } = mc;
  const window = currentMonthWindow();
  const dims   = [{ Name: "BucketName", Value: bucket }, { Name: "FilterId", Value: "EntireBucket" }];
  const base   = { Namespace: "AWS/S3", Period: 86400, Statistics: ["Sum"], Dimensions: dims, ...window };

  try {
    const [allRes, getRes, putRes, err4xxRes, err5xxRes] = await Promise.all([
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "AllRequests" })),
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "GetRequests" })),
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "PutRequests" })),
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "4xxErrors" })),
      client.send(new GetMetricStatisticsCommand({ ...base, MetricName: "5xxErrors" })),
    ]);

    // If no data at all → request metrics not enabled
    if (!allRes.Datapoints?.length) {
      return {
        available: false,
        reason: "S3 request metrics not yet enabled for this bucket. Enable them under S3 → Metrics → Request metrics → Create filter.",
      };
    }

    const classB  = Math.round(sumDatapoints(getRes.Datapoints));
    const classA  = Math.round(sumDatapoints(putRes.Datapoints));
    const failed  = Math.round(sumDatapoints(err4xxRes.Datapoints) + sumDatapoints(err5xxRes.Datapoints));

    return {
      classA,      classALimit: 2000,
      classB,      classBLimit: 20000,
      total: Math.round(sumDatapoints(allRes.Datapoints)),
      failed,
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
