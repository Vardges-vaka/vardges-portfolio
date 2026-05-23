import { Pencil } from "lucide-react";
import "../../_styles/newMenu_iconBtn.css";

/* ============================================================================
   NewMenu_iconBtn — icon-only round button used everywhere (translations
   toggle, edit-field, view aggregator versions, etc.)

   Behaviour:
     - active=true highlights the button (used while a translations panel is
       open or a field is in edit mode)
     - disabled=true greys it out and short-circuits onClick
============================================================================ */
const NewMenu_iconBtn = ({
  icon,
  tooltip,
  active = false,
  disabled = false,
  onClick,
  className = "",
}) => (
  <button
    type="button"
    className={`NewMenu_iconBtn ${active ? "NewMenu_iconBtn_active" : ""} ${className}`}
    title={tooltip}
    aria-label={tooltip}
    aria-pressed={active || undefined}
    disabled={disabled}
    onClick={disabled ? undefined : onClick}>
    {icon || <Pencil size={16} aria-hidden="true" />}
  </button>
);

export default NewMenu_iconBtn;
