import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { X, ExternalLink, Github, ArrowDown, Check } from "lucide-react";
import PropTypes from "prop-types";
import Media from "./Media.jsx";
import { usePortfolioLang } from "../context/usePortfolio.js";

// providers shown in the animated "live health" mock for the case-study project
const PROVIDERS = ["Google Cloud Storage", "AWS S3", "Cloudflare R2", "Azure Blob"];

/**
 * Project deep-dive modal. Portal-rendered above everything, closes on Esc or
 * backdrop click, locks body scroll, and moves focus to the close button on
 * open / restores it on close. For the case-study project (`caseStudy: true`)
 * it also renders the animated multi-cloud health mock.
 */
const ProjectModal = ({ project, onClose }) => {
  const { t } = usePortfolioLang();
  const closeRef = useRef(null);
  const prevFocus = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    prevFocus.current = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
      prevFocus.current?.focus?.();
    };
  }, [project, onClose]);

  const statusLabel = project
    ? {
        live: t("tech.projects.statusLive"),
        progress: t("tech.projects.statusProgress"),
        concept: t("tech.projects.statusConcept"),
      }[project.status]
    : "";

  const highlights = project
    ? (() => {
        const tr = t(`projectInfo.${project.id}.highlights`);
        return Array.isArray(tr) ? tr : project.highlights;
      })()
    : null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <Motion.div
          className="vp-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <Motion.div
            className="vp-modal__panel"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeRef} type="button" className="vp-modal__close" onClick={onClose} aria-label={t("nav.close")}>
              <X size={20} />
            </button>

            <div className="vp-modal__media">
              <Media
                assetId={project.media.assetId}
                type={project.media.type}
                label={project.media.alt}
                aspect="16 / 10"
              />
            </div>

            <div className="vp-modal__body">
              <div className="vp-modal__meta">
                <span className={`vp-proj-status vp-proj-status--${project.status}`}>
                  <span className="vp-proj-status__dot" aria-hidden="true" />
                  {statusLabel}
                </span>
                <span className="vp-proj-card__year">{project.year}</span>
              </div>

              <h2 className="vp-modal__title">{project.title}</h2>
              <p className="vp-modal__tagline">{t(`projectInfo.${project.id}.tagline`, project.tagline)}</p>
              <p className="vp-modal__desc">{t(`projectInfo.${project.id}.description`, project.description)}</p>

              {highlights?.length > 0 && (
                <ul className="vp-modal__highlights">
                  {highlights.map((h) => (
                    <li key={h}>
                      <Check size={15} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {project.caseStudy && (
                <div className="vp-mock vp-modal__mock" dir="ltr">
                  <div className="vp-mock__bar">
                    <span className="vp-mock__dot" />
                    <span className="vp-mock__dot" />
                    <span className="vp-mock__dot" />
                    <span className="vp-mock__url">vardges.me/admin — cloud monitor</span>
                  </div>
                  <div className="vp-mock__body">
                    {PROVIDERS.map((p, i) => (
                      <div className="vp-mock__row" key={p} style={{ "--d": `${i * 0.4}s` }}>
                        <span className="vp-mock__pulse" aria-hidden="true" />
                        <span className="vp-mock__name">{p}</span>
                        <span className="vp-mock__bar-track">
                          <span className="vp-mock__bar-fill" style={{ "--w": `${88 - i * 9}%` }} />
                        </span>
                        <span className="vp-mock__ok">OK</span>
                      </div>
                    ))}
                  </div>
                  <p className="vp-mock__note">{t("tech.project.mockNote")}</p>
                </div>
              )}

              <div className="vp-proj-card__stack vp-modal__stack">
                {project.stack.map((s) => (
                  <span className="vp-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              {(project.links.live || project.links.github || project.links.anchor) && (
                <div className="vp-proj-links vp-modal__links">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="vp-proj-links__item">
                      <Github size={15} aria-hidden="true" />
                      {t("tech.projects.code")}
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="vp-proj-links__item">
                      <ExternalLink size={15} aria-hidden="true" />
                      {t("tech.projects.live")}
                    </a>
                  )}
                  {project.links.anchor && (
                    <a href={project.links.anchor} className="vp-proj-links__item" onClick={onClose}>
                      <ArrowDown size={15} aria-hidden="true" />
                      {t("tech.projects.details")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    // mount inside .vp-root so theme tokens / fonts / dir cascade into the modal
    document.querySelector(".vp-root") ?? document.body,
  );
};

ProjectModal.propTypes = {
  project: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
