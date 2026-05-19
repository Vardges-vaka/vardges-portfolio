import {
  Menus_modifier_view_one,
  Menus_modifier_view_all,
} from "./menus_childComps/_menus_childComps.index.js";
import "../_styles/menus_session_modifier.css";

const Menus_session_modifier = ({ states, handlers, childProps, t }) => {
  const { mod_view_one_props, mod_view_all_props } = childProps;

  return (
    <div className="menus_session_modifier">
      {states.viewingType === "all" && (
        <Menus_modifier_view_all
          states={mod_view_all_props.states}
          handlers={mod_view_all_props.handlers}
          childProps={mod_view_all_props.childProps}
          t={mod_view_all_props.t}
        />
      )}
      {states.viewingType === "single" && (
        <Menus_modifier_view_one
          states={mod_view_one_props.states}
          handlers={mod_view_one_props.handlers}
          childProps={mod_view_one_props.childProps}
          t={mod_view_one_props.t}
        />
      )}
    </div>
  );
};

export default Menus_session_modifier;
