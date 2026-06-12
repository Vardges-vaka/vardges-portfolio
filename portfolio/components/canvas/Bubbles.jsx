import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Champagne bubbles drifting upward with a soft wobble.
const Bubbles = ({ rgb, count = 70 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf;
    let bubbles = [];

    const spawn = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      r: 1 + Math.random() * 4.5,
      speed: 0.35 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      wobble: 0.4 + Math.random() * 1.2,
      alpha: 0.12 + Math.random() * 0.4,
    });

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bubbles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed;
        b.phase += 0.02;
        const x = b.x + Math.sin(b.phase) * 8 * b.wobble;

        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, ${b.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // highlight glint
        ctx.beginPath();
        ctx.arc(x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${(b.alpha * 0.9).toFixed(3)})`;
        ctx.fill();

        if (b.y < -10) bubbles[i] = spawn(false);
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      // a single static frame for reduced motion
      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, ${b.alpha})`;
        ctx.stroke();
      });
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [rgb, count]);

  return <canvas ref={ref} className="vp-canvas" aria-hidden="true" />;
};

Bubbles.propTypes = {
  rgb: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default Bubbles;
