import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import "../../_styles/menus_childComps/menus_dropZone.css";

/* ============================================================================
   Menus_dropZone — drag-and-drop file zone for recipe / techcard / other files.

   props:
   - label: string                 (shown in zone)
   - hint: string                  (subline)
   - disabled: boolean             (greyed out, no drop)
   - accept: string                (file input accept attr; defaults to broad set)
   - onFile: (File) => void        (called on drop or input change)
============================================================================ */

const Menus_dropZone = ({
  label = "Drop a file here, or click to browse",
  hint,
  disabled,
  accept = "image/*,.pdf,.docx,.doc,.xlsx,.xls,.txt",
  onFile,
}) => {
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer?.files?.[0];
    if (f && onFile) onFile(f);
  };

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f && onFile) onFile(f);
  };

  return (
    <label
      className={`menus_dropZone ${over ? "menus_dropZone--over" : ""} ${
        disabled ? "menus_dropZone--disabled" : ""
      }`}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}>
      <span className="menus_dropZone_icon">
        <Upload size={20} />
      </span>
      <span className="menus_dropZone_label">{label}</span>
      {hint && <span className="menus_dropZone_hint">{hint}</span>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
      />
    </label>
  );
};

export default Menus_dropZone;
