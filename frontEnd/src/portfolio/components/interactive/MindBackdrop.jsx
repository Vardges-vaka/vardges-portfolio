import { useEffect, useRef } from "react";

/**
 * MindBackdrop — an animated "neural field" behind the life-map: nodes drift,
 * faint filaments link the near ones, and pulses of light fire along them like
 * synapses, over a slow-drifting aurora. Self-contained canvas; capped fps,
 * paused off-screen / off-tab / reduced-motion. Themed teal · violet · gold.
 */
const HUES = ["#38e1c8", "#9b8cff", "#e9a23b"];
const LINK_DIST = 150;

const MindBackdrop = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const size = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    size();

    // nodes
    const COUNT = Math.max(22, Math.min(46, Math.round((w * h) / 30000)));
    const rnd = () => Math.random();
    const nodes = Array.from({ length: COUNT }, () => ({
      x: rnd() * w,
      y: rnd() * h,
      vx: (rnd() - 0.5) * 0.16,
      vy: (rnd() - 0.5) * 0.16,
      r: 0.8 + rnd() * 1.8,
      hue: HUES[Math.floor(rnd() * HUES.length)],
    }));

    // aurora blobs
    const blobs = Array.from({ length: 3 }, (_, i) => ({
      x: rnd() * w,
      y: rnd() * h,
      vx: (rnd() - 0.5) * 0.12,
      vy: (rnd() - 0.5) * 0.12,
      r: Math.max(w, h) * (0.32 + rnd() * 0.18),
      hue: HUES[i % HUES.length],
    }));

    // pulses travelling along edges
    const pulses = [];
    const spawnPulse = () => {
      const a = nodes[Math.floor(rnd() * nodes.length)];
      // pick a near neighbour
      let best = null;
      let bestD = LINK_DIST;
      for (const b of nodes) {
        if (b === a) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < bestD && rnd() > 0.4) {
          bestD = d;
          best = b;
        }
      }
      if (best) pulses.push({ from: a, to: best, t: 0, hue: a.hue, hops: 2 + Math.floor(rnd() * 3) });
    };

    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = true;

    const step = (dt) => {
      // move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -30) n.x = w + 30;
        if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = h + 30;
        if (n.y > h + 30) n.y = -30;
      });
      blobs.forEach((bl) => {
        bl.x += bl.vx;
        bl.y += bl.vy;
        if (bl.x < -bl.r * 0.4 || bl.x > w + bl.r * 0.4) bl.vx *= -1;
        if (bl.y < -bl.r * 0.4 || bl.y > h + bl.r * 0.4) bl.vy *= -1;
      });
      // advance pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += 0.012 * (dt / 16.67);
        if (p.t >= 1) {
          p.hops -= 1;
          if (p.hops <= 0) {
            pulses.splice(i, 1);
            continue;
          }
          // hop onward to another near neighbour
          const a = p.to;
          let best = null;
          let bestD = LINK_DIST;
          for (const b of nodes) {
            if (b === a || b === p.from) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < bestD && rnd() > 0.3) {
              bestD = d;
              best = b;
            }
          }
          if (best) {
            p.from = a;
            p.to = best;
            p.t = 0;
          } else {
            pulses.splice(i, 1);
          }
        }
      }
      acc += dt;
      if (acc > 900 && pulses.length < 6) {
        acc = 0;
        spawnPulse();
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // aurora
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((bl) => {
        const g = ctx.createRadialGradient(bl.x, bl.y, 0, bl.x, bl.y, bl.r);
        g.addColorStop(0, `${bl.hue}22`);
        g.addColorStop(1, `${bl.hue}00`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
      ctx.globalCompositeOperation = "source-over";

      // filaments
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const o = (1 - d / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(150,160,200,${o})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hue;
        ctx.globalAlpha = 0.55;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // pulses (glowing travelling light)
      ctx.globalCompositeOperation = "lighter";
      pulses.forEach((p) => {
        const x = p.from.x + (p.to.x - p.from.x) * p.t;
        const y = p.from.y + (p.to.y - p.from.y) * p.t;
        // trail
        ctx.strokeStyle = `${p.hue}55`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(p.from.x, p.from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        // head
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, `${p.hue}ff`);
        g.addColorStop(1, `${p.hue}00`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) {
      step(16);
      draw();
    } else {
      const loop = (ts) => {
        raf = requestAnimationFrame(loop);
        const dt = ts - last;
        if (dt < 33) return; // ~30fps
        last = ts;
        if (visible && !document.hidden) {
          step(dt);
          draw();
        }
      };
      draw();
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => size());
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.01 });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="vp-mindbg" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="vp-mindbg__canvas" />
    </div>
  );
};

export default MindBackdrop;
