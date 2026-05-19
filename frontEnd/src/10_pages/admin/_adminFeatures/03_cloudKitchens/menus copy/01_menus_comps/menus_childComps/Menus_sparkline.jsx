import { useMemo } from "react";
import "../../_styles/menus_childComps/menus_charts.css";

/* ============================================================================
   Menus_sparkline — tiny inline area+line, no axes/tooltips. Used inside the
   sales-panel cards to give each timeframe its own micro-trend.

   props:
   - points: Array<{ value }>
   - height: number          default 32
============================================================================ */

const Menus_sparkline = ({ points = [], height = 32 }) => {
  const W = 120;
  const H = height;
  const { line, area } = useMemo(() => {
    if (!points.length) return { line: "", area: "" };
    const vs = points.map((p) => p.value);
    const mn = Math.min(...vs);
    const mx = Math.max(...vs);
    const lo = mn - (mx - mn) * 0.1;
    const hi = mx + (mx - mn) * 0.1;
    const stepX = points.length === 1 ? 0 : W / (points.length - 1);
    const co = points.map((p, i) => ({
      x: i * stepX,
      y: H - ((p.value - lo) / (hi - lo || 1)) * H,
    }));
    const line = co.map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`)).join(" ");
    const area = line + ` L ${co[co.length - 1].x} ${H} L ${co[0].x} ${H} Z`;
    return { line, area };
  }, [points, H]);

  return (
    <svg
      className="menus_sparkline"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true">
      {area && <path className="menus_sparkline_area" d={area} />}
      {line && <path className="menus_sparkline_line" d={line} />}
    </svg>
  );
};

export default Menus_sparkline;
