import { File, FileText, FileSpreadsheet, Image as ImageIcon } from "lucide-react";
import "../../_styles/menus_childComps/menus_filePreview.css";

/* ============================================================================
   Menus_filePreview — image thumbnail OR icon for non-image files.

   props:
   - file: { path, fileType, sizeInBytes, ref, description } | string URL | null
   - label: string  (label below the thumb)
============================================================================ */

const formatBytes = (n) => {
  if (n == null) return null;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
};

const ICON_FOR_TYPE = {
  pdf: FileText,
  doc: FileText,
  docx: FileText,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  csv: FileSpreadsheet,
};

const isImagePath = (p) =>
  typeof p === "string" && /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(p);

const Menus_filePreview = ({ file, label }) => {
  if (!file) {
    return (
      <div className="menus_filePreview" title="No file">
        <span className="menus_filePreview_thumb" style={{ opacity: 0.5 }}>
          <File size={28} />
        </span>
        <span className="menus_filePreview_label">{label || "—"}</span>
      </div>
    );
  }

  const isStr = typeof file === "string";
  const path = isStr ? file : file.path;
  const type = isStr ? "" : (file.fileType || "").toLowerCase();
  const isImg = type === "image" || isImagePath(path);
  const Icon = ICON_FOR_TYPE[type] || (isImg ? ImageIcon : File);
  const size = !isStr ? formatBytes(file.sizeInBytes) : null;

  return (
    <div
      className="menus_filePreview"
      title={isStr ? path : file.description || file.ref}>
      <span className="menus_filePreview_thumb">
        {isImg && path ? (
          <img src={path} alt={label || (file.ref || "")} />
        ) : (
          <Icon size={28} />
        )}
      </span>
      <span className="menus_filePreview_label">
        {label || (isStr ? "file" : file.ref || type || "file")}
      </span>
      {size && <span className="menus_filePreview_meta">{size}</span>}
    </div>
  );
};

export default Menus_filePreview;
