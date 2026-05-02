import fs from "fs";

/**
 * Streams a file from disk into a GCS write stream.
 * Used for large uploads where holding the full buffer in RAM is not viable.
 *
 * @param {import("@google-cloud/storage").File} gcsFile
 * @param {string} filePath
 * @param {string} contentType
 * @returns {Promise<void>}
 */

export const gcs_streamUpload = (gcsFile, filePath, contentType) => {
  return new Promise((resolve, reject) => {
    const writeStream = gcsFile.createWriteStream({
      resumable: true,
      contentType,
    });
    fs.createReadStream(filePath)
      .on("error", reject)
      .pipe(writeStream)
      .on("finish", resolve)
      .on("error", reject);
  });
};
