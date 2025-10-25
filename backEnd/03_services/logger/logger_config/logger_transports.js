// Error logs - readable format
import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";
import { consoleFormat } from "../logger_formats/logger_consoleFormat.js";
import { fileFormat } from "../logger_formats/logger_fileFormat.js";
import { jsonFormat } from "../logger_formats/logger_jsonFormat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ERROR_log = new winston.transports.File({
  filename: path.join(__dirname, "../../../_logs/error.log"),
  level: "error",
  format: fileFormat,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});
export const ERROR_json = new winston.transports.File({
  filename: path.join(__dirname, "../../../_logs/jsonl/error.jsonl"),
  level: "error",
  format: jsonFormat,
  maxsize: 5242880, // 5MB
  maxFiles: 3,
});
export const COMBINED_log = new winston.transports.File({
  filename: path.join(__dirname, "../../../_logs/combined.log"),
  format: fileFormat,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});
export const COMBINED_json = new winston.transports.File({
  filename: path.join(__dirname, "../../../_logs/jsonl/combined.jsonl"),
  level: "info",
  format: jsonFormat,
  maxsize: 5242880, // 5MB
  maxFiles: 3,
});
export const HTTP_log = new winston.transports.File({
  filename: path.join(__dirname, "../../../_logs/http.log"),
  level: "http",
  format: fileFormat,
  maxsize: 5242880, // 5MB
  maxFiles: 3,
});
export const DEBUG_console = new winston.transports.Console({
  format: consoleFormat,
  level: "debug",
});
