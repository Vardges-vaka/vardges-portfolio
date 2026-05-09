import "../../../_styles/competitors_table_row_menuQty.css";
import { getCompetitorMenuItemsCount } from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_table_row_menuItemQty = ({ competitor }) => {
  const n = getCompetitorMenuItemsCount(competitor?.menu);

  return (
    <div className="competitors_table_row_menuQty">
      <span className="competitors_table_row_menuQty__count">
        {n == null ? "—" : n}
      </span>
    </div>
  );
};

export default Competitors_table_row_menuItemQty;
