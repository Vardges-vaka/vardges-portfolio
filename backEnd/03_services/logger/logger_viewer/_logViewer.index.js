import path from "path";
import { fileURLToPath } from "url";
import { getLogFiles, readRecentLogs } from "./logViewer_fileOps.js";
import {
  filterByLevel,
  searchLogs,
  getLogStats,
} from "./logViewer_analysis.js";
import { clearOldLogs, displaySummary } from "./logViewer_maintenance.js";
import {
  getFileSize,
  getLastModified,
  formatBytes,
} from "./logViewer_helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LogViewer {
  constructor() {
    this.logsDir = path.join(__dirname, "../../../_logs");
  }
  // File Operations
  getLogFiles() {
    return getLogFiles(this.logsDir);
  }
  readRecentLogs(filename, lines = 50) {
    return readRecentLogs(this.logsDir, filename, lines);
  }
  // Analysis Methods
  filterByLevel(filename, level) {
    return filterByLevel(this.logsDir, filename, level);
  }
  searchLogs(filename, searchTerm) {
    return searchLogs(this.logsDir, filename, searchTerm);
  }
  getLogStats(filename) {
    return getLogStats(this.logsDir, filename);
  }
  // Maintenance Methods
  clearOldLogs(daysToKeep = 7) {
    return clearOldLogs(this.logsDir, daysToKeep);
  }
  displaySummary() {
    return displaySummary(this.logsDir);
  }
  // Helper Methods
  getFileSize(filePath) {
    return getFileSize(filePath);
  }
  getLastModified(filePath) {
    return getLastModified(filePath);
  }
  formatBytes(bytes) {
    return formatBytes(bytes);
  }
}

export default LogViewer;
