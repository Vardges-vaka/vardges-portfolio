import { useMemo } from "react";
import "../../_styles/menus_childComps/menus_charts.css";

/* ============================================================================
   Menus_donut — SVG donut chart with legend. Used to break down sales by
   category / item / modifier inside view_one panels.

   props:
   - title:  string                      header label
   - slices: Array<{ label, value, color? }>
   - currency: string
============================================================================ */

const PALETTE = [
  "#2fc30b", // brand green
  "#d97757", // warm terracotta
  "#2a6fdb", // cool blue
  "#e6b800", // amber
  "#9456a3", // violet
  "#1f8a5b", // teal
  "#c0392b", // danger red
  "#5a544d", // neutral
];

const fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
};

const arcPath = (cx, cy, rOuter, rInner, startDeg, endDeg) => {
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const [x1, y1] = polar(cx, cy, rOuter, startDeg);
  const [x2, y2] = polar(cx, cy, rOuter, endDeg);
  const [x3, y3] = polar(cx, cy, rInner, endDeg);
  const [x4, y4] = polar(cx, cy, rInner, startDeg);
  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
};

const Menus_donut = ({ title, slices = [], currency = "AED" }) => {
  const total = useMemo(
    () => slices.reduce((s, x) => s + (x.value || 0), 0),
    [slices],
  );
  const paths = useMemo(() => {
    if (total === 0) return [];
    let angle = 0;
    return slices.map((s, i) => {
      const pct = (s.value || 0) / total;
      const next = angle + pct * 360;
      const path = arcPath(60, 60, 55, 36, angle, next - 0.001);
      const out = { path, color: s.color || PALETTE[i % PALETTE.length], pct, ...s };
      angle = next;
      return out;
    });
  }, [slices, total]);

  return (
    <div className="menus_chart">
      {title && <p className="menus_chart_title">{title}</p>}
      <div className="menus_donut_wrap">
        <svg className="menus_donut" viewBox="0 0 120 120">
          {paths.map((p, i) => (
            <path key={i} d={p.path} fill={p.color} stroke="var(--menus-bg-elev, #fff)" strokeWidth="1" />
          ))}
          <text
            className="menus_donut_center_value"
            x="60" y="60"
            textAnchor="middle" dominantBaseline="central">
            {fmt(total)}
          </text>
          <text
            className="menus_donut_center_label"
            x="60" y="75"
            textAnchor="middle" dominantBaseline="central">
            {currency}
          </text>
        </svg>
        <div className="menus_donut_legend">
          {paths.map((p, i) => (
            <div key={i} className="menus_donut_legend_row">
              <span className="menus_donut_legend_swatch" style={{ background: p.color }} />
              <span className="menus_donut_legend_label">{p.label}</span>
              <span className="menus_donut_legend_value">
                {fmt(p.value)} · {(p.pct * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menus_donut;
