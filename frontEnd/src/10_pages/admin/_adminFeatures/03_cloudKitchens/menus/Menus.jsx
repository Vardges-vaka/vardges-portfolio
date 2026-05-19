import { useMenus } from "./03_menus_hooks/_menus_hooks.index.js";
import {
  Menus_sessionToggle,
  Menus_session_menu,
  Menus_session_menuItem,
  Menus_session_modifier,
  Menus_session_option,
  Menus_confirmModal_fieldUpdate,
} from "./01_menus_comps/_menus_comps.index.js";
import "./_styles/menus.css";

// temporary just to see quickly how it works
const OPERATION_TYPES = ["viewing", "adding", "updating", "deleting"];
const SESSIONS_TYPES = ["menus", "categories", "items", "modifiers", "options"];
const VALID_VIEWING_SESSIONS = ["menus", "items", "modifiers", "options"];
const Menus = () => {
  const { states, childProps, handlers } = useMenus();
  const {
    sess_Toggle_props,
    sess_menu_props,
    sess_menuItem_props,
    sess_modifier_props,
    sess_option_props,
    confirmModal_fieldUpdate_props,
  } = childProps;

  return (
    <div className="menus">
      <Menus_sessionToggle
        states={sess_Toggle_props.states}
        handlers={sess_Toggle_props.handlers}
        childProps={sess_Toggle_props.childProps}
        t={sess_Toggle_props.t}
      />
      {states.session === "menus" && (
        <Menus_session_menu
          states={sess_menu_props.states}
          handlers={sess_menu_props.handlers}
          childProps={sess_menu_props.childProps}
          t={sess_menu_props.t}
        />
      )}
      {states.session === "items" && (
        <Menus_session_menuItem
          states={sess_menuItem_props.states}
          handlers={sess_menuItem_props.handlers}
          childProps={sess_menuItem_props.childProps}
          t={sess_menuItem_props.t}
        />
      )}
      {states.session === "modifiers" && (
        <Menus_session_modifier
          states={sess_modifier_props.states}
          handlers={sess_modifier_props.handlers}
          childProps={sess_modifier_props.childProps}
          t={sess_modifier_props.t}
        />
      )}
      {states.session === "options" && (
        <Menus_session_option
          states={sess_option_props.states}
          handlers={sess_option_props.handlers}
          childProps={sess_option_props.childProps}
          t={sess_option_props.t}
        />
      )}
      <Menus_confirmModal_fieldUpdate
        states={confirmModal_fieldUpdate_props.states}
        handlers={confirmModal_fieldUpdate_props.handlers}
        t={confirmModal_fieldUpdate_props.t}
      />
    </div>
  );
};

export default Menus;
