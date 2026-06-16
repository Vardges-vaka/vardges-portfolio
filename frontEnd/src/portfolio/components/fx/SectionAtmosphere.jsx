import { motion as Motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Decorative, scroll-triggered background layer for a single section. Absolutely
 * positioned behind the section's content (the parent must be position:relative;
 * content should sit at z-index >= 1). Animates in once on scroll.
 *
 * kind: "grid" | "rays" | "dots" | "topo" | "glow"
 * side: "full" | "left" | "right"  — where the layer is anchored
 */
const SectionAtmosphere = ({ kind = "grid", side = "full", className = "" }) => {
  const reduced = useReducedMotion();
  return (
    <Motion.div
      className={`vp-atmo vp-atmo--${kind} vp-atmo--${side} ${className}`}
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 1.04 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};

SectionAtmosphere.propTypes = {
  kind: PropTypes.oneOf(["grid", "rays", "dots", "topo", "glow"]),
  side: PropTypes.oneOf(["full", "left", "right"]),
  className: PropTypes.string,
};

export default SectionAtmosphere;
