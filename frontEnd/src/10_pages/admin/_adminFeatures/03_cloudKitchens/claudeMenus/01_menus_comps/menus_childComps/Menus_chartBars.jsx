import "../../_styles/menus_childComps/menus_charts.css";
import { PALETTE } from "./Menus_chartV2.jsx";

/* ============================================================================
   Menus_chartBars — horizontal bar chart for comparisons.

   props:
   - title:   string
   - bars:    Array<{ id, label, value, color? }>
   - currency: string
   - maxBars: number
============================================================================ */

const _fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const Menus_chartBars = ({ title, bars = [], currency, rightSlot, maxBars = 8 }) => {
  const sorted = [...bars].sort((a, b) => b.value - a.value).slice(0, maxBars);
  const max = Math.max(1, ...sorted.map((b) => b.value));

  return (
    <div className="menus_chart">
      <div className="menus_chart_header">
        <div className="menus_chart_titleWrap">
          {title && <p className="menus_chart_title">{title}</p>}
        </div>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
        {sorted.map((b, i) => {
          const pct = (b.value / max) * 100;
          const color = b.color || PALETTE[i % PALETTE.length];
          return (
            <div key={b.id} style={{
              display: "grid",
              gridTemplateColumns: "minmax(140px, 28%) 1fr auto",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ fontSize: 12, color: "var(--menus-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {b.label}
              </span>
              <div style={{
                height: 14,
                background: "color-mix(in srgb, var(--menus-bg-soft) 70%, transparent)",
                borderRadius: 99,
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: color,
                  borderRadius: 99,
                  transition: "width 350ms cubic-bezier(0.33,1,0.68,1)",
                }} />
              </div>
              <span style={{
                fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums",
                color: "var(--menus-text)",
              }}>
                {currency && <span style={{ opacity: 0.6, marginRight: 4, fontWeight: 500 }}>{currency}</span>}
                {_fmt(b.value)}
              </span>
            </div>
          );
        })}
        {sorted.length === 0 && (
          <span style={{ fontSize: 13, color: "var(--menus-text-soft)", padding: "8px 0" }}>
            No data to compare.
          </span>
        )}
      </div>
    </div>
  );
};

export default Menus_chartBars;
