import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const GLYPHS = "01<>/{}[]();=+-*&|!?#$%λΣΔπアイウエオカキクケコサシスセソ";

// Falling glyph columns — the classic rain, tuned subtle.
const CodeRain = ({ color, fadeRGB, opacity = 0.5 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fontSize = 15;
    let w = 0;
    let h = 0;
    let raf;
    let drops = [];
    let last = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * -h,
        speed: 0.6 + Math.random() * 1.1,
      }));
      ctx.fillStyle = `rgba(${fadeRGB}, 1)`;
      ctx.fillRect(0, 0, w, h);
    };

    const draw = (now) => {
      // throttle to ~30fps — rain doesn't need more
      if (now - last < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;

      ctx.fillStyle = `rgba(${fadeRGB}, 0.09)`;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fillText(char, i * fontSize, d.y);
        ctx.globalAlpha = 1;
        d.y += d.speed * fontSize * 0.45;
        if (d.y > h + 40) {
          d.y = Math.random() * -200;
          d.speed = 0.6 + Math.random() * 1.1;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [color, fadeRGB, opacity]);

  return <canvas ref={ref} className="vp-canvas" aria-hidden="true" />;
};

CodeRain.propTypes = {
  color: PropTypes.string.isRequired,
  fadeRGB: PropTypes.string.isRequired, // background RGB used for the trail fade
  opacity: PropTypes.number,
};

export default CodeRain;
