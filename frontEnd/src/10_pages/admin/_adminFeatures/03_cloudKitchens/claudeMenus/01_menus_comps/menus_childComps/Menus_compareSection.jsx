import { useState, useMemo } from "react";
import Menus_chartV2, { PALETTE } from "./Menus_chartV2.jsx";
import Menus_chartDualAxis from "./Menus_chartDualAxis.jsx";
import Menus_chartBars from "./Menus_chartBars.jsx";
import {
  monthlyFromOrders,
  groupOrdersBy,
  CHANNELS,
} from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_pastOrders.js";

/* ============================================================================
   Menus_compareSection — composite comparison surface used by every view_one.

   Renders a 4-tab control: Trend / Channels / Branches / Price↔Revenue.

   props:
   - doc: any { _id, pastOrders }
   - kind: "item" | "option" | "modifier" | "category" | "menu"
   - siblings: peer documents for the multi-series trend chart
   - priceSeries: optional { points } override (for price↔revenue tab)
   - title: string
============================================================================ */

const TITLES_BY_KIND = {
  item:     "Compared with items in same category",
  option:   "Compared with options in same modifier",
  modifier: "Modifier and its options",
  category: "Category and its items",
  menu:     "Menu and its categories",
};

const CHANNEL_COLOR = Object.fromEntries(
  (CHANNELS || []).map((c, i) => [c._id, c.color || PALETTE[i % PALETTE.length]]),
);

const Menus_compareSection = ({ doc, kind, siblings = [], priceSeries, title = "Sales & comparisons" }) => {
  const [tab, setTab] = useState("trend");
  const [metric, setMetric] = useState("amount"); // amount | qnt

  const myMonthly = useMemo(
    () => (doc?.pastOrders ? monthlyFromOrders(doc.pastOrders) : []),
    [doc],
  );

  const series = useMemo(() => {
    if (!doc) return [];
    const me = {
      id: doc._id || "me",
      label: doc.label || doc.name?.label || doc.title?.label || "This",
      color: PALETTE[0],
      points: myMonthly.map((m) => ({ label: m.label, value: metric === "amount" ? m.amount : m.qnt })),
    };
    const others = (siblings || [])
      .filter((s) => s && s._id !== doc._id && s.pastOrders)
      .slice(0, 4)
      .map((s, i) => ({
        id: s._id,
        label: s.label || s.name?.label || s.title?.label || s._id,
        color: PALETTE[(i + 1) % PALETTE.length],
        points: monthlyFromOrders(s.pastOrders).map((m) => ({ label: m.label, value: metric === "amount" ? m.amount : m.qnt })),
      }));
    return [me, ...others];
  }, [doc, siblings, myMonthly, metric]);

  const channelBars = useMemo(() => {
    if (!doc?.pastOrders) return [];
    return groupOrdersBy(doc.pastOrders, (o) => o.channel?._id, (o) => o.channel?.name)
      .map((g) => ({
        id: g.key,
        label: g.label,
        value: metric === "amount" ? g.amount : g.qnt,
        color: CHANNEL_COLOR[g.key],
      }));
  }, [doc, metric]);

  const branchBars = useMemo(() => {
    if (!doc?.pastOrders) return [];
    return groupOrdersBy(doc.pastOrders, (o) => o.branch?._id, (o) => o.branch?.name)
      .map((g) => ({
        id: g.key,
        label: g.label,
        value: metric === "amount" ? g.amount : g.qnt,
      }));
  }, [doc, metric]);

  const revenueSeriesObj = useMemo(() => ({
    points: myMonthly.map((m) => ({ label: m.label, value: m.amount })),
  }), [myMonthly]);

  if (!doc?.pastOrders) {
    return (
      <section className="menuItem_field_modifiers">
        <h3 style={{
          margin: 0, fontSize: 12, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--menus-text-soft)",
        }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13, color: "var(--menus-text-soft)" }}>
          No past orders available yet.
        </p>
      </section>
    );
  }

  const tabs = [
    { key: "trend",    label: "Trend" },
    { key: "channels", label: "Channels" },
    { key: "branches", label: "Branches" },
    { key: "price",    label: "Price ↔ Revenue" },
  ];

  return (
    <section className="menuItem_field_modifiers" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <h3 style={{
          margin: 0, fontSize: 12, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--menus-text-soft)",
        }}>{title}</h3>
        <div style={{ display: "inline-flex", gap: 8 }}>
          <div className="menus_salesFilter" role="tablist" aria-label="Metric">
            {[{ key: "amount", label: "AED" }, { key: "qnt", label: "QNT" }].map((m) => (
              <button key={m.key} type="button"
                className={`menus_salesFilter_chip ${metric === m.key ? "active" : ""}`}
                onClick={() => setMetric(m.key)}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="menus_salesFilter" role="tablist" aria-label="Chart">
            {tabs.map((t) => (
              <button key={t.key} type="button"
                className={`menus_salesFilter_chip ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {tab === "trend" && (
        <Menus_chartV2
          title={TITLES_BY_KIND[kind] || "Trend"}
          series={series}
          currency={metric === "amount" ? "AED" : ""}
          height={240}
        />
      )}

      {tab === "channels" && (
        <Menus_chartBars
          title={`Sales by channel · ${metric === "amount" ? "AED" : "Units"}`}
          bars={channelBars}
          currency={metric === "amount" ? "AED" : ""}
        />
      )}

      {tab === "branches" && (
        <Menus_chartBars
          title={`Sales by branch · ${metric === "amount" ? "AED" : "Units"}`}
          bars={branchBars}
          currency={metric === "amount" ? "AED" : ""}
        />
      )}

      {tab === "price" && (
        <Menus_chartDualAxis
          title="Selling price vs revenue"
          priceSeries={priceSeries}
          revenueSeries={revenueSeriesObj}
          currency="AED"
          height={260}
        />
      )}
    </section>
  );
};

export default Menus_compareSection;
