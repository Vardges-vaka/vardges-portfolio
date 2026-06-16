import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { usePortfolioLang, usePortfolioMode } from "../../context/usePortfolio.js";
import MindBackdrop from "./MindBackdrop.jsx";

/**
 * LifeMap — an interactive, expandable mind-map of "a life in two crafts".
 * Click a node to open its branch; the tree re-lays-out and auto-fits the stage.
 * Mode-aware: the relevant branch opens first and the off-craft branch dims.
 * Hand-rolled tidy-tree layout (no library) so it themes + animates exactly.
 */

// tree data. label = English fallback; `k` = i18n key under "lifemap.nodes".
// `kind` colours the node (root | tech | bar | journey | lang | ethos).
// proper nouns / tech names carry no key (stay as-is in every language).
const TREE = {
  id: "root",
  label: "Vardges",
  kind: "root",
  children: [
    {
      id: "eng",
      k: "eng",
      label: "The Engineer",
      kind: "tech",
      link: "/tech",
      children: [
        { id: "eng-fs", k: "fullstack", label: "Full-Stack", kind: "tech" },
        { id: "eng-cloud", k: "cloud", label: "Cloud & DevOps", kind: "tech" },
        { id: "eng-sec", k: "cyber", label: "Cybersecurity", kind: "tech", link: "/tech" },
        { id: "eng-ai", k: "autoai", label: "Automation & AI", kind: "tech" },
      ],
    },
    {
      id: "bar",
      k: "bartender",
      label: "The Bartender",
      kind: "bar",
      link: "/bar",
      children: [
        { id: "bar-mix", k: "mixology", label: "Mixology", kind: "bar" },
        { id: "bar-menu", k: "menu", label: "Menu Engineering", kind: "bar" },
        { id: "bar-tree", label: "The Cocktail Tree", kind: "bar", link: "/bar" },
        { id: "bar-lead", k: "leadership", label: "Leadership", kind: "bar" },
      ],
    },
    {
      id: "journey",
      k: "journey",
      label: "The Journey",
      kind: "journey",
      children: [
        { id: "j-arm", k: "armenia", label: "Armenia", kind: "journey" },
        { id: "j-rus", k: "russia", label: "Russia", kind: "journey" },
        { id: "j-uae", k: "uae", label: "UAE", kind: "journey" },
        { id: "j-33", k: "countries", label: "33 Countries", kind: "journey" },
      ],
    },
    {
      id: "lang",
      k: "languages",
      label: "Languages",
      kind: "lang",
      children: [
        { id: "l-en", label: "English", kind: "lang" },
        { id: "l-ru", label: "Русский", kind: "lang" },
        { id: "l-hy", label: "Հայերեն", kind: "lang" },
        { id: "l-ar", label: "العربية", kind: "lang" },
      ],
    },
    {
      id: "ethos",
      k: "philosophy",
      label: "Philosophy",
      kind: "ethos",
      children: [
        { id: "e-std", k: "standard", label: "Two crafts, one standard", kind: "ethos" },
        { id: "e-detail", k: "detail", label: "Detail-obsessed", kind: "ethos" },
        { id: "e-guest", k: "guest", label: "Guest-first", kind: "ethos" },
      ],
    },
  ],
};

const ROW = 46;
const COLGAP = 64;
const PAD = 40;
const measure = (label) => Math.min(244, Math.max(86, label.length * 7.7 + 38));
const SPRING = { type: "spring", stiffness: 260, damping: 30 };

const LifeMap = () => {
  const { t, dir } = usePortfolioLang();
  const { showTech, showBar, isBoth } = usePortfolioMode();
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const [stage, setStage] = useState({ w: 900, h: 600 });

  // expanded set — root always; the mode's branch opens first
  const [expanded, setExpanded] = useState(() => new Set(["root"]));
  useEffect(() => {
    setExpanded(() => {
      const s = new Set(["root"]);
      if (showTech && !isBoth) s.add("eng");
      if (showBar && !isBoth) s.add("bar");
      return s;
    });
  }, [showTech, showBar, isBoth]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setStage({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // ----- layout (recomputed on expand / language change) -----
  const { nodes, links, transform } = useMemo(() => {
    const rtl = dir === "rtl";
    const labelOf = (n) => (n.k ? t(`lifemap.nodes.${n.k}`, n.label) : n.label);

    // flatten visible nodes, assign depth + width
    const vis = [];
    const walk = (n, depth, parent) => {
      const lbl = labelOf(n);
      const node = { ...n, _label: lbl, depth, w: measure(lbl), parent, hasChildren: !!n.children?.length, open: expanded.has(n.id) };
      vis.push(node);
      node._node = n;
      if (node.open && n.children) node.children = n.children.map((c) => walk(c, depth + 1, node));
      else node.children = null;
      return node;
    };
    const rootNode = walk(TREE, 0, null);

    // per-depth column x (accumulate max width per depth)
    const maxW = {};
    vis.forEach((n) => (maxW[n.depth] = Math.max(maxW[n.depth] || 0, n.w)));
    const colX = {};
    let acc = 0;
    Object.keys(maxW).map(Number).sort((a, b) => a - b).forEach((d) => {
      colX[d] = acc;
      acc += maxW[d] + COLGAP;
    });
    vis.forEach((n) => (n.x = colX[n.depth]));

    // leaf-based y placement
    let cursor = 0;
    const placeY = (n) => {
      if (n.open && n.children?.length) {
        n.children.forEach(placeY);
        n.y = (n.children[0].y + n.children[n.children.length - 1].y) / 2;
      } else {
        n.y = cursor * ROW + ROW / 2;
        cursor += 1;
      }
    };
    placeY(rootNode);

    // bounding box → normalize to 0,0
    const minX = Math.min(...vis.map((n) => n.x));
    const minY = Math.min(...vis.map((n) => n.y)) - ROW / 2;
    const boxW = Math.max(...vis.map((n) => n.x + n.w)) - minX;
    const boxH = Math.max(...vis.map((n) => n.y)) + ROW / 2 - minY;
    vis.forEach((n) => {
      n.x -= minX;
      n.y -= minY;
      if (rtl) n.x = boxW - n.x - n.w; // mirror horizontally for RTL
    });

    // links (parent edge → child edge)
    const segs = [];
    vis.forEach((n) => {
      if (n.open && n.children) {
        n.children.forEach((c) => {
          const x1 = rtl ? n.x : n.x + n.w;
          const x2 = rtl ? c.x + c.w : c.x;
          const y1 = n.y;
          const y2 = c.y;
          const mx = (x1 + x2) / 2;
          segs.push({ id: `${n.id}-${c.id}`, d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, kind: c.kind });
        });
      }
    });

    // fit transform (scale to stage, centre)
    const sc = Math.min((stage.w - PAD * 2) / boxW, (stage.h - PAD * 2) / boxH, 1.1);
    const scale = Number.isFinite(sc) && sc > 0 ? sc : 1;
    const tx = (stage.w - boxW * scale) / 2;
    const ty = (stage.h - boxH * scale) / 2;

    return {
      nodes: vis,
      links: segs,
      transform: { scale, tx, ty, boxW, boxH },
    };
  }, [expanded, t, dir, stage.w, stage.h]);

  const toggle = (node) => {
    if (node.hasChildren) {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) {
          // collapse this node and its descendants
          const collapse = (n) => {
            next.delete(n.id);
            n.children?.forEach(collapse);
          };
          collapse(node._node);
        } else {
          next.add(node.id);
        }
        return next;
      });
    } else if (node.link) {
      navigate(node.link);
    }
  };

  const dimmed = (kind) => (showTech && !showBar && kind === "bar") || (showBar && !showTech && kind === "tech");
  const ChevOpen = dir === "rtl" ? ChevronLeft : ChevronRight;
  const ChevClosed = dir === "rtl" ? ChevronRight : ChevronLeft;

  return (
    <div className="vp-lifemap">
      <div className="vp-lifemap__stage" ref={stageRef}>
        <MindBackdrop />

        <Motion.div
          className="vp-lifemap__canvas"
          animate={{ x: transform.tx, y: transform.ty, scale: transform.scale }}
          transition={SPRING}
          style={{ width: transform.boxW, height: transform.boxH }}
        >
          <svg className="vp-lifemap__links" width={transform.boxW} height={transform.boxH} aria-hidden="true">
            <AnimatePresence>
              {links.map((l) => (
                <Motion.path
                  key={l.id}
                  className={`vp-lifemap__link vp-lifemap__link--${l.kind}`}
                  d={l.d}
                  fill="none"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1, d: l.d }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
              ))}
            </AnimatePresence>
          </svg>

          {nodes.map((n) => (
            <Motion.div
              key={n.id}
              className="vp-lifemap__node-anchor"
              initial={{ opacity: 0, x: n.x, y: n.y }}
              animate={{ opacity: dimmed(n.kind) ? 0.4 : 1, x: n.x, y: n.y }}
              exit={{ opacity: 0 }}
              transition={SPRING}
            >
              <button
                type="button"
                className={`vp-lifemap__node vp-lifemap__node--${n.kind} ${n.open ? "is-open" : ""} ${n.hasChildren ? "has-children" : ""} ${n.link ? "has-link" : ""}`}
                style={{ "--node-w": `${n.w}px` }}
                onClick={() => toggle(n)}
                aria-expanded={n.hasChildren ? n.open : undefined}
              >
                <span className="vp-lifemap__node-label">{n._label}</span>
                {n.hasChildren && (
                  <span className="vp-lifemap__node-chev" aria-hidden="true">
                    {n.open ? <ChevOpen size={13} /> : <ChevClosed size={13} />}
                  </span>
                )}
              </button>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
      <p className="vp-lifemap__hint">{t("lifemap.hint")}</p>
    </div>
  );
};

export default LifeMap;
