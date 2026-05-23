import "../_styles/newMenu_toast.css";

/* ============================================================================
   NewMenu_toast — auto-dismissing confirmation pill.

   The hook layer owns the auto-dismiss timer; this component is purely
   visual. Clicking dismisses early.
============================================================================ */
const NewMenu_toast = ({ message, onDismiss }) => {
  if (!message) return null;
  return (
    <div
      className="NewMenu_toast"
      role="status"
      aria-live="polite"
      onClick={onDismiss}>
      {message}
    </div>
  );
};

export default NewMenu_toast;
