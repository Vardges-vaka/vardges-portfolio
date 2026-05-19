import { Menus_modifier_table } from "../../../menus_tables/_menus_tables.index.js";
import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_modifiers.css";

const MenuItem_field_modifiers = ({
  states,
  handlers,
  childProps,
  t,
  menuItem,
}) => {
  if (!menuItem) return null;

  const { modifiers: modifiersList } = menuItem;
  const modifiers = modifiersList.map((modifier) => modifier.modifier);

  return (
    <div className="menuItem_field_modifiers">
      <h1>MenuItem_field_name</h1>
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

export default MenuItem_field_modifiers;
