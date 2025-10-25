import fs from "fs";
import { getLogFiles } from "./logViewer_fileOps.js";
import { getLogStats } from "./logViewer_analysis.js";

/**
 * Maintenance and display methods for LogViewer
 */

/**
 * Clear old log files
 */
export function clearOldLogs(logsDir, daysToKeep = 7) {
  try {
    const files = getLogFiles(logsDir);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    files.forEach((file) => {
      if (file.modified < cutoffDate) {
        fs.unlinkSync(file.path);
        console.log(`🗑️ Deleted old log file: ${file.name}`);
      }
    });
  } catch (error) {
    console.error("Error clearing old logs:", error.message);
  }
}

/**
 * Display a nice summary of all logs
 */
export function displaySummary(logsDir) {
  console.log("\n📊 LOG SUMMARY");
  console.log("═".repeat(50));

  const files = getLogFiles(logsDir);

  files.forEach((file) => {
    console.log(`\n📁 ${file.name}`);
    console.log(`   Size: ${file.size}`);
    console.log(`   Modified: ${file.modified.toLocaleString()}`);

    const stats = getLogStats(logsDir, file.name);
    if (stats) {
      console.log(`   📈 Stats: ${stats.total} total logs`);
      console.log(`      🚨 Errors: ${stats.error}`);
      console.log(`      ⚠️  Warnings: ${stats.warn}`);
      console.log(`      📢 Info: ${stats.info}`);
      console.log(`      🌐 HTTP: ${stats.http}`);
      console.log(`      🔍 Debug: ${stats.debug}`);
    }
  });

  console.log("\n" + "═".repeat(50));
}
