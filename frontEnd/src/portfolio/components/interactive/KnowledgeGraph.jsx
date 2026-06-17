import { useEffect, useMemo, useRef, useState } from "react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
} from "d3-force";
import { AnimatePresence, motion as Motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  X,
  FileText,
  ExternalLink,
  Award,
  Boxes,
  Sparkles,
  Briefcase,
  Plus,
  Minus,
  Maximize,
  ArrowUpRight,
  SlidersHorizontal,
  RotateCcw,
  Telescope,
  Clock,
  Route,
  Quote,
  Waypoints,
} from "lucide-react";
import { usePortfolioLang, usePortfolioTheme, usePortfolioMode } from "../../context/usePortfolio.js";
import { buildTechGraph, buildBarGraph, buildUniverseGraph } from "../../data/graphData.js";
import { SAMPLE_PROJECTS } from "../../data/sampleProjects.js";
import ProjectModal from "../ProjectModal.jsx";

const PALETTE = {
  dark: { cert: "#38e1c8", skill: "#9b8cff", project: "#e9a23b", experience: "#e9a23b", testimonial: "#f0789e", tech: "#38e1c8", bar: "#e9a23b", bridge: "#f4d06f", line: "220,225,238", text: "#e8eaf0", dim: "#8b91a3", bg: "13,17,28" },
  light: { cert: "#0b8d7b", skill: "#5b46c8", project: "#a4650e", experience: "#a4650e", testimonial: "#c2456f", tech: "#0b8d7b", bar: "#a4650e", bridge: "#b8860b", line: "40,44,60", text: "#15161d", dim: "#585e6e", bg: "245,247,252" },
};
const BASE_R = { skill: 15, project: 11, cert: 6.5, experience: 11, testimonial: 8.5, bridge: 13 };
const TYPE_ICON = { cert: Award, skill: Sparkles, project: Boxes, experience: Briefcase, testimonial: Quote, bridge: Waypoints };
const CAT_ORDER = ["dev", "auto", "ai", "foundations", "cyber"];
const COUNTRY_ORDER = ["Armenia", "Russia", "UAE"];
const NODE_SIZE_MUL = { s: 0.8, m: 1, l: 1.32 };

// per-page graph config.
//   types    — the node types present (drives the panel's relationship sections)
//   groupBy  — node field the legend toggles + colours map to ("type" default, "side" for universe)
//   groups   — the legend buttons (defaults to `types`)
//   sub      — optional second-level filter dimension
//   mode     — true → the audience-mode lens reveals/dims groups (universe only)
const CONFIGS = {
  tech: {
    build: buildTechGraph,
    types: ["cert", "skill", "project"],
    sub: { type: "cert", field: "cat", order: CAT_ORDER, i18nPrefix: "certCats", labelKey: "graph.filterCats" },
  },
  bar: {
    build: buildBarGraph,
    types: ["experience", "skill", "testimonial"],
    sub: { type: "experience", field: "country", order: COUNTRY_ORDER, i18nPrefix: "graph.countries", labelKey: "graph.filterCountries" },
  },
  universe: {
    build: buildUniverseGraph,
    types: ["bridge", "skill", "cert", "project", "experience", "testimonial"],
    groupBy: "side",
    groups: ["tech", "bridge", "bar"],
    mode: true,
  },
};

// audience mode → which universe side-groups are lit
const MODE_GROUPS = {
  tech: { tech: true, bridge: false, bar: false },
  bar: { tech: false, bridge: false, bar: true },
  both: { tech: true, bridge: true, bar: true },
};

const DEFAULTS = {
  textFade: 1.5,
  nodeSize: "m",
  linkWidth: 1,
  centerForce: 0.05,
  repelForce: 1,
  linkForce: 0.5,
};

const cap = (s) => s[0].toUpperCase() + s.slice(1);

// hex (#rrggbb) → rgba() with the given alpha — for the bridge edge glow
const hexA = (hex, a) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const KnowledgeGraph = ({ variant = "tech" }) => {
  const cfg = CONFIGS[variant] ?? CONFIGS.tech;
  const { sub } = cfg;
  const groupBy = cfg.groupBy ?? "type"; // node field the legend toggles + colours key off
  const groupKeys = cfg.groups ?? cfg.types; // the legend buttons
  const { t, dir, lang } = usePortfolioLang();
  const { isDark } = usePortfolioTheme();
  const { mode } = usePortfolioMode();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const simRef = useRef(null);
  const dataRef = useRef(null);
  const tfRef = useRef({ k: 1, x: 0, y: 0 });
  const activeRef = useRef({ hoverId: null, selectedId: null });
  const dragRef = useRef(null);
  const palRef = useRef(isDark ? PALETTE.dark : PALETTE.light);
  const labelsRef = useRef({});
  const paramsRef = useRef({ ...DEFAULTS, nodeSizeMul: NODE_SIZE_MUL[DEFAULTS.nodeSize] });
  const filterRef = useRef(null);
  const closeBtnRef = useRef(null);
  const prevFocusRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [groups, setGroups] = useState(() =>
    cfg.mode ? { ...MODE_GROUPS[mode] } : Object.fromEntries(groupKeys.map((g) => [g, true])),
  );
  const [subs, setSubs] = useState(() => new Set(sub ? sub.order : []));
  const [tune, setTune] = useState(DEFAULTS);

  // translated tasting-menu courses (bar experiences reuse this prose)
  const courses = variant === "bar" ? t("bar.menu.courses") : null;
  const courseArr = Array.isArray(courses) ? courses : null;
  const courseOf = (n) => (courseArr && n && typeof n.courseIndex === "number" ? courseArr[n.courseIndex] : null);
  const displayLabel = (n) => {
    if (n.type === "skill") return t(`graph.skills.${n.id}.name`, n.label);
    if (n.type === "experience") return courseOf(n)?.venue ?? n.label;
    if (n.type === "bridge") return t(`graph.bridges.${n.id}.label`, n.label);
    return n.label;
  };

  // build nodes/links once per variant (stable identity — d3 mutates them)
  const graph = useMemo(() => {
    const g = cfg.build();
    const degree = {};
    g.links.forEach((l) => {
      degree[l.source] = (degree[l.source] || 0) + 1;
      degree[l.target] = (degree[l.target] || 0) + 1;
    });
    g.nodes.forEach((n) => {
      n.deg = degree[n.id] || 0;
      n.r = (BASE_R[n.type] ?? 10) + Math.min(n.deg, 8) * (n.type === "skill" ? 1.6 : 0.9);
    });
    const adj = {};
    g.nodes.forEach((n) => (adj[n.id] = new Set([n.id])));
    g.links.forEach((l) => {
      const s = typeof l.source === "object" ? l.source.id : l.source;
      const tg = typeof l.target === "object" ? l.target.id : l.target;
      adj[s].add(tg);
      adj[tg].add(s);
    });
    g.adj = adj;
    return g;
  }, [cfg]);

  // neighbour lookup for the sidebar (typed)
  const neighbours = useMemo(() => {
    const map = {};
    graph.nodes.forEach((n) => (map[n.id] = {}));
    graph.links.forEach((l) => {
      const s = typeof l.source === "object" ? l.source.id : l.source;
      const tg = typeof l.target === "object" ? l.target.id : l.target;
      const sn = graph.nodes.find((n) => n.id === s);
      const tn = graph.nodes.find((n) => n.id === tg);
      if (sn && tn) {
        (map[s][tn.type] ||= []).push(tn);
        (map[tg][sn.type] ||= []).push(sn);
      }
    });
    return map;
  }, [graph]);

  // counts shown in the legend / sub-filter chips
  const counts = useMemo(() => {
    const byGroup = {};
    const bySub = {};
    graph.nodes.forEach((n) => {
      byGroup[n[groupBy]] = (byGroup[n[groupBy]] || 0) + 1;
      if (sub && n.type === sub.type && n[sub.field]) bySub[n[sub.field]] = (bySub[n[sub.field]] || 0) + 1;
    });
    return { byGroup, bySub };
  }, [graph, sub, groupBy]);

  const presentSubs = useMemo(() => (sub ? sub.order.filter((v) => counts.bySub[v]) : []), [counts, sub]);

  // is a node currently visible under the group / sub-filter?
  const isVisible = (n, groupState, subState) => {
    if (!groupState[n[groupBy]]) return false;
    if (sub && n.type === sub.type && n[sub.field] && !subState.has(n[sub.field])) return false;
    return true;
  };

  // keep refs in sync for the imperative draw/sim loop
  filterRef.current = { groups, subs, isVisible };
  paramsRef.current = { ...tune, nodeSizeMul: NODE_SIZE_MUL[tune.nodeSize] ?? 1 };

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
      const labels = labelsRef.current;
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
          ctx.fillText(labels[n.id] ?? n.label, n.x, n.y + r + 3 / tf.k);
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
        setSelected(node || null);
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

  // translated labels for the canvas — refresh on language change
  useEffect(() => {
    const map = {};
    graph.nodes.forEach((n) => {
      map[n.id] = displayLabel(n);
    });
    labelsRef.current = map;
    dataRef.current?.draw?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, graph, courseArr]);

  useEffect(() => {
    palRef.current = isDark ? PALETTE.dark : PALETTE.light;
    dataRef.current?.draw?.();
  }, [isDark]);

  useEffect(() => {
    dataRef.current?.applyForces?.();
  }, [tune]);

  useEffect(() => {
    dataRef.current?.applyFilter?.();
  }, [groups, subs]);

  // audience mode drives which crafts the universe reveals (universe variant only)
  useEffect(() => {
    if (cfg.mode) setGroups({ ...MODE_GROUPS[mode] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (selected) {
      if (!prevFocusRef.current) prevFocusRef.current = document.activeElement;
      closeBtnRef.current?.focus();
    } else if (prevFocusRef.current) {
      prevFocusRef.current.focus?.();
      prevFocusRef.current = null;
    }
  }, [selected]);

  const selectById = (id) => {
    const node = graph.nodes.find((n) => n.id === id) || null;
    if (node && filterRef.current && !filterRef.current.isVisible(node, groups, subs)) {
      setGroups((prev) => ({ ...prev, [node[groupBy]]: true }));
      if (sub && node.type === sub.type && node[sub.field]) setSubs((prev) => new Set(prev).add(node[sub.field]));
    }
    activeRef.current.selectedId = node ? node.id : null;
    setSelected(node);
    dataRef.current?.draw?.();
  };
  const closePanel = () => {
    activeRef.current.selectedId = null;
    setSelected(null);
    dataRef.current?.draw?.();
  };
  const openDeepDive = () => {
    if (!selected || selected.type !== "project") return;
    const full = SAMPLE_PROJECTS.find((p) => p.id === selected.id);
    if (full) setModalProject(full);
  };
  const goToJourney = () => {
    closePanel();
    document.getElementById("vp-bar-menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleGroup = (g) => setGroups((prev) => ({ ...prev, [g]: !prev[g] }));
  const toggleSub = (value) =>
    setSubs((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  const resetTune = () => setTune(DEFAULTS);

  const slideX = dir === "rtl" ? -30 : 30;
  const selCourse = courseOf(selected);

  const SLIDERS = [
    { key: "centerForce", min: 0, max: 0.25, step: 0.01 },
    { key: "repelForce", min: 0.3, max: 2.5, step: 0.05 },
    { key: "linkForce", min: 0, max: 1, step: 0.05 },
    { key: "linkWidth", min: 0.4, max: 3, step: 0.1 },
    { key: "textFade", min: 0.8, max: 3, step: 0.1 },
  ];

  return (
    <div className="vp-kg">
      <div className="vp-kg__toolbar">
        <div className="vp-kg__filters" role="group" aria-label={t("graph.filterTypes")}>
          {groupKeys.map((g) => (
            <button
              key={g}
              type="button"
              className={`vp-kg__leg vp-kg__leg--${g} ${groups[g] ? "" : "is-off"}`}
              aria-pressed={groups[g]}
              onClick={() => toggleGroup(g)}
            >
              <span className="vp-kg__leg-dot" aria-hidden="true" />
              {t(`graph.legend${cap(g)}`)}
              <span className="vp-kg__leg-count">{counts.byGroup[g] ?? 0}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`vp-kg__tune-btn ${controlsOpen ? "is-active" : ""}`}
          aria-pressed={controlsOpen}
          onClick={() => setControlsOpen((o) => !o)}
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          {t("graph.tune")}
        </button>
      </div>

      {/* sub-filter (cert category on tech, country on bar) */}
      <AnimatePresence initial={false}>
        {sub && groups[sub.type] && presentSubs.length > 1 && (
          <Motion.div
            className="vp-kg__cats"
            role="group"
            aria-label={t(sub.labelKey)}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {presentSubs.map((value) => (
              <button
                key={value}
                type="button"
                className={`vp-kg__cat ${subs.has(value) ? "is-on" : ""}`}
                aria-pressed={subs.has(value)}
                onClick={() => toggleSub(value)}
              >
                {t(`${sub.i18nPrefix}.${value}`)}
                <span className="vp-kg__cat-count">{counts.bySub[value]}</span>
              </button>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="vp-kg__stage" ref={wrapRef}>
        <canvas ref={bgCanvasRef} className="vp-kg__bg" aria-hidden="true" />
        <canvas ref={canvasRef} className="vp-kg__canvas" role="application" aria-label={t("graph.aria")} />

        <div className="vp-kg__controls">
          <button type="button" onClick={() => dataRef.current?.zoomBy(1.3)} aria-label={t("graph.zoomIn")}><Plus size={16} /></button>
          <button type="button" onClick={() => dataRef.current?.zoomBy(0.77)} aria-label={t("graph.zoomOut")}><Minus size={16} /></button>
          <button type="button" onClick={() => dataRef.current?.fit()} aria-label={t("graph.fit")}><Maximize size={15} /></button>
        </div>

        <AnimatePresence>
          {controlsOpen && (
            <Motion.div
              className="vp-kg__tune-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="vp-kg__tune-head">
                <span>{t("graph.tuneTitle")}</span>
                <button type="button" className="vp-kg__tune-reset" onClick={resetTune}>
                  <RotateCcw size={12} aria-hidden="true" /> {t("graph.reset")}
                </button>
              </div>

              <div className="vp-kg__tune-row">
                <label className="vp-kg__tune-label">{t("graph.ctrl.nodeSize")}</label>
                <div className="vp-kg__seg">
                  {["s", "m", "l"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={tune.nodeSize === s ? "is-on" : ""}
                      aria-pressed={tune.nodeSize === s}
                      onClick={() => setTune((p) => ({ ...p, nodeSize: s }))}
                    >
                      {t(`graph.size.${s}`)}
                    </button>
                  ))}
                </div>
              </div>

              {SLIDERS.map(({ key, min, max, step }) => (
                <div className="vp-kg__tune-row" key={key}>
                  <label className="vp-kg__tune-label" htmlFor={`kg-${key}`}>
                    {t(`graph.ctrl.${key}`)}
                  </label>
                  <input
                    id={`kg-${key}`}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={tune[key]}
                    onChange={(e) => setTune((p) => ({ ...p, [key]: parseFloat(e.target.value) }))}
                  />
                </div>
              ))}
            </Motion.div>
          )}
        </AnimatePresence>

        <p className="vp-kg__hint" aria-hidden="true">{t("graph.hint")}</p>

        <ul className="vp-sr-only" aria-label={t("graph.nodeList")}>
          {graph.nodes.map((n) => (
            <li key={n.id}>
              <button type="button" onClick={() => selectById(n.id)}>
                {displayLabel(n)} — {t(`graph.legend${cap(n.type)}`)}
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {selected && (
            <Motion.aside
              key={selected.id}
              className="vp-kg__panel"
              role="dialog"
              aria-labelledby="vp-kg-title"
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === "Escape") closePanel();
              }}
              initial={{ opacity: 0, x: slideX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideX }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <button ref={closeBtnRef} type="button" className="vp-kg__close" onClick={closePanel} aria-label={t("nav.close")}>
                <X size={18} />
              </button>

              <span className={`vp-kg__badge vp-kg__badge--${selected.type}`}>
                {(() => {
                  const Icon = TYPE_ICON[selected.type] ?? Sparkles;
                  return <Icon size={13} aria-hidden="true" />;
                })()}
                {t(`graph.type${cap(selected.type)}`)}
              </span>

              {selected.planned && (
                <span className="vp-kg__planned">
                  <Clock size={12} aria-hidden="true" /> {t("tech.certs.planned")}
                </span>
              )}
              {selected.type === "testimonial" && lang !== "en" && (
                <span className="vp-kg__planned vp-kg__planned--ai" title={t("testimonials.aiTip")}>
                  <Sparkles size={11} aria-hidden="true" /> {t("testimonials.aiBadge")}
                </span>
              )}

              <h3 className="vp-kg__title" id="vp-kg-title">
                {selected.type === "skill"
                  ? t(`graph.skills.${selected.id}.name`, selected.label)
                  : selected.type === "experience"
                    ? selCourse?.role ?? selected.role ?? selected.label
                    : selected.type === "bridge"
                      ? t(`graph.bridges.${selected.id}.label`, selected.label)
                      : selected.fullLabel || selected.label}
              </h3>

              {selected.type === "bridge" && <p className="vp-kg__org">{t("graph.bridgeSub")}</p>}
              {selected.type === "cert" && <p className="vp-kg__org">{selected.org}</p>}
              {selected.type === "project" && (
                <p className="vp-kg__org">
                  {selected.year} · {t(`tech.projects.status${cap(selected.status)}`)}
                </p>
              )}
              {selected.type === "experience" && (
                <p className="vp-kg__org">
                  {(selCourse?.venue ?? selected.venue)} · {(selCourse?.city ?? selected.city)} · {(selCourse?.year ?? selected.year)}
                </p>
              )}
              {selected.type === "testimonial" && (
                <p className="vp-kg__org">{t(`testimonialInfo.${selected.id}.role`, selected.role)} · {selected.org}</p>
              )}
              {selected.type === "project" && (
                <p className="vp-kg__tagline">{t(`projectInfo.${selected.id}.tagline`, selected.tagline)}</p>
              )}

              <p className={`vp-kg__desc ${selected.type === "testimonial" ? "vp-kg__desc--quote" : ""}`}>
                {selected.type === "skill"
                  ? t(`graph.skills.${selected.id}.desc`, selected.desc)
                  : selected.type === "cert"
                    ? t(`certInfo.${selected.id}.desc`, selected.desc)
                    : selected.type === "experience"
                      ? selCourse?.text ?? selected.desc
                      : selected.type === "testimonial"
                        ? t(`testimonialInfo.${selected.id}.quote`, selected.quote)
                        : selected.type === "bridge"
                          ? t(`graph.bridges.${selected.id}.why`, selected.desc)
                          : t(`projectInfo.${selected.id}.description`, selected.desc)}
              </p>

              {selected.type === "project" && selected.stack && (
                <div className="vp-kg__chips">
                  {selected.stack.map((s) => (
                    <span className="vp-chip" key={s}>{s}</span>
                  ))}
                </div>
              )}

              {cfg.types.map((type) => {
                const list = neighbours[selected.id]?.[type] ?? [];
                if (!list.length) return null;
                return (
                  <div className="vp-kg__rel" key={type}>
                    <p className="vp-kg__rel-title">{t(`graph.rel.${selected.type}.${type}`)}</p>
                    <div className="vp-kg__rel-items">
                      {list.map((nb) => (
                        <button type="button" key={nb.id} className={`vp-kg__pill vp-kg__pill--${nb.type}`} onClick={() => selectById(nb.id)}>
                          {displayLabel(nb)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="vp-kg__actions">
                {selected.type === "project" && (
                  <button type="button" className="vp-btn vp-btn--primary vp-kg__btn" onClick={openDeepDive}>
                    <Telescope size={15} aria-hidden="true" /> {t("tech.projects.deepDive")}
                  </button>
                )}
                {selected.type === "experience" && (
                  <button type="button" className="vp-btn vp-btn--ghost vp-kg__btn" onClick={goToJourney}>
                    <Route size={15} aria-hidden="true" /> {t("graph.seeJourney")}
                  </button>
                )}
                {selected.type === "cert" && selected.file && (
                  <a className="vp-btn vp-btn--primary vp-kg__btn" href={selected.file} target="_blank" rel="noreferrer">
                    <FileText size={15} aria-hidden="true" /> {selected.planned ? t("tech.certs.viewPath") : t("tech.certs.view")}
                  </a>
                )}
                {selected.type === "project" && selected.links?.live && (
                  <a className="vp-btn vp-btn--ghost vp-kg__btn" href={selected.links.live} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} aria-hidden="true" /> {t("tech.projects.live")}
                  </a>
                )}
                {selected.type === "project" && selected.links?.anchor && (
                  <a className="vp-btn vp-btn--ghost vp-kg__btn" href={selected.links.anchor} onClick={closePanel}>
                    {t("tech.projects.details")} <ArrowUpRight size={14} className="vp-arrow" aria-hidden="true" />
                  </a>
                )}
              </div>
            </Motion.aside>
          )}
        </AnimatePresence>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};

KnowledgeGraph.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar", "universe"]),
};

export default KnowledgeGraph;
