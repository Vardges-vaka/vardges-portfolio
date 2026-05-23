import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import "../../_styles/newMenu_breadcrumb.css";

/* ============================================================================
   NewMenu_breadcrumb — clickable breadcrumb path.
   trail: [{ key, label, onClick? }] — the last crumb is current (non-clickable).
============================================================================ */
const NewMenu_breadcrumb = ({ trail = [], ariaLabel = "Breadcrumb" }) => (
  <nav className="NewMenu_breadcrumb" aria-label={ariaLabel}>
    {trail.map((c, i) => {
      const isLast = i === trail.length - 1;
      return (
        <Fragment key={c.key}>
          <button
            type="button"
            className={`NewMenu_breadcrumb_crumb ${isLast ? "NewMenu_breadcrumb_crumb_current" : ""}`}
            onClick={isLast ? undefined : c.onClick}
            aria-current={isLast ? "page" : undefined}
            disabled={isLast || !c.onClick}>
            {c.label}
          </button>
          {!isLast && (
            <span className="NewMenu_breadcrumb_sep" aria-hidden="true">
              <ChevronRight size={14} />
            </span>
          )}
        </Fragment>
      );
    })}
  </nav>
);

export default NewMenu_breadcrumb;
