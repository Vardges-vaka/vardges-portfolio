import LogViewer from "./_logViewer.index.js";

/**
 * CLI interface for LogViewer
 * Run directly: node logViewer_cli.js [command] [args]
 */

const viewer = new LogViewer();
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case "summary":
    viewer.displaySummary();
    break;

  case "recent":
    const recentLogs = viewer.readRecentLogs(
      arg1 || "combined.log",
      parseInt(arg2) || 20
    );
    console.log(recentLogs);
    break;

  case "errors":
    const errorLogs = viewer.filterByLevel(arg1 || "error.log", "error");
    console.log(errorLogs);
    break;

  case "search":
    const searchResults = viewer.searchLogs(arg1 || "combined.log", arg2 || "");
    console.log(searchResults);
    break;

  case "clear":
    viewer.clearOldLogs(parseInt(arg1) || 7);
    break;

  default:
    console.log(`
🔍 Log Viewer Usage:

node logViewer_cli.js summary                    - Show log files summary
node logViewer_cli.js recent [file] [lines]      - Show recent logs
node logViewer_cli.js errors [file]              - Show only error logs
node logViewer_cli.js search [file] [term]       - Search logs for term
node logViewer_cli.js clear [days]               - Clear logs older than X days

Examples:
node logViewer_cli.js summary
node logViewer_cli.js recent combined.log 50
node logViewer_cli.js errors error.log
node logViewer_cli.js search combined.log "user123"
node logViewer_cli.js clear 7
    `);
}
