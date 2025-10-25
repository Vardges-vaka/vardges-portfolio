import winston from "winston";
import { getLogEmoji } from "../logger_utils/logger_getLogEmoji.js";

export const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
    const emoji = getLogEmoji(level);
    const serviceTag = service ? `[${service}]` : "";
    const metaStr = Object.keys(meta).length
      ? JSON.stringify(meta, null, 2)
      : "";
    return `${emoji} ${timestamp} ${level} ${serviceTag}: ${message} ${metaStr}`;
  })
);
