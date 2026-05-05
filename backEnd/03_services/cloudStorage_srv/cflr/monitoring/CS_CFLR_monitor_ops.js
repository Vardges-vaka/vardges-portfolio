import { r2_analyticsClient } from "../../../../04_helpers/helpers.index.js";
import { R2_BUCKET_NAME } from "../../../../00_config/_config.index.js";

const displayName = " | CS_CFLR_monitor_ops.js | ";

const CLASS_A = new Set(["PutObject","CopyObject","CompleteMultipartUpload",
  "CreateMultipartUpload","UploadPart","DeleteObject","DeleteObjects"]);
const CLASS_B = new Set(["GetObject","HeadObject","ListObjects","ListObjectsV2",
  "ListBuckets","ListMultipartUploads"]);

const OPS_QUERY = `
query R2Ops($accountId: String!, $bucketName: String!, $startDate: Date!, $endDate: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountId }) {
      r2OperationsAdaptiveGroups(
        filter: { date_geq: $startDate, date_leq: $endDate, bucketName: $bucketName }
        limit: 10000
      ) {
        sum { requests responseObjectSize }
        dimensions { actionType }
      }
    }
  }
}`;

function dateStr(d) { return d.toISOString().split("T")[0]; }

export const CS_CFLR_monitor_ops = async (isDebug = false) => {
  isDebug && console.log(`${displayName}[STARTED]`);
  const ac = r2_analyticsClient();
  if (!ac.ok) return { error: ac.message };

  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const data = await ac.query(OPS_QUERY, {
      accountId: ac.accountId, bucketName: R2_BUCKET_NAME,
      startDate: dateStr(start), endDate: dateStr(now),
    });

    const groups = data?.viewer?.accounts?.[0]?.r2OperationsAdaptiveGroups ?? [];

    let classA = 0, classB = 0, total = 0;
    for (const g of groups) {
      const reqs = g.sum?.requests ?? 0;
      const type = g.dimensions?.actionType ?? "";
      total += reqs;
      if (CLASS_A.has(type)) classA += reqs;
      else if (CLASS_B.has(type)) classB += reqs;
    }

    return {
      classA: Math.round(classA), classALimit: 1_000_000,
      classB: Math.round(classB), classBLimit: 10_000_000,
      total:  Math.round(total),  failed: 0,
    };
  } catch (error) {
    isDebug && console.error(`${displayName}[FAIL]`, error?.message);
    return { error: error?.message || String(error) };
  }
};
