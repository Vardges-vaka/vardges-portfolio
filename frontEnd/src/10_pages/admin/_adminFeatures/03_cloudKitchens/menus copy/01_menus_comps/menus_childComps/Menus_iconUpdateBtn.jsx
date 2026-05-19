import "../../_styles/menus_childComps/menus_iconUpdateBtn.css";

/* ============================================================================
   Menus_iconUpdateBtn — icon-only update btn for a single field.
   - When active=true, renders the "primary" green tint state.
   - When disabled=true, becomes non-interactive.
   - Pure presentational — caller wires the click.

   props:
   - tooltip: string  (rendered via [data-tooltip])
   - icon: ReactNode  (a single <Pencil />, <Check />, etc.)
   - active, disabled, onClick
============================================================================ */

const Menus_iconUpdateBtn = ({ tooltip, icon, active, disabled, onClick }) => {
  return (
    <button
      type="button"
      className={`menus_iconUpdateBtn ${active ? "active" : ""}`}
      data-tooltip={tooltip}
      aria-label={tooltip}
      aria-disabled={disabled ? "true" : undefined}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}>
      {icon}
    </button>
  );
};

export default Menus_iconUpdateBtn;
