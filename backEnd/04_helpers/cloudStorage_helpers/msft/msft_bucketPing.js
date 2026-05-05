import { msft_resolveClient } from "./msft_resolveClient.js";

const displayName = " | msft_bucketPing.js | ";

export const msft_bucketPing = async (isDebug = false) => {
  const resolved = msft_resolveClient();
  if (!resolved.ok) return { success: false, message: `${displayName} ${resolved.message}` };

  try {
    let count = 0;
    for await (const _ of resolved.containerClient.listBlobsFlat()) {
      count++;
      if (count >= 5) break;
    }
    return {
      success:     true,
      message:     "Azure Blob authenticated; container list succeeded (smoke OK).",
      container:   resolved.container,
      listedCount: count,
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};
