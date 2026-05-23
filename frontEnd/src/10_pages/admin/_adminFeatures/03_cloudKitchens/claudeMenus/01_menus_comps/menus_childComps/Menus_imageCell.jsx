import { useState } from "react";
import { Search, Pencil } from "lucide-react";
import Menus_imageLightbox from "./Menus_imageLightbox.jsx";
import "../../_styles/menus_childComps/menus_filePreview.css";

/* ============================================================================
   Menus_imageCell — table cell image with hover magnifier + click-to-zoom +
   corner edit button.

   props:
   - src: string
   - alt: string
   - size: number (default 44)
   - onEdit: () => void  (when defined, a small pencil overlay appears on hover)
============================================================================ */
const Menus_imageCell = ({ src, alt, size = 44, onEdit }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span className="menus_imageCell" style={{ borderRadius: 8 }}>
        <button
          type="button"
          className="menus_menuItem_view_all_table_row btn"
          onClick={() => setOpen(true)}
          style={{ width: size, height: size, padding: 0, borderRadius: 8 }}>
          <img
            className="menus_menuItem_view_all_table_row image"
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
          />
        </button>
        <span className="menus_imageCell_zoom" style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", opacity: 0, transition: "opacity 180ms ease",
          pointerEvents: "none",
        }}>
          <Search size={18} />
        </span>
        {onEdit && (
          <button
            type="button"
            title="Update image"
            className="menus_imageCell_edit"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <Pencil size={12} />
          </button>
        )}
      </span>
      <Menus_imageLightbox open={open} src={src} alt={alt} onClose={() => setOpen(false)} />
    </>
  );
};

export default Menus_imageCell;
