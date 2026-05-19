import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_description.css";
import {
  User,
  Utensils,
  Star,
  ShoppingCart,
  Leaf,
  Info,
  Pencil,
} from "lucide-react";


const MenuItem_field_description = ({
  states,
  handlers,
  childProps,
  t,
  menuItem,
}) => {
  if (!menuItem) return null;
  return (
    <div className="menus_menuItem_view_one_topRight_description">
      <div className="menus_menuItem_view_one_topRight_description_label">
        <label>Describtions</label>
        <div className="menus_menuItem_view_one_topRight_controlls">
          <button title="Show website">
            <User size={20} />
          </button>
          {/* Utensils, Star, ShoppingCart, Leaf, Info  */}

          <button title="Show Aggrigator versions">
            <ShoppingCart size={20} />
          </button>
          <button title="Show google">
            <Star size={20} />
          </button>
          <button title="Edit">
            <Pencil size={20} />
          </button>
        </div>
      </div>
      <div className="menus_menuItem_view_one_topRight_description_versions">
        <div className="menus_menuItem_view_one_topRight_description_version short">
          <div className="menus_menuItem_view_one_topRight_description_version_label">
            <label>Short</label>
            <button title="Show Translations">
              <User size={20} />
            </button>
          </div>
          <textarea
            type="text"
            value={menuItem.description.short.en}
            className="menus_menuItem_view_one_topRight_description_textarea"
            rows={5}
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
        <div className="menus_menuItem_view_one_topRight_description_version long">
          <div className="menus_menuItem_view_one_topRight_description_version_label">
            <label>Long</label>
            <button title="Show Translations">
              <User size={20} />
            </button>
          </div>
          <textarea
            type="text"
            value={menuItem.description.long.en}
            rows={5}
            className="menus_menuItem_view_one_topRight_description_textarea"
            onChange={() => console.log("onchange", e)}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem_field_description;
