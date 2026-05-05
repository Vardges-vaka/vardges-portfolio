import cache from "memory-cache";
import { R2_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { r2_resolveClient } from "../../../04_helpers/helpers.index.js";
import {
  CS_CFLR_monitor_files,
  CS_CFLR_monitor_storage,
  CS_CFLR_monitor_ops,
  CS_CFLR_monitor_network,
  CS_CFLR_monitor_cost,
} from "./monitoring/_CS_CFLR_monitoring.index.js";

const displayName = " | CS_CFLR_monitor.js | ";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const CS_CFLR_monitor = async (params = {}, isDebug = false) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  const resolved = r2_resolveClient();
  if (!resolved.ok) {
    return { success: false, message: `${displayName}${resolved.message}` };
  }

  const cacheKey = `r2:monitor:${R2_BUCKET_NAME}`;

  if (params.useCache !== false) {
    const hit = cache.get(cacheKey);
    if (hit) {
      isDebug && console.log(`${displayName}[CACHE HIT]`);
      return {
        success: true,
        message: "Monitor data fetched (cached)",
        data: hit,
      };
    }
  }

  const [storageResult, opsResult, networkResult, filesResult] =
    await Promise.allSettled([
      CS_CFLR_monitor_storage(isDebug),
      CS_CFLR_monitor_ops(isDebug),
      CS_CFLR_monitor_network(isDebug),
      CS_CFLR_monitor_files(isDebug),
    ]);

  const storage =
    storageResult.status === "fulfilled"
      ? storageResult.value
      : { error: storageResult.reason?.message };
  const ops =
    opsResult.status === "fulfilled"
      ? opsResult.value
      : { error: opsResult.reason?.message };
  const network =
    networkResult.status === "fulfilled"
      ? networkResult.value
      : { error: networkResult.reason?.message };
  const files =
    filesResult.status === "fulfilled"
      ? filesResult.value
      : { error: filesResult.reason?.message };

  const cost = CS_CFLR_monitor_cost(
    storage?.error ? null : storage,
    ops?.error ? null : ops,
    network?.error ? null : network,
  );

  const data = { storage, ops, network, cost, files };

  cache.put(cacheKey, data, CACHE_TTL);
  isDebug && console.log(`🏁${displayName}[COMPLETED]`);

  return { success: true, message: "Monitor data fetched", data };
};

export default CS_CFLR_monitor;
