import "../../../_styles/competitors_table_row_menuQty.css";
import { getCompetitorMenuCategoriesCount } from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_table_row_menuCategoryQty = ({ competitor }) => {
  const n = getCompetitorMenuCategoriesCount(competitor?.menu);

  return (
    <div className="Competitors_table_row_menuQty">
      <span className="Competitors_table_row_menuQty_count">
        {n == null ? "—" : n}
      </span>
    </div>
  );
};

export default Competitors_table_row_menuCategoryQty;
