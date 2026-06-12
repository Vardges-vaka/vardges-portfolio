import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Drifting particle constellation. Particles on the left lean toward colorA,
// the right toward colorB — the "two worlds" of the combined page.
const ParticleField = ({ colorA, colorB, lineRGB, density = 11000 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const count = Math.max(40, Math.floor((w * h) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        mix: Math.random(), // 0 → colorA side, 1 → colorB side
      }));
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const colorFor = (p) => {
      const bias = p.x / w; // position decides which world the particle belongs to
      return bias * 0.6 + p.mix * 0.4 > 0.5 ? colorB : colorA;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = 110;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // gentle repulsion from the pointer
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 120 && dm > 0.001) {
          p.x += (dxm / dm) * 0.6;
          p.y += (dym / dm) * 0.6;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${lineRGB}, ${(0.16 * (1 - d / linkDist)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = colorFor(p);
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    if (reduced) draw();
    else raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [colorA, colorB, lineRGB, density]);

  return <canvas ref={ref} className="vp-canvas" aria-hidden="true" />;
};

ParticleField.propTypes = {
  colorA: PropTypes.string.isRequired,
  colorB: PropTypes.string.isRequired,
  lineRGB: PropTypes.string.isRequired,
  density: PropTypes.number,
};

export default ParticleField;
