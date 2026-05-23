import { Menus_option_table } from "../../menus_tables/_menus_tables.index.js";
import "../../../_styles/menus_childComps/menus_options/menus_option_view_all.css";

const Menus_option_view_all = ({ states, handlers, childProps, t }) => {
  let options = states?.options;
  if (states.ownerType !== "both") {
    options = states.options.filter(
      (item) => item.ownerType === states.ownerType,
    );
  }

  return (
    <div className="menus_option_view_all">
      <Menus_option_table
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        options={options}
      />
    </div>
  );
};

export default Menus_option_view_all;
