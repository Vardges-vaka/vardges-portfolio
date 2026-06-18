import { Award, Sparkles, Boxes, Briefcase, Quote, Waypoints } from "lucide-react";
import { buildTechGraph, buildBarGraph, buildUniverseGraph } from "../../../data/graphData.js";

/**
 * Static configuration + small pure helpers for the KnowledgeGraph engine.
 * Kept out of the component so the component stays focused on state + JSX and the
 * hook (useForceGraph) stays focused on the canvas/simulation.
 */

export const PALETTE = {
  dark: { cert: "#38e1c8", skill: "#9b8cff", project: "#e9a23b", experience: "#e9a23b", testimonial: "#f0789e", tech: "#38e1c8", bar: "#e9a23b", bridge: "#f4d06f", line: "220,225,238", text: "#e8eaf0", dim: "#8b91a3", bg: "13,17,28" },
  light: { cert: "#0b8d7b", skill: "#5b46c8", project: "#a4650e", experience: "#a4650e", testimonial: "#c2456f", tech: "#0b8d7b", bar: "#a4650e", bridge: "#b8860b", line: "40,44,60", text: "#15161d", dim: "#585e6e", bg: "245,247,252" },
};
export const BASE_R = { skill: 15, project: 11, cert: 6.5, experience: 11, testimonial: 8.5, bridge: 13 };
export const TYPE_ICON = { cert: Award, skill: Sparkles, project: Boxes, experience: Briefcase, testimonial: Quote, bridge: Waypoints };
export const NODE_SIZE_MUL = { s: 0.8, m: 1, l: 1.32 };

const CAT_ORDER = ["dev", "auto", "ai", "foundations", "cyber"];
const COUNTRY_ORDER = ["Armenia", "Russia", "UAE"];

// per-page graph config.
//   types    — the node types present (drives the panel's relationship sections)
//   groupBy  — node field the legend toggles + colours map to ("type" default, "side" for universe)
//   groups   — the legend buttons (defaults to `types`)
//   sub      — optional second-level filter dimension
//   mode     — true → the audience-mode lens reveals/dims groups (universe only)
export const CONFIGS = {
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
export const MODE_GROUPS = {
  tech: { tech: true, bridge: false, bar: false },
  bar: { tech: false, bridge: false, bar: true },
  both: { tech: true, bridge: true, bar: true },
};

export const DEFAULTS = {
  textFade: 1.5,
  nodeSize: "m",
  linkWidth: 1,
  centerForce: 0.05,
  repelForce: 1,
  linkForce: 0.5,
};

// the tune-panel sliders (key + range)
export const SLIDERS = [
  { key: "centerForce", min: 0, max: 0.25, step: 0.01 },
  { key: "repelForce", min: 0.3, max: 2.5, step: 0.05 },
  { key: "linkForce", min: 0, max: 1, step: 0.05 },
  { key: "linkWidth", min: 0.4, max: 3, step: 0.1 },
  { key: "textFade", min: 0.8, max: 3, step: 0.1 },
];

/** "skill" → "Skill" (for graph.legend* / graph.type* i18n keys). */
export const cap = (s) => s[0].toUpperCase() + s.slice(1);

/** hex (#rrggbb) → rgba() with the given alpha — for the bridge edge glow. */
export const hexA = (hex, a) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
