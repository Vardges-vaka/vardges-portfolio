import "../../_styles/menus_childComps/menus_charts.css";

/* ============================================================================
   Menus_salesCell — compact "amount (AED) × qnt" cell for tables.

   props:
   - sales: { amount, qnt }   one timeframe slice
   - currency: string         default "AED"
============================================================================ */

const fmt = (n) =>
  n == null
    ? "—"
    : Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { maximumFractionDigits: 2 });

const Menus_salesCell = ({ sales, currency = "AED" }) => {
  if (!sales) return <span className="menus_salesCell">—</span>;
  return (
    <span className="menus_salesCell">
      <span className="menus_salesCell_amount">
        <span className="menus_salesCell_currency">{currency}</span>
        {fmt(sales.amount)}
      </span>
      <span className="menus_salesCell_qnt">{fmt(sales.qnt)}</span>
    </span>
  );
};

export default Menus_salesCell;
