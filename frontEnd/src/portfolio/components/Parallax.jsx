import { useRef } from "react";
import { motion as Motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Scroll-linked parallax wrapper. As the element travels through the viewport
 * its content shifts on the Y axis by ±`amount` px. Disabled under
 * prefers-reduced-motion. Use for images, decorative layers, depth.
 */
const Parallax = ({ children, amount = 40, className = "" }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <Motion.div style={reduced ? undefined : { y }}>{children}</Motion.div>
    </div>
  );
};

Parallax.propTypes = {
  children: PropTypes.node.isRequired,
  amount: PropTypes.number,
  className: PropTypes.string,
};

export default Parallax;
