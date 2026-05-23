import { useState, useMemo } from "react";
import "../../_styles/menus_childComps/menus_charts.css";

/* ============================================================================
   Menus_chartV2 — multi-series line/area chart with hover tooltip.

   props:
   - title:    string
   - series:   Array<{ id, label, color?, points: [{ label, value }] }>
   - currency: string
   - height:   number
   - area:     boolean (default true)
   - rightSlot: ReactNode

   Stays presentational — caller decides what series go in.
============================================================================ */

const PALETTE = [
  "#2A6FDB", "#D97757", "#1F8A5B", "#E6B800",
  "#9456A3", "#C0392B", "#00BFA5", "#FF7A59",
];

const _fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const Menus_chartV2 = ({ title, series = [], currency, height = 240, rightSlot, area = true }) => {
  const W = 760, H = height;
  const padL = 44, padR = 12, padT = 26, padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const [hover, setHover] = useState(null);

  const { vMin, vMax, xLabels } = useMemo(() => {
    let mn = Infinity, mx = -Infinity;
    const xs = series[0]?.points?.map((p) => p.label) || [];
    for (const s of series) {
      for (const p of s.points || []) {
        if (p.value < mn) mn = p.value;
        if (p.value > mx) mx = p.value;
      }
    }
    if (mn === Infinity) { mn = 0; mx = 1; }
    const pad = (mx - mn) * 0.12 || 1;
    return { vMin: Math.max(0, mn - pad), vMax: mx + pad, xLabels: xs };
  }, [series]);

  const xLen = Math.max(1, xLabels.length - 1);
  const xAt = (i) => padL + (i / xLen) * innerW;
  const yAt = (v) => padT + innerH - ((v - vMin) / (vMax - vMin || 1)) * innerH;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((x - padL) / innerW) * xLen);
    if (i >= 0 && i <= xLen) setHover({ i, label: xLabels[i] });
  };

  const ticks = [vMin, (vMin + vMax) / 2, vMax];

  return (
    <div className="menus_chart">
      <div className="menus_chart_header">
        <div className="menus_chart_titleWrap">
          {title && <p className="menus_chart_title">{title}</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
            {series.map((s, i) => (
              <span key={s.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--menus-text)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color || PALETTE[i % PALETTE.length] }} />
                {s.label}
              </span>
            ))}
          </div>
        </div>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
      <div style={{ position: "relative" }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg className="menus_chart_svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          {ticks.map((t, i) => {
            const y = yAt(t);
            return (
              <g key={i}>
                <line className="menus_chart_grid" x1={padL} y1={y} x2={W - padR} y2={y} />
                <text className="menus_chart_axis" x={padL - 6} y={y + 4} textAnchor="end">{_fmt(t)}</text>
              </g>
            );
          })}
          {series.map((s, sIdx) => {
            const color = s.color || PALETTE[sIdx % PALETTE.length];
            const pts = s.points || [];
            if (pts.length === 0) return null;
            const line = pts.map((p, i) => (i === 0 ? `M ${xAt(i)} ${yAt(p.value)}` : `L ${xAt(i)} ${yAt(p.value)}`)).join(" ");
            const a = area ? line + ` L ${xAt(pts.length - 1)} ${padT + innerH} L ${xAt(0)} ${padT + innerH} Z` : null;
            return (
              <g key={s.id}>
                {a && <path d={a} fill={color} fillOpacity="0.08" />}
                <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                {pts.map((p, i) => (
                  <circle key={i} cx={xAt(i)} cy={yAt(p.value)} r={hover?.i === i ? 4 : 2.5}
                    fill="var(--menus-bg-elev, #fff)" stroke={color} strokeWidth={1.5} />
                ))}
              </g>
            );
          })}
          {hover && (
            <line className="menus_chart_cursor" x1={xAt(hover.i)} y1={padT} x2={xAt(hover.i)} y2={padT + innerH} />
          )}
          {xLabels.length > 0 && [0, Math.floor(xLabels.length / 2), xLabels.length - 1]
            .filter((i, idx, arr) => arr.indexOf(i) === idx)
            .map((i) => (
              <text key={i} className="menus_chart_axis" x={xAt(i)} y={H - 8}
                textAnchor={i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle"}>
                {xLabels[i]}
              </text>
            ))}
        </svg>
        {hover && (
          <div className="menus_chart_tooltip"
            style={{ left: `${(xAt(hover.i) / W) * 100}%`, top: 0, transform: "translate(-50%, calc(-100% + 6px))" }}>
            <span className="menus_chart_tooltip_label">{hover.label}</span>
            {series.map((s, sIdx) => {
              const p = s.points?.[hover.i];
              if (!p) return null;
              const color = s.color || PALETTE[sIdx % PALETTE.length];
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, marginTop: 2 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                  <span style={{ opacity: 0.85, marginRight: 6 }}>{s.label}</span>
                  {currency && <span style={{ opacity: 0.6, marginRight: 2 }}>{currency}</span>}
                  <span style={{ fontWeight: 700 }}>{_fmt(p.value)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { PALETTE };
export default Menus_chartV2;
