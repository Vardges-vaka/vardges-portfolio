import { Menus_categories, Menus_menu_header } from "./_menus.index.js";

import "../../../_styles/menus_childComps/menus/menus_view_one.css";

const Menus_view_one = ({ states, handlers, childProps, t }) => {
  return (
    <div className="menus_view_one">
      <Menus_menu_header
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        menu={states.menu}
      />
      <p>states.menu.label: {states.menu.label}</p>
      <Menus_categories
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        categories={states.menu.categories}
      />
    </div>
  );
};

export default Menus_view_one;
