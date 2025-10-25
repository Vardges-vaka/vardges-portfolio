import fs from "fs";
import path from "path";

/**
 * Log analysis methods for LogViewer
 */

/**
 * Filter logs by level (error, warn, info, etc.)
 */
export function filterByLevel(logsDir, filename, level) {
  try {
    const filePath = path.join(logsDir, filename);
    const content = fs.readFileSync(filePath, "utf8");

    if (filename.endsWith(".json") || filename.endsWith(".jsonl")) {
      // Parse JSON logs
      const lines = content.trim().split("\n");
      return lines
        .filter((line) => {
          try {
            const log = JSON.parse(line);
            return log.level === level;
          } catch {
            return false;
          }
        })
        .map((line) => JSON.stringify(JSON.parse(line), null, 2))
        .join("\n\n");
    } else {
      // Filter readable logs
      return content
        .split(
          "────────────────────────────────────────────────────────────────────────────────"
        )
        .filter((section) => section.includes(level.toUpperCase()))
        .join(
          "────────────────────────────────────────────────────────────────────────────────\n"
        );
    }
  } catch (error) {
    console.error(`Error filtering ${filename}:`, error.message);
    return null;
  }
}

/**
 * Search logs for specific text
 */
export function searchLogs(logsDir, filename, searchTerm) {
  try {
    const filePath = path.join(logsDir, filename);
    const content = fs.readFileSync(filePath, "utf8");

    const lines = content.split("\n");
    const matchingLines = lines
      .map((line, index) => ({ line, number: index + 1 }))
      .filter(({ line }) =>
        line.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchingLines
      .map(({ line, number }) => `Line ${number}: ${line}`)
      .join("\n");
  } catch (error) {
    console.error(`Error searching ${filename}:`, error.message);
    return null;
  }
}

/**
 * Get log statistics (count by level)
 */
export function getLogStats(logsDir, filename) {
  try {
    const filePath = path.join(logsDir, filename);
    const content = fs.readFileSync(filePath, "utf8");

    if (filename.endsWith(".json") || filename.endsWith(".jsonl")) {
      const lines = content.trim().split("\n");
      const stats = {
        total: lines.length,
        error: 0,
        warn: 0,
        info: 0,
        http: 0,
        debug: 0,
      };

      lines.forEach((line) => {
        try {
          const log = JSON.parse(line);
          if (stats.hasOwnProperty(log.level)) {
            stats[log.level]++;
          }
        } catch {
          // Skip invalid JSON lines
        }
      });

      return stats;
    } else {
      const errorCount = (content.match(/ERROR/g) || []).length;
      const warnCount = (content.match(/WARN/g) || []).length;
      const infoCount = (content.match(/INFO/g) || []).length;
      const httpCount = (content.match(/HTTP/g) || []).length;
      const debugCount = (content.match(/DEBUG/g) || []).length;

      return {
        total: errorCount + warnCount + infoCount + httpCount + debugCount,
        error: errorCount,
        warn: warnCount,
        info: infoCount,
        http: httpCount,
        debug: debugCount,
      };
    }
  } catch (error) {
    console.error(`Error getting stats for ${filename}:`, error.message);
    return null;
  }
}
