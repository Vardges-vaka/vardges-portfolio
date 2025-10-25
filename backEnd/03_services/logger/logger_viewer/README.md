# LogViewer - Modular Structure

A utility for analyzing and managing Winston log files.

## File Structure

```
logger_viewer/
├── _logViewer.index.js          // Main LogViewer class
├── logViewer_helpers.js         // Utility functions
├── logViewer_fileOps.js         // File operations
├── logViewer_analysis.js        // Log analysis methods
├── logViewer_maintenance.js     // Maintenance operations
├── logViewer_cli.js             // CLI interface
└── README.md                    // This file
```

## Usage

### In Your Code

```javascript
import LogViewer from "./logger/logger_viewer/_logViewer.index.js";

const viewer = new LogViewer();

// Get all log files
const files = viewer.getLogFiles();

// Read recent logs
const recent = viewer.readRecentLogs("error.log", 50);

// Search logs
const results = viewer.searchLogs("combined.log", "user123");

// Get statistics
const stats = viewer.getLogStats("combined.log");

// Display summary
viewer.displaySummary();
```

### From Command Line

```bash
# Show summary of all logs
node logViewer_cli.js summary

# Show recent 50 lines from error.log
node logViewer_cli.js recent error.log 50

# Show only errors from combined.log
node logViewer_cli.js errors combined.log

# Search for "user123" in combined.log
node logViewer_cli.js search combined.log "user123"

# Clear logs older than 7 days
node logViewer_cli.js clear 7
```

## Modules

### logViewer_helpers.js

Utility functions:

- `getFileSize(filePath)` - Get file size in human-readable format
- `getLastModified(filePath)` - Get last modified date
- `formatBytes(bytes)` - Format bytes to KB/MB/GB

### logViewer_fileOps.js

File operations:

- `getLogFiles(logsDir)` - List all log files
- `readRecentLogs(logsDir, filename, lines)` - Read recent log lines

### logViewer_analysis.js

Analysis methods:

- `filterByLevel(logsDir, filename, level)` - Filter by log level
- `searchLogs(logsDir, filename, searchTerm)` - Search for text
- `getLogStats(logsDir, filename)` - Get log statistics

### logViewer_maintenance.js

Maintenance:

- `clearOldLogs(logsDir, daysToKeep)` - Delete old log files
- `displaySummary(logsDir)` - Display formatted summary

## Backward Compatibility

The old `backEnd/03_services/logViewer.js` still works and imports from this new structure automatically.
