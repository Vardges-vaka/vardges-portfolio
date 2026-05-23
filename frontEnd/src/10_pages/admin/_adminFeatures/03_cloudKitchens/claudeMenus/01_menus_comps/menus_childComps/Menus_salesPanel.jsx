import { useMemo } from "react";
import "../../_styles/menus_childComps/menus_charts.css";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_salesPanel — overview card showing all 8 sales timeframes.

   Cards are clickable: clicking one calls onPick(key) so the parent can
   highlight the selected timeframe (and drive a chart or filter the table).

   props:
   - doc: object that has the 8 sales fields
   - selected: timeframe key (highlights the card)
   - onPick: (key) => void
   - currency: string
   - title: string (default "Sales overview")
============================================================================ */

const fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const Menus_salesPanel = ({
  doc,
  selected,
  onPick,
  currency = "AED",
  title = "Sales overview",
}) => {
  const cards = useMemo(
    () =>
      SALES_TIMEFRAMES.map((t) => ({
        ...t,
        sales: doc?.[t.key] || { amount: 0, qnt: 0 },
      })),
    [doc],
  );

  return (
    <div className="menus_salesPanel">
      <div className="menus_salesPanel_header">
        <p className="menus_salesPanel_title">{title}</p>
        <span
          style={{
            fontSize: 11,
            color: "var(--menus-text-soft)",
            letterSpacing: "0.04em",
          }}>
          {currency} · per timeframe
        </span>
      </div>
      <div className="menus_salesPanel_grid">
        {cards.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`menus_salesPanel_card ${selected === c.key ? "active" : ""}`}
            onClick={() => onPick?.(c.key)}
            title={`${c.label} — ${currency} ${fmt(c.sales.amount)} (×${fmt(c.sales.qnt)})`}>
            <span className="menus_salesPanel_card_label">{c.label}</span>
            <span className="menus_salesPanel_card_amount">
              <span
                style={{
                  fontSize: "0.65em",
                  fontWeight: 500,
                  color: "var(--menus-text-soft)",
                  marginRight: 4,
                }}>
                {currency}
              </span>
              {fmt(c.sales.amount)}
            </span>
            <span className="menus_salesPanel_card_qnt">{fmt(c.sales.qnt)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menus_salesPanel;
