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
  Menus_quickView, // used for its FactCell-style markup
} from "../_menus_childComps.index.js";
import "../../../_styles/menus_childComps/menus_menuItems/menus_menuItem_view_one.css";

/* ============================================================================
   Menus_menuItem_view_one — single-item detail.

   Layout:
     1. Top split: image-stack on left, name/description/pricing/nutrition on right
     2. Fact grid (every "small" field of the document)
     3. Attached modifiers table (Menus_modifier_table — re-used)
     4. File strip + drop zone (recipe / techcard / image.other / otherFiles)
     5. Mirrored / Competes side-by-side

   Every editable field renders its own icon-only update button (inside the
   field component); the top-level "Update all" lives in Menus_sessionToggle.
============================================================================ */

const FactCell = ({ label, value, wrap }) => (
  <div className="menus_quickView_field">
    <span className="menus_quickView_field_label">{label}</span>
    <span className={`menus_quickView_field_value ${wrap ? "wrap" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

const Menus_menuItem_view_one = ({ states, handlers, childProps, t }) => {
  const { menuItem } = states;
  if (!menuItem) return null;

  const lockedByGlobal = !!states.isUpdating;
  const dropDisabled = lockedByGlobal || !!states.updatingField;

  return (
    <div className="menus_menuItem_view_one">
      {/* 1) Top split */}
      <div className="menus_menuItem_view_one_top">
        <MenuItem_field_images
          states={states} handlers={handlers} childProps={childProps} t={t}
          menuItem={menuItem}
        />
        <aside className="menus_menuItem_view_one_topRight">
          <MenuItem_field_name
            states={states} handlers={handlers} childProps={childProps} t={t}
            menuItem={menuItem}
          />
          <MenuItem_field_description
            states={states} handlers={handlers} childProps={childProps} t={t}
            menuItem={menuItem}
          />
          <MenuItem_field_pricing
            states={states} handlers={handlers} childProps={childProps} t={t}
            menuItem={menuItem}
          />
          <MenuItem_field_nutrition
            states={states} handlers={handlers} childProps={childProps} t={t}
            menuItem={menuItem}
          />
        </aside>
      </div>

      {/* 2) Fact grid — every "small" field of the document */}
      <section
        className="menuItem_field_modifiers"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
        }}>
        <FactCell label="SKU" value={menuItem.sku} />
        <FactCell label="Owner" value={menuItem.ownerType} />
        <FactCell label="Cuisine" value={menuItem.cuisineType} />
        <FactCell label="Kitchen station" value={menuItem.kitchenStation} />
        <FactCell label="Size" value={menuItem.sizeByGrams ? `${menuItem.sizeByGrams} g` : "—"} />
        <FactCell label="Spicy level" value={menuItem.spicyLevel} />
        <FactCell label="Prep time" value={menuItem.preparationTimeMin ? `${menuItem.preparationTimeMin}m` : "—"} />
        <FactCell label="External ID" value={menuItem.externalId} />
        <FactCell
          label="Cloud storage"
          value={
            menuItem.cloudStorage
              ? `${menuItem.cloudStorage.value}${menuItem.cloudStorage.isDefault ? " (default)" : ""}`
              : "—"
          }
        />
        <FactCell label="Source" value={menuItem.source} />
        <FactCell label="Dietary tags" value={(menuItem.dietaryTags || []).join(", ") || "—"} />
        <FactCell label="Allergens" value={(menuItem.allergens || []).join(", ") || "—"} />
        <FactCell
          label="Created"
          value={`${menuItem.createdBy || "—"} · ${formatDate(menuItem.createdAt)}`}
          wrap
        />
        <FactCell
          label="Updated"
          value={`${menuItem.updatedBy || "—"} · ${formatDate(menuItem.updatedAt)}`}
          wrap
        />
      </section>

      {/* 3) Modifiers attached to this item */}
      <MenuItem_field_modifiers
        states={states} handlers={handlers} childProps={childProps} t={t}
        menuItem={menuItem}
      />

      {/* 4) Files (recipe / tech card / image.other / otherFiles) + drop zone */}
      <section className="menuItem_field_modifiers">
        <h3
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--menus-text-soft)",
          }}>
          Files
        </h3>
        <div className="menus_filePreview_strip" style={{ marginTop: 6 }}>
          <Menus_filePreview
            file={
              menuItem.recipeFile?.pdf
                ? { path: menuItem.recipeFile.pdf, fileType: "pdf", ref: "Recipe (PDF)" }
                : null
            }
            label="Recipe PDF"
          />
          <Menus_filePreview
            file={
              menuItem.recipeFile?.word
                ? { path: menuItem.recipeFile.word, fileType: "docx", ref: "Recipe (DOC)" }
                : null
            }
            label="Recipe DOC"
          />
          <Menus_filePreview
            file={
              menuItem.recipeFile?.excel
                ? { path: menuItem.recipeFile.excel, fileType: "xlsx", ref: "Recipe (XLS)" }
                : null
            }
            label="Recipe XLS"
          />
          <Menus_filePreview
            file={
              menuItem.techCardFile?.pdf
                ? { path: menuItem.techCardFile.pdf, fileType: "pdf", ref: "TechCard (PDF)" }
                : null
            }
            label="TechCard PDF"
          />
          {(menuItem.otherFiles || []).map((f, i) => (
            <Menus_filePreview key={`o${i}`} file={f} />
          ))}
          {(menuItem.images?.other || []).map((f, i) => (
            <Menus_filePreview key={`i${i}`} file={f} />
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <Menus_dropZone
            label="Drop recipe / tech card / other files here"
            hint="PDF, DOCX, XLSX up to 10 MB"
            disabled={dropDisabled}
            onFile={handlers.handleAddFile}
          />
        </div>
      </section>

      {/* 5) Mirrored / Competes */}
      <section
        className="menuItem_field_modifiers"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--menus-text-soft)",
            }}>
            Mirrored with other menu items
          </h3>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}>
            {(menuItem.mirroredWithOtherMenuItems || []).length === 0 && (
              <span style={{ fontSize: 13, color: "var(--menus-text-soft)" }}>
                —
              </span>
            )}
            {(menuItem.mirroredWithOtherMenuItems || []).map((m, i) => (
              <span key={i} className="menus_pill" title={m.note}>
                <img
                  src={m.brand?.logo}
                  alt={m.brand?.name}
                  style={{ width: 18, height: 18, borderRadius: 4, objectFit: "cover" }}
                />
                {m.brand?.name} · {m.item?.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--menus-text-soft)",
            }}>
            Competes with other menu items
          </h3>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}>
            {(menuItem.competesWithOtherMenuItems || []).length === 0 && (
              <span style={{ fontSize: 13, color: "var(--menus-text-soft)" }}>
                —
              </span>
            )}
            {(menuItem.competesWithOtherMenuItems || []).map((c, i) => (
              <span key={i} className="menus_pill">
                <img
                  src={c.brand?.logo}
                  alt={c.brand?.name}
                  style={{ width: 18, height: 18, borderRadius: 4, objectFit: "cover" }}
                />
                {c.brand?.name} · {c.item?.name} · {c.sellingPrice?.gross}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menus_menuItem_view_one;
