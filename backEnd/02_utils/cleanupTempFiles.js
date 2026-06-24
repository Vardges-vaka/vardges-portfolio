import { cleanupTempFile } from "./cleanupTempFile.js";

/**
 * Removes temp files produced by disk-based multer uploads.
 * @param {Array<{ path?: string }>|null|undefined} files
 * @param {boolean} isDebug
 */
export const cleanupTempFiles = async (files, isDebug = false) => {
  if (!Array.isArray(files) || !files.length) return;

  await Promise.all(
    files.map((file) => cleanupTempFile(file?.path, isDebug)),
  );
};
