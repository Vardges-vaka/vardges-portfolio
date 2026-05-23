import { useState, useMemo } from "react";
import {
  Menus_chart,
  Menus_salesPanel,
  Menus_salesFilter,
  Menus_donut,
} from "./_menus_childComps.index.js";
import { SALES_TIMEFRAMES, salesTimeSeries } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_salesSection — full sales surface used in view_one for every entity.

   - The 8-card panel lets the user pick a timeframe.
   - The big chart shows a 13-month qnt+amount series.
   - The "amount" / "qnt" mode toggle drives the chart's units.
   - Optional `breakdown` array renders a donut.

   props:
   - doc: object with the 8 sales fields and _id
   - title: string
   - breakdown: Array<{ label, value }>  optional — drives the donut card
============================================================================ */

const Menus_salesSection = ({ doc, title = "Sales", breakdown }) => {
  const [tf, setTf] = useState("currentMonthSales");
  const [mode, setMode] = useState("amount"); // "amount" | "qnt"

  // 13-month series for the big chart.
  const series = useMemo(() => {
    if (!doc?._id) return [];
    return salesTimeSeries(doc._id).map((p) => ({
      label: p.label,
      value: mode === "amount" ? p.amount : p.qnt,
    }));
  }, [doc, mode]);

  if (!doc) return null;
  const tfMeta = SALES_TIMEFRAMES.find((t) => t.key === tf);

  return (
    <section
      className="menuItem_field_modifiers"
      style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}>
        <h3
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--menus-text-soft)",
          }}>
          {title}
        </h3>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <div className="menus_salesFilter" role="tablist" aria-label="Chart mode">
            {[
              { key: "amount", label: "AED" },
              { key: "qnt", label: "QNT" },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                className={`menus_salesFilter_chip ${mode === m.key ? "active" : ""}`}
                onClick={() => setMode(m.key)}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <Menus_salesPanel doc={doc} selected={tf} onPick={setTf} />

      <Menus_chart
        title={`${tfMeta?.label || "Trend"} · ${mode === "amount" ? "AED" : "Units"}`}
        points={series}
        currency={mode === "amount" ? "AED" : ""}
        height={200}
        rightSlot={<Menus_salesFilter value={tf} onChange={setTf} />}
      />

      {breakdown && breakdown.length > 0 && (
        <Menus_donut title="Breakdown" slices={breakdown} currency={mode === "amount" ? "AED" : ""} />
      )}
    </section>
  );
};

export default Menus_salesSection;
