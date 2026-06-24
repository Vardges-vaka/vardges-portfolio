import { getFileMediaKind } from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileMediaPreview.css";

const CK_stp_brand_fld_fileMediaPreview = ({
  item,
  previewUrl = "",
  compact = false,
  viewer = false,
  autoPlay = false,
  label = "File preview",
}) => {
  if (!previewUrl) return null;

  const kind = getFileMediaKind(item);
  const rootClass = [
    "cK_stp_brand_fld_fileMediaPreview",
    compact && "cK_stp_brand_fld_fileMediaPreview--compact",
    viewer && "cK_stp_brand_fld_fileMediaPreview--viewer",
    kind !== "other" && `cK_stp_brand_fld_fileMediaPreview--${kind}`,
  ]
    .filter(Boolean)
    .join(" ");

  if (kind === "image") {
    return (
      <div className={rootClass}>
        <img
          className="cK_stp_brand_fld_fileMediaPreview__image"
          src={previewUrl}
          alt={item?.title || label}
        />
      </div>
    );
  }

  if (kind === "video") {
    return (
      <div className={rootClass}>
        <video
          className="cK_stp_brand_fld_fileMediaPreview__video"
          src={previewUrl}
          controls
          autoPlay={autoPlay}
          preload="metadata"
          aria-label={item?.title || label}
        />
      </div>
    );
  }

  if (kind === "audio") {
    return (
      <div className={rootClass}>
        <audio
          className="cK_stp_brand_fld_fileMediaPreview__audio"
          src={previewUrl}
          controls
          autoPlay={autoPlay}
          preload="metadata"
          aria-label={item?.title || label}
        />
      </div>
    );
  }

  if (kind === "pdf") {
    return (
      <div className={rootClass}>
        <p className="cK_stp_brand_fld_fileMediaPreview__hint">PDF document</p>
        <iframe
          className="cK_stp_brand_fld_fileMediaPreview__pdfFrame"
          src={previewUrl}
          title={item?.title || label}
        />
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <p className="cK_stp_brand_fld_fileMediaPreview__hint">
        Inline preview is not available for this file type.
      </p>
    </div>
  );
};

export default CK_stp_brand_fld_fileMediaPreview;
