import PropTypes from "prop-types";
import { resolveAsset } from "../lib/media.js";
import MediaPlaceholder from "./MediaPlaceholder.jsx";

/**
 * Renders a real asset from src/portfolio/media/ when one exists for `assetId`,
 * otherwise falls back to the animated placeholder (which shows the assetId so
 * you know which file to drop in). Image/video kind is inferred from the file.
 */
const Media = ({ assetId, type = "image", label, aspect = "16 / 10", className = "" }) => {
  const asset = resolveAsset(assetId);

  if (asset?.kind === "image") {
    return (
      <img
        src={asset.url}
        alt={label}
        loading="lazy"
        decoding="async"
        className={`vp-media ${className}`}
        style={{ aspectRatio: aspect }}
      />
    );
  }

  if (asset?.kind === "video") {
    return (
      <video
        className={`vp-media ${className}`}
        style={{ aspectRatio: aspect }}
        autoPlay
        muted
        loop
        playsInline
        aria-label={label}
      >
        <source src={asset.url} />
      </video>
    );
  }

  return (
    <MediaPlaceholder assetId={assetId} type={type} label={label} aspect={aspect} className={className} />
  );
};

Media.propTypes = {
  assetId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["image", "video", "gif"]),
  label: PropTypes.string.isRequired,
  aspect: PropTypes.string,
  className: PropTypes.string,
};

export default Media;
