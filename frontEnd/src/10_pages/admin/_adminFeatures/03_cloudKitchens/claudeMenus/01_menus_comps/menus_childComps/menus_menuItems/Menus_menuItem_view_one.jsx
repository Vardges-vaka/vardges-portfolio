import { useState } from "react";
import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";
import {
  MenuItem_field_name,
  MenuItem_field_description,
  MenuItem_field_pricing,
  MenuItem_field_images,
  MenuItem_field_nutrition,
  MenuItem_field_modifiers,
} from "./menuItem_view_one_fields/_menuItem_view_one_fields.index.js";
import {
  Menus_filePreview,
  Menus_dropZone,
  Menus_collapse,
  Menus_salesSection,
  Menus_compareSection,
  Menus_mirroredTable,
  Menus_competesTable,
  Menus_fileViewer,
  Menus_iconUpdateBtn,
} from "../_menus_childComps.index.js";
import { Pencil } from "lucide-react";
import "../../../_styles/menus_childComps/menus_menuItems/menus_menuItem_view_one.css";

/* ============================================================================
   Menus_menuItem_view_one (v3)

   Sections in order, each in its own Menus_collapse:
     1. Top split — image stack + name/description/pricing/nutrition
     2. Sales performance
     3. Comparisons (item vs siblings + mirrored + channels/branches)
     4. Product attributes — Cuisine, Station, Size, Spicy, Prep, Dietary, Allergens
     5. System & metadata — SKU, Owner, External ID, Source, Cloud, Created/Updated
     6. Attached modifiers
     7. Mirrored with other menu items (separate component, table)
     8. Competes with other menu items (separate component, table)
     9. Files — drop zone only when "Update files" mode is on; click any file
        to open the viewer with download.
============================================================================ */

const FactCell = ({ label, value, wrap, onEdit, readOnly }) => (
  <div className="menus_quickView_field">
    <span
      className="menus_quickView_field_label"
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
      {label}
      {!readOnly && onEdit && (
        <Menus_iconUpdateBtn icon={<Pencil size={14} />} tooltip={`Update ${label}`} onClick={onEdit} />
      )}
    </span>
    <span className={`menus_quickView_field_value ${wrap ? "wrap" : ""}`}>{value ?? "—"}</span>
  </div>
);

const Menus_menuItem_view_one = ({ states, handlers, childProps, t }) => {
  const { menuItem } = states;
  const [fileViewer, setFileViewer] = useState(null);
  const [filesEditing, setFilesEditing] = useState(false);

  if (!menuItem) return null;

  const lockedByGlobal = !!states.isUpdating;
  const dropDisabled = lockedByGlobal || !!states.updatingField;

  // Comparison siblings = items sharing a category.
  const siblings = []; // populated by parent if it has access to all items.

  const filesList = [
    menuItem.recipeFile?.pdf && { path: menuItem.recipeFile.pdf, fileType: "pdf", ref: "Recipe (PDF)" },
    menuItem.recipeFile?.word && { path: menuItem.recipeFile.word, fileType: "docx", ref: "Recipe (DOC)" },
    menuItem.recipeFile?.excel && { path: menuItem.recipeFile.excel, fileType: "xlsx", ref: "Recipe (XLS)" },
    menuItem.techCardFile?.pdf && { path: menuItem.techCardFile.pdf, fileType: "pdf", ref: "TechCard (PDF)" },
    menuItem.techCardFile?.word && { path: menuItem.techCardFile.word, fileType: "docx", ref: "TechCard (DOC)" },
    ...(menuItem.otherFiles || []),
    ...(menuItem.images?.other || []),
  ].filter(Boolean);

  return (
    <div className="menus_menuItem_view_one">
      {/* 1) Top split */}
      <div className="menus_menuItem_view_one_top">
        <MenuItem_field_images states={states} handlers={handlers} childProps={childProps} t={t} menuItem={menuItem} />
        <aside className="menus_menuItem_view_one_topRight">
          <MenuItem_field_name        states={states} handlers={handlers} childProps={childProps} t={t} menuItem={menuItem} />
          <MenuItem_field_description states={states} handlers={handlers} childProps={childProps} t={t} menuItem={menuItem} />
          <MenuItem_field_pricing     states={states} handlers={handlers} childProps={childProps} t={t} menuItem={menuItem} />
          <MenuItem_field_nutrition   states={states} handlers={handlers} childProps={childProps} t={t} menuItem={menuItem} />
        </aside>
      </div>

      {/* 2) Sales performance */}
      <Menus_collapse title="Sales performance" subtitle="Timeframes · trend · breakdown" defaultOpen>
        <Menus_salesSection doc={menuItem} title="Sales performance" />
      </Menus_collapse>

      {/* 3) Comparisons */}
      <Menus_collapse title="Comparisons" subtitle="Item vs siblings · mirrored · channels · branches · price ↔ revenue" defaultOpen={false}>
        <Menus_compareSection doc={menuItem} kind="item" siblings={siblings} title="Compared with siblings" />
      </Menus_collapse>

      {/* 4) Product attributes */}
      <Menus_collapse title="Product attributes" subtitle="Cuisine · station · size · spicy · prep · dietary · allergens" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <FactCell label="Cuisine"        value={menuItem.cuisineType}   onEdit={() => handlers.startFieldUpdate?.("cuisineType", menuItem)} />
          <FactCell label="Kitchen station" value={menuItem.kitchenStation} onEdit={() => handlers.startFieldUpdate?.("kitchenStation", menuItem)} />
          <FactCell label="Size"           value={menuItem.sizeByGrams ? `${menuItem.sizeByGrams} g` : "—"} onEdit={() => handlers.startFieldUpdate?.("sizeByGrams", menuItem)} />
          <FactCell label="Spicy level"    value={menuItem.spicyLevel}     onEdit={() => handlers.startFieldUpdate?.("spicyLevel", menuItem)} />
          <FactCell label="Prep time"      value={menuItem.preparationTimeMin ? `${menuItem.preparationTimeMin}m` : "—"} onEdit={() => handlers.startFieldUpdate?.("preparationTimeMin", menuItem)} />
          <FactCell label="Dietary tags"   value={(menuItem.dietaryTags || []).join(", ") || "—"} onEdit={() => handlers.startFieldUpdate?.("dietaryTags", menuItem)} />
          <FactCell label="Allergens"      value={(menuItem.allergens || []).join(", ") || "—"} onEdit={() => handlers.startFieldUpdate?.("allergens", menuItem)} />
        </div>
      </Menus_collapse>

      {/* 5) System & metadata */}
      <Menus_collapse title="System & metadata" subtitle="SKU · owner · external ID · source · cloud · audit" defaultOpen={false}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <FactCell label="SKU"           value={menuItem.sku}           onEdit={() => handlers.startFieldUpdate?.("sku", menuItem)} />
          <FactCell label="Owner"         value={menuItem.ownerType}     onEdit={() => handlers.startFieldUpdate?.("ownerType", menuItem)} />
          <FactCell label="External ID"   value={menuItem.externalId}    onEdit={() => handlers.startFieldUpdate?.("externalId", menuItem)} />
          <FactCell label="Source"        value={menuItem.source}        onEdit={() => handlers.startFieldUpdate?.("source", menuItem)} />
          <FactCell label="Cloud storage" value={menuItem.cloudStorage ? `${menuItem.cloudStorage.value}${menuItem.cloudStorage.isDefault ? " (default)" : ""}` : "—"} onEdit={() => handlers.startFieldUpdate?.("cloudStorage", menuItem)} />
          <FactCell label="Created"       value={`${menuItem.createdBy || "—"} · ${formatDate(menuItem.createdAt)}`} wrap readOnly />
          <FactCell label="Updated"       value={`${menuItem.updatedBy || "—"} · ${formatDate(menuItem.updatedAt)}`} wrap readOnly />
        </div>
      </Menus_collapse>

      {/* 6) Attached modifiers */}
      <Menus_collapse title="Attached modifiers" subtitle={`${(menuItem.modifiers || []).length} modifier(s)`} defaultOpen>
        <MenuItem_field_modifiers states={states} handlers={handlers} childProps={childProps} t={t} menuItem={menuItem} />
      </Menus_collapse>

      {/* 7) Mirrored */}
      <Menus_collapse title="Mirrored with other menu items" subtitle={`${(menuItem.mirroredWithOtherMenuItems || []).length} entries`} defaultOpen={false}>
        <Menus_mirroredTable rows={menuItem.mirroredWithOtherMenuItems || []} />
      </Menus_collapse>

      {/* 8) Competes */}
      <Menus_collapse title="Competes with other menu items" subtitle={`${(menuItem.competesWithOtherMenuItems || []).length} entries`} defaultOpen={false}>
        <Menus_competesTable rows={menuItem.competesWithOtherMenuItems || []} />
      </Menus_collapse>

      {/* 9) Files */}
      <Menus_collapse
        title="Files"
        subtitle="Recipe · TechCard · other"
        defaultOpen={false}
        rightSlot={
          <button
            type="button"
            className="menus_view_all_table_rows_provider_cell_button"
            onClick={(e) => { e.stopPropagation(); setFilesEditing((v) => !v); }}>
            {filesEditing ? "Done" : "Update files"}
          </button>
        }>
        <div className="menus_filePreview_strip" style={{ marginTop: 0 }}>
          {filesList.length === 0 && (
            <span style={{ fontSize: 13, color: "var(--menus-text-soft)" }}>No files yet.</span>
          )}
          {filesList.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFileViewer({ file: f, label: f.ref })}
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
              <Menus_filePreview file={f} />
            </button>
          ))}
        </div>
        {filesEditing && (
          <div style={{ marginTop: 12 }}>
            <Menus_dropZone
              label="Drop a file here"
              hint="PDF, DOCX, XLSX up to 10 MB"
              disabled={dropDisabled}
              onFile={(f) => handlers.handleAddFile?.(f)}
            />
          </div>
        )}
      </Menus_collapse>

      <Menus_fileViewer
        open={!!fileViewer}
        file={fileViewer?.file}
        label={fileViewer?.label}
        onClose={() => setFileViewer(null)}
      />
    </div>
  );
};

export default Menus_menuItem_view_one;
