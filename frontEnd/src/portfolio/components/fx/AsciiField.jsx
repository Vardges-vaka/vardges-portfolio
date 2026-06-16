import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CHARS = " .·:-=+*#%@";
const CHARS_LEN = CHARS.length;

/**
 * ASCII ripple field — a grid of monospace glyphs whose density follows moving
 * wave fields and brightens around the pointer. Used as a sectional accent
 * ("ASCII from place to place"), not a full-page layer. Runs only while
 * on-screen (IntersectionObserver) and renders one static frame when reduced.
 */
const AsciiField = ({ color, cell = 18, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let t = 0;
    let last = 0;
    let visible = false;
    let rect = null; // cached bounds — refreshed on resize/scroll, not per pointer move
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      ctx.font = `${cell}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      rect = canvas.getBoundingClientRect();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * cell;
          const py = y * cell;
          // two interfering sine fields = slow plasma
          let v =
            Math.sin(x * 0.35 + t) * 0.5 +
            Math.sin(y * 0.45 - t * 0.8) * 0.5 +
            Math.sin((x + y) * 0.3 + t * 0.6) * 0.5;
          v = (v + 1.5) / 3; // → 0..1

          // pointer brightening
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dm = Math.hypot(dx, dy);
          if (dm < 120) v += (1 - dm / 120) * 0.7;

          const idx = Math.max(0, Math.min(CHARS_LEN - 1, Math.floor(v * CHARS_LEN)));
          const ch = CHARS[idx];
          if (ch === " ") continue;
          ctx.fillStyle = color;
          ctx.globalAlpha = Math.min(0.5, 0.08 + v * 0.42);
          ctx.fillText(ch, px, py);
        }
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now) => {
      if (!visible) return;
      // ~22fps — this redraws a full glyph grid, so capping it matters a lot
      if (now - last < 45) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      t += 0.05;
      render();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      if (!visible || !rect) return; // skip offscreen fields entirely
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onScroll = () => {
      rect = canvas.getBoundingClientRect();
    };
    const start = () => {
      if (!visible || reduced || document.hidden) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          rect = canvas.getBoundingClientRect();
          start();
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (reduced) render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [color, cell]);

  return <canvas ref={ref} className={`vp-ascii ${className}`} aria-hidden="true" />;
};

AsciiField.propTypes = {
  color: PropTypes.string.isRequired,
  cell: PropTypes.number,
  className: PropTypes.string,
};

export default AsciiField;
