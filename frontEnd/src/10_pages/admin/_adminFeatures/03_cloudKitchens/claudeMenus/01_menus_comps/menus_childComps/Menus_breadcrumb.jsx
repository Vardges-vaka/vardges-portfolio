import "../../_styles/menus_childComps/menus_breadcrumb.css";

/* ============================================================================
   Menus_breadcrumb — clickable path replacing "Back to Menus".

   props:
   - trail: Array<{ key, label, onClick? }>
     last entry is the current page (rendered non-clickable).
============================================================================ */

const Menus_breadcrumb = ({ trail = [] }) => {
  if (!trail.length) return null;
  return (
    <nav className="menus_breadcrumb" aria-label="Breadcrumb">
      {trail.map((c, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={c.key ?? i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <button
              type="button"
              className={`menus_breadcrumb_crumb ${isLast ? "current" : ""}`}
              onClick={isLast ? undefined : c.onClick}
              aria-current={isLast ? "page" : undefined}>
              {c.label}
            </button>
            {!isLast && <span className="menus_breadcrumb_sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Menus_breadcrumb;
