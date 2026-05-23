import { useState } from "react";
import "../../../_styles/menus_childComps/menus/menus_category_header.css";
import { Menus_collapse, Menus_iconUpdateBtn } from "../_menus_childComps.index.js";
import { Pencil } from "lucide-react";

/* ============================================================================
   Menus_category_header — header row for a category inside a single menu.

   v3: clicking the dropdown button toggles an editable info panel below the
   header showing description (short + long), owner, display order, and per-
   field update buttons.
============================================================================ */

const Menus_category_header = ({ states, handlers, childProps, t, category }) => {
  const [open, setOpen] = useState(false);
  if (!category) return null;

  return (
    <div>
      <div className="menus_category_header">
        <aside className="menus_category_header_aside">
          <p className="menus_category_header_label">{category.name?.label}</p>
          <p className="menus_category_header_menuItems">
            <span className="menus_category_header_menuItems_count">{category.menuItems?.length || 0}</span>
            <span className="menus_category_header_menuItems_label">Menu Items</span>
          </p>
        </aside>

        <div className="menus_category_header_timing">
          {category.activeTimings?.isAlwaysActive ? (
            <p className="menus_category_header_alwaysActive">Always Active</p>
          ) : (
            (category.activeTimings?.windows || []).map((window, i) => (
              <div key={i + 58}>
                <p className="menus_category_header_windowLabel">{window.label}</p>
                <span className="menus_category_header_windowTime_from">{window.from}</span>
                –
                <span className="menus_category_header_windowTime_to">{window.to}</span>
              </div>
            ))
          )}
        </div>

        <aside className="menus_category_header_actions">
          <button
            className="menus_category_header_button edit"
            onClick={() => handlers.handleEditCategory?.(category._id)}>
            Edit
          </button>
          <button
            className="menus_category_header_button dropdown"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}>
            {open ? "Less" : "More"}
          </button>
        </aside>
      </div>

      {open && (
        <div
          style={{
            padding: 14,
            background: "var(--menus-bg-elev)",
            border: "1px solid var(--menus-border-soft)",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
          }}>
          <FactField
            label="Owner"
            value={category.ownerType}
            onEdit={() => handlers.startFieldUpdate?.("ownerType", category)}
          />
          <FactField
            label="Display order"
            value={category.displayOrder ?? "—"}
            onEdit={() => handlers.startFieldUpdate?.("displayOrder", category)}
          />
          <FactField
            label="Active"
            value={category.isActive ? "Yes" : "No"}
            onEdit={() => handlers.toggleActive?.(category._id, !category.isActive)}
          />
          <FactField
            label="Description (short)"
            value={category.description?.short}
            wrap
            onEdit={() => handlers.startFieldUpdate?.("description.short", category)}
          />
          <FactField
            label="Description (long)"
            value={category.description?.long}
            wrap
            onEdit={() => handlers.startFieldUpdate?.("description.long", category)}
          />
          <FactField
            label="Created"
            value={`${category.createdBy || "—"}`}
            wrap
            readOnly
          />
          <FactField
            label="Updated"
            value={`${category.updatedBy || "—"}`}
            wrap
            readOnly
          />
        </div>
      )}
    </div>
  );
};

const FactField = ({ label, value, wrap, onEdit, readOnly }) => (
  <div className="menus_quickView_field">
    <span
      className="menus_quickView_field_label"
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
      {label}
      {!readOnly && onEdit && (
        <Menus_iconUpdateBtn icon={<Pencil size={14} />} tooltip={`Update ${label}`} onClick={onEdit} />
      )}
    </span>
    <span className={`menus_quickView_field_value ${wrap ? "wrap" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

export default Menus_category_header;
