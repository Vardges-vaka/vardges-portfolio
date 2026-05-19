import { useMemo, useRef, useState } from "react";
import "../../_styles/menus_childComps/menus_charts.css";

/* ============================================================================
   Menus_chart — pure-SVG line+area chart with hover tooltip.

   props:
   - title: string                                 (small header label)
   - points: Array<{ label, value }>               (the series)
   - currency: string                              (prefix shown in tooltip & header)
   - height: number                                (default 180)
   - currentValue: number?                         (overrides "last point" headline)
   - showDelta: boolean                            (renders ▲/▼ vs first point)
   - rightSlot: ReactNode                          (e.g. a Menus_salesFilter)

   The component handles its own hover state — a vertical cursor + dot + tooltip
   that follow the mouse along the X axis.
============================================================================ */

const fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const Menus_chart = ({
  title,
  points = [],
  currency,
  height = 180,
  currentValue,
  showDelta = true,
  rightSlot,
}) => {
  const W = 600;
  const H = height;
  const padL = 8;
  const padR = 8;
  const padT = 16;
  const padB = 22;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const containerRef = useRef(null);
  const [hover, setHover] = useState(null); // { idx, x, y }

  const { coords, vMin, vMax, line, area } = useMemo(() => {
    if (!points.length) return { coords: [], vMin: 0, vMax: 1, line: "", area: "" };
    const vals = points.map((p) => p.value);
    const mn = Math.min(...vals);
    const mx = Math.max(...vals);
    const pad = (mx - mn) * 0.12 || 1;
    const lo = Math.max(0, mn - pad);
    const hi = mx + pad;
    const stepX = points.length === 1 ? 0 : innerW / (points.length - 1);
    const co = points.map((p, i) => ({
      idx: i,
      x: padL + i * stepX,
      y: padT + innerH - ((p.value - lo) / (hi - lo || 1)) * innerH,
      ...p,
    }));
    const line = co.map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`)).join(" ");
    const area =
      line +
      ` L ${co[co.length - 1].x} ${padT + innerH}` +
      ` L ${co[0].x} ${padT + innerH} Z`;
    return { coords: co, vMin: lo, vMax: hi, line, area };
  }, [points, innerH, innerW, padL, padT]);

  const headlineValue = currentValue ?? (points[points.length - 1]?.value ?? null);
  const firstValue = points[0]?.value ?? null;
  const delta =
    showDelta && firstValue != null && headlineValue != null && firstValue !== 0
      ? ((headlineValue - firstValue) / Math.abs(firstValue)) * 100
      : null;
  const deltaCls = delta == null ? "" : delta > 0 ? "up" : delta < 0 ? "down" : "";

  // Hover handler — find nearest x coordinate.
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const x = padL + ratio * innerW;
    let best = coords[0];
    let bestD = Infinity;
    for (const c of coords) {
      const d = Math.abs(c.x - x);
      if (d < bestD) { bestD = d; best = c; }
    }
    if (best) setHover(best);
  };

  // Y axis ticks (3 lines).
  const ticks = useMemo(() => {
    if (vMin === vMax) return [vMin];
    return [vMin, (vMin + vMax) / 2, vMax];
  }, [vMin, vMax]);

  return (
    <div className="menus_chart">
      <div className="menus_chart_header">
        <div className="menus_chart_titleWrap">
          {title && <p className="menus_chart_title">{title}</p>}
          <div className="menus_chart_value">
            {currency && <span style={{ fontSize: "0.7em", fontWeight: 500, marginRight: 4, color: "var(--menus-text-soft)" }}>{currency}</span>}
            {fmt(headlineValue)}
            {delta != null && (
              <span className={`menus_chart_value_delta ${deltaCls}`}>
                {delta > 0 ? "▲" : delta < 0 ? "▼" : "→"} {Math.abs(delta).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
      <div
        ref={containerRef}
        style={{ position: "relative" }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}>
        <svg
          className="menus_chart_svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none">
          {/* Grid lines + Y axis labels */}
          {ticks.map((t, i) => {
            const y = padT + innerH - ((t - vMin) / (vMax - vMin || 1)) * innerH;
            return (
              <g key={i}>
                <line className="menus_chart_grid" x1={padL} y1={y} x2={W - padR} y2={y} />
                <text className="menus_chart_axis" x={W - padR} y={y - 2} textAnchor="end">
                  {fmt(t)}
                </text>
              </g>
            );
          })}

          {/* Area + line */}
          {area && <path className="menus_chart_area" d={area} />}
          {line && <path className="menus_chart_line" d={line} />}

          {/* Hover cursor + dot */}
          {hover && (
            <>
              <line
                className="menus_chart_cursor"
                x1={hover.x} y1={padT} x2={hover.x} y2={padT + innerH}
              />
              <circle className="menus_chart_dot" cx={hover.x} cy={hover.y} r={4} />
            </>
          )}

          {/* X axis labels — show only first / middle / last to avoid clutter */}
          {coords.length > 0 && (
            <>
              {[0, Math.floor(coords.length / 2), coords.length - 1].map((i) => (
                <text
                  key={i}
                  className="menus_chart_axis"
                  x={coords[i].x}
                  y={H - 6}
                  textAnchor={i === 0 ? "start" : i === coords.length - 1 ? "end" : "middle"}>
                  {coords[i].label}
                </text>
              ))}
            </>
          )}
        </svg>

        {hover && (
          <div
            className="menus_chart_tooltip"
            style={{
              left: `${((hover.x - padL) / innerW) * 100}%`,
              top: `${(hover.y / H) * 100}%`,
            }}>
            <span className="menus_chart_tooltip_label">{hover.label}</span>
            {currency && (
              <span style={{ opacity: 0.6, marginRight: 4 }}>{currency}</span>
            )}
            {fmt(hover.value)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus_chart;
