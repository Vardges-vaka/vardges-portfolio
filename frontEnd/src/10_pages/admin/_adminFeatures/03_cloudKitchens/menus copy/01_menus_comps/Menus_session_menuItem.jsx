import {
  Menus_menuItem_view_one,
  Menus_menuItem_view_all,
} from "./menus_childComps/_menus_childComps.index.js";
import "../_styles/menus_session_menuItem.css";

const Menus_session_menuItem = ({ states, handlers, childProps, t }) => {
  const { mnItem_view_one_props, mnItem_view_all_props } = childProps;

  return (
    <div className="menus_session_menuItem">
      {states.viewingType === "all" && (
        <Menus_menuItem_view_all
          states={mnItem_view_all_props.states}
          handlers={mnItem_view_all_props.handlers}
          childProps={mnItem_view_all_props.childProps}
          t={mnItem_view_all_props.t}
        />
      )}
      {states.viewingType === "single" && (
        <Menus_menuItem_view_one
          states={mnItem_view_one_props.states}
          handlers={mnItem_view_one_props.handlers}
          childProps={mnItem_view_one_props.childProps}
          t={mnItem_view_one_props.t}
        />
      )}
    </div>
  );
};

export default Menus_session_menuItem;
