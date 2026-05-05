/**
 * Run from repo `backEnd` folder so `.env` is found:
 *   npm run s3:ping
 */

import "dotenv/config";

import { s3_bucketPing } from "../04_helpers/helpers.index.js";

const isDebug = true;
const out = await s3_bucketPing(isDebug);

console.log(JSON.stringify(out, null, 2));
process.exit(out.success ? 0 : 1);
