import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Award, FileText, BadgeCheck, Star, Clock, Plus, Minus, RotateCw, ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Categorized, filterable certificate wall. Featured certs sit in a highlighted
 * strip; the rest filter by category with animated layout transitions. Earned
 * cards open the real PDF; planned (roadmap) cards show a "Planned" badge and a
 * "View path" link to the syllabus — never presented as completed. When a `desc`
 * is supplied the card gains a flip button; the back shows what it covers.
 */
const CertCard = ({ cert, viewLabel, viewPathLabel, plannedLabel, featured = false, desc, flipLabel, backLabel }) => {
  const [flipped, setFlipped] = useState(false);
  const canFlip = !!desc;

  return (
    <Motion.article
      layout
      className={`vp-cert-card ${featured ? "vp-cert-card--featured" : ""} ${cert.planned ? "vp-cert-card--planned" : ""}`}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="vp-cert-card__shine" aria-hidden="true" />
      <div className={`vp-cert-card__flip ${flipped ? "is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="vp-cert-card__face vp-cert-card__face--front" aria-hidden={flipped}>
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
            {canFlip && (
              <button type="button" className="vp-cert-card__flip-btn" onClick={() => setFlipped(true)} aria-label={flipLabel} tabIndex={flipped ? -1 : 0}>
                <RotateCw size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* BACK */}
        {canFlip && (
          <div className="vp-cert-card__face vp-cert-card__face--back" aria-hidden={!flipped}>
            <span className="vp-cert-card__org">
              <Award size={13} aria-hidden="true" />
              {cert.org}
            </span>
            <p className="vp-cert-card__back-desc">{desc}</p>
            <button type="button" className="vp-cert-card__flip-btn vp-cert-card__flip-btn--back" onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1}>
              <ArrowLeft size={14} aria-hidden="true" />
              {backLabel}
            </button>
          </div>
        )}
      </div>
    </Motion.article>
  );
};

CertCard.propTypes = {
  cert: PropTypes.object.isRequired,
  viewLabel: PropTypes.string.isRequired,
  viewPathLabel: PropTypes.string,
  plannedLabel: PropTypes.string,
  featured: PropTypes.bool,
  desc: PropTypes.string,
  flipLabel: PropTypes.string,
  backLabel: PropTypes.string,
};

// category display order for the filter tabs
const CAT_ORDER = ["dev", "auto", "ai", "cyber", "foundations"];

const CertWall = ({ certs, viewLabel, viewPathLabel, plannedLabel, labels, variant = "tech", step, showAllLabel, showLessLabel, loadMoreLabel, descFor, flipLabel, backLabel }) => {
  const collapsible = typeof step === "number"; // opt in to the load-more flow by passing `step`
  const rootRef = useRef(null);
  const [active, setActive] = useState("all"); // category tab (full-wall mode)
  const [fullWall, setFullWall] = useState(!collapsible); // false = incremental slice, true = filterable wall
  const [visible, setVisible] = useState(0); // how many of `rest` are revealed while collapsed

  const featured = useMemo(() => certs.filter((c) => c.featured), [certs]);
  const rest = useMemo(() => certs.filter((c) => !c.featured), [certs]);

  // tabs = "all" + categories actually present (preserve a sensible order)
  const cats = useMemo(() => {
    const present = new Set(rest.map((c) => c.cat));
    return ["all", ...CAT_ORDER.filter((k) => present.has(k))];
  }, [rest]);

  const filtered = active === "all" ? rest : rest.filter((c) => c.cat === active);
  const countFor = (key) => (key === "all" ? rest.length : rest.filter((c) => c.cat === key).length);
  // not collapsible (or expanded): the full filterable wall with tabs. collapsed: a growing slice.
  const showingWall = !collapsible || fullWall;
  const shown = showingWall ? filtered : rest.slice(0, visible);
  const remaining = rest.length - visible;
  const allShown = visible >= rest.length;

  // collapse back to the curated slice and re-anchor on the heading (don't jump to the footer)
  const collapse = () => {
    const el = rootRef.current;
    const y = el ? el.getBoundingClientRect().top + window.scrollY - 96 : 0;
    setFullWall(false);
    setVisible(0);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const cardProps = (c) => ({
    viewLabel,
    viewPathLabel,
    plannedLabel,
    desc: descFor ? descFor(c) : undefined,
    flipLabel,
    backLabel,
  });

  return (
    <div className={`vp-certwall vp-certwall--${variant}`} ref={rootRef}>
      {featured.length > 0 && (
        <div className="vp-certwall__featured">
          {featured.map((c) => (
            <CertCard key={c.id} cert={c} {...cardProps(c)} featured />
          ))}
        </div>
      )}

      {showingWall && cats.length > 2 && (
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
            <CertCard key={c.id} cert={c} {...cardProps(c)} />
          ))}
        </AnimatePresence>
      </Motion.div>

      {collapsible && rest.length > 0 && (
        <div className="vp-showall">
          {fullWall ? (
            <button type="button" className="vp-btn vp-showall__btn" onClick={collapse}>
              <Minus size={15} aria-hidden="true" />
              {showLessLabel}
            </button>
          ) : (
            <>
              {!allShown && (
                <button
                  type="button"
                  className="vp-btn vp-showall__btn vp-showall__btn--more"
                  onClick={() => setVisible((v) => Math.min(rest.length, v + step))}
                >
                  <Plus size={15} aria-hidden="true" />
                  {loadMoreLabel}
                  <span className="vp-showall__num">+{Math.min(step, remaining)}</span>
                </button>
              )}
              <button type="button" className="vp-btn vp-showall__btn vp-showall__btn--all" onClick={() => setFullWall(true)}>
                {showAllLabel} ({certs.length})
              </button>
            </>
          )}
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
  step: PropTypes.number,
  showAllLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
  loadMoreLabel: PropTypes.string,
  descFor: PropTypes.func,
  flipLabel: PropTypes.string,
  backLabel: PropTypes.string,
};

export default CertWall;
