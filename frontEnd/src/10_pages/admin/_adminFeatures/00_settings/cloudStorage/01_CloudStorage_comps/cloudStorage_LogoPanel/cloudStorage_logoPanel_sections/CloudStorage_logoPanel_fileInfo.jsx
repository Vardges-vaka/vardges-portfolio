import "../../../_styles/cloudStorage_logoPanel_fileInfo.css";

const CloudStorage_logoPanel_fileInfo = ({ file, formatSize, isUploading }) => {
  return (
    <div className="cloudStorage_logoPanel_fileInfo">
      <div className="panel-title">File Info</div>
      {!file ? (
        <div className="cloudStorage_logoPanel_fileInfoRow cloudStorage_logoPanel_fileInfoRow--muted">
          No file selected
        </div>
      ) : (
        <>
          <div className="cloudStorage_logoPanel_fileInfoRow">
            Name: <span>{file.name}</span>
          </div>
          <div className="cloudStorage_logoPanel_fileInfoRow">
            Type: <span>{file.type || "unknown"}</span>
          </div>
          <div className="cloudStorage_logoPanel_fileInfoRow">
            Size: <span>{formatSize(file.size)}</span>
          </div>
          <div className="cloudStorage_logoPanel_progressLabel cloudStorage_logoPanel_progressLabel--spaced">
            {isUploading ? "Uploading…" : "Ready to upload"}
          </div>
        </>
      )}
    </div>
  );
};

export default CloudStorage_logoPanel_fileInfo;
