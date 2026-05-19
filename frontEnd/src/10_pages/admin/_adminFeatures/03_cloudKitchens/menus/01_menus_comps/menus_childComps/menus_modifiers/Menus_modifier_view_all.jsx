import { Menus_modifier_table } from "../../menus_tables/_menus_tables.index.js";
import "../../../_styles/menus_childComps/menus_modifiers/menus_modifier_view_all.css";

const Menus_modifier_view_all = ({ states, handlers, childProps, t }) => {
  let modifiers = states.modifiers;
  if (states.ownerType !== "both") {
    modifiers = states.modifiers.filter(
      (item) => item.ownerType === states.ownerType,
    );
  }
  return (
    <div className="menus_modifier_view_all">
      <Menus_modifier_table
        modifiers={modifiers}
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
      />
    </div>
  );
};

export default Menus_modifier_view_all;
