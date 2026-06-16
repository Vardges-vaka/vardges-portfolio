/**
 * Media resolver — maps assetIds and certificate names to real bundled URLs
 * from src/portfolio/media/. Vite processes these at build time via
 * import.meta.glob, so filenames (even with spaces/parens) resolve correctly.
 *
 * Images are keyed by basename-without-extension (e.g. "ASSET-P1").
 * PDFs are looked up by a unique case-insensitive substring of the filename.
 */

// eager URL maps — Vite replaces these with hashed asset URLs at build time
const IMAGES = import.meta.glob("../media/*.{png,jpg,jpeg,webp,gif,svg,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const VIDEOS = import.meta.glob("../media/*.{mp4,webm,mov}", {
  eager: true,
  query: "?url",
  import: "default",
});
// PDFs live directly in media/ (CVs, tech certs) and in media/cyber/ (the
// cybersecurity roadmap). The recursive glob picks up both.
const PDFS = import.meta.glob("../media/**/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

const baseName = (path) => path.split("/").pop();
const stem = (file) => file.replace(/\.[^.]+$/, "");

// assetId (no extension) -> url
const imageById = {};
for (const [path, url] of Object.entries(IMAGES)) imageById[stem(baseName(path))] = url;
const videoById = {};
for (const [path, url] of Object.entries(VIDEOS)) videoById[stem(baseName(path))] = url;

/**
 * Resolve an assetId to a real asset. Returns { url, kind } or null.
 * kind is "image" | "video" based on which folder glob matched.
 */
export const resolveAsset = (assetId) => {
  if (!assetId) return null;
  if (videoById[assetId]) return { url: videoById[assetId], kind: "video" };
  if (imageById[assetId]) return { url: imageById[assetId], kind: "image" };
  return null;
};

/**
 * Find a certificate PDF url by a unique case-insensitive substring of its
 * filename. Returns the url or null (with a dev warning) if nothing matches.
 */
export const certByName = (substr) => {
  const needle = substr.toLowerCase();
  for (const [path, url] of Object.entries(PDFS)) {
    if (baseName(path).toLowerCase().includes(needle)) return url;
  }
  if (import.meta.env?.DEV) {
    console.warn(`[media] no PDF matched "${substr}"`);
  }
  return null;
};

// same lookup, clearer name for non-certificate PDFs (CVs, etc.)
export const pdfByName = certByName;
