import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import "../../_styles/newMenu_dropZone.css";

/* ============================================================================
   NewMenu_dropZone — drag-and-drop file input.
   onFile(file) is called for both drops and click-and-select.
============================================================================ */
const NewMenu_dropZone = ({
  label = "Drop a file here, or click to browse",
  hint,
  disabled = false,
  accept = "image/*,.pdf,.docx,.xlsx,.txt",
  onFile,
}) => {
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    if (disabled) return;
    e.preventDefault();
    setOver(true);
  };
  const handleDragLeave = () => setOver(false);
  const handleDrop = (e) => {
    if (disabled) return;
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && onFile) onFile(f);
  };
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f && onFile) onFile(f);
  };

  const classes = [
    "NewMenu_dropZone",
    over ? "NewMenu_dropZone_over" : "",
    disabled ? "NewMenu_dropZone_disabled" : "",
  ].filter(Boolean).join(" ");

  return (
    <label className={classes}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <span className="NewMenu_dropZone_icon"><Upload size={20} aria-hidden="true" /></span>
      <span className="NewMenu_dropZone_label">{label}</span>
      {hint && <span className="NewMenu_dropZone_hint">{hint}</span>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="NewMenu_dropZone_input"
      />
    </label>
  );
};

export default NewMenu_dropZone;
