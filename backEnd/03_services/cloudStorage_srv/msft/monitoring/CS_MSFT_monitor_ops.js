import { msft_monitorClient } from "../../../../04_helpers/helpers.index.js";

const displayName = " | CS_MSFT_monitor_ops.js | ";

function sumMetric(result, metricName) {
  const metric = result.metrics.find((m) => m.name === metricName);
  const data   = metric?.timeseries?.[0]?.data ?? [];
  return data.reduce((s, d) => s + (d.total ?? d.sum ?? 0), 0);
}

export const CS_MSFT_monitor_ops = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const mc = msft_monitorClient();
  if (!mc.ok) return { error: mc.message };

  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  const writeFilter = "ApiName eq 'PutBlob' or ApiName eq 'PutBlock' or ApiName eq 'PutBlockList' or ApiName eq 'CopyBlob' or ApiName eq 'DeleteBlob'";
  const readFilter  = "ApiName eq 'GetBlob' or ApiName eq 'ListBlobsFlatSegment' or ApiName eq 'GetBlobProperties' or ApiName eq 'HeadBlob'";

  try {
    const [writesResult, readsResult, totalResult] = await Promise.all([
      mc.client.queryResource(mc.resourceId, ["Transactions"],
        { granularity: "PT1H", timespan: { startTime: start, endTime: now }, filter: writeFilter }),
      mc.client.queryResource(mc.resourceId, ["Transactions"],
        { granularity: "PT1H", timespan: { startTime: start, endTime: now }, filter: readFilter }),
      mc.client.queryResource(mc.resourceId, ["Transactions"],
        { granularity: "PT1H", timespan: { startTime: start, endTime: now } }),
    ]);

    return {
      classA: Math.round(sumMetric(writesResult, "Transactions")), classALimit: 10000,
      classB: Math.round(sumMetric(readsResult,  "Transactions")), classBLimit: 50000,
      total:  Math.round(sumMetric(totalResult,  "Transactions")), failed: 0,
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
