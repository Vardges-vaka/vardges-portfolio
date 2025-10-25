# Winston Logger Service Documentation

## Overview

This comprehensive logging service uses Winston 3.14.2 to provide structured, level-based logging with file rotation, console output, and specialized methods for different application components.

## Modular Structure

The logger is organized into separate modules for better maintainability:

```
logger/
├── _logger.index.js              // Main logger assembly
├── logger_config/
│   ├── logger_levels.js         // Log levels and colors
│   └── logger_transports.js     // Transport configurations
├── logger_formats/
│   ├── logger_consoleFormat.js  // Console formatting
│   ├── logger_fileFormat.js     // File formatting
│   ├── logger_jsonFormat.js     // JSON formatting
│   └── logger_defaultFormat.js  // Default format
├── logger_utils/
│   └── logger_getLogEmoji.js    // Emoji helper
├── logger_methods/
│   ├── logger_controller.js     // Controller methods
│   ├── logger_service.js        // Service methods
│   └── ... (other specialized methods)
└── logger_viewer/               // Log analysis tools
    ├── _logViewer.index.js
    └── ... (viewer modules)
```

## Features

- **Multiple Log Levels**: error, warn, info, http, debug
- **File Rotation**: Automatic log file rotation (5MB max, 5 files)
- **Colored Console Output**: Development-friendly console logs with emojis
- **Structured Logging**: JSON format for easy parsing and analysis
- **Specialized Methods**: Pre-built methods for controllers, services, auth, etc.
- **Environment Aware**: Different behavior for development vs production
- **Modular Design**: Easy to extend and maintain

## Log Files

All logs are stored in `backEnd/_logs/`:

### Readable Format (.log files)

- `error.log` - Error level logs only (human-readable)
- `combined.log` - All log levels (human-readable)
- `http.log` - HTTP request/response logs (human-readable)

### JSON Format (.json files)

- `error.json` - Error level logs (machine-readable)
- `combined.json` - Info and above logs (machine-readable)

## Quick Start

### Import the Logger

```javascript
// From anywhere in your backend:
import { logger } from "./03_services/_services.index.js";

// Or directly:
import logger from "./03_services/logger/_logger.index.js";
```

## Usage Examples

### Basic Logging

```javascript
import { logger } from "../03_services/_services.index.js";

logger.info("Application started");
logger.error("Database connection failed", { error: err.message });
logger.debug("Processing user data", { userId: 123 });
logger.warn("Memory usage high", { usage: "85%" });
logger.http("API request received", { endpoint: "/api/users" });
```

### Controller Logging

```javascript
import { logger } from "../../03_services/_services.index.js";

const myController = async (req, res) => {
  logger.controller.start("myController", { userId: req.user?.id });

  try {
    // Your controller logic
    const result = await someService();

    logger.controller.success("myController", result);
    return res.json(result);
  } catch (error) {
    logger.controller.error("myController", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    logger.controller.complete("myController");
  }
};
```

### Service Logging

```javascript
import { logger } from "../../03_services/_services.index.js";

const myService = async (data) => {
  logger.service.start("myService");
  logger.service.request("myService", data);

  try {
    // Service logic
    const result = await processData(data);
    return result;
  } catch (error) {
    logger.service.error("myService", error);
    throw error;
  } finally {
    logger.service.complete("myService");
  }
};
```

### Database Logging

```javascript
logger.database.connect("MongoDB");
logger.database.query("find", "users", { filter: { active: true } });
logger.database.error("insert", error);
```

### Authentication Logging

```javascript
logger.auth.login(userId, { ip: req.ip });
logger.auth.failed({ email: "user@example.com", ip: req.ip });
logger.auth.logout(userId);
```

### Security Logging

```javascript
logger.security.rateLimitHit(req.ip, req.path);
logger.security.suspiciousActivity("Multiple failed login attempts", {
  ip: req.ip,
  attempts: 5,
});
```

### HTTP Request Logging

Use the provided middleware:

```javascript
import httpLoggerMiddleware from "../05_middlewares/httpLogger.js";

app.use(httpLoggerMiddleware);
```

## Configuration

### Environment Variables

- `LOG_LEVEL`: Set logging level (error, warn, info, http, debug)
- `NODE_ENV`: When set to 'production', console logging is disabled

### Log Levels

1. **error** (0) - Error conditions
2. **warn** (1) - Warning conditions
3. **info** (2) - Informational messages
4. **http** (3) - HTTP requests
5. **debug** (4) - Debug information

## Migration from Console.log

### Before (Old Way)

```javascript
const isDebug = true;
const displayName = "myController";

isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} |<=>| [STARTED]`);
isDebug && console.error(`⚠️ ☠️ 🚨${displayName} |<=>| [ERROR]`, error);
isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
```

### After (New Way)

```javascript
import { logger } from "../../03_services/_services.index.js";

logger.controller.start("myController");
logger.controller.error("myController", error);
logger.controller.complete("myController");
```

## Benefits

- **Persistent Logs**: All logs are saved to files
- **Structured Data**: Easy to search and analyze
- **Performance**: Better performance than console.log
- **Filtering**: Easy to filter by level, service, or component
- **Monitoring**: Ready for log aggregation tools
- **Debugging**: Rich context and metadata

## Log Viewer

The logger includes a powerful log viewer utility for analyzing logs:

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

### CLI Usage

```bash
cd backEnd/03_services/logger/logger_viewer

# Show summary
node logViewer_cli.js summary

# Show recent logs
node logViewer_cli.js recent combined.log 50

# Filter errors
node logViewer_cli.js errors error.log

# Search logs
node logViewer_cli.js search combined.log "user123"

# Clear old logs
node logViewer_cli.js clear 7
```

## File Structure Details

### Configuration Files

- **logger_levels.js**: Defines log levels (error: 0, warn: 1, info: 2, http: 3, debug: 4) and colors
- **logger_transports.js**: Configures where logs are written (files, console)

### Format Files

- **logger_consoleFormat.js**: Pretty format for terminal with colors and emojis
- **logger_fileFormat.js**: Readable format for .log files with structure
- **logger_jsonFormat.js**: JSON format for .json files (machine-readable)
- **logger_defaultFormat.js**: Fallback format

### Method Files

- **logger_controller.js**: Controller lifecycle logging (start, success, error, complete)
- **logger_service.js**: Service operation logging
- Additional specialized methods for auth, database, security, etc.

## Best Practices

1. **Use appropriate log levels**

   - ERROR: Something broke and needs immediate attention
   - WARN: Something suspicious but not broken
   - INFO: Important events (user login, server start)
   - HTTP: Web requests and responses
   - DEBUG: Detailed technical information

2. **Include relevant metadata**

   ```javascript
   logger.error("Payment failed", {
     userId: "123",
     amount: "$50",
     errorCode: "CARD_DECLINED",
     timestamp: new Date(),
   });
   ```

3. **Don't log sensitive information**

   - ❌ Passwords, tokens, credit card numbers
   - ✅ User IDs, error codes, timestamps

4. **Use structured logging**

   - Pass objects with meaningful keys
   - Makes searching and filtering easier

5. **Log errors with full context**

   ```javascript
   catch (error) {
     logger.controller.error("myController", error, {
       userId: req.user?.id,
       action: "updateProfile",
       input: req.body
     });
   }
   ```

6. **Use specialized methods for consistency**
   - Use `logger.controller.*` for controllers
   - Use `logger.service.*` for services
   - Use `logger.auth.*` for authentication
   - Maintains consistent log format across your app

## Extending the Logger

### Adding New Specialized Methods

Create a new file in `logger_methods/`:

```javascript
// logger_methods/logger_payment.js
export const createPaymentMethods = (logger) => ({
  processStart: (orderId, meta = {}) => {
    logger.info(`💳 Payment processing started: ${orderId}`, {
      type: "payment_start",
      orderId,
      ...meta,
    });
  },

  processSuccess: (orderId, amount, meta = {}) => {
    logger.info(`✅ Payment successful: ${orderId}`, {
      type: "payment_success",
      orderId,
      amount,
      ...meta,
    });
  },
});
```

Then import and add to `_logger.index.js`:

```javascript
import { createPaymentMethods } from "./logger_methods/logger_payment.js";

const loggerService = {
  // ... existing methods
  payment: createPaymentMethods(logger),
};
```

## Troubleshooting

### Logs not appearing in files

- Check that `backEnd/_logs/` directory exists
- Verify file permissions
- Check `LOG_LEVEL` environment variable

### Console logs not showing

- Ensure `NODE_ENV` is not set to "production"
- Check that `LOG_LEVEL` includes the level you're logging

### Log files too large

- Adjust `maxsize` in `logger_transports.js`
- Reduce `maxFiles` to keep fewer old files
- Use `LogViewer.clearOldLogs()` to clean up

## Performance Tips

1. Use appropriate log levels (avoid excessive DEBUG logs in production)
2. Don't log inside tight loops
3. Use async operations when possible
4. Consider log aggregation services for production (AWS CloudWatch, Datadog, etc.)
