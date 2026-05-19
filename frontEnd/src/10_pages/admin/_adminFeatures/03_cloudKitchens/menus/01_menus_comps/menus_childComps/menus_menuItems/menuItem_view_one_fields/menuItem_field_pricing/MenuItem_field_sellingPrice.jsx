import "../../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_pricing/menuItem_field_sellingPrice.css";
import { Pencil } from "lucide-react";

const MenuItem_field_sellingPrice = ({
  states,
  handlers,
  childProps,
  t,
  menuItem,
}) => {
  //
  //
  //
  if (!menuItem) return null;
  return (
    <div className="menuItem_field_sellingPrice">
      <div className="menuItem_field_sellingPrice_versions">
        <div className="menuItem_field_sellingPrice_version estimated">
          <label htmlFor="estimatedCost">Selling Price: Gross</label>
          <input
            type="number"
            name="estimatedCost"
            id="estimatedCost"
            value={menuItem.sellingPrice.gross}
            className="menuItem_field_sellingPrice_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="menuItem_field_sellingPrice_version actual">
          <label htmlFor="actualCost">Selling Price: Net</label>
          <input
            type="number"
            name="actualCost"
            id="actualCost"
            value={menuItem.sellingPrice.net}
            className="menuItem_field_sellingPrice_input"
            onChange={() => console.log("onchange", e)}
            viewOnly={true}
          />
        </div>
        <div className="menuItem_field_sellingPrice_version actual">
          <label htmlFor="actualCost">Selling Price: VAT</label>
          <input
            type="number"
            name="actualCost"
            id="actualCost"
            value={menuItem.sellingPrice.VAT}
            className="menuItem_field_sellingPrice_input"
            onChange={() => console.log("onchange", e)}
            viewOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem_field_sellingPrice;
