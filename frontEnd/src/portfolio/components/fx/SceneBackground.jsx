import { useEffect, useRef } from "react";
import { motion as Motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolioTheme } from "../../context/usePortfolio.js";
import MotifCanvas from "./MotifCanvas.jsx";
import GodRays from "./GodRays.jsx";

/**
 * The persistent, page-wide animated background. Fixed behind all content
 * (pointer-events: none), it morphs per route via `variant`. Layers:
 *   tint      — vertical theme wash, brighter up top for hero punch
 *   aurora    — 3 soft colour blobs that drift + parallax on scroll
 *   rays      — volumetric god-ray beams
 *   grid      — faint interactive grid; a brightened copy is masked to the
 *               pointer so the lines light up under the cursor (bg hover FX)
 *   motif     — variant canvas (particles / code-rain / embers)
 *   spot      — soft glow that trails the pointer
 *   vignette  — edge darkening for focus
 */
const SceneBackground = ({ variant }) => {
  const { isDark } = usePortfolioTheme();
  const sceneRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // respect Data Saver / metered connections — skip the per-frame motif canvas
  const saveData =
    typeof navigator !== "undefined" && navigator.connection ? navigator.connection.saveData : false;

  // parallax: auroras drift at different rates as you scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // pointer spotlight + interactive grid coords (rAF-throttled CSS vars)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    let rafId = 0;
    let px = window.innerWidth / 2;
    let py = window.innerHeight * 0.4;
    let dirty = false;
    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!dirty) {
        dirty = true;
        rafId = requestAnimationFrame(() => {
          el.style.setProperty("--px", `${px}px`);
          el.style.setProperty("--py", `${py}px`);
          dirty = false;
        });
      }
    };
    el.style.setProperty("--px", `${px}px`);
    el.style.setProperty("--py", `${py}px`);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="vp-scene" data-variant={variant} ref={sceneRef} aria-hidden="true">
      <div className="vp-scene__tint" />
      <Motion.div className="vp-scene__aurora vp-scene__aurora--1" style={reduced ? undefined : { y: y1 }} />
      <Motion.div className="vp-scene__aurora vp-scene__aurora--2" style={reduced ? undefined : { y: y2 }} />
      <Motion.div className="vp-scene__aurora vp-scene__aurora--3" style={reduced ? undefined : { y: y3 }} />
      <GodRays count={7} className="vp-scene__rays" />
      <div className="vp-scene__grid" />
      <div className="vp-scene__grid vp-scene__grid--lit" />
      {!saveData && <MotifCanvas variant={variant} isDark={isDark} />}
      <div className="vp-scene__spot" />
      <div className="vp-scene__vignette" />
    </div>
  );
};

SceneBackground.propTypes = {
  variant: PropTypes.oneOf(["home", "tech", "bar"]).isRequired,
};

export default SceneBackground;
