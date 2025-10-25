import winston from "winston";
import dotenv from "dotenv";
import { defaultFormat } from "./logger_formats/logger_defaultFormat.js";
import { logLevels, logColors } from "./logger_config/logger_levels.js";
import {
  ERROR_log,
  ERROR_json,
  COMBINED_log,
  COMBINED_json,
  HTTP_log,
  DEBUG_console,
} from "./logger_config/logger_transports.js";
import { createControllerMethods } from "./logger_methods/logger_controller.js";
import { createServiceMethods } from "./logger_methods/logger_service.js";
import { createHttpMethods } from "./logger_methods/logger_http.js";
import { createDatabaseMethods } from "./logger_methods/logger_database.js";
import { createAuthMethods } from "./logger_methods/logger_auth.js";
import { createSecurityMethods } from "./logger_methods/logger_security.js";
import { createBasicMethods } from "./logger_methods/logger_basic.js";

dotenv.config();

winston.addColors(logColors);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  levels: logLevels,
  format: defaultFormat,
  defaultMeta: { service: "backend-api" },
  transports: [ERROR_log, ERROR_json, COMBINED_log, COMBINED_json, HTTP_log],
});

// Add console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(DEBUG_console);
}

// Create specialized logging methods
const loggerService = {
  // Standard logging methods
  ...createBasicMethods(logger),

  // Specialized methods for your application
  controller: createControllerMethods(logger),
  service: createServiceMethods(logger),
  database: createDatabaseMethods(logger),
  auth: createAuthMethods(logger),
  security: createSecurityMethods(logger),

  // HTTP request logging
  ...createHttpMethods(logger),
};

export default loggerService;
