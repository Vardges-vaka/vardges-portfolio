import fs from "fs";
import {
  parseContentLength,
  useMemoryUpload,
  useDiskUpload,
} from "../04_helpers/helpers.index.js";
import { MB } from "../05_constants/fileSizes.js";

const TEN_MB = MB * 10;
const HUNDRED_MB = MB * 100;

// Ensure temp directory exists on startup
fs.mkdirSync("/tmp/uploads", { recursive: true });

const memoryUpload = useMemoryUpload(TEN_MB);
const diskUpload = useDiskUpload(HUNDRED_MB);

// Dynamic middleware
export const upload_mddlwre = (req, res, next) => {
  const contentLength = parseContentLength(req.headers);

  // Layer 1 — early rejection for known large requests
  if (contentLength > HUNDRED_MB) {
    return res.status(413).json({ error: "File too large" });
  }

  // Layer 2 — unknown size or over 10MB → disk (safe default)
  //           known size under 10MB → memory
  const instance =
    contentLength === -1 || contentLength > TEN_MB ? diskUpload : memoryUpload;

  instance.single("file")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ error: "File too large" });
      }
      return res.status(500).json({ error: "Upload failed" });
    }
    next();
  });
};

/** Runs single-file upload only when the request is multipart/form-data. */
export const upload_logo_optional_mddlwre = (req, res, next) => {
  const contentType = String(req.headers["content-type"] || "");
  if (!contentType.includes("multipart/form-data")) {
    return next();
  }
  return upload_mddlwre(req, res, next);
};

