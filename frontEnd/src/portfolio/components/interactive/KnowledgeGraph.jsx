import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import PropTypes from "prop-types";
import { Plus, Minus, Maximize, SlidersHorizontal } from "lucide-react";
import { usePortfolioLang, usePortfolioTheme, usePortfolioMode } from "../../context/usePortfolio.js";
import { SAMPLE_PROJECTS } from "../../data/sampleProjects.js";
import ProjectModal from "../ProjectModal.jsx";
import { BASE_R, CONFIGS, MODE_GROUPS, DEFAULTS, cap } from "./graph/graphConfig.js";
import { useForceGraph } from "./graph/useForceGraph.js";
import GraphPanel from "./graph/GraphPanel.jsx";
import GraphTunePanel from "./graph/GraphTunePanel.jsx";

/**
 * KnowledgeGraph — orchestrator for the tech / bar / universe knowledge graphs.
 * State + memos + JSX live here; the canvas/d3 engine is `useForceGraph`, the
 * detail aside is `GraphPanel`, the tuning popover is `GraphTunePanel`, and the
 * static config + helpers are in `graph/graphConfig.js`.
 */
const KnowledgeGraph = ({ variant = "tech" }) => {
  const cfg = CONFIGS[variant] ?? CONFIGS.tech;
  const { sub } = cfg;
  const groupBy = cfg.groupBy ?? "type";
  const groupKeys = cfg.groups ?? cfg.types;
  const { t, dir, lang } = usePortfolioLang();
  const { isDark } = usePortfolioTheme();
  const { mode } = usePortfolioMode();

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

  // translated labels for the canvas (rebuilt on language / graph change)
  const labels = useMemo(() => {
    const map = {};
    graph.nodes.forEach((n) => (map[n.id] = displayLabel(n)));
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, t, courseArr]);

  // is a node currently visible under the group / sub-filter?
  const isVisible = (n, groupState, subState) => {
    if (!groupState[n[groupBy]]) return false;
    if (sub && n.type === sub.type && n[sub.field] && !subState.has(n[sub.field])) return false;
    return true;
  };

  // the canvas + d3-force engine
  const { wrapRef, canvasRef, bgCanvasRef, focusNode, zoomBy, fit } = useForceGraph({
    graph,
    cfg,
    isDark,
    tune,
    groups,
    subs,
    isVisible,
    labels,
    onPick: setSelected,
  });

  // audience mode drives which crafts the universe reveals (universe variant only)
  useEffect(() => {
    if (cfg.mode) setGroups({ ...MODE_GROUPS[mode] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // focus management for the detail dialog
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
    if (node && !isVisible(node, groups, subs)) {
      setGroups((prev) => ({ ...prev, [node[groupBy]]: true }));
      if (sub && node.type === sub.type && node[sub.field]) setSubs((prev) => new Set(prev).add(node[sub.field]));
    }
    focusNode(node ? node.id : null);
    setSelected(node);
  };
  const closePanel = () => {
    focusNode(null);
    setSelected(null);
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
          <button type="button" onClick={() => zoomBy(1.3)} aria-label={t("graph.zoomIn")}><Plus size={16} /></button>
          <button type="button" onClick={() => zoomBy(0.77)} aria-label={t("graph.zoomOut")}><Minus size={16} /></button>
          <button type="button" onClick={() => fit()} aria-label={t("graph.fit")}><Maximize size={15} /></button>
        </div>

        <GraphTunePanel open={controlsOpen} tune={tune} setTune={setTune} onReset={resetTune} t={t} />

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

        <GraphPanel
          selected={selected}
          neighbours={neighbours}
          cfg={cfg}
          t={t}
          lang={lang}
          dir={dir}
          displayLabel={displayLabel}
          selCourse={courseOf(selected)}
          closeBtnRef={closeBtnRef}
          onClose={closePanel}
          onSelect={selectById}
          onDeepDive={openDeepDive}
          onJourney={goToJourney}
        />
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};

KnowledgeGraph.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar", "universe"]),
};

export default KnowledgeGraph;
