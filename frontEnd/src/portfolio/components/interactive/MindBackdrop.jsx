import { useEffect, useRef } from "react";

/**
 * MindBackdrop — a living "neural cosmos" behind the life-map:
 *   · a breathing aurora of coloured light blobs
 *   · two parallax starfields (far = small/slow/dim, near = bright + linked)
 *   · faint filaments between near stars with light-pulses firing along them
 *   · the occasional comet streaking across
 *   · a soft central glow that anchors the map's hub
 * Self-contained canvas, ~30fps, paused off-screen / off-tab / reduced-motion.
 * Themed teal · violet · gold.
 */
const HUES = ["#38e1c8", "#9b8cff", "#e9a23b"];
const RGB = { "#38e1c8": [56, 225, 200], "#9b8cff": [155, 140, 255], "#e9a23b": [233, 162, 59] };
const LINK_DIST = 158;

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
    const rnd = () => Math.random();
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

    const star = (depth) => ({
      x: rnd() * w,
      y: rnd() * h,
      vx: (rnd() - 0.5) * (depth === "near" ? 0.2 : 0.07),
      vy: (rnd() - 0.5) * (depth === "near" ? 0.2 : 0.07),
      r: depth === "near" ? 0.9 + rnd() * 2.1 : 0.4 + rnd() * 1.1,
      hue: HUES[Math.floor(rnd() * HUES.length)],
      tw: rnd() * Math.PI * 2, // twinkle phase
    });

    let far = [];
    let near = [];
    let blobs = [];
    const build = () => {
      const nearN = Math.max(16, Math.min(34, Math.round((w * h) / 42000)));
      const farN = Math.max(40, Math.min(90, Math.round((w * h) / 16000)));
      near = Array.from({ length: nearN }, () => star("near"));
      far = Array.from({ length: farN }, () => star("far"));
      blobs = Array.from({ length: 5 }, (_, i) => ({
        x: rnd() * w,
        y: rnd() * h,
        vx: (rnd() - 0.5) * 0.1,
        vy: (rnd() - 0.5) * 0.1,
        r: Math.max(w, h) * (0.26 + rnd() * 0.2),
        breathe: rnd() * Math.PI * 2,
        hue: HUES[i % HUES.length],
      }));
    };
    build();

    // light-pulses firing along near filaments
    const pulses = [];
    const spawnPulse = () => {
      const a = near[Math.floor(rnd() * near.length)];
      let best = null;
      let bestD = LINK_DIST;
      for (const b of near) {
        if (b === a) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < bestD && rnd() > 0.35) {
          bestD = d;
          best = b;
        }
      }
      if (best) pulses.push({ from: a, to: best, t: 0, hue: a.hue, hops: 2 + Math.floor(rnd() * 3) });
    };

    // comets — rare bright streaks
    const comets = [];
    const spawnComet = () => {
      const edge = Math.floor(rnd() * 2);
      const fromLeft = rnd() > 0.5;
      comets.push({
        x: fromLeft ? -40 : w + 40,
        y: edge ? rnd() * h * 0.5 : h * (0.5 + rnd() * 0.5),
        vx: (fromLeft ? 1 : -1) * (3.4 + rnd() * 2.6),
        vy: (rnd() - 0.5) * 1.6,
        hue: HUES[Math.floor(rnd() * HUES.length)],
        life: 1,
      });
    };

    let raf = 0;
    let last = 0;
    let acc = 0;
    let cometAcc = 0;
    let visible = true;

    const wrapEdge = (n) => {
      if (n.x < -30) n.x = w + 30;
      if (n.x > w + 30) n.x = -30;
      if (n.y < -30) n.y = h + 30;
      if (n.y > h + 30) n.y = -30;
    };

    const step = (dt) => {
      const k = dt / 16.67;
      far.forEach((n) => { n.x += n.vx * k; n.y += n.vy * k; n.tw += 0.03 * k; wrapEdge(n); });
      near.forEach((n) => { n.x += n.vx * k; n.y += n.vy * k; n.tw += 0.05 * k; wrapEdge(n); });
      blobs.forEach((bl) => {
        bl.x += bl.vx * k;
        bl.y += bl.vy * k;
        bl.breathe += 0.012 * k;
        if (bl.x < -bl.r * 0.4 || bl.x > w + bl.r * 0.4) bl.vx *= -1;
        if (bl.y < -bl.r * 0.4 || bl.y > h + bl.r * 0.4) bl.vy *= -1;
      });
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += 0.013 * k;
        if (p.t >= 1) {
          p.hops -= 1;
          if (p.hops <= 0) { pulses.splice(i, 1); continue; }
          const a = p.to;
          let best = null;
          let bestD = LINK_DIST;
          for (const b of near) {
            if (b === a || b === p.from) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < bestD && rnd() > 0.3) { bestD = d; best = b; }
          }
          if (best) { p.from = a; p.to = best; p.t = 0; } else pulses.splice(i, 1);
        }
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx * k;
        c.y += c.vy * k;
        if (c.x < -80 || c.x > w + 80) comets.splice(i, 1);
      }
      acc += dt;
      if (acc > 760 && pulses.length < 7) { acc = 0; spawnPulse(); }
      cometAcc += dt;
      if (cometAcc > 4200 && comets.length < 2) { cometAcc = rnd() * 1500; spawnComet(); }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // breathing aurora
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((bl) => {
        const r = bl.r * (0.85 + Math.sin(bl.breathe) * 0.15);
        const [rr, gg, bb] = RGB[bl.hue];
        const g = ctx.createRadialGradient(bl.x, bl.y, 0, bl.x, bl.y, r);
        g.addColorStop(0, `rgba(${rr},${gg},${bb},0.16)`);
        g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
      // soft central glow anchoring the hub
      const cg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.5);
      cg.addColorStop(0, "rgba(120,140,200,0.06)");
      cg.addColorStop(1, "rgba(120,140,200,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // far starfield (parallax depth) — twinkling dim dots
      far.forEach((n) => {
        const [rr, gg, bb] = RGB[n.hue];
        ctx.globalAlpha = 0.18 + (Math.sin(n.tw) + 1) * 0.12;
        ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // near filaments — gradient strokes between close stars
      for (let i = 0; i < near.length; i++) {
        const a = near[i];
        for (let j = i + 1; j < near.length; j++) {
          const b = near[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const o = (1 - Math.sqrt(d2) / LINK_DIST) * 0.22;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            const [ar, ag, ab] = RGB[a.hue];
            const [br, bg, bb] = RGB[b.hue];
            grad.addColorStop(0, `rgba(${ar},${ag},${ab},${o})`);
            grad.addColorStop(1, `rgba(${br},${bg},${bb},${o})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // near stars with glow
      ctx.globalCompositeOperation = "lighter";
      near.forEach((n) => {
        const [rr, gg, bb] = RGB[n.hue];
        const tw = 0.6 + (Math.sin(n.tw) + 1) * 0.2;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        g.addColorStop(0, `rgba(${rr},${gg},${bb},${0.5 * tw})`);
        g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${tw})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // pulses firing along filaments
      pulses.forEach((p) => {
        const x = p.from.x + (p.to.x - p.from.x) * p.t;
        const y = p.from.y + (p.to.y - p.from.y) * p.t;
        const [rr, gg, bb] = RGB[p.hue];
        ctx.strokeStyle = `rgba(${rr},${gg},${bb},0.4)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.from.x, p.from.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, `rgba(${rr},${gg},${bb},1)`);
        g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // comets
      comets.forEach((c) => {
        const [rr, gg, bb] = RGB[c.hue];
        const len = 26;
        const grad = ctx.createLinearGradient(c.x, c.y, c.x - Math.sign(c.vx) * len, c.y - c.vy * 6);
        grad.addColorStop(0, `rgba(${rr},${gg},${bb},0.95)`);
        grad.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - Math.sign(c.vx) * len, c.y - c.vy * 6);
        ctx.stroke();
        ctx.fillStyle = `rgba(${rr},${gg},${bb},0.95)`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.8, 0, Math.PI * 2);
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

    const ro = new ResizeObserver(() => { size(); build(); });
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
