import fs from "fs";
import {
  parseContentLength,
  useMemoryUpload,
  useDiskUpload,
} from "../04_helpers/helpers.index.js";
import { MB } from "../05_constants/fileSizes.js";

const TEN_MB = MB * 10;
const HUNDRED_MB = MB * 100;
const MAX_FILES = 20;

fs.mkdirSync("/tmp/uploads", { recursive: true });

const memoryUpload = useMemoryUpload(TEN_MB);
const diskUpload = useDiskUpload(HUNDRED_MB);

/** Same routing as upload_mddlwre, but accepts multiple multipart field "files". */
export const upload_multi_mddlwre = (req, res, next) => {
  const contentLength = parseContentLength(req.headers);

  if (contentLength > HUNDRED_MB) {
    return res.status(413).json({ error: "File too large" });
  }

  const instance =
    contentLength === -1 || contentLength > TEN_MB ? diskUpload : memoryUpload;

  instance.array("files", MAX_FILES)(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ error: "File too large" });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          error: 'Unexpected file field — use multipart field name "files"',
        });
      }
      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          error: `Too many files — maximum ${MAX_FILES} per request`,
        });
      }
      return res.status(500).json({ error: "Upload failed" });
    }
    next();
  });
};
