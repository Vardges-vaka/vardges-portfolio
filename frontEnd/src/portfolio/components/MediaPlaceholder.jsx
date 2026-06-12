import { Image as ImageIcon, Film, Sparkles } from "lucide-react";
import PropTypes from "prop-types";

const TYPE_ICON = { image: ImageIcon, video: Film, gif: Sparkles };

/**
 * Placeholder for a real media asset. Every instance carries an assetId that
 * maps to an entry in NOTES.md (description + AI prompt + search terms).
 *
 * TODO(Vardges): to replace, swap this component for a real
 * <img src="..."/> or <video src="..." autoPlay muted loop playsInline/>
 * with the same className/aspect — see NOTES.md.
 */
const MediaPlaceholder = ({ assetId, type = "image", label, aspect = "16 / 10", className = "" }) => {
  const Icon = TYPE_ICON[type] ?? ImageIcon;
  return (
    <div className={`vp-media-ph ${className}`} style={{ aspectRatio: aspect }} role="img" aria-label={label}>
      <div className="vp-media-ph__shimmer" aria-hidden="true" />
      <div className="vp-media-ph__scan" aria-hidden="true" />
      <Icon size={26} className="vp-media-ph__icon" aria-hidden="true" />
      <span className="vp-media-ph__id">{assetId}</span>
      <span className="vp-media-ph__label">{label}</span>
      <span className="vp-media-ph__type">{type.toUpperCase()}</span>
    </div>
  );
};

MediaPlaceholder.propTypes = {
  assetId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["image", "video", "gif"]),
  label: PropTypes.string.isRequired,
  aspect: PropTypes.string,
  className: PropTypes.string,
};

export default MediaPlaceholder;
