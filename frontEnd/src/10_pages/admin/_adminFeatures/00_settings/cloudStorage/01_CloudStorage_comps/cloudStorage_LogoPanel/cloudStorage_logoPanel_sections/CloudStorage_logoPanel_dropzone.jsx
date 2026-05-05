import { IconUpload } from "../../_CloudStorage_comps.index";
import "../../../_styles/cloudStorage_logoPanel_dropzone.css";

const CloudStorage_logoPanel_dropzone = ({
  hasLogo,
  dragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  previewUrl,
  fileInputRef,
  handleInputChange,
}) => {
  return (
    <div className="cloudStorage_logoPanel_dropzoneWrap">
      <div className="panel-title">{hasLogo ? "Update Logo" : "Add Logo"}</div>
      <div
        className={`cloudStorage_logoPanel_dropzone${dragOver ? " cloudStorage_logoPanel_dropzone--dragOver" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="New logo preview"
            className="cloudStorage_logoPanel_dropzonePreview"
          />
        ) : (
          <>
            <IconUpload size={28} />
            <span>
              Drag a file here or
              <br />
              <strong>click to browse</strong>
            </span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="cloudStorage_logoPanel_fileInput"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CloudStorage_logoPanel_dropzone;
