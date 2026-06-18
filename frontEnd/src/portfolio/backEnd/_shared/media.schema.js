import mongoose from "mongoose";

/**
 * media — a reference to an image or video.
 *
 * WHY two ways to point at a file:
 *   - `assetId` matches the FRONTEND's build-time media resolver
 *     (`src/portfolio/lib/media.js` globs `src/portfolio/media/<assetId>.<ext>`).
 *     So a project can say `assetId: "ASSET-P1"` and the frontend keeps resolving
 *     the bundled file exactly as it does today — no frontend change needed.
 *   - `url` is for assets served from elsewhere (a CDN / object storage) once you
 *     move media off the bundle. If both are present, the frontend can prefer `url`.
 *
 * `alt` is kept as a plain string (decorative/short); promote it to a
 * localizedString later if you want translated alt text.
 */
const mediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], default: "image" },
    assetId: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    alt: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

export default mediaSchema;
