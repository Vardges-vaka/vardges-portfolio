import { motion as Motion } from "framer-motion";
import { Award, FileText, BadgeCheck } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Animated certificate gallery: cards fan in, carry a slow-rotating seal,
 * and sweep a shine across on hover. Each card links to its PDF — drop the
 * real files into public/certs/ (see NOTES.md) and the buttons go live.
 */
const CertGallery = ({ certs, viewLabel, variant = "tech" }) => (
  <div className={`vp-certgal vp-certgal--${variant}`}>
    {certs.map((cert, i) => (
      <Motion.article
        key={cert.id}
        className="vp-cert-card"
        initial={{ opacity: 0, y: 36, rotate: i % 2 ? 1.6 : -1.6 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="vp-cert-card__shine" aria-hidden="true" />
        <div className="vp-cert-card__seal" aria-hidden="true">
          <BadgeCheck size={17} />
        </div>
        <span className="vp-cert-card__org">
          <Award size={14} aria-hidden="true" />
          {cert.org}
        </span>
        <h3 className="vp-cert-card__title">{cert.title}</h3>
        <div className="vp-cert-card__foot">
          {/* TODO(Vardges): drop the real PDF into public/certs/ — see NOTES.md */}
          <a className="vp-cert-card__pdf" href={cert.file} target="_blank" rel="noreferrer">
            <FileText size={14} aria-hidden="true" />
            {viewLabel}
          </a>
        </div>
      </Motion.article>
    ))}
  </div>
);

CertGallery.propTypes = {
  certs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      org: PropTypes.string.isRequired,
      file: PropTypes.string.isRequired,
    }),
  ).isRequired,
  viewLabel: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["tech", "bar"]),
};

export default CertGallery;
