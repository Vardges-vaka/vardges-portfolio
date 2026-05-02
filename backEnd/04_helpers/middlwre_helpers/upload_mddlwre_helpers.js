import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

// const TEN_MB = 10 * 1024 * 1024;
// const HUNDRED_MB = 100 * 1024 * 1024;

// Instance 1 — Memory (small files, known size under 10MB)
const useMemoryUpload = (fileSize) => {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: fileSize },
  });
};

// Instance 2 — Disk (large files or unknown size)
const useDiskUpload = (fileSize) => {
  return multer({
    storage: multer.diskStorage({
      destination: "/tmp/uploads",
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, randomUUID() + ext);
      },
    }),
    limits: { fileSize: fileSize },
  });
};

// Normalize Content-Length — missing, malformed, or -1 all return -1
const parseContentLength = (headers) => {
  const raw = headers["content-length"];
  if (!raw) return -1;
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed) || parsed < 0) return -1;
  return parsed;
};

export { useMemoryUpload, useDiskUpload, parseContentLength };

//4194304 and what does it means multipart/formData ?