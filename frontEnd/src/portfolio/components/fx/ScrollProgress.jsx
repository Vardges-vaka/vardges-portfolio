import { motion as Motion, useScroll, useSpring } from "framer-motion";

/**
 * Slim gradient scroll-progress bar pinned to the top of the viewport.
 * Driven by document scroll, smoothed with a spring.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <Motion.div className="vp-scrollbar" style={{ scaleX }} aria-hidden="true" />;
};

export default ScrollProgress;
