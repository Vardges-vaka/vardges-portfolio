import { useState, Fragment } from "react";
import "../../_styles/menus_childComps/menus/menus_view_all.css";
import { MENU_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import { formatDate } from "../../02_menus_helpers/_menus_helpers.index.js";
import { Menus_quickView } from "../menus_childComps/_menus_childComps.index.js";
import { Menus_salesCell, Menus_salesFilter } from "../menus_childComps/_menus_childComps.index.js";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_table — top-level "all menus" table with expandable Quick-view rows.

   Clicking the "Dropdown" column toggles a row insertion below the row that
   shows the most important fields and a few section panels. Click "View" or
   the "Open full view" button inside to navigate to view_one.
============================================================================ */

const getMenuItemQNT = (menuCategories) =>
  menuCategories.reduce((acc, c) => acc + c.menuItems.length, 0);

const getModifierQNT = (menuCategories) => {
  const ids = new Set();
  menuCategories.forEach((c) => c.menuItems.forEach((mi) => {
    mi.item?.modifiers?.forEach((mod) => mod.modifier?._id && ids.add(mod.modifier._id));
  }));
  return ids.size;
};

const getOptionsQNT = (menuCategories) => {
  const ids = new Set();
  menuCategories.forEach((c) => c.menuItems.forEach((mi) => {
    mi.item?.modifiers?.forEach((mod) => mod.modifier?.options?.forEach((o) => o.option?._id && ids.add(o.option._id)));
  }));
  return ids.size;
};

const Menus_table = ({ states, handlers, childProps, t, menus }) => {
  const TableHeaders = MENU_TBL_HDRS();
  const [expandedId, setExpandedId] = useState(null);
  const [salesTimeframe, setSalesTimeframe] = useState("currentMonthSales");

  return (
    <div className="menus_view_all">
      <table className="menus_view_all_table">
        <thead>
          <tr>
            {TableHeaders.map((h) => (
              <th
                key={`menus_view_all_table_header ${h.label}`}
                scope="col"
                className={`menus_view_all_table_header ${h.className}`}
                title={h.title}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {menus?.map((menu, rowIndex) => {
            const categoryQNT = menu.categories.length;
            const menuItemQNT = getMenuItemQNT(menu.categories);
            const modifierQNT = getModifierQNT(menu.categories);
            const optionsQNT = getOptionsQNT(menu.categories);
            const isOpen = expandedId === menu._id;

            return (
              <Fragment key={menu._id}>
                <tr className="menus_view_all_table_rows_provider">
                  <td className="menus_view_all_table_rows_provider_cell">{rowIndex + 1}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.label}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.isActive ? "Active" : "Inactive"}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.description}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.ownerType}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{categoryQNT}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menuItemQNT}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{modifierQNT}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{optionsQNT}</td>
                  <td className="menus_view_all_table_rows_provider_cell">15,150 | 85</td>
                  <td className="menus_view_all_table_rows_provider_cell createdBy">{menu.createdBy}</td>
                  <td className="menus_view_all_table_rows_provider_cell createdAt">{formatDate(menu.createdAt)}</td>
                  <td className="menus_view_all_table_rows_provider_cell updatedBy">{menu.updatedBy}</td>
                  <td className="menus_view_all_table_rows_provider_cell updatedAt">{formatDate(menu.updatedAt)}</td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    <button
                      className="menus_view_all_table_rows_provider_cell_button"
                      onClick={() => handlers.handleUpdateAll(menu._id)}>
                      Update
                    </button>
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    <button
                      className="menus_view_all_table_rows_provider_cell_button"
                      onClick={() => handlers.handleViewAll(menu._id)}>
                      View
                    </button>
                  </td>
                  <td
                    className="menus_view_all_table_rows_provider_cell"
                    data-quickview-open={isOpen ? "true" : "false"}>
                    <button
                      className="menus_view_all_table_rows_provider_cell_button dropdown"
                      onClick={() => setExpandedId(isOpen ? null : menu._id)}
                      aria-expanded={isOpen}>
                      {isOpen ? "Close" : "Quick"}
                    </button>
                  </td>
                </tr>
                <Menus_quickView
                  open={isOpen}
                  colSpan={TableHeaders.length}
                  fields={[
                    { label: "Owner", value: menu.ownerType },
                    { label: "Status", value: menu.isActive ? "Active" : "Inactive" },
                    { label: "Categories", value: categoryQNT },
                    { label: "Menu items", value: menuItemQNT },
                    { label: "Modifiers", value: modifierQNT },
                    { label: "Options", value: optionsQNT },
                    { label: "Created", value: `${menu.createdBy} · ${formatDate(menu.createdAt)}` },
                    { label: "Updated", value: `${menu.updatedBy} · ${formatDate(menu.updatedAt)}` },
                    { label: "Description", value: menu.description, wrap: true },
                  ]}
                  sections={[
                    {
                      title: "Categories included",
                      body: (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {menu.categories.map((c) => (
                            <span key={c._id} className="menus_pill">
                              {c?.name?.label || c?._id}
                            </span>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  actions={
                    <>
                      <button
                        className="menus_view_all_table_rows_provider_cell_button"
                        onClick={() => handlers.handleViewAll(menu._id)}>
                        Open full view
                      </button>
                      <button
                        className="menus_view_all_table_rows_provider_cell_button"
                        onClick={() => handlers.handleUpdateAll(menu._id)}>
                        Update
                      </button>
                    </>
                  }
                />
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Menus_table;
