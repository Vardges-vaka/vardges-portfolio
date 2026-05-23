import {
  Menus_view_one,
  Menus_view_all,
} from "./menus_childComps/_menus_childComps.index.js";

import "../_styles/menus_session_menu.css";

const Menus_session_menu = ({ states, handlers, childProps, t }) => {
  const { mn_view_one_props, mn_view_all_props } = childProps;
  // console.log("Menus_session_menu_states.menus:", states.menus);
  return (
    <div className="menus_session_menu">
      {states.viewingType === "all" && (
        <Menus_view_all
          states={mn_view_all_props.states}
          handlers={mn_view_all_props.handlers}
          childProps={mn_view_all_props.childProps}
          t={mn_view_all_props.t}
        />
      )}
      {states.viewingType === "single" && (
        <Menus_view_one
          states={mn_view_one_props.states}
          handlers={mn_view_one_props.handlers}
          childProps={mn_view_one_props.childProps}
          t={mn_view_one_props.t}
        />
      )}
    </div>
  );
};

export default Menus_session_menu;
