import { Github, ExternalLink, ArrowDown } from "lucide-react";
import PropTypes from "prop-types";
import MediaPlaceholder from "./MediaPlaceholder.jsx";
import Reveal from "./Reveal.jsx";
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
      {links.anchor && (
        <a href={links.anchor} className="vp-proj-links__item">
          <ArrowDown size={15} aria-hidden="true" />
          {t("tech.projects.details")}
        </a>
      )}
    </div>
  );
};

ProjectLinks.propTypes = {
  links: PropTypes.shape({
    github: PropTypes.string,
    live: PropTypes.string,
    anchor: PropTypes.string,
  }).isRequired,
};

/**
 * Renders the projects feed. Data comes from data/sampleProjects.js for now —
 * swap in the backend fetch later, the card markup stays identical.
 */
const ProjectsGrid = ({ projects }) => {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="vp-projects">
      {featured && (
        <Reveal>
          <article className="vp-proj-card vp-proj-card--featured">
            <div className="vp-proj-card__glow" aria-hidden="true" />
            <div className="vp-proj-card__inner vp-proj-card__inner--featured">
              <MediaPlaceholder
                assetId={featured.media.assetId}
                type={featured.media.type}
                label={featured.media.alt}
                aspect="16 / 11"
                className="vp-proj-card__media"
              />
              <div className="vp-proj-card__body">
                <div className="vp-proj-card__meta">
                  <StatusChip status={featured.status} />
                  <span className="vp-proj-card__year">{featured.year}</span>
                </div>
                <h3 className="vp-proj-card__title">{featured.title}</h3>
                <p className="vp-proj-card__tagline">{featured.tagline}</p>
                <p className="vp-proj-card__desc">{featured.description}</p>
                <div className="vp-proj-card__stack">
                  {featured.stack.map((s) => (
                    <span className="vp-chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                {featured.metrics.length > 0 && (
                  <div className="vp-proj-card__metrics">
                    {featured.metrics.map((m) => (
                      <div className="vp-proj-card__metric" key={m.label}>
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <ProjectLinks links={featured.links} />
              </div>
            </div>
          </article>
        </Reveal>
      )}

      <div className="vp-projects__grid">
        {rest.map((p, i) => (
          <Reveal key={p.id} delay={0.08 + i * 0.08}>
            <article className="vp-proj-card">
              <div className="vp-proj-card__glow" aria-hidden="true" />
              <div className="vp-proj-card__inner">
                <MediaPlaceholder
                  assetId={p.media.assetId}
                  type={p.media.type}
                  label={p.media.alt}
                  aspect="16 / 10"
                  className="vp-proj-card__media"
                />
                <div className="vp-proj-card__body">
                  <div className="vp-proj-card__meta">
                    <StatusChip status={p.status} />
                    <span className="vp-proj-card__year">{p.year}</span>
                  </div>
                  <h3 className="vp-proj-card__title">{p.title}</h3>
                  <p className="vp-proj-card__tagline">{p.tagline}</p>
                  <p className="vp-proj-card__desc">{p.description}</p>
                  <div className="vp-proj-card__stack">
                    {p.stack.map((s) => (
                      <span className="vp-chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks links={p.links} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

ProjectsGrid.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectsGrid;
