import { useEffect, useRef } from "react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
} from "d3-force";
import { PALETTE, NODE_SIZE_MUL, hexA } from "./graphConfig.js";

/**
 * useForceGraph — the imperative canvas + d3-force engine behind KnowledgeGraph.
 *
 * It owns every canvas-related ref and the animation/interaction loop, exposing
 * just three handles back to the component:
 *   { wrapRef, canvasRef, bgCanvasRef }  — attach to the DOM
 *   focusNode(id|null)                   — highlight + redraw (panel ⇄ canvas sync)
 *   zoomBy(factor) / fit()               — the on-stage controls
 *
 * Inputs are the React-side state the loop reads through live refs:
 *   graph, cfg, isDark, tune, groups, subs, isVisible(fn), labels(map),
 *   onPick(node|null) — called when a node is clicked on the canvas.
 */
export function useForceGraph({ graph, cfg, isDark, tune, groups, subs, isVisible, labels, onPick }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const simRef = useRef(null);
  const dataRef = useRef(null);
  const tfRef = useRef({ k: 1, x: 0, y: 0 });
  const activeRef = useRef({ hoverId: null, selectedId: null });
  const dragRef = useRef(null);
  const palRef = useRef(isDark ? PALETTE.dark : PALETTE.light);
  const labelsRef = useRef(labels || {});
  const paramsRef = useRef({ ...tune, nodeSizeMul: NODE_SIZE_MUL[tune.nodeSize] ?? 1 });
  const filterRef = useRef({ groups, subs, isVisible });
  const onPickRef = useRef(onPick);

  // keep live refs current every render (the imperative loop reads these)
  paramsRef.current = { ...tune, nodeSizeMul: NODE_SIZE_MUL[tune.nodeSize] ?? 1 };
  filterRef.current = { groups, subs, isVisible };
  onPickRef.current = onPick;

  useEffect(() => {
    const canvas = canvasRef.current;
    const bg = bgCanvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext("2d");
    const bgCtx = bg?.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = wrap.clientWidth;
    let h = wrap.clientHeight;
    const { nodes, links, adj } = graph;
    dataRef.current = { nodes, links };

    const effR = (n) => n.r * (paramsRef.current.nodeSizeMul ?? 1);

    const recomputeActive = () => {
      const f = filterRef.current;
      const active = nodes.filter((n) => f.isVisible(n, f.groups, f.subs));
      const visIds = new Set(active.map((n) => n.id));
      const activeLinks = links.filter((l) => {
        const s = typeof l.source === "object" ? l.source.id : l.source;
        const tg = typeof l.target === "object" ? l.target.id : l.target;
        return visIds.has(s) && visIds.has(tg);
      });
      dataRef.current.activeNodes = active;
      dataRef.current.activeLinks = activeLinks;
      dataRef.current.visIds = visIds;
      return { active, activeLinks };
    };

    const size = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      // only set the drawing-buffer resolution; CSS (width/height: 100%) owns the
      // display size, so the canvas can't prop the stage open at a stale width
      [canvas, bg].forEach((c) => {
        if (!c) return;
        c.width = w * dpr;
        c.height = h * dpr;
      });
    };
    size();

    // ---------- ambient backdrop (its own slow loop) ----------
    const typeKeys = cfg.types;
    const PCOUNT = Math.max(26, Math.min(54, Math.round((w * h) / 26000)));
    const particles = Array.from({ length: PCOUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 0.6 + Math.random() * 1.8,
      hue: Math.random(),
    }));
    const drawBackdrop = () => {
      if (!bgCtx) return;
      const pal = palRef.current;
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgCtx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 128 * 128) {
            const o = (1 - Math.sqrt(d2) / 128) * 0.12;
            bgCtx.strokeStyle = `rgba(${pal.line}, ${o})`;
            bgCtx.lineWidth = 0.6;
            bgCtx.beginPath();
            bgCtx.moveTo(a.x, a.y);
            bgCtx.lineTo(b.x, b.y);
            bgCtx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        const col = pal[typeKeys[Math.min(typeKeys.length - 1, Math.floor(p.hue * typeKeys.length))]];
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        bgCtx.fillStyle = col;
        bgCtx.globalAlpha = 0.5;
        bgCtx.fill();
      });
      bgCtx.globalAlpha = 1;
    };
    const stepBackdrop = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      });
      drawBackdrop();
    };
    let bgRaf = 0;
    let bgLast = 0;
    let bgVisible = true;
    const bgLoop = (ts) => {
      bgRaf = requestAnimationFrame(bgLoop);
      if (ts - bgLast < 55) return; // ~18fps — it's only ambient
      bgLast = ts;
      if (bgVisible && !document.hidden) stepBackdrop();
    };

    // ---------- simulation ----------
    const linkDist = (l) => {
      if (l.kind === "cs") return 64;
      if (l.kind === "ps" || l.kind === "es" || l.kind === "tk") return 78;
      if (l.kind === "cp" || l.kind === "te") return 110;
      if (l.kind === "br") return 120;
      return 150; // pp / ee / fallback
    };
    // universe view pulls the two crafts apart so the bridges sit in the middle
    const bySide = cfg.groupBy === "side";
    const colorBySide = (cfg.colorBy ?? cfg.groupBy) === "side";
    const sideForce = () =>
      forceX((d) => (d.side === "tech" ? w * 0.26 : d.side === "bar" ? w * 0.74 : w * 0.5)).strength(0.16);
    const sim = forceSimulation(nodes)
      .force("charge", forceManyBody().strength((d) => (d.type === "skill" ? -420 : -150) * paramsRef.current.repelForce))
      .force("link", forceLink(links).id((d) => d.id).distance(linkDist).strength(paramsRef.current.linkForce))
      .force("center", forceCenter(w / 2, h / 2))
      .force("collide", forceCollide().radius((d) => effR(d) + 6).iterations(2))
      .force("x", forceX(w / 2).strength(paramsRef.current.centerForce))
      .force("y", forceY(h / 2).strength(paramsRef.current.centerForce));
    if (bySide) sim.force("side", sideForce());
    simRef.current = sim;
    recomputeActive();

    const draw = () => {
      const pal = palRef.current;
      const tf = tfRef.current;
      const p = paramsRef.current;
      const lbl = labelsRef.current;
      const aNodes = dataRef.current.activeNodes || nodes;
      const aLinks = dataRef.current.activeLinks || links;
      const visIds = dataRef.current.visIds;
      const { hoverId, selectedId } = activeRef.current;
      const focusId = hoverId || selectedId;
      const lit = focusId && (!visIds || visIds.has(focusId)) ? adj[focusId] : null;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.translate(tf.x, tf.y);
      ctx.scale(tf.k, tf.k);

      aLinks.forEach((l) => {
        const s = l.source;
        const tg = l.target;
        const on = lit && lit.has(s.id) && lit.has(tg.id) && (s.id === focusId || tg.id === focusId);
        if (l.kind === "br") {
          // bridge links — the glowing connective tissue between the two crafts
          const a = lit ? (on ? 0.95 : 0.1) : 0.7;
          if (!lit || on) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tg.x, tg.y);
            ctx.strokeStyle = hexA(pal.bridge, a * 0.28);
            ctx.lineWidth = (5.5 * p.linkWidth) / tf.k;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tg.x, tg.y);
          ctx.strokeStyle = hexA(pal.bridge, a);
          ctx.lineWidth = ((on ? 2.1 : 1.6) * p.linkWidth) / tf.k;
          ctx.stroke();
          return;
        }
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tg.x, tg.y);
        if (on) {
          ctx.strokeStyle = `rgba(${pal.line}, 0.85)`;
          ctx.lineWidth = (1.4 * p.linkWidth) / tf.k;
        } else {
          ctx.strokeStyle = `rgba(${pal.line}, ${lit ? 0.05 : 0.14})`;
          ctx.lineWidth = (1 * p.linkWidth) / tf.k;
        }
        ctx.stroke();
      });

      const skillFont = (fs) => `600 ${fs}px Manrope, system-ui, sans-serif`;
      const otherFont = (fs) => `500 ${fs}px Manrope, system-ui, sans-serif`;

      aNodes.forEach((n) => {
        const r = effR(n);
        const faded = lit && !lit.has(n.id);
        const color = pal[colorBySide ? n.side : n.type] ?? pal[n.type];
        ctx.globalAlpha = faded ? 0.22 : 1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        if (n.planned) {
          ctx.fillStyle = `rgba(${pal.bg}, 0.85)`;
          ctx.fill();
          ctx.lineWidth = 1.6 / tf.k;
          ctx.strokeStyle = color;
          ctx.setLineDash([3 / tf.k, 2.4 / tf.k]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          if (n.type === "bridge" && !faded) {
            ctx.shadowColor = pal.bridge;
            ctx.shadowBlur = 14;
          }
          ctx.fillStyle = color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if ((n.id === selectedId || n.id === hoverId) && !faded) {
          ctx.lineWidth = 2 / tf.k;
          ctx.strokeStyle = pal.text;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4 / tf.k, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${pal.line}, 0.4)`;
          ctx.lineWidth = 1 / tf.k;
          ctx.stroke();
        }

        const showLabel = n.type === "skill" || tf.k > p.textFade || n.id === hoverId || n.id === selectedId || (lit && lit.has(n.id));
        if (showLabel) {
          ctx.globalAlpha = faded ? 0.25 : 1;
          const fs = (n.type === "skill" ? 12 : 10.5) / tf.k;
          ctx.font = n.type === "skill" ? skillFont(fs) : otherFont(fs);
          ctx.fillStyle = faded ? pal.dim : pal.text;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(lbl[n.id] ?? n.label, n.x, n.y + r + 3 / tf.k);
        }
        ctx.globalAlpha = 1;
      });
    };
    dataRef.current.draw = draw;

    const applyForces = (alpha = 0.4) => {
      const p = paramsRef.current;
      sim.force("charge").strength((d) => (d.type === "skill" ? -420 : -150) * p.repelForce);
      sim.force("link").strength(p.linkForce);
      sim.force("collide").radius((d) => effR(d) + 6);
      sim.force("x").strength(p.centerForce);
      sim.force("y").strength(p.centerForce);
      if (reduced) {
        sim.stop();
        for (let i = 0; i < 120; i++) sim.tick();
        draw();
      } else {
        sim.alpha(alpha).restart();
      }
    };
    dataRef.current.applyForces = applyForces;

    const applyFilter = () => {
      recomputeActive();
      sim.nodes(dataRef.current.activeNodes);
      sim.force("link").links(dataRef.current.activeLinks);
      if (reduced) {
        sim.stop();
        for (let i = 0; i < 120; i++) sim.tick();
        draw();
      } else {
        sim.alpha(0.5).restart();
      }
    };
    dataRef.current.applyFilter = applyFilter;

    if (reduced) {
      sim.stop();
      for (let i = 0; i < 320; i++) sim.tick();
      draw();
      drawBackdrop();
    } else {
      sim.on("tick", draw);
      drawBackdrop(); // paint one frame immediately (loop only steps while visible)
      bgRaf = requestAnimationFrame(bgLoop);
    }

    // ---------- interaction ----------
    const toGraph = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const tf = tfRef.current;
      return { x: (clientX - rect.left - tf.x) / tf.k, y: (clientY - rect.top - tf.y) / tf.k };
    };
    const pick = (clientX, clientY) => {
      const p = toGraph(clientX, clientY);
      const aNodes = dataRef.current.activeNodes || nodes;
      let hit = null;
      for (let i = aNodes.length - 1; i >= 0; i--) {
        const n = aNodes[i];
        const r = effR(n) + 4;
        if ((n.x - p.x) ** 2 + (n.y - p.y) ** 2 <= r * r) {
          hit = n;
          break;
        }
      }
      return hit;
    };

    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const tf = tfRef.current;
      const k = Math.max(0.35, Math.min(4, tf.k * Math.exp(-e.deltaY * 0.0015)));
      tf.x = px - (px - tf.x) * (k / tf.k);
      tf.y = py - (py - tf.y) * (k / tf.k);
      tf.k = k;
      draw();
    };

    const onDown = (e) => {
      canvas.setPointerCapture?.(e.pointerId);
      const node = pick(e.clientX, e.clientY);
      dragRef.current = { node, lastX: e.clientX, lastY: e.clientY, moved: 0 };
      if (node && !reduced) sim.alphaTarget(0.25).restart();
    };
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d) {
        const node = pick(e.clientX, e.clientY);
        const id = node ? node.id : null;
        if (id !== activeRef.current.hoverId) {
          activeRef.current.hoverId = id;
          canvas.style.cursor = id ? "pointer" : "grab";
          draw();
        }
        return;
      }
      const dx = e.clientX - d.lastX;
      const dy = e.clientY - d.lastY;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.moved += Math.abs(dx) + Math.abs(dy);
      if (d.node) {
        const p = toGraph(e.clientX, e.clientY);
        d.node.fx = p.x;
        d.node.fy = p.y;
        if (reduced) {
          d.node.x = p.x;
          d.node.y = p.y;
          draw();
        }
      } else {
        const tf = tfRef.current;
        tf.x += dx;
        tf.y += dy;
        canvas.style.cursor = "grabbing";
        draw();
      }
    };
    const onUp = (e) => {
      const d = dragRef.current;
      dragRef.current = null;
      canvas.style.cursor = "grab";
      if (!reduced) sim.alphaTarget(0);
      if (d?.node) {
        d.node.fx = null;
        d.node.fy = null;
      }
      if (d && d.moved < 6) {
        const node = pick(e.clientX, e.clientY);
        activeRef.current.selectedId = node ? node.id : null;
        onPickRef.current?.(node || null);
        draw();
      }
    };
    const onLeave = () => {
      if (!dragRef.current && activeRef.current.hoverId) {
        activeRef.current.hoverId = null;
        draw();
      }
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      size();
      sim.force("center", forceCenter(w / 2, h / 2));
      sim.force("x", forceX(w / 2).strength(paramsRef.current.centerForce));
      sim.force("y", forceY(h / 2).strength(paramsRef.current.centerForce));
      if (reduced) draw();
      else sim.alpha(0.3).restart();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        bgVisible = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);

    dataRef.current.zoomBy = (factor) => {
      const tf = tfRef.current;
      const k = Math.max(0.35, Math.min(4, tf.k * factor));
      const cx = w / 2;
      const cy = h / 2;
      tf.x = cx - (cx - tf.x) * (k / tf.k);
      tf.y = cy - (cy - tf.y) * (k / tf.k);
      tf.k = k;
      draw();
    };
    dataRef.current.fit = () => {
      const aNodes = dataRef.current.activeNodes || nodes;
      if (!aNodes.length) return;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      aNodes.forEach((n) => {
        const r = effR(n);
        minX = Math.min(minX, n.x - r);
        minY = Math.min(minY, n.y - r);
        maxX = Math.max(maxX, n.x + r);
        maxY = Math.max(maxY, n.y + r);
      });
      const gw = maxX - minX || 1;
      const gh = maxY - minY || 1;
      const k = Math.max(0.35, Math.min(2, Math.min((w - 60) / gw, (h - 60) / gh)));
      const tf = tfRef.current;
      tf.k = k;
      tf.x = w / 2 - ((minX + maxX) / 2) * k;
      tf.y = h / 2 - ((minY + maxY) / 2) * k;
      draw();
    };

    return () => {
      sim.stop();
      cancelAnimationFrame(bgRaf);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [graph, cfg]);

  // translated labels for the canvas — refresh when the map changes (lang/graph)
  useEffect(() => {
    labelsRef.current = labels || {};
    dataRef.current?.draw?.();
  }, [labels]);

  // theme repaint
  useEffect(() => {
    palRef.current = isDark ? PALETTE.dark : PALETTE.light;
    dataRef.current?.draw?.();
  }, [isDark]);

  // physics + filter re-application
  useEffect(() => {
    dataRef.current?.applyForces?.();
  }, [tune]);
  useEffect(() => {
    dataRef.current?.applyFilter?.();
  }, [groups, subs]);

  const focusNode = (id) => {
    activeRef.current.selectedId = id ?? null;
    dataRef.current?.draw?.();
  };
  const zoomBy = (factor) => dataRef.current?.zoomBy?.(factor);
  const fit = () => dataRef.current?.fit?.();

  return { wrapRef, canvasRef, bgCanvasRef, focusNode, zoomBy, fit };
}
