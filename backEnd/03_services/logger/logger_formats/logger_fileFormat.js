import winston from "winston";
import { getLogEmoji } from "../logger_utils/logger_getLogEmoji.js";

export const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    ({ timestamp, level, message, service, type, ...meta }) => {
      const emoji = getLogEmoji(level);
      const serviceTag = service ? `[${service}]` : "";
      const typeTag = type ? `[${type}]` : "";

      // Create a clean, readable format
      let logLine = `${emoji} ${timestamp} ${level.toUpperCase()} ${serviceTag}${typeTag}: ${message}`;

      // Add metadata in a readable format if present
      if (Object.keys(meta).length > 0) {
        logLine += "\n" + "  📋 Details: " + JSON.stringify(meta, null, 4);
      }

      return logLine + "\n" + "─".repeat(80) + "\n";
    }
  )
);
