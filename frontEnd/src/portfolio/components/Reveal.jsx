import { motion as Motion } from "framer-motion";
import PropTypes from "prop-types";

// Scroll-into-view reveal. Wraps content in a motion.div that fades/slides up once.
const Reveal = ({ children, delay = 0, y = 30, className, once = true }) => (
  <Motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </Motion.div>
);

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string,
  once: PropTypes.bool,
};

export default Reveal;
