import "../../../_styles/cloudStorage_logoPanel_actions.css";

const CloudStorage_logoPanel_actions = ({
  file,
  isUploading,
  handleUploadClick,
  handleClose,
}) => {
  return (
    <div className="cloudStorage_logoPanel_actions">
      <button
        className="cloudStorage_logoPanel_btnUpload"
        disabled={!file || isUploading}
        onClick={handleUploadClick}>
        {isUploading ? "Uploading…" : "Upload"}
      </button>
      <button className="cloudStorage_logoPanel_btnClose" onClick={handleClose}>
        × Close
      </button>
    </div>
  );
};

export default CloudStorage_logoPanel_actions;
