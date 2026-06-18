import { AnimatePresence, motion as Motion } from "framer-motion";
import PropTypes from "prop-types";
import { X, FileText, ExternalLink, Sparkles, Telescope, Clock, Route, ArrowUpRight } from "lucide-react";
import { TYPE_ICON, cap } from "./graphConfig.js";

/**
 * GraphPanel — the slide-in detail aside for a selected graph node. Pure
 * presentation: it receives the selected node, its typed neighbours and the
 * handlers, and renders the right copy/actions per node type. Bar "experience"
 * nodes reuse the translated tasting-menu prose via `selCourse`.
 */
const GraphPanel = ({ selected, neighbours, cfg, t, lang, dir, displayLabel, selCourse, closeBtnRef, onClose, onSelect, onDeepDive, onJourney }) => {
  const slideX = dir === "rtl" ? -30 : 30;

  return (
    <AnimatePresence>
      {selected && (
        <Motion.aside
          key={selected.id}
          className="vp-kg__panel"
          role="dialog"
          aria-labelledby="vp-kg-title"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
          initial={{ opacity: 0, x: slideX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideX }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <button ref={closeBtnRef} type="button" className="vp-kg__close" onClick={onClose} aria-label={t("nav.close")}>
            <X size={18} />
          </button>

          <span className={`vp-kg__badge vp-kg__badge--${selected.type}`}>
            {(() => {
              const Icon = TYPE_ICON[selected.type] ?? Sparkles;
              return <Icon size={13} aria-hidden="true" />;
            })()}
            {t(`graph.type${cap(selected.type)}`)}
          </span>

          {selected.planned && (
            <span className="vp-kg__planned">
              <Clock size={12} aria-hidden="true" /> {t("tech.certs.planned")}
            </span>
          )}
          {selected.type === "testimonial" && lang !== "en" && (
            <span className="vp-kg__planned vp-kg__planned--ai" title={t("testimonials.aiTip")}>
              <Sparkles size={11} aria-hidden="true" /> {t("testimonials.aiBadge")}
            </span>
          )}

          <h3 className="vp-kg__title" id="vp-kg-title">
            {selected.type === "skill"
              ? t(`graph.skills.${selected.id}.name`, selected.label)
              : selected.type === "experience"
                ? selCourse?.role ?? selected.role ?? selected.label
                : selected.type === "bridge"
                  ? t(`graph.bridges.${selected.id}.label`, selected.label)
                  : selected.fullLabel || selected.label}
          </h3>

          {selected.type === "bridge" && <p className="vp-kg__org">{t("graph.bridgeSub")}</p>}
          {selected.type === "cert" && <p className="vp-kg__org">{selected.org}</p>}
          {selected.type === "project" && (
            <p className="vp-kg__org">
              {selected.year} · {t(`tech.projects.status${cap(selected.status)}`)}
            </p>
          )}
          {selected.type === "experience" && (
            <p className="vp-kg__org">
              {(selCourse?.venue ?? selected.venue)} · {(selCourse?.city ?? selected.city)} · {(selCourse?.year ?? selected.year)}
            </p>
          )}
          {selected.type === "testimonial" && (
            <p className="vp-kg__org">{t(`testimonialInfo.${selected.id}.role`, selected.role)} · {selected.org}</p>
          )}
          {selected.type === "project" && (
            <p className="vp-kg__tagline">{t(`projectInfo.${selected.id}.tagline`, selected.tagline)}</p>
          )}

          <p className={`vp-kg__desc ${selected.type === "testimonial" ? "vp-kg__desc--quote" : ""}`}>
            {selected.type === "skill"
              ? t(`graph.skills.${selected.id}.desc`, selected.desc)
              : selected.type === "cert"
                ? t(`certInfo.${selected.id}.desc`, selected.desc)
                : selected.type === "experience"
                  ? selCourse?.text ?? selected.desc
                  : selected.type === "testimonial"
                    ? t(`testimonialInfo.${selected.id}.quote`, selected.quote)
                    : selected.type === "bridge"
                      ? t(`graph.bridges.${selected.id}.why`, selected.desc)
                      : t(`projectInfo.${selected.id}.description`, selected.desc)}
          </p>

          {selected.type === "project" && selected.stack && (
            <div className="vp-kg__chips">
              {selected.stack.map((s) => (
                <span className="vp-chip" key={s}>{s}</span>
              ))}
            </div>
          )}

          {cfg.types.map((type) => {
            const list = neighbours[selected.id]?.[type] ?? [];
            if (!list.length) return null;
            return (
              <div className="vp-kg__rel" key={type}>
                <p className="vp-kg__rel-title">{t(`graph.rel.${selected.type}.${type}`)}</p>
                <div className="vp-kg__rel-items">
                  {list.map((nb) => (
                    <button type="button" key={nb.id} className={`vp-kg__pill vp-kg__pill--${nb.type}`} onClick={() => onSelect(nb.id)}>
                      {displayLabel(nb)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="vp-kg__actions">
            {selected.type === "project" && (
              <button type="button" className="vp-btn vp-btn--primary vp-kg__btn" onClick={onDeepDive}>
                <Telescope size={15} aria-hidden="true" /> {t("tech.projects.deepDive")}
              </button>
            )}
            {selected.type === "experience" && (
              <button type="button" className="vp-btn vp-btn--ghost vp-kg__btn" onClick={onJourney}>
                <Route size={15} aria-hidden="true" /> {t("graph.seeJourney")}
              </button>
            )}
            {selected.type === "cert" && selected.file && (
              <a className="vp-btn vp-btn--primary vp-kg__btn" href={selected.file} target="_blank" rel="noreferrer">
                <FileText size={15} aria-hidden="true" /> {selected.planned ? t("tech.certs.viewPath") : t("tech.certs.view")}
              </a>
            )}
            {selected.type === "project" && selected.links?.live && (
              <a className="vp-btn vp-btn--ghost vp-kg__btn" href={selected.links.live} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" /> {t("tech.projects.live")}
              </a>
            )}
            {selected.type === "project" && selected.links?.anchor && (
              <a className="vp-btn vp-btn--ghost vp-kg__btn" href={selected.links.anchor} onClick={onClose}>
                {t("tech.projects.details")} <ArrowUpRight size={14} className="vp-arrow" aria-hidden="true" />
              </a>
            )}
          </div>
        </Motion.aside>
      )}
    </AnimatePresence>
  );
};

GraphPanel.propTypes = {
  selected: PropTypes.object,
  neighbours: PropTypes.object.isRequired,
  cfg: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  dir: PropTypes.string.isRequired,
  displayLabel: PropTypes.func.isRequired,
  selCourse: PropTypes.object,
  closeBtnRef: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeepDive: PropTypes.func.isRequired,
  onJourney: PropTypes.func.isRequired,
};

export default GraphPanel;
