export const formatFileSize = (bytes) => {
  if (bytes == null || Number.isNaN(bytes)) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const isImageMime = (mime = "") => mime.startsWith("image/");

export const isImageUrl = (url = "") =>
  /\.(png|jpe?g|gif|webp|svg|bmp|avif)(\?|#|$)/i.test(url);

export const deriveNameFromUrl = (url = "") => {
  if (!url) return "File";

  try {
    const path = new URL(url, window.location.origin).pathname;
    const name = path.split("/").pop();
    return name ? decodeURIComponent(name) : "File";
  } catch {
    const fallback = url.split("/").pop()?.split(/[?#]/)[0];
    return fallback ? decodeURIComponent(fallback) : "File";
  }
};

export const matchesAccept = (file, accept = "") => {
  if (!file || !accept || accept === "*/*") return true;

  const tokens = accept
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return file.name.toLowerCase().endsWith(token.toLowerCase());
    }

    if (token.endsWith("/*")) {
      return file.type.startsWith(token.slice(0, -1));
    }

    return file.type === token;
  });
};

export const validateFile = (
  file,
  { maxSizeBytes = null, accept = "" } = {},
) => {
  if (!file) return { isValid: true, message: "" };

  if (accept && !matchesAccept(file, accept)) {
    return { isValid: false, message: "File type is not allowed." };
  }

  if (maxSizeBytes != null && file.size > maxSizeBytes) {
    return {
      isValid: false,
      message: `File is too large (max ${formatFileSize(maxSizeBytes)}).`,
    };
  }

  return { isValid: true, message: "" };
};

export const validateFiles = (
  files,
  { maxSizeBytes = null, accept = "", maxFiles = null } = {},
) => {
  const list = Array.from(files ?? []);
  const accepted = [];
  let firstError = "";

  for (const file of list) {
    if (maxFiles != null && accepted.length >= maxFiles) {
      firstError ||= `You can upload at most ${maxFiles} files.`;
      break;
    }

    const validation = validateFile(file, { maxSizeBytes, accept });
    if (!validation.isValid) {
      firstError ||= validation.message;
      continue;
    }

    accepted.push(file);
  }

  return {
    accepted,
    isValid: Boolean(accepted.length) || !list.length,
    message: firstError,
  };
};

export const getFileIconName = (mime = "", name = "") => {
  const lowerName = name.toLowerCase();

  if (isImageMime(mime)) return "Image";
  if (mime === "application/pdf" || lowerName.endsWith(".pdf")) return "FileText";
  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    /\.(xls|xlsx|csv)$/i.test(lowerName)
  ) {
    return "FileSpreadsheet";
  }
  if (
    mime.includes("word") ||
    mime.includes("document") ||
    /\.(doc|docx|rtf|txt|md)$/i.test(lowerName)
  ) {
    return "FileType";
  }
  if (
    mime.includes("zip") ||
    mime.includes("compressed") ||
    /\.(zip|rar|7z|tar|gz)$/i.test(lowerName)
  ) {
    return "FileArchive";
  }

  return "File";
};

export const buildImagePreviewUrls = (files = []) =>
  files.map((file) =>
    isImageMime(file.type) ? createObjectPreviewUrl(file) : "",
  );

export const validateImageFile = (
  file,
  { maxSizeBytes = null, accept = "image/*" } = {},
) => {
  if (!file) return { isValid: true, message: "" };

  const isImage =
    accept === "image/*" || accept.includes("image")
      ? file.type.startsWith("image/")
      : true;

  if (!isImage) {
    return { isValid: false, message: "Please choose an image file." };
  }

  if (maxSizeBytes != null && file.size > maxSizeBytes) {
    return {
      isValid: false,
      message: `File is too large (max ${formatFileSize(maxSizeBytes)}).`,
    };
  }

  return { isValid: true, message: "" };
};

export const validateImageFiles = (
  files,
  { maxSizeBytes = null, accept = "image/*", maxFiles = null } = {},
) => {
  const list = Array.from(files ?? []);
  const accepted = [];
  let firstError = "";

  for (const file of list) {
    if (maxFiles != null && accepted.length >= maxFiles) {
      firstError ||= `You can upload at most ${maxFiles} images.`;
      break;
    }

    const validation = validateImageFile(file, { maxSizeBytes, accept });
    if (!validation.isValid) {
      firstError ||= validation.message;
      continue;
    }

    accepted.push(file);
  }

  return {
    accepted,
    isValid: Boolean(accepted.length) || !list.length,
    message: firstError,
  };
};

export const filesAreSame = (a, b) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

export const mergeUniqueFiles = (existing, incoming) => {
  const combined = [...existing];
  for (const file of incoming) {
    if (combined.some((item) => filesAreSame(item, file))) continue;
    combined.push(file);
  }
  return combined;
};

export const createObjectPreviewUrl = (file) => {
  if (!file) return "";
  try {
    return URL.createObjectURL(file);
  } catch {
    return "";
  }
};

export const revokeObjectPreviewUrl = (url) => {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

/** Demo / local progress animation — replace with real upload in production. */
export const runSimulatedUpload = (onProgress, durationMs = 1400) =>
  new Promise((resolve) => {
    const started = performance.now();

    const tick = (now) => {
      const ratio = Math.min(1, (now - started) / durationMs);
      const eased = 1 - (1 - ratio) ** 2;
      const value = Math.round(eased * 100);
      onProgress(value);

      if (ratio >= 1) {
        resolve(value);
        return;
      }

      requestAnimationFrame(tick);
    };

    onProgress(0);
    requestAnimationFrame(tick);
  });
