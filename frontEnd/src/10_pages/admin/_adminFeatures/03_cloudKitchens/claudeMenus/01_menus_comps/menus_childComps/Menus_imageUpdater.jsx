import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import "../../_styles/menus_childComps/menus_dropZone.css";
import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";
import Menus_confirmModal_fieldUpdate from "../menus_modals/Menus_confirmModal_fieldUpdate.jsx";

const formatBytes = (n) => {
  if (n == null) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
};

/* ============================================================================
   Menus_imageUpdater — drop a new image; previews CURRENT vs NEW side-by-side
   with file info (name/type/size/dimensions). Confirm pops the
   Menus_confirmModal_fieldUpdate as a double-check before committing.

   props:
   - open: boolean
   - currentSrc: string
   - currentLabel: string
   - onClose: () => void
   - onConfirm: (meta) => void
============================================================================ */
const Menus_imageUpdater = ({ open, currentSrc, currentLabel, onClose, onConfirm }) => {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setMeta(null);
      setConfirming(false);
    }
  }, [open]);

  const onPickFile = (f) => {
    if (!f) return;
    const isImg = f.type?.startsWith("image/");
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      if (isImg) {
        const img = new Image();
        img.onload = () => setMeta({ src: url, type: f.type, size: f.size, name: f.name, width: img.naturalWidth, height: img.naturalHeight });
        img.src = url;
      } else {
        setMeta({ src: url, type: f.type, size: f.size, name: f.name });
      }
    };
    reader.readAsDataURL(f);
    setFile(f);
  };

  if (!open) return null;

  return (
    <div className="menus_confirmModal_overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="menus_confirmModal" onClick={(e) => e.stopPropagation()} style={{ width: "min(720px, 96vw)" }}>
        <header className="menus_confirmModal_header">
          <div>
            <p className="menus_confirmModal_subtitle">Update image</p>
            <h2 className="menus_confirmModal_title">
              {currentLabel ? `Replace main image for "${currentLabel}"` : "Replace main image"}
            </h2>
          </div>
          <button className="menus_confirmModal_close" onClick={onClose}><X size={16} /></button>
        </header>
        <div className="menus_confirmModal_body" style={{ gap: 14 }}>
          {!file && (
            <label
              className={`menus_dropZone ${over ? "menus_dropZone--over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setOver(true); }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => { e.preventDefault(); setOver(false); onPickFile(e.dataTransfer.files?.[0]); }}>
              <span className="menus_dropZone_icon"><Upload size={20} /></span>
              <span className="menus_dropZone_label">Drop a new image here, or click to browse</span>
              <span className="menus_dropZone_hint">PNG, JPG, WebP up to 5 MB</span>
              <input type="file" accept="image/*" onChange={(e) => onPickFile(e.target.files?.[0])} />
            </label>
          )}

          {file && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
                  textTransform: "uppercase", color: "var(--menus-text-soft)", marginBottom: 6,
                }}>Current</div>
                <img src={currentSrc} alt="current" style={{
                  width: "100%", height: 200, objectFit: "cover",
                  borderRadius: 8, border: "1px solid var(--menus-border-soft)",
                }} />
              </div>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
                  textTransform: "uppercase", color: "var(--menus-accent-text)", marginBottom: 6,
                }}>New</div>
                <img src={meta?.src} alt="new" style={{
                  width: "100%", height: 200, objectFit: "cover",
                  borderRadius: 8, border: "1.5px solid var(--menus-accent)",
                }} />
                <div style={{
                  marginTop: 8, fontSize: 12, color: "var(--menus-text)",
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px",
                }}>
                  <span style={{ color: "var(--menus-text-soft)" }}>Name</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{meta?.name}</span>
                  <span style={{ color: "var(--menus-text-soft)" }}>Type</span>
                  <span>{meta?.type || "—"}</span>
                  <span style={{ color: "var(--menus-text-soft)" }}>Size</span>
                  <span>{formatBytes(meta?.size)}</span>
                  {meta?.width && (
                    <>
                      <span style={{ color: "var(--menus-text-soft)" }}>Dimensions</span>
                      <span>{meta.width} × {meta.height}px</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <footer className="menus_confirmModal_actions">
          <button className="menus_confirmModal_btn" onClick={onClose}>Cancel</button>
          <button
            className="menus_confirmModal_btn primary"
            disabled={!file}
            onClick={() => setConfirming(true)}>
            Confirm
          </button>
        </footer>

        {confirming && (
          <Menus_confirmModal_fieldUpdate
            states={{
              isOpen: true,
              title: "Replace the image?",
              subtitle: "Double check",
              updatingField: "Main image",
              prev: "(current)",
              next: meta?.name,
            }}
            handlers={{
              handleCancelUpdate: () => setConfirming(false),
              handleConfirmUpdate: () => { setConfirming(false); onConfirm?.(meta); },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Menus_imageUpdater;
