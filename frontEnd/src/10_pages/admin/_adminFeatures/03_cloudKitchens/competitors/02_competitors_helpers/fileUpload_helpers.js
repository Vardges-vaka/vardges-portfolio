const formatBytes = (bytes) => {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getLogoTypeLabel = (mime) => {
  if (!mime) return "—";
  if (mime === "image/svg+xml") return "SVG";
  if (mime === "image/png") return "PNG";
  if (mime === "image/jpeg" || mime === "image/jpg") return "JPG";
  if (mime === "image/x-icon" || mime === "image/vnd.microsoft.icon")
    return "ICO";
  if (mime.startsWith("image/"))
    return mime.replace("image/", "").toUpperCase();
  return mime;
};

export { formatBytes, getLogoTypeLabel };
