import { useState } from "react";
import { Pencil } from "lucide-react";
import "../../../_styles/menus_childComps/menus/menus_menu_header.css";
import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";
import { Menus_iconUpdateBtn } from "../_menus_childComps.index.js";

/* ============================================================================
   Menus_menu_header — header card for a single Menu document.

   Renders every Menu field with its own icon-only update button. The button
   becomes disabled when the top-level "Update all" is engaged (states.isUpdating).
============================================================================ */

const FieldRow = ({ label, value, fieldKey, multiline, locked, isEditing, onEdit }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "9rem minmax(0, 1fr) auto",
      alignItems: "center",
      gap: 12,
      padding: "8px 0",
      borderBottom: "1px dashed color-mix(in srgb, var(--menus-border-soft) 60%, transparent)",
    }}>
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--menus-text-soft)",
      }}>
      {label}
    </span>
    {multiline ? (
      <textarea
        defaultValue={value}
        readOnly={!isEditing}
        rows={2}
        className="menus_menuItem_view_one_topRight_description_textarea"
      />
    ) : (
      <input
        defaultValue={value}
        readOnly={!isEditing}
        className="menus_menuItem_view_one_topRight_name_input"
        style={{ fontSize: 14, fontWeight: 500 }}
      />
    )}
    <Menus_iconUpdateBtn
      icon={<Pencil size={16} />}
      tooltip={`Update ${label}`}
      active={isEditing}
      disabled={locked && !isEditing}
      onClick={onEdit}
    />
  </div>
);

const Menus_menu_header = ({ states, handlers, menu }) => {
  if (!menu) return null;

  const locked = !!states?.isUpdating;
  const editing = (k) => states?.updatingField === k;
  const start = (k, v) => handlers?.startFieldUpdate?.(k, v);

  return (
    <div className="Menus_menu_header">
      <h1>{menu.label}</h1>

      <FieldRow
        label="Label"
        value={menu.label}
        fieldKey="label"
        locked={locked}
        isEditing={editing("label")}
        onEdit={() => start("label", menu.label)}
      />
      <FieldRow
        label="Description"
        value={menu.description}
        fieldKey="description"
        multiline
        locked={locked}
        isEditing={editing("description")}
        onEdit={() => start("description", menu.description)}
      />
      <FieldRow
        label="Owner Type"
        value={menu.ownerType}
        fieldKey="ownerType"
        locked={locked}
        isEditing={editing("ownerType")}
        onEdit={() => start("ownerType", menu.ownerType)}
      />
      <FieldRow
        label="Status"
        value={menu.isActive ? "Active" : "Inactive"}
        fieldKey="isActive"
        locked={locked}
        isEditing={editing("isActive")}
        onEdit={() => start("isActive", menu.isActive)}
      />
      <p>Created By: -- {menu.createdBy}</p>
      <p>Created At: -- {formatDate(menu.createdAt)}</p>
      <p>Updated By: -- {menu.updatedBy}</p>
      <p>Updated At: -- {formatDate(menu.updatedAt)}</p>
    </div>
  );
};

export default Menus_menu_header;
