import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_cost.css";
import {
  User,
  Utensils,
  Star,
  ShoppingCart,
  Leaf,
  Info,
  Pencil,
} from "lucide-react";
const MenuItem_field_cost = ({ states, handlers, childProps, t, menuItem }) => {
  if (!menuItem) return null;
  return (
    <div className="MenuItem_field_cost">
      <div className="MenuItem_field_cost_label">
        <label>Cost</label>
        <div className="MenuItem_field_cost_controlls">
          <button title="Edit">
            <Pencil size={20} />
          </button>
        </div>
      </div>
      <div className="MenuItem_field_cost_versions">
        <div className="MenuItem_field_cost_version estimated">
          <label htmlFor="estimatedCost">Estimated</label>
          <input
            type="number"
            name="estimatedCost"
            id="estimatedCost"
            value={menuItem.cost.estimatedCost}
            className="MenuItem_field_cost_input"
            onChange={(e) => handlers.handleCostChange(e, "estimatedCost")}
            readOnly={true}
          />
        </div>
        <div className="MenuItem_field_cost_version actual">
          <label htmlFor="actualCost">Actual</label>
          <input
            type="number"
            name="actualCost"
            id="actualCost"
            value={menuItem.cost.actualCost}
            className="MenuItem_field_cost_input"
            onChange={(e) => handlers.handleCostChange(e, "actualCost")}
            viewOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem_field_cost;
