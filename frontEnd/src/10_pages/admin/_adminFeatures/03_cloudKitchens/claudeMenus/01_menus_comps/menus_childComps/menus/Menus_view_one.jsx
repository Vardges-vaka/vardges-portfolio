import { Menus_categories, Menus_menu_header } from "./_menus.index.js";
import { Menus_collapse, Menus_salesSection, Menus_compareSection } from "../_menus_childComps.index.js";
import "../../../_styles/menus_childComps/menus/menus_view_one.css";

/* ============================================================================
   Menus_view_one — single-menu detail.

   v3:
     - The menu header card is wrapped in a Menus_collapse
     - Sales Performance is its own Menus_collapse
     - Comparison panel is a separate Menus_compareSection
     - Categories (unchanged) render below
============================================================================ */
const Menus_view_one = ({ states, handlers, childProps, t }) => {
  const menu = states.menu;
  if (!menu) return null;

  const breakdown = (menu.categories || [])
    .map((c) => ({
      label: c?.name?.label || c?._id,
      value: c?.currentMonthSales?.amount ?? 0,
    }));

  return (
    <div className="menus_view_one">
      <Menus_collapse
        title={`${menu.label}`}
        subtitle="Menu · header"
        defaultOpen={true}>
        <Menus_menu_header
          states={states}
          handlers={handlers}
          childProps={childProps}
          t={t}
          menu={menu}
        />
      </Menus_collapse>

      <Menus_collapse
        title="Sales performance"
        subtitle="Trends · channels · branches"
        defaultOpen={true}>
        <Menus_salesSection doc={menu} title="Sales performance" breakdown={breakdown} />
      </Menus_collapse>

      <Menus_collapse
        title="Comparisons"
        subtitle="Menu vs categories · channels · branches · price ↔ revenue"
        defaultOpen={false}>
        <Menus_compareSection
          doc={menu}
          kind="menu"
          siblings={menu.categories || []}
          title="Menu vs its categories"
        />
      </Menus_collapse>

      <Menus_categories
        states={states}
        handlers={handlers}
        childProps={childProps}
        t={t}
        categories={menu.categories}
      />
    </div>
  );
};

export default Menus_view_one;
