import { Menus_table } from "../../menus_tables/_menus_tables.index.js";
import "../../../_styles/menus_childComps/menus/menus_view_all.css";

const Menus_view_all = ({ states, handlers, childProps, t }) => {
  let menus = states.menus;
  if (states.ownerType !== "both") {
    menus = states.menus.filter((item) => item.ownerType === states.ownerType);
  }
  return (
    <div className="menus_view_all">
      <Menus_table
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        menus={menus}
      />
    </div>
  );
};

export default Menus_view_all;
