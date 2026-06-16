import PropTypes from "prop-types";

/**
 * Volumetric god-ray beams (pure CSS, GPU-cheap). Renders a fan of soft light
 * shafts that sway. Styling + animation live in fx.css under .vp-rays.
 * Use inside the fixed scene or as a section accent.
 */
const GodRays = ({ count = 7, className = "" }) => (
  <div className={`vp-rays ${className}`} aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <span
        key={i}
        className="vp-rays__beam"
        style={{ "--i": i, "--n": count }}
      />
    ))}
  </div>
);

GodRays.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};

export default GodRays;
