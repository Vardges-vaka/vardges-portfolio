import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Full-viewport, fixed motif canvas — the living layer of the page background.
 * One rAF loop, pauses when the tab is hidden, renders a single static frame
 * under prefers-reduced-motion. Pointer-reactive. variant picks the behaviour:
 *   home → constellation (teal/gold particles + links, pointer repulsion)
 *   tech → matrix code-rain (faint falling glyphs)
 *   bar  → rising embers (gold motes drifting up with a wobble)
 */
const PALETTE = {
  dark: {
    home: { a: "#38e1c8", b: "#e9a23b", line: "150,158,180" },
    tech: { a: "#38e1c8", b: "#5b8cff", line: "120,160,180" },
    bar: { a: "#e9a23b", b: "#d4636f", line: "150,120,90" },
  },
  light: {
    home: { a: "#0b8d7b", b: "#b06f14", line: "90,96,115" },
    tech: { a: "#0b8d7b", b: "#3a63d8", line: "90,110,130" },
    bar: { a: "#a4650e", b: "#a8453e", line: "120,100,70" },
  },
};

const GLYPHS = "01<>/{}[]();=+-*&|!?#$%λΣΔπ01アイウ";

const MotifCanvas = ({ variant, isDark }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pal = (isDark ? PALETTE.dark : PALETTE.light)[variant] ?? PALETTE.dark.home;
    const baseAlpha = isDark ? 1 : 0.85;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let last = 0;
    const mouse = { x: -9999, y: -9999 };

    // ---- per-variant state ----
    let particles = [];
    let drops = [];
    let embers = [];
    const fontSize = 15;

    const seed = () => {
      if (variant === "home") {
        const count = Math.max(30, Math.min(120, Math.floor((w * h) / 17000)));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.7 + 0.5,
          mix: Math.random(),
        }));
      } else if (variant === "tech") {
        const cols = Math.ceil(w / fontSize);
        drops = Array.from({ length: cols }, () => ({
          y: Math.random() * -h,
          speed: 0.5 + Math.random() * 1.1,
        }));
      } else {
        const count = Math.max(26, Math.min(80, Math.floor((w * h) / 26000)));
        embers = Array.from({ length: count }, (_, i) => ({
          x: Math.random() * w,
          y: Math.random() * h + (i % 2 ? 0 : h),
          r: 1 + Math.random() * 3.4,
          speed: 0.25 + Math.random() * 0.85,
          phase: Math.random() * Math.PI * 2,
          wob: 0.4 + Math.random() * 1.1,
          alpha: 0.1 + Math.random() * 0.32,
        }));
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (variant === "tech") {
        ctx.clearRect(0, 0, w, h);
      }
      // reduced motion has no loop — repaint the static frame after a resize
      if (reduced) drawOnce();
    };

    // ---- renderers ----
    const drawConstellation = () => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = 124;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 140 && dm > 0.01) {
          p.x += (dxm / dm) * 0.7;
          p.y += (dym / dm) * 0.7;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${pal.line}, ${(0.12 * (1 - d / linkDist)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = p.x / w + p.mix * 0.4 > 0.7 ? pal.b : pal.a;
        ctx.globalAlpha = 0.7 * baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const drawRain = () => {
      // translucent fade builds the trailing tails
      ctx.fillStyle = isDark ? "rgba(6,9,12,0.10)" : "rgba(244,243,238,0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.fillStyle = pal.a;
        ctx.globalAlpha = isDark ? 0.38 : 0.26;
        ctx.fillText(ch, i * fontSize, d.y);
        ctx.globalAlpha = 1;
        d.y += d.speed * fontSize * 0.5;
        if (d.y > h + 40) {
          d.y = Math.random() * -220;
          d.speed = 0.5 + Math.random() * 1.1;
        }
      }
    };

    const drawEmbers = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < embers.length; i++) {
        const b = embers[i];
        b.y -= b.speed;
        b.phase += 0.02;
        const x = b.x + Math.sin(b.phase) * 9 * b.wob;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `${pal.a}`;
        ctx.globalAlpha = b.alpha * baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (b.y < -12) {
          b.y = h + 12;
          b.x = Math.random() * w;
        }
      }
    };

    const drawOnce = () => {
      if (variant === "home") drawConstellation();
      else if (variant === "tech") drawRain();
      else drawEmbers();
    };

    const frame = (now) => {
      if (!running) return;
      // cap to ~30fps — ample for an ambient background, and it halves how
      // often the translucent panels above must re-blur the moving scene
      if (now - last < 33) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      drawOnce();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf); // never leave a prior loop running
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      drawOnce(); // a single static frame
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [variant, isDark]);

  return <canvas ref={ref} className="vp-scene__motif" aria-hidden="true" />;
};

MotifCanvas.propTypes = {
  variant: PropTypes.oneOf(["home", "tech", "bar"]).isRequired,
  isDark: PropTypes.bool.isRequired,
};

export default MotifCanvas;
