import "../../_styles/newMenu_pill.css";

/* ============================================================================
   NewMenu_pill — small rounded label.

   Variants (via `tone`):
     • default | success | danger | muted | brand | competitor
============================================================================ */
const NewMenu_pill = ({ tone = "default", title, children }) => (
  <span className={`NewMenu_pill NewMenu_pill_${tone}`} title={title}>
    {children}
  </span>
);

export default NewMenu_pill;
