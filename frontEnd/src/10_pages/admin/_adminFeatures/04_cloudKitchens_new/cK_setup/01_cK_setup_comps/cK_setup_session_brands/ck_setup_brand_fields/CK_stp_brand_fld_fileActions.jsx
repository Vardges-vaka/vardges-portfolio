import { useState } from "react";
import {
  buildFilePreviewUrl,
  getFileDownloadName,
  getInAppMediaOpenLabel,
  isStorageObjectKey,
  supportsInAppMediaViewer,
  triggerFileDownload,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_fileMediaModal from "./CK_stp_brand_fld_fileMediaModal.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileActions.css";

const CK_stp_brand_fld_fileActions = ({
  item,
  brandId = "",
  integrationId = "",
  resolveFileUrl,
  previewUrl = "",
  className = "",
}) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const storedUrl = item?.url || "";
  const fileUrl =
    previewUrl || buildFilePreviewUrl(item, resolveFileUrl);
  const entityId = integrationId || brandId;
  const canDownload =
    Boolean(fileUrl) ||
    (Boolean(entityId) && Boolean(storedUrl) && isStorageObjectKey(storedUrl));
  const inAppViewer = supportsInAppMediaViewer(item);
  const openLabel = inAppViewer ? getInAppMediaOpenLabel(item) : "Open";

  if (!canDownload) return null;

  const downloadName = getFileDownloadName(item);

  const handleDownload = (event) => {
    event.preventDefault();
    triggerFileDownload({
      url: fileUrl,
      filename: downloadName,
      brandId,
      integrationId,
      objectKey: storedUrl,
    });
  };

  const handleOpen = (event) => {
    event.preventDefault();
    if (!fileUrl) return;

    if (inAppViewer) {
      setViewerOpen(true);
      return;
    }

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        className={["cK_stp_brand_fld_fileActions", className].filter(Boolean).join(" ")}>
        <button
          type="button"
          className="cK_stp_brand_fld_fileActions__openLink"
          disabled={!fileUrl}
          onClick={handleOpen}>
          {openLabel}
        </button>
        <button
          type="button"
          className="cK_stp_brand_fld_fileActions__downloadBtn"
          onClick={handleDownload}>
          Download
        </button>
      </div>

      {inAppViewer ? (
        <CK_stp_brand_fld_fileMediaModal
          isOpen={viewerOpen}
          item={item}
          previewUrl={fileUrl}
          onClose={() => setViewerOpen(false)}
        />
      ) : null}
    </>
  );
};

export default CK_stp_brand_fld_fileActions;
