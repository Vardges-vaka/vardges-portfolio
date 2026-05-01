/**
 * Run from repo `backEnd` folder so `.env` is found:
 *   npm run gcs:ping
 */

import "dotenv/config";

import { gcs_bucketPing } from "../04_helpers/helpers.index.js";

const isDebug = true;
const out = await gcs_bucketPing(isDebug);

console.log(JSON.stringify(out, null, 2));
process.exit(out.success ? 0 : 1);
