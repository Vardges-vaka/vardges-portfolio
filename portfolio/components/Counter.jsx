import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import PropTypes from "prop-types";

// Animated count-up that triggers when scrolled into view.
const Counter = ({ value, suffix = "", duration = 1700 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  duration: PropTypes.number,
};

export default Counter;
