import { useState, Fragment } from "react";
import "../../_styles/menus_childComps/menus/menus_view_all.css";
import { MENU_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import { formatDate } from "../../02_menus_helpers/_menus_helpers.index.js";
import {
  Menus_quickView,
  Menus_salesCell,
  Menus_salesFilter,
  Menus_ownerIcon,
  Menus_updatePopup,
  UPDATE_OPTIONS,
} from "../menus_childComps/_menus_childComps.index.js";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";
import { Pencil, Eye, ChevronDown } from "lucide-react";

/* ============================================================================
   Menus_table — "all menus" table.

   v3:
     - isActive column dropped; inactive rows sort to bottom + get .inactive
     - Owner column uses Menus_ownerIcon
     - Update / View / Quick are icon-only with Lucide icons
     - Update icon opens Menus_updatePopup with the per-session options
============================================================================ */

const getMenuItemQNT = (cats) =>
  cats.reduce((acc, c) => acc + c.menuItems.length, 0);
const getModifierQNT = (cats) => {
  const ids = new Set();
  cats.forEach((c) => c.menuItems.forEach((mi) => {
    mi.item?.modifiers?.forEach((mod) => mod.modifier?._id && ids.add(mod.modifier._id));
  }));
  return ids.size;
};
const getOptionsQNT = (cats) => {
  const ids = new Set();
  cats.forEach((c) => c.menuItems.forEach((mi) => {
    mi.item?.modifiers?.forEach((mod) =>
      mod.modifier?.options?.forEach((o) => o.option?._id && ids.add(o.option._id)));
  }));
  return ids.size;
};

const sortInactiveLast = (arr) => {
  const a = [], b = [];
  (arr || []).forEach((x) => (x?.isActive === false ? b : a).push(x));
  return [...a, ...b];
};

const iconBtn = (icon, title, onClick) => (
  <button
    type="button"
    className="menus_view_all_table_rows_provider_cell_button"
    title={title}
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30, height: 30, padding: 0, minWidth: 0,
    }}>
    {icon}
  </button>
);

const Menus_table = ({ states, handlers, childProps, t, menus }) => {
  // The constant still drives most columns; we just drop the "Status" header
  // and add the icon-only ownerType/update/view/dropdown headers manually.
  const rawHeaders = MENU_TBL_HDRS();
  const headers = rawHeaders.filter((h) => h.className !== "status");

  const [expandedId, setExpandedId] = useState(null);
  const [salesTimeframe, setSalesTimeframe] = useState("currentMonthSales");
  const [popup, setPopup] = useState(null); // { anchor, menu }

  const tfLabel =
    SALES_TIMEFRAMES.find((tf) => tf.key === salesTimeframe)?.label || "Sales";
  const ordered = sortInactiveLast(menus);
  const totalCols = headers.length + 1; // + Sales col

  return (
    <div className="menus_view_all">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: "10px 12px",
          borderBottom: "1px solid var(--menus-border-soft)",
          background: "color-mix(in srgb, var(--menus-bg-soft) 35%, transparent)",
        }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--menus-text-soft)",
          }}>
          Sales filter · {tfLabel}
        </span>
        <Menus_salesFilter value={salesTimeframe} onChange={setSalesTimeframe} />
      </div>
      <table className="menus_view_all_table">
        <thead>
          <tr>
            {headers.map((h) => {
              // Replace the ownerType header with an icon placeholder.
              if (h.className === "ownerType" && h.label === "Who Owns") {
                return (
                  <th key="ownerType" scope="col"
                    className="menus_view_all_table_header ownerType"
                    title="Owner">
                    <Menus_ownerIcon value="brand" />
                  </th>
                );
              }
              // Replace Update/View/Dropdown headers with icons.
              if (h.className === "update") {
                return (
                  <th key="update" scope="col"
                    className="menus_view_all_table_header update" title="Update">
                    <span className="menus_iconHeader"><Pencil size={16} /></span>
                  </th>
                );
              }
              if (h.className === "view") {
                return (
                  <th key="view" scope="col"
                    className="menus_view_all_table_header view" title="View">
                    <span className="menus_iconHeader"><Eye size={16} /></span>
                  </th>
                );
              }
              if (h.className === "dropdown") {
                return (
                  <th key="dropdown" scope="col"
                    className="menus_view_all_table_header dropdown" title="Quick look">
                    <span className="menus_iconHeader"><ChevronDown size={16} /></span>
                  </th>
                );
              }
              return (
                <th
                  key={`menus_view_all_table_header ${h.label}`}
                  scope="col"
                  className={`menus_view_all_table_header ${h.className}`}
                  title={h.title}>
                  {h.label}
                </th>
              );
            })}
            <th scope="col" className="menus_view_all_table_header sales"
              title={`Sales — ${tfLabel}`}>Sales</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((menu, rowIndex) => {
            const isOpen = expandedId === menu._id;
            return (
              <Fragment key={menu._id}>
                <tr
                  className={`menus_view_all_table_rows_provider ${menu.isActive === false ? "inactive" : ""}`}>
                  <td className="menus_view_all_table_rows_provider_cell">{rowIndex + 1}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.label}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.description}</td>
                  <td className="menus_view_all_table_rows_provider_cell ownerType"
                    title={menu.ownerType}>
                    <Menus_ownerIcon value={menu.ownerType} />
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">{menu.categories.length}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{getMenuItemQNT(menu.categories)}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{getModifierQNT(menu.categories)}</td>
                  <td className="menus_view_all_table_rows_provider_cell">{getOptionsQNT(menu.categories)}</td>
                  <td className="menus_view_all_table_rows_provider_cell">15,150 | 85</td>
                  <td className="menus_view_all_table_rows_provider_cell createdBy">{menu.createdBy}</td>
                  <td className="menus_view_all_table_rows_provider_cell createdAt">{formatDate(menu.createdAt)}</td>
                  <td className="menus_view_all_table_rows_provider_cell updatedBy">{menu.updatedBy}</td>
                  <td className="menus_view_all_table_rows_provider_cell updatedAt">{formatDate(menu.updatedAt)}</td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    {iconBtn(
                      <Pencil size={14} />,
                      "Update",
                      (e) => setPopup({ anchor: e.currentTarget.getBoundingClientRect(), menu }),
                    )}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    {iconBtn(<Eye size={14} />, "View", () => handlers.handleViewAll(menu._id))}
                  </td>
                  <td
                    className="menus_view_all_table_rows_provider_cell"
                    data-quickview-open={isOpen ? "true" : "false"}>
                    {iconBtn(
                      <ChevronDown size={14} />,
                      isOpen ? "Close" : "Quick look",
                      () => setExpandedId(isOpen ? null : menu._id),
                    )}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell sales">
                    <Menus_salesCell sales={menu[salesTimeframe]} />
                  </td>
                </tr>
                <Menus_quickView
                  open={isOpen}
                  colSpan={totalCols}
                  fields={[
                    { label: "Owner", value: menu.ownerType },
                    { label: "Status", value: menu.isActive ? "Active" : "Inactive" },
                    { label: "Categories", value: menu.categories.length },
                    { label: "Created", value: `${menu.createdBy} · ${formatDate(menu.createdAt)}` },
                    { label: "Updated", value: `${menu.updatedBy} · ${formatDate(menu.updatedAt)}` },
                    { label: "Description", value: menu.description, wrap: true },
                  ]}
                  actions={
                    <button
                      className="menus_view_all_table_rows_provider_cell_button"
                      onClick={() => handlers.handleViewAll(menu._id)}>
                      Open full view
                    </button>
                  }
                />
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <Menus_updatePopup
        open={!!popup}
        anchorRect={popup?.anchor}
        options={UPDATE_OPTIONS.menu}
        isActive={popup?.menu?.isActive}
        onPick={(key) => {
          if (key === "updateAll") handlers.handleUpdateAll(popup.menu._id);
          else handlers.startFieldUpdate?.(key, popup.menu);
        }}
        onToggleActive={() =>
          handlers.toggleActive?.(popup.menu._id, !popup.menu.isActive)
        }
        onClose={() => setPopup(null)}
      />
    </div>
  );
};

export default Menus_table;
