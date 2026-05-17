const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg", // some browsers provide this
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/ico",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/avif",
]);

const MAX_LOGO_BYTES = 10 * 1024 * 1024; // 10 MB
const RECOMMENDED_MAX_PX = 500;

const LOGO_UPLOAD_CONFIG = {
  ALLOWED_MIME: ALLOWED_MIME,
  MAX_SIZE: MAX_LOGO_BYTES,
  RECOMMENDED_MAX_PX: RECOMMENDED_MAX_PX,
};

export { LOGO_UPLOAD_CONFIG };
