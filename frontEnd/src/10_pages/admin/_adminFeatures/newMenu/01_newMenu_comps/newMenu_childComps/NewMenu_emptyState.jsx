import { Inbox } from "lucide-react";
import "../../_styles/newMenu_emptyState.css";

/* ============================================================================
   NewMenu_emptyState — uniform "nothing here yet" panel.
============================================================================ */
const NewMenu_emptyState = ({
  icon = <Inbox size={24} aria-hidden="true" />,
  title = "Nothing to show",
  hint,
  action,
}) => (
  <div className="NewMenu_emptyState" role="status">
    <span className="NewMenu_emptyState_icon">{icon}</span>
    <p className="NewMenu_emptyState_title">{title}</p>
    {hint && <p className="NewMenu_emptyState_hint">{hint}</p>}
    {action && <div className="NewMenu_emptyState_action">{action}</div>}
  </div>
);

export default NewMenu_emptyState;
