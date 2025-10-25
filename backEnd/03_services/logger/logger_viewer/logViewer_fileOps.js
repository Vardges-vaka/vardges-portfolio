import fs from "fs";
import path from "path";
import { getFileSize, getLastModified } from "./logViewer_helpers.js";

/**
 * File operation methods for LogViewer
 */

/**
 * Get all available log files
 */
export function getLogFiles(logsDir) {
  try {
    return fs
      .readdirSync(logsDir)
      .filter(
        (file) =>
          file.endsWith(".log") ||
          file.endsWith(".json") ||
          file.endsWith(".jsonl")
      )
      .map((file) => ({
        name: file,
        path: path.join(logsDir, file),
        size: getFileSize(path.join(logsDir, file)),
        modified: getLastModified(path.join(logsDir, file)),
      }));
  } catch (error) {
    console.error("Error reading logs directory:", error.message);
    return [];
  }
}

/**
 * Read recent logs from a specific file
 */
export function readRecentLogs(logsDir, filename, lines = 50) {
  try {
    const filePath = path.join(logsDir, filename);
    const content = fs.readFileSync(filePath, "utf8");
    const logLines = content.trim().split("\n");

    return logLines.slice(-lines).join("\n");
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return null;
  }
}
