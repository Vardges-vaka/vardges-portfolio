import fs from "fs/promises";

const displayName = " | cleanupTempFile.js | ";

/**
 * Removes a temporary file from disk. Designed to run in a `finally` block
 * after disk-based uploads — never throws, just logs failures.
 *
 * @param {string|undefined|null} filePath
 * @param {boolean} isDebug
 * @returns {Promise<void>}
 */
export const cleanupTempFile = async (filePath, isDebug = false) => {
  if (!filePath || typeof filePath !== "string") return;

  try {
    await fs.unlink(filePath);
    isDebug && console.log(`🧹${displayName}removed ${filePath}`);
  } catch (error) {
    if (error?.code === "ENOENT") return;
    isDebug &&
      console.error(`${displayName}failed to remove ${filePath}`, error?.message);
  }
};
