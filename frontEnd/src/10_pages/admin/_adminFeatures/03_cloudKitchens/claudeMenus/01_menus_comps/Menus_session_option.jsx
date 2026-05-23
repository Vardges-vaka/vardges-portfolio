import {
  Menus_option_view_one,
  Menus_option_view_all,
} from "./menus_childComps/_menus_childComps.index.js";
import "../_styles/menus_session_option.css";

const Menus_session_option = ({ states, handlers, childProps, t }) => {
  const { opt_view_one_props, opt_view_all_props } = childProps;
  

  return (
    <div className="menus_session_option">
      {states.viewingType === "all" && (
        <Menus_option_view_all
          states={opt_view_all_props.states}
          handlers={opt_view_all_props.handlers}
          childProps={opt_view_all_props.childProps}
          t={opt_view_all_props.t}
        />
      )}
      {states.viewingType === "single" && (
        <Menus_option_view_one
          states={opt_view_one_props.states}
          handlers={opt_view_one_props.handlers}
          childProps={opt_view_one_props.childProps}
          t={opt_view_one_props.t}
        />
      )}
    </div>
  );
};

export default Menus_session_option;
