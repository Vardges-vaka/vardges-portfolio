import { useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Award, FileText, BadgeCheck, Star, Clock, Plus, Minus } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Categorized, filterable certificate wall. Featured certs sit in a highlighted
 * strip; the rest filter by category with animated layout transitions. Earned
 * cards open the real PDF; planned (roadmap) cards show a "Planned" badge and a
 * "View path" link to the syllabus — never presented as completed.
 */
const CertCard = ({ cert, viewLabel, viewPathLabel, plannedLabel, featured = false }) => (
  <Motion.article
    layout
    className={`vp-cert-card ${featured ? "vp-cert-card--featured" : ""} ${cert.planned ? "vp-cert-card--planned" : ""}`}
    initial={{ opacity: 0, y: 28, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="vp-cert-card__shine" aria-hidden="true" />
    <div className="vp-cert-card__seal" aria-hidden="true">
      {cert.planned ? <Clock size={16} /> : featured ? <Star size={16} /> : <BadgeCheck size={16} />}
    </div>
    {cert.planned && (
      <span className="vp-cert-card__flag">
        <Clock size={11} aria-hidden="true" />
        {plannedLabel}
      </span>
    )}
    <span className="vp-cert-card__org">
      <Award size={13} aria-hidden="true" />
      {cert.org}
    </span>
    <h3 className="vp-cert-card__title">{cert.title}</h3>
    <div className="vp-cert-card__foot">
      {cert.file ? (
        <a className="vp-cert-card__pdf" href={cert.file} target="_blank" rel="noreferrer">
          <FileText size={14} aria-hidden="true" />
          {cert.planned ? viewPathLabel : viewLabel}
        </a>
      ) : (
        <span className="vp-cert-card__pending">
          <BadgeCheck size={14} aria-hidden="true" />
          {cert.org}
        </span>
      )}
    </div>
  </Motion.article>
);

CertCard.propTypes = {
  cert: PropTypes.object.isRequired,
  viewLabel: PropTypes.string.isRequired,
  viewPathLabel: PropTypes.string,
  plannedLabel: PropTypes.string,
  featured: PropTypes.bool,
};

// category display order for the filter tabs
const CAT_ORDER = ["dev", "auto", "ai", "cyber", "foundations"];

const CertWall = ({ certs, viewLabel, viewPathLabel, plannedLabel, labels, variant = "tech", previewCount, showAllLabel, showLessLabel }) => {
  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const featured = useMemo(() => certs.filter((c) => c.featured), [certs]);
  const rest = useMemo(() => certs.filter((c) => !c.featured), [certs]);

  const collapsible = typeof previewCount === "number" && rest.length > previewCount;
  const collapsed = collapsible && !expanded;

  // tabs = "all" + categories actually present (preserve a sensible order)
  const cats = useMemo(() => {
    const present = new Set(rest.map((c) => c.cat));
    return ["all", ...CAT_ORDER.filter((k) => present.has(k))];
  }, [rest]);

  const filtered = active === "all" ? rest : rest.filter((c) => c.cat === active);
  const countFor = (key) => (key === "all" ? rest.length : rest.filter((c) => c.cat === key).length);
  // collapsed: a curated slice, no tabs. expanded / non-collapsible: the full filterable wall.
  const shown = collapsed ? rest.slice(0, previewCount) : filtered;

  return (
    <div className={`vp-certwall vp-certwall--${variant}`}>
      {featured.length > 0 && (
        <div className="vp-certwall__featured">
          {featured.map((c) => (
            <CertCard key={c.id} cert={c} viewLabel={viewLabel} viewPathLabel={viewPathLabel} plannedLabel={plannedLabel} featured />
          ))}
        </div>
      )}

      {!collapsed && cats.length > 2 && (
        <div className="vp-certwall__tabs" role="tablist">
          {cats.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              className={`vp-certwall__tab ${active === key ? "is-active" : ""}`}
              onClick={() => setActive(key)}
            >
              {labels[key] ?? key}
              <span className="vp-certwall__count">{countFor(key)}</span>
            </button>
          ))}
        </div>
      )}

      <Motion.div layout className="vp-certwall__grid">
        <AnimatePresence mode="popLayout">
          {shown.map((c) => (
            <CertCard key={c.id} cert={c} viewLabel={viewLabel} viewPathLabel={viewPathLabel} plannedLabel={plannedLabel} />
          ))}
        </AnimatePresence>
      </Motion.div>

      {collapsible && (
        <div className="vp-showall">
          <button type="button" className="vp-btn vp-btn--ghost vp-showall__btn" onClick={() => setExpanded((v) => !v)}>
            {expanded ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
            {expanded ? showLessLabel : `${showAllLabel} (${certs.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

CertWall.propTypes = {
  certs: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewLabel: PropTypes.string.isRequired,
  viewPathLabel: PropTypes.string,
  plannedLabel: PropTypes.string,
  labels: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(["tech", "bar"]),
  previewCount: PropTypes.number,
  showAllLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
};

export default CertWall;
