import { useRef, useState } from "react";
import { Github, ExternalLink, Maximize2, Telescope, Plus, Minus } from "lucide-react";
import PropTypes from "prop-types";
import Media from "./Media.jsx";
import Reveal from "./Reveal.jsx";
import ProjectModal from "./ProjectModal.jsx";
import { usePortfolioLang } from "../context/usePortfolio.js";

const StatusChip = ({ status }) => {
  const { t } = usePortfolioLang();
  const label = {
    live: t("tech.projects.statusLive"),
    progress: t("tech.projects.statusProgress"),
    concept: t("tech.projects.statusConcept"),
  }[status];
  return (
    <span className={`vp-proj-status vp-proj-status--${status}`}>
      <span className="vp-proj-status__dot" aria-hidden="true" />
      {label}
    </span>
  );
};

StatusChip.propTypes = { status: PropTypes.oneOf(["live", "progress", "concept"]).isRequired };

const ProjectLinks = ({ links }) => {
  const { t } = usePortfolioLang();
  return (
    <div className="vp-proj-links">
      {links.github && (
        <a href={links.github} target="_blank" rel="noreferrer" className="vp-proj-links__item">
          <Github size={15} aria-hidden="true" />
          {t("tech.projects.code")}
        </a>
      )}
      {links.live && (
        <a href={links.live} target="_blank" rel="noreferrer" className="vp-proj-links__item">
          <ExternalLink size={15} aria-hidden="true" />
          {t("tech.projects.live")}
        </a>
      )}
    </div>
  );
};

ProjectLinks.propTypes = {
  links: PropTypes.shape({
    github: PropTypes.string,
    live: PropTypes.string,
  }).isRequired,
};

// the clickable media — opens the deep-dive modal
const OpenMedia = ({ project, onOpen, aspect }) => {
  const { t } = usePortfolioLang();
  return (
    <button
      type="button"
      className="vp-proj-card__open"
      onClick={() => onOpen(project)}
      aria-label={`${t("tech.projects.view")} — ${project.title}`}
    >
      <Media
        assetId={project.media.assetId}
        type={project.media.type}
        label={project.media.alt}
        aspect={aspect}
        className="vp-proj-card__media"
      />
      <span className="vp-proj-card__expand" aria-hidden="true">
        <Maximize2 size={15} />
        {t("tech.projects.view")}
      </span>
    </button>
  );
};

OpenMedia.propTypes = {
  project: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  aspect: PropTypes.string.isRequired,
};

const ProjectCard = ({ project, featured, onOpen }) => {
  const { t } = usePortfolioLang();
  const metricLabels = t(`projectInfo.${project.id}.metricLabels`);
  const labels = Array.isArray(metricLabels) ? metricLabels : null;
  return (
    <article className={`vp-proj-card ${featured ? "vp-proj-card--featured" : ""}`}>
      <div className="vp-proj-card__glow" aria-hidden="true" />
      <div className={`vp-proj-card__inner ${featured ? "vp-proj-card__inner--featured" : ""}`}>
        <OpenMedia project={project} onOpen={onOpen} aspect={featured ? "16 / 11" : "16 / 10"} />
        <div className="vp-proj-card__body">
          <div className="vp-proj-card__meta">
            <StatusChip status={project.status} />
            <span className="vp-proj-card__year">{project.year}</span>
          </div>
          <button type="button" className="vp-proj-card__title-btn" onClick={() => onOpen(project)}>
            <h3 className="vp-proj-card__title">{project.title}</h3>
          </button>
          <p className="vp-proj-card__tagline">{t(`projectInfo.${project.id}.tagline`, project.tagline)}</p>
          <p className="vp-proj-card__desc">{t(`projectInfo.${project.id}.description`, project.description)}</p>
          <div className="vp-proj-card__stack">
            {project.stack.map((s) => (
              <span className="vp-chip" key={s}>
                {s}
              </span>
            ))}
          </div>
          {featured && project.metrics?.length > 0 && (
            <div className="vp-proj-card__metrics">
              {project.metrics.map((m, i) => (
                <div className="vp-proj-card__metric" key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{labels?.[i] ?? m.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="vp-proj-card__actions">
            <button type="button" className="vp-btn vp-btn--primary vp-proj-card__deepdive" onClick={() => onOpen(project)}>
              <Telescope size={15} aria-hidden="true" />
              {t("tech.projects.deepDive")}
            </button>
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  featured: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
};

/**
 * Renders the projects feed. Cards open a deep-dive modal. Data comes from
 * data/sampleProjects.js — swap in the backend fetch later, markup unchanged.
 * Starts collapsed to just the featured card; "Load more" reveals `step` cards
 * at a time, "Show all" reveals everything, "Show less" collapses again.
 */
const ProjectsGrid = ({ projects, step = 3 }) => {
  const { t } = usePortfolioLang();
  const rootRef = useRef(null);
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(0); // how many of `rest` are revealed
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const shown = rest.slice(0, visible);
  const remaining = rest.length - visible;
  const allShown = visible >= rest.length;

  // collapse, then bring the section heading back into view (so the page doesn't
  // jump to the footer when the tall list disappears beneath the button)
  const collapse = () => {
    const el = rootRef.current;
    const y = el ? el.getBoundingClientRect().top + window.scrollY - 96 : 0;
    setVisible(0);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="vp-projects" ref={rootRef}>
      {featured && (
        <Reveal>
          <ProjectCard project={featured} featured onOpen={setActive} />
        </Reveal>
      )}

      <div className="vp-projects__grid">
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={0.06 + (i % 3) * 0.06}>
            <ProjectCard project={p} onOpen={setActive} />
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="vp-showall">
          {!allShown && (
            <>
              <button
                type="button"
                className="vp-btn vp-showall__btn vp-showall__btn--more"
                onClick={() => setVisible((v) => Math.min(rest.length, v + step))}
              >
                <Plus size={15} aria-hidden="true" />
                {t("tech.projects.loadMore")}
                <span className="vp-showall__num">+{Math.min(step, remaining)}</span>
              </button>
              <button
                type="button"
                className="vp-btn vp-showall__btn vp-showall__btn--all"
                onClick={() => setVisible(rest.length)}
              >
                {t("tech.projects.showAll")} ({rest.length})
              </button>
            </>
          )}
          {allShown && rest.length > step && (
            <button type="button" className="vp-btn vp-showall__btn" onClick={collapse}>
              <Minus size={15} aria-hidden="true" />
              {t("tech.projects.showLess")}
            </button>
          )}
        </div>
      )}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
};

ProjectsGrid.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  step: PropTypes.number,
};

export default ProjectsGrid;
