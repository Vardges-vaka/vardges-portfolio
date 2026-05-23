import "../../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_pricing/menuItem_field_cost.css";

const MenuItem_field_cost = ({ states, handlers, childProps, t, menuItem }) => {
  if (!menuItem) return null;
  return (
    <div className="MenuItem_field_cost">
      <div className="MenuItem_field_cost_versions">
        <div className="MenuItem_field_cost_version estimated">
          <label htmlFor="estimatedCost">Cost:Estimated</label>
          <input
            type="number"
            name="estimatedCost"
            id="estimatedCost"
            value={menuItem.cost.estimatedCost}
            className="MenuItem_field_cost_input"
            readOnly={true}
          />
        </div>
        <div className="MenuItem_field_cost_version actual">
          <label htmlFor="actualCost">Cost: Actual</label>
          <input
            type="number"
            name="actualCost"
            id="actualCost"
            value={menuItem.cost.actualCost}
            className="MenuItem_field_cost_input"
            readOnly={true}
          />
        </div>
        <div className="MenuItem_field_cost_version estimated">
          <label htmlFor="estimatedCost">Selling Price: Gross</label>
          <input
            type="number"
            name="estimatedCost"
            id="estimatedCost"
            value={menuItem.sellingPrice.gross}
            className="MenuItem_field_cost_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="MenuItem_field_cost_version actual">
          <label htmlFor="actualCost">Selling Price: Net</label>
          <input
            type="number"
            name="actualCost"
            id="actualCost"
            value={menuItem.sellingPrice.net}
            className="MenuItem_field_cost_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="MenuItem_field_cost_version actual">
          <label htmlFor="actualCost">Selling Price: VAT</label>
          <input
            type="number"
            name="actualCost"
            id="actualCost"
            value={menuItem.sellingPrice.VAT}
            className="MenuItem_field_cost_input"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem_field_cost;
