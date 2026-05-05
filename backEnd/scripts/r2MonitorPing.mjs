/**
 * Run from repo `backEnd` folder:
 *   npm run r2:monitor:ping
 */

import "dotenv/config";
import { r2_analyticsClient } from "../04_helpers/helpers.index.js";
import { R2_BUCKET_NAME, CLOUDFLARE_ACCOUNT_ID } from "../00_config/_config.index.js";

const ac = r2_analyticsClient();

if (!ac.ok) {
  console.error(JSON.stringify({ success: false, message: ac.message }, null, 2));
  process.exit(1);
}

const now   = new Date();
const start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
const dateStr = (d) => d.toISOString().split("T")[0];

const QUERY = `
query R2Ping($accountId: String!, $bucketName: String!, $startDate: Date!, $endDate: Date!) {
  viewer {
    accounts(filter: { accountTag: $accountId }) {
      r2StorageAdaptiveGroups(
        filter: { date_geq: $startDate, date_leq: $endDate, bucketName: $bucketName }
        limit: 1
      ) {
        max { objectCount }
      }
    }
  }
}`;

try {
  const data = await ac.query(QUERY, {
    accountId:  CLOUDFLARE_ACCOUNT_ID,
    bucketName: R2_BUCKET_NAME,
    startDate:  dateStr(start),
    endDate:    dateStr(now),
  });

  const groups = data?.viewer?.accounts?.[0]?.r2StorageAdaptiveGroups ?? [];

  console.log(JSON.stringify({
    success:        true,
    message:        "Cloudflare Analytics API confirmed; R2 metrics reachable.",
    bucket:         R2_BUCKET_NAME,
    datapointCount: groups.length,
    note: groups.length === 0
      ? "No storage metric data yet — bucket is new or empty. That is expected."
      : `Found ${groups.length} data point(s).`,
  }, null, 2));

  process.exit(0);
} catch (error) {
  console.error(JSON.stringify({ success: false, message: error?.message || String(error) }, null, 2));
  process.exit(1);
}
