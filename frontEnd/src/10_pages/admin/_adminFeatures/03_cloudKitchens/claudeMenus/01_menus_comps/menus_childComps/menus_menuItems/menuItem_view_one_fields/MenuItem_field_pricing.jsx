import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_pricing.css";
import { User, Utensils, Star, ShoppingCart, Leaf, Pencil } from "lucide-react";
import {
  MenuItem_field_priceHistory,
  MenuItem_field_cost,
} from "./menuItem_field_pricing/_menuItem_field_pricing.index.js";
import { useState } from "react";
const MenuItem_field_pricing = ({
  states,
  handlers,
  childProps,
  t,
  menuItem,
}) => {
  const [showHistory, setSHowHistory] = useState(false);
  if (!menuItem) return null;
  return (
    <div className="menuItem_field_pricing">
      {/* <h2>Menu Item Pricing</h2> */}
      <div className="menuItem_field_pricing_label">
        <label>Selling Price</label>
        <div className="menuItem_field_pricing_controlls">
          <button title="Edit">
            <Pencil size={20} />
          </button>
        </div>
      </div>
      <MenuItem_field_cost
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        menuItem={menuItem}
      />

      {showHistory ? (
        <>
          <MenuItem_field_priceHistory
            states={states}
            handlers={handlers}
            childProps={childProps}
            t={t}
            menuItem={menuItem}
          />
          <div className="MenuItem_field_pricing_priceHistory_cnt">
            <button
              onClick={() => setSHowHistory(!showHistory)}
              className="MenuItem_field_pricing_priceHistory_btn">
              Show Price History
            </button>
          </div>
        </>
      ) : (
        <div className="MenuItem_field_pricing_priceHistory_cnt">
          <button
            onClick={() => setSHowHistory(!showHistory)}
            className="MenuItem_field_pricing_priceHistory_btn">
            Show Price History
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItem_field_pricing;
