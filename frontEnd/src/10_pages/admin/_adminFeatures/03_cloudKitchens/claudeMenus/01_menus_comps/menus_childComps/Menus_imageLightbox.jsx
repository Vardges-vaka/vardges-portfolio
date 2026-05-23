import { useEffect } from "react";
import { X } from "lucide-react";
import "../../_styles/menus_modals/menus_confirmModal_fieldUpdate.css";

/* ============================================================================
   Menus_imageLightbox — viewer with backdrop dismiss.
   props: open, src, alt, onClose
============================================================================ */
const Menus_imageLightbox = ({ open, src, alt, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="menus_confirmModal_overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1d1b18",
          borderRadius: 14,
          padding: 8,
          maxWidth: "min(900px, 92vw)",
          maxHeight: "92vh",
          boxShadow: "0 24px 60px rgba(0,0,0,.5)",
        }}>
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "82vh",
            borderRadius: 10,
            objectFit: "contain",
          }}
        />
        <div
          style={{
            padding: "8px 4px 0",
            color: "#fff",
            fontSize: 12,
            opacity: 0.8,
            display: "flex",
            justifyContent: "space-between",
          }}>
          <span>{alt}</span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid #fff4",
              color: "#fff",
              borderRadius: 6,
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: 12,
              display: "inline-flex",
              gap: 6,
              alignItems: "center",
            }}>
            <X size={12} /> Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menus_imageLightbox;
