import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_name.css";
import {
  User,
  Utensils,
  Star,
  ShoppingCart,
  Leaf,
  Info,
  Pencil,
} from "lucide-react";
const MenuItem_field_name = ({ states, handlers, childProps, t, menuItem }) => {
  if (!menuItem) return null;
  return (
    <div className="menus_menuItem_view_one_topRight_name">
      <div className="menus_menuItem_view_one_topRight_name_label">
        <label htmlFor="name">Name:</label>
        <div className="menus_menuItem_view_one_topRight_controlls">
          <button title="Show Translations">
            <User size={20} />
          </button>
          <button title="Show Aggrigator versions">
            <ShoppingCart size={20} />
          </button>
          <button title="Edit">
            <Pencil size={20} />
          </button>
        </div>
      </div>
      <input
        type="text"
        name="name"
        value={menuItem.name.label}
        className="menus_menuItem_view_one_topRight_name_input"
        onChange={() => console.log("onchange", e)}
        readOnly={true}
      />
    </div>
  );
};

export default MenuItem_field_name;
