import { useState, Fragment } from "react";
import { NEW_MENU_MENUS_HEADERS } from "../../05_newMenu_cnst/_newMenu_cnst.index.js";
import { formatDate, getMenuStats } from "../../02_newMenu_helpers/_newMenu_helpers.index.js";
import NewMenu_quickView from "./NewMenu_quickView.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import "../../_styles/newMenu_table.css";

/* ============================================================================
   NewMenu_table_menus — list view for the Menus session.

   Props (flat):
     menus           — array of menu objects to render
     onView(id)      — open the single-menu view
     onUpdate(id)    — open single-menu view in update mode
     t               — translation function
============================================================================ */
const NewMenu_table_menus = ({ menus = [], onView, onUpdate, t }) => {
  const [expandedId, setExpandedId] = useState(null);
  const tr = (k, fb) => (t ? t(`tables.${k}`, { defaultValue: fb }) : fb);

  return (
    <div className="NewMenu_table_wrap">
      <table className="NewMenu_table NewMenu_table_menus">
        <thead>
          <tr>
            {NEW_MENU_MENUS_HEADERS.map((h) => (
              <th key={h.key} scope="col" className={`NewMenu_table_header NewMenu_table_header_${h.className}`} title={h.title}>
                {tr(h.key, h.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {menus.map((menu, idx) => {
            const stats = getMenuStats(menu);
            const isOpen = expandedId === menu._id;
            return (
              <Fragment key={menu._id}>
                <tr className="NewMenu_table_row">
                  <td className="NewMenu_table_cell NewMenu_table_cell_idx">{idx + 1}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_label"><strong>{menu.label}</strong></td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_status">
                    {menu.isActive
                      ? <NewMenu_pill tone="success">{tr("active", "Active")}</NewMenu_pill>
                      : <NewMenu_pill tone="muted">{tr("inactive", "Inactive")}</NewMenu_pill>}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_description">{menu.description}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_owner">
                    <NewMenu_ownerBadge value={menu.ownerType} />
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_categories">{stats.categories}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_items">{stats.items}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_modifiers">{stats.modifiers}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_options">{stats.options}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_createdBy">{menu.createdBy || "—"}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_createdAt">{formatDate(menu.createdAt)}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_updatedBy">{menu.updatedBy || "—"}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_updatedAt">{formatDate(menu.updatedAt)}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_update">
                    <button type="button" className="NewMenu_table_btn" data-id={menu._id} onClick={onUpdate}>
                      {tr("update", "Update")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_view">
                    <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={menu._id} onClick={onView}>
                      {tr("view", "View")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_dropdown">
                    <button
                      type="button"
                      className="NewMenu_table_btn"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedId(isOpen ? null : menu._id)}>
                      {isOpen ? tr("close", "Close") : tr("quick", "Quick")}
                    </button>
                  </td>
                </tr>
                <NewMenu_quickView
                  open={isOpen}
                  colSpan={NEW_MENU_MENUS_HEADERS.length}
                  fields={[
                    { label: tr("owner", "Owner"), value: menu.ownerType },
                    { label: tr("status", "Status"), value: menu.isActive ? tr("active", "Active") : tr("inactive", "Inactive") },
                    { label: tr("categories", "Categories"), value: stats.categories },
                    { label: tr("items", "Items"), value: stats.items },
                    { label: tr("modifiers", "Modifiers"), value: stats.modifiers },
                    { label: tr("options", "Options"), value: stats.options },
                    { label: tr("createdBy", "Created by"), value: menu.createdBy, wrap: true },
                    { label: tr("updatedBy", "Updated by"), value: menu.updatedBy, wrap: true },
                    { label: tr("description", "Description"), value: menu.description, wrap: true },
                  ]}
                  sections={[
                    {
                      title: tr("categoriesIncluded", "Categories included"),
                      body: (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {(menu.categories || []).map((c) => (
                            <NewMenu_pill key={c._id} title={c._id}>
                              {c?.name?.label || c?._id}
                            </NewMenu_pill>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                  actions={
                    <>
                      <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={menu._id} onClick={onView}>
                        {tr("openFull", "Open full view")}
                      </button>
                      <button type="button" className="NewMenu_table_btn" data-id={menu._id} onClick={onUpdate}>
                        {tr("update", "Update")}
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

export default NewMenu_table_menus;
