import { useMemo } from "react";
import { Menus_chart } from "../../../_menus_childComps.index.js";
import { pricePoints } from "../../../../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";
import "../../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_pricing/menuItem_field_priceHistory.css";

/* ============================================================================
   MenuItem_field_priceHistory — chart of how the menu item's selling price has
   moved over the last ~14 sample points.

   Source of points (in order of preference):
     1. menuItem.priceHistory (array of { from, to, gross })
     2. Synthesized via pricePoints(_id, sellingPrice.gross) for items whose
        priceHistory is empty so we still have something to show.
============================================================================ */

const MenuItem_field_priceHistory = ({ menuItem }) => {
  const series = useMemo(() => {
    if (!menuItem) return [];

    // Prefer the real recorded history when it has data points.
    const raw = menuItem.priceHistory;
    if (Array.isArray(raw) && raw.length > 1) {
      return raw.map((r, i) => ({
        label:
          (r.from || `t${i}`).slice
            ? String(r.from || "").slice(0, 7)
            : String(r.from || `t${i}`),
        value: r.gross,
      }));
    }

    // Fall back to a deterministic synthetic series so the chart looks alive.
    const base = menuItem.sellingPrice?.gross ?? 40;
    return pricePoints(menuItem._id, base).map((p) => ({
      label: p.label,
      value: p.gross,
    }));
  }, [menuItem]);

  if (!menuItem) return null;

  return (
    <div className="menuItem_field_priceHistory">
      <Menus_chart
        title="Price history"
        points={series}
        currency="AED"
        height={180}
        showDelta
      />
    </div>
  );
};

export default MenuItem_field_priceHistory;
