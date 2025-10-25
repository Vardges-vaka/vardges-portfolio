import fs from "fs";

/**
 * Helper utility functions for LogViewer
 */

/**
 * Get file size in human-readable format
 */
export function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return formatBytes(stats.size);
  } catch {
    return "Unknown";
  }
}

/**
 * Get last modified date of a file
 */
export function getLastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return new Date(0);
  }
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
