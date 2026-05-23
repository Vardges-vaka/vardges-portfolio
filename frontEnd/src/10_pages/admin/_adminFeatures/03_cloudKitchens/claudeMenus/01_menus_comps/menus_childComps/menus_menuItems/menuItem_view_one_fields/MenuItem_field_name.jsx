import { useState } from "react";
import { ShoppingCart, Pencil, Globe } from "lucide-react";
import {
  Menus_iconUpdateBtn,
  Menus_translations,
} from "../../_menus_childComps.index.js";
import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_name.css";

/* ============================================================================
   MenuItem_field_name — the Name field with translation + aggregator versions
   toggled by the icon buttons.

   The icon controls:
     <Globe />        → open the translations panel
     <ShoppingCart /> → open the aggregator-versions panel
     <Pencil />       → enter per-field update mode for `name.label`
============================================================================ */

const MenuItem_field_name = ({ states, handlers, menuItem }) => {
  const [showTrans, setShowTrans] = useState(false);
  const [showAggr, setShowAggr] = useState(false);

  if (!menuItem) return null;

  const isUpdatingThis = states.updatingField === "name.label";
  const lockedByOther =
    !!states.isUpdating ||
    (!!states.updatingField && !isUpdatingThis);

  return (
    <div className="menus_menuItem_view_one_topRight_name">
      <div className="menus_menuItem_view_one_topRight_name_label">
        <label htmlFor="name">Name</label>
        <div className="menus_menuItem_view_one_topRight_controlls">
          <Menus_iconUpdateBtn
            icon={<Globe size={16} />}
            tooltip="Show translations"
            active={showTrans}
            onClick={() => setShowTrans((v) => !v)}
          />
          <Menus_iconUpdateBtn
            icon={<ShoppingCart size={16} />}
            tooltip="Aggregator versions"
            active={showAggr}
            onClick={() => setShowAggr((v) => !v)}
          />
          <Menus_iconUpdateBtn
            icon={<Pencil size={16} />}
            tooltip="Update Name"
            active={isUpdatingThis}
            disabled={lockedByOther}
            onClick={() => handlers.startFieldUpdate?.("name.label", menuItem.name.label)}
          />
        </div>
      </div>
      <input
        type="text"
        name="name"
        defaultValue={menuItem.name.label}
        className="menus_menuItem_view_one_topRight_name_input"
        readOnly={!isUpdatingThis}
      />
      {showTrans && (
        <Menus_translations
          title="Translations"
          data={menuItem.name.translations}
          readOnly={!isUpdatingThis}
        />
      )}
      {showAggr && (
        <Menus_translations
          title="Aggregator versions"
          data={menuItem.name.aggrigators}
          readOnly={!isUpdatingThis}
        />
      )}
    </div>
  );
};

export default MenuItem_field_name;
