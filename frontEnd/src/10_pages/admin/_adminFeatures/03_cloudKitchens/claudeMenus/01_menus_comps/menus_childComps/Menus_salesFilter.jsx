import "../../_styles/menus_childComps/menus_charts.css";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_salesFilter — segmented chip-group to pick a sales timeframe.

   props:
   - value: timeframe key                   (e.g. "currentMonthSales")
   - onChange: (key) => void
   - timeframes: optional override array    (defaults to all 8)
============================================================================ */

const Menus_salesFilter = ({ value, onChange, timeframes = SALES_TIMEFRAMES }) => {
  return (
    <div className="menus_salesFilter" role="tablist" aria-label="Sales timeframe">
      {timeframes.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={value === t.key}
          className={`menus_salesFilter_chip ${value === t.key ? "active" : ""}`}
          onClick={() => onChange?.(t.key)}
          title={t.label}>
          {t.short}
        </button>
      ))}
    </div>
  );
};

export default Menus_salesFilter;
