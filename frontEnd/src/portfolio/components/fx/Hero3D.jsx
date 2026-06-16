import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { usePortfolioTheme } from "../../context/usePortfolio.js";

// the three.js scene is a separate chunk — only imported when we choose to render it
const Hero3DScene = lazy(() => import("./Hero3DScene.jsx"));

// Decide once whether this device should pay for WebGL. Conservative on purpose:
// reduced-motion, Data Saver, low cores/memory, or no WebGL → skip it entirely.
const detectCapable = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = navigator.connection;
  if (conn && conn.saveData) return false;
  if ((navigator.hardwareConcurrency || 2) < 4) return false;
  if (navigator.deviceMemory !== undefined && navigator.deviceMemory < 4) return false;
  try {
    const cv = document.createElement("canvas");
    const gl = cv.getContext("webgl2") || cv.getContext("webgl");
    if (!gl) return false;
    // free the probe context immediately — don't compete with the real r3f canvas
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return false;
  }
  return true;
};

// compute capability once per page load, not per mount
let _capable;
const isCapable = () => {
  if (_capable === undefined) _capable = detectCapable();
  return _capable;
};

const ACCENTS = {
  tech: { dark: "#38e1c8", light: "#0b8d7b" },
  bar: { dark: "#e9a23b", light: "#a4650e" },
};

/**
 * Hero 3D object. On capable devices it lazy-loads a small react-three-fiber
 * scene (rotating low-poly node / cocktail glass). Everywhere else it shows a
 * weightless CSS fallback — so the WebGL bundle never loads where it would hurt.
 */
const Hero3D = ({ variant }) => {
  const { isDark } = usePortfolioTheme();
  const [capable] = useState(isCapable);
  const color = (ACCENTS[variant] ?? ACCENTS.tech)[isDark ? "dark" : "light"];
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  // pause the WebGL render loop while scrolled off-screen — no wasted GPU
  useEffect(() => {
    if (!capable || !ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [capable]);

  const fallback = (
    <div className={`vp-hero3d__fallback vp-hero3d__fallback--${variant}`} aria-hidden="true">
      <span className="vp-hero3d__ring" />
      <span className="vp-hero3d__ring vp-hero3d__ring--2" />
      <span className="vp-hero3d__core" />
    </div>
  );

  return (
    <div className={`vp-hero3d vp-hero3d--${variant}`} ref={ref} aria-hidden="true">
      {capable ? (
        <Suspense fallback={fallback}>
          <Hero3DScene variant={variant} color={color} active={inView} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

Hero3D.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar"]).isRequired,
};

export default Hero3D;
