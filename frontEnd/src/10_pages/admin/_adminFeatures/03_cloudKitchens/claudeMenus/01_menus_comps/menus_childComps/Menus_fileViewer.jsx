import { X, FileText, FileSpreadsheet, Image as ImageIcon } from "lucide-react";
import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";

const formatBytes = (n) => {
  if (n == null) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
};

const ICON_FOR_TYPE = {
  pdf: FileText, doc: FileText, docx: FileText,
  xls: FileSpreadsheet, xlsx: FileSpreadsheet, csv: FileSpreadsheet,
};
const isImagePath = (p) => typeof p === "string" && /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(p);

/* ============================================================================
   Menus_fileViewer — clicking a file (Recipe / TechCard / other) opens this
   modal with file info + a Download button.

   props:
   - open: boolean
   - file: { path, fileType, sizeInBytes, ref, description } | string | null
   - label: string
   - onClose: () => void
============================================================================ */
const Menus_fileViewer = ({ open, file, label, onClose }) => {
  if (!open || !file) return null;
  const isStr = typeof file === "string";
  const path = isStr ? file : file.path;
  const type = isStr ? "url" : (file.fileType || "file");
  const isImg = type === "image" || isImagePath(path);
  const Icon = ICON_FOR_TYPE[String(type).toLowerCase()] || (isImg ? ImageIcon : FileText);

  return (
    <div className="menus_confirmModal_overlay" onClick={onClose}>
      <div className="menus_confirmModal" onClick={(e) => e.stopPropagation()}
        style={{ width: "min(560px, 96vw)" }}>
        <header className="menus_confirmModal_header">
          <div>
            <p className="menus_confirmModal_subtitle">File</p>
            <h2 className="menus_confirmModal_title">
              {label || (isStr ? path : (file.ref || type))}
            </h2>
          </div>
          <button className="menus_confirmModal_close" onClick={onClose}><X size={16} /></button>
        </header>
        <div className="menus_confirmModal_body">
          {isImg ? (
            <img src={path} alt={label}
              style={{
                width: "100%", maxHeight: 280, objectFit: "contain",
                borderRadius: 8, background: "var(--menus-bg-soft)",
              }} />
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 140, background: "var(--menus-bg-soft)", borderRadius: 8,
              color: "var(--menus-text-soft)",
            }}>
              <Icon size={48} />
            </div>
          )}
          <div style={{
            display: "grid", gridTemplateColumns: "auto 1fr",
            gap: "4px 12px", fontSize: 13,
          }}>
            <span style={{ color: "var(--menus-text-soft)" }}>Type</span><span>{type}</span>
            {!isStr && file.sizeInBytes != null && (
              <>
                <span style={{ color: "var(--menus-text-soft)" }}>Size</span>
                <span>{formatBytes(file.sizeInBytes)}</span>
              </>
            )}
            {!isStr && file.description && (
              <>
                <span style={{ color: "var(--menus-text-soft)" }}>Description</span>
                <span>{file.description}</span>
              </>
            )}
            <span style={{ color: "var(--menus-text-soft)" }}>URL</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{path}</span>
          </div>
        </div>
        <footer className="menus_confirmModal_actions">
          <button className="menus_confirmModal_btn" onClick={onClose}>Close</button>
          <a className="menus_confirmModal_btn primary"
            href={path} download target="_blank" rel="noreferrer">
            Download
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Menus_fileViewer;
