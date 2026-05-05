import { useCloudStorage_logoPanel } from "../../03_CloudStorage_hooks/_CloudStorage_hooks.index.js";
import {
  CloudStorage_logoPanel_dropzone,
  CloudStorage_logoPanel_fileInfo,
  CloudStorage_logoPanel_currentLogo,
  CloudStorage_logoPanel_actions,
} from "./_cloudStorage_LogoPanel.index.js";

import "../../_styles/cloudStorage_logoPanel.css";

const CloudStorage_logoPanel = ({
  open,
  hasLogo,
  currentLogoUrl,
  isUploading,
  onClose,
  onUploaded,
}) => {
  const { states, handlers } = useCloudStorage_logoPanel({
    open,
    isUploading,
    onClose,
    onUploaded,
  });

  return (
    <tr className="panel-row">
      <td colSpan={11}>
        <div className={`panel-container${open ? " open" : ""}`}>
          <div className="logo-upload-panel">
            <CloudStorage_logoPanel_dropzone
              hasLogo={hasLogo}
              dragOver={states.dragOver}
              handleDragOver={handlers.handleDragOver}
              handleDragLeave={handlers.handleDragLeave}
              handleDrop={handlers.handleDrop}
              previewUrl={states.previewUrl}
              fileInputRef={states.fileInputRef}
              handleInputChange={handlers.handleInputChange}
            />

            <CloudStorage_logoPanel_fileInfo
              file={states.file}
              formatSize={handlers.formatSize}
              isUploading={isUploading}
            />
            <CloudStorage_logoPanel_currentLogo
              hasLogo={hasLogo}
              currentLogoUrl={currentLogoUrl}
            />
            <CloudStorage_logoPanel_actions
              file={states.file}
              isUploading={isUploading}
              handleUploadClick={handlers.handleUploadClick}
              handleClose={handlers.handleClose}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CloudStorage_logoPanel;
