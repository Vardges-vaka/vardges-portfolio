import { File as FileIcon, FileText, Image as ImageIcon } from "lucide-react";
import "../../_styles/newMenu_filePreview.css";
import { formatBytes } from "../../02_newMenu_helpers/_newMenu_helpers.index.js";

/* ============================================================================
   NewMenu_filePreview — thumb + label for any kind of attached file.
   Accepts either a URL string OR an object { path, fileType, sizeInBytes, ref }.
============================================================================ */
const iconForType = (type) => {
  switch ((type || "").toLowerCase()) {
    case "pdf":
    case "doc":
    case "docx":
    case "xlsx":
    case "xls":
      return <FileText size={20} aria-hidden="true" />;
    case "image":
      return <ImageIcon size={20} aria-hidden="true" />;
    default:
      return <FileIcon size={20} aria-hidden="true" />;
  }
};

const isImagePath = (path) =>
  typeof path === "string" && /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(path);

const NewMenu_filePreview = ({ file, label }) => {
  if (!file) {
    return (
      <div className="NewMenu_filePreview NewMenu_filePreview_empty" title="No file">
        <span className="NewMenu_filePreview_thumb">
          <FileIcon size={20} aria-hidden="true" />
        </span>
        <span className="NewMenu_filePreview_label">—</span>
      </div>
    );
  }

  const isStr = typeof file === "string";
  const path = isStr ? file : file.path;
  const type = isStr ? "image" : (file.fileType || "").toLowerCase();
  const showImg = type === "image" || isImagePath(path);

  return (
    <div className="NewMenu_filePreview" title={isStr ? path : (file.description || file.ref)}>
      <span className="NewMenu_filePreview_thumb">
        {showImg && path
          ? <img src={path} alt={label || file.ref || "file"} />
          : iconForType(type)}
      </span>
      <span className="NewMenu_filePreview_label">
        {label || (isStr ? "file" : (file.ref || type || "file"))}
      </span>
      {!isStr && file.sizeInBytes != null && (
        <span className="NewMenu_filePreview_meta">{formatBytes(file.sizeInBytes)}</span>
      )}
    </div>
  );
};

export default NewMenu_filePreview;
