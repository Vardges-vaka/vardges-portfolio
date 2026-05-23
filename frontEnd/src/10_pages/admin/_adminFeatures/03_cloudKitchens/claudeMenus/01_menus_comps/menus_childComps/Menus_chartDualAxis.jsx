import { useState, useMemo } from "react";
import "../../_styles/menus_childComps/menus_charts.css";

/* ============================================================================
   Menus_chartDualAxis — price (line, left axis) overlaid on revenue (area,
   right axis). Used to compare an item's selling price history against the
   revenue it generated.

   props:
   - title: string
   - priceSeries:   { points: [{ label, value }] }
   - revenueSeries: { points: [{ label, value }] }
   - currency: string (default "AED")
   - height: number  (default 260)
   - rightSlot: ReactNode
============================================================================ */

const _fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const PRICE_COLOR = "#D97757";
const REVENUE_COLOR = "#2A6FDB";

const Menus_chartDualAxis = ({
  title,
  priceSeries,
  revenueSeries,
  currency = "AED",
  height = 260,
  rightSlot,
}) => {
  const W = 760, H = height;
  const padL = 48, padR = 48, padT = 26, padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const [hover, setHover] = useState(null);

  const { xLabels, pMin, pMax, rMin, rMax } = useMemo(() => {
    const xs =
      priceSeries?.points?.map((p) => p.label) ||
      revenueSeries?.points?.map((p) => p.label) ||
      [];
    const norm = (vs) => {
      if (!vs.length) return [0, 1];
      const mn = Math.min(...vs), mx = Math.max(...vs);
      const pad = (mx - mn) * 0.12 || 1;
      return [Math.max(0, mn - pad), mx + pad];
    };
    const [pa, pb] = norm((priceSeries?.points || []).map((p) => p.value));
    const [ra, rb] = norm((revenueSeries?.points || []).map((p) => p.value));
    return { xLabels: xs, pMin: pa, pMax: pb, rMin: ra, rMax: rb };
  }, [priceSeries, revenueSeries]);

  const xLen = Math.max(1, xLabels.length - 1);
  const xAt = (i) => padL + (i / xLen) * innerW;
  const yP = (v) => padT + innerH - ((v - pMin) / (pMax - pMin || 1)) * innerH;
  const yR = (v) => padT + innerH - ((v - rMin) / (rMax - rMin || 1)) * innerH;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((x - padL) / innerW) * xLen);
    if (i >= 0 && i <= xLen) setHover({ i, label: xLabels[i] });
  };

  const linePath = (pts, yFn) =>
    (pts || [])
      .map((p, i) => (i === 0 ? `M ${xAt(i)} ${yFn(p.value)}` : `L ${xAt(i)} ${yFn(p.value)}`))
      .join(" ");
  const areaPath = (pts, yFn) => {
    const ln = linePath(pts, yFn);
    if (!ln) return "";
    return ln + ` L ${xAt(pts.length - 1)} ${padT + innerH} L ${xAt(0)} ${padT + innerH} Z`;
  };

  const pTicks = [pMin, (pMin + pMax) / 2, pMax];
  const rTicks = [rMin, (rMin + rMax) / 2, rMax];

  return (
    <div className="menus_chart">
      <div className="menus_chart_header">
        <div className="menus_chart_titleWrap">
          {title && <p className="menus_chart_title">{title}</p>}
          <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: PRICE_COLOR }} />
              Price ({currency})
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: REVENUE_COLOR }} />
              Revenue ({currency})
            </span>
          </div>
        </div>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
      <div style={{ position: "relative" }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg className="menus_chart_svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          {rTicks.map((t, i) => (
            <g key={"rt" + i}>
              <line className="menus_chart_grid" x1={padL} y1={yR(t)} x2={W - padR} y2={yR(t)} />
              <text className="menus_chart_axis" x={W - padR + 6} y={yR(t) + 4} textAnchor="start" fill={REVENUE_COLOR}>
                {_fmt(t)}
              </text>
            </g>
          ))}
          {pTicks.map((t, i) => (
            <text key={"pt" + i} className="menus_chart_axis" x={padL - 6} y={yP(t) + 4} textAnchor="end" fill={PRICE_COLOR}>
              {_fmt(t)}
            </text>
          ))}
          <path d={areaPath(revenueSeries?.points, yR)} fill={REVENUE_COLOR} fillOpacity="0.12" />
          <path d={linePath(revenueSeries?.points, yR)} fill="none" stroke={REVENUE_COLOR} strokeWidth={2} />
          <path d={linePath(priceSeries?.points, yP)} fill="none" stroke={PRICE_COLOR} strokeWidth={2.4} />
          {hover && priceSeries?.points?.[hover.i] && (
            <circle cx={xAt(hover.i)} cy={yP(priceSeries.points[hover.i].value)} r={4} fill="#fff" stroke={PRICE_COLOR} strokeWidth={2} />
          )}
          {hover && revenueSeries?.points?.[hover.i] && (
            <circle cx={xAt(hover.i)} cy={yR(revenueSeries.points[hover.i].value)} r={4} fill="#fff" stroke={REVENUE_COLOR} strokeWidth={2} />
          )}
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
            {priceSeries?.points?.[hover.i] && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: PRICE_COLOR }} />
                Price: <strong>{currency} {_fmt(priceSeries.points[hover.i].value)}</strong>
              </div>
            )}
            {revenueSeries?.points?.[hover.i] && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, marginTop: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: REVENUE_COLOR }} />
                Revenue: <strong>{currency} {_fmt(revenueSeries.points[hover.i].value)}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus_chartDualAxis;
