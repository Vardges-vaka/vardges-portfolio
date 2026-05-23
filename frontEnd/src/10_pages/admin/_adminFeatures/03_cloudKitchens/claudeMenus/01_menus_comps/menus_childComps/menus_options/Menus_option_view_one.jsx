import { useState } from "react";
import { Globe, Pencil } from "lucide-react";
import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";
import {
  Menus_iconUpdateBtn,
  Menus_translations,
  Menus_dropZone,
  Menus_filePreview,
  Menus_collapse,
  Menus_salesSection,
  Menus_compareSection,
  Menus_imageCell,
  Menus_imageUpdater,
  Menus_fileViewer,
} from "../_menus_childComps.index.js";
import "../../../_styles/menus_childComps/menus_options/menus_option_view_one.css";

/* ============================================================================
   Menus_option_view_one (v3)

   Sections in their own Menus_collapse:
     1. Top split — image stack + name/description/pricing/nutrition
     2. Sales performance
     3. Comparisons
     4. Attributes — isFree, displayOrder, active
     5. System & metadata — owner, available-in, cloud, audit (RO)
     6. Files (dropzone only in update mode)
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

const MenuItem_field_images_strip = ({ images = {} }) => {
  const types = ["main", "aggregators", "website", "google", "highRes", "noBackgroundPng", "jpg", "png", "WebP", "ico"];
  return (
    <div className="menuItem_field_images_types_container">
      {types.map((type) => (
        <div key={type} className="menuItem_field_images_types_item" title={type.toUpperCase()}>
          <span className={`menuItem_field_images_types ${images[type] ? "active" : ""} ${type}`} />
        </div>
      ))}
    </div>
  );
};

const Menus_option_view_one = ({ states, handlers, childProps, t }) => {
  const [showNameTrans, setShowNameTrans] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [fileViewer, setFileViewer] = useState(null);
  const [filesEditing, setFilesEditing] = useState(false);

  const { option } = states;
  if (!option) return null;

  const updatingName  = states.updatingField === "name.label";
  const updatingShort = states.updatingField === "description.short";
  const updatingLong  = states.updatingField === "description.long";
  const lockedByGlobal = !!states.isUpdating;

  const filesList = [
    option.recipeFile?.pdf && { path: option.recipeFile.pdf, fileType: "pdf", ref: "Recipe (PDF)" },
    option.techCardFile?.pdf && { path: option.techCardFile.pdf, fileType: "pdf", ref: "TechCard (PDF)" },
    ...(option.images?.other || []),
  ].filter(Boolean);

  return (
    <div className="menus_option_view_one menus_menuItem_view_one">
      {/* 1) Top split */}
      <div className="menus_menuItem_view_one_top">
        <aside className="menuItem_field_images">
          <Menus_imageCell
            src={option.images?.main}
            alt={option.name?.label}
            size={160}
            onEdit={() => setImageEdit(true)}
          />
          <MenuItem_field_images_strip images={option.images || {}} />
        </aside>

        <aside className="menus_menuItem_view_one_topRight">
          <div className="menus_menuItem_view_one_topRight_name">
            <div className="menus_menuItem_view_one_topRight_name_label">
              <label>Name</label>
              <div className="menus_menuItem_view_one_topRight_controlls">
                <Menus_iconUpdateBtn icon={<Globe size={16} />} tooltip="Translations"
                  active={showNameTrans} onClick={() => setShowNameTrans((v) => !v)} />
                <Menus_iconUpdateBtn icon={<Pencil size={16} />} tooltip="Update Name"
                  active={updatingName}
                  disabled={lockedByGlobal && !updatingName}
                  onClick={() => handlers.startFieldUpdate?.("name.label", option.name?.label)} />
              </div>
            </div>
            <input type="text" className="menus_menuItem_view_one_topRight_name_input"
              defaultValue={option.name?.label} readOnly={!updatingName} />
            {showNameTrans && (
              <Menus_translations title="Name — translations" data={option.name?.translations || {}} />
            )}
          </div>

          <div className="menus_menuItem_view_one_topRight_description">
            <div className="menus_menuItem_view_one_topRight_description_label">
              <label>Descriptions</label>
            </div>
            <div className="menus_menuItem_view_one_topRight_description_versions">
              <div className="menus_menuItem_view_one_topRight_description_version short">
                <div className="menus_menuItem_view_one_topRight_description_version_label">
                  <label>Short</label>
                  <div style={{ display: "inline-flex", gap: 2 }}>
                    <Menus_iconUpdateBtn icon={<Globe size={16} />} tooltip="Translations"
                      active={showShortTrans} onClick={() => setShowShortTrans((v) => !v)} />
                    <Menus_iconUpdateBtn icon={<Pencil size={16} />} tooltip="Update Short"
                      active={updatingShort}
                      disabled={lockedByGlobal && !updatingShort}
                      onClick={() =>
                        handlers.startFieldUpdate?.(
                          "description.short",
                          option.description?.short?.en ?? option.description?.short,
                        )
                      } />
                  </div>
                </div>
                <textarea
                  className="menus_menuItem_view_one_topRight_description_textarea"
                  rows={5}
                  defaultValue={option.description?.short?.en ?? option.description?.short ?? ""}
                  readOnly={!updatingShort}
                />
                {showShortTrans && typeof option.description?.short === "object" && (
                  <Menus_translations title="Short — translations" data={option.description.short} multiline />
                )}
              </div>
              <div className="menus_menuItem_view_one_topRight_description_version long">
                <div className="menus_menuItem_view_one_topRight_description_version_label">
                  <label>Long</label>
                  <div style={{ display: "inline-flex", gap: 2 }}>
                    <Menus_iconUpdateBtn icon={<Globe size={16} />} tooltip="Translations"
                      active={showLongTrans} onClick={() => setShowLongTrans((v) => !v)} />
                    <Menus_iconUpdateBtn icon={<Pencil size={16} />} tooltip="Update Long"
                      active={updatingLong}
                      disabled={lockedByGlobal && !updatingLong}
                      onClick={() =>
                        handlers.startFieldUpdate?.(
                          "description.long",
                          option.description?.long?.en ?? option.description?.long,
                        )
                      } />
                  </div>
                </div>
                <textarea
                  className="menus_menuItem_view_one_topRight_description_textarea"
                  rows={5}
                  defaultValue={option.description?.long?.en ?? option.description?.long ?? ""}
                  readOnly={!updatingLong}
                />
                {showLongTrans && typeof option.description?.long === "object" && (
                  <Menus_translations title="Long — translations" data={option.description.long} multiline />
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="menuItem_field_pricing">
            <div className="menuItem_field_pricing_label">
              <label>Selling Price</label>
              <Menus_iconUpdateBtn tooltip="Edit pricing" disabled={lockedByGlobal || !!states.updatingField}
                onClick={() => handlers.startFieldUpdate?.("sellingPrice", option)} />
            </div>
            <div className="menuItem_field_sellingPrice_versions">
              <div className="menuItem_field_sellingPrice_version"><label>Gross</label><input className="menuItem_field_sellingPrice_input" type="number" defaultValue={option.sellingPrice?.gross} readOnly /></div>
              <div className="menuItem_field_sellingPrice_version"><label>Net</label><input className="menuItem_field_sellingPrice_input" type="number" defaultValue={option.sellingPrice?.net} readOnly /></div>
              <div className="menuItem_field_sellingPrice_version"><label>VAT</label><input className="menuItem_field_sellingPrice_input" type="number" defaultValue={option.sellingPrice?.VAT} readOnly /></div>
            </div>
            <div className="MenuItem_field_cost">
              <div className="MenuItem_field_cost_label"><label>Cost</label></div>
              <div className="MenuItem_field_cost_versions">
                <div className="MenuItem_field_cost_version"><label>Estimated</label><input className="MenuItem_field_cost_input" type="number" defaultValue={option.cost?.estimatedCost} readOnly /></div>
                <div className="MenuItem_field_cost_version"><label>Actual</label><input className="MenuItem_field_cost_input" type="number" defaultValue={option.cost?.actualCost} readOnly /></div>
              </div>
            </div>
          </div>

          {/* Nutrition */}
          <div className="menuItem_field_nutrition">
            <div className="menuItem_field_nutrition_label">
              <label>Nutrition</label>
              <Menus_iconUpdateBtn tooltip="Edit nutrition" disabled={lockedByGlobal || !!states.updatingField}
                onClick={() => handlers.startFieldUpdate?.("nutrition", option)} />
            </div>
            <div className="menuItem_field_nutrition_versions">
              <div className="menuItem_field_nutrition_version source"><label>Source</label><input className="menuItem_field_nutrition_input" defaultValue={option.nutrition?.source} readOnly /></div>
              <div className="menuItem_field_nutrition_version lastCalculatedAt"><label>Calculated</label><input className="menuItem_field_nutrition_input" defaultValue={formatDate(option.nutrition?.lastCalculatedAt)} readOnly /></div>
              <div className="menuItem_field_nutrition_version calories"><label>Calories</label><input type="number" className="menuItem_field_nutrition_input" defaultValue={option.nutrition?.calories} readOnly /></div>
              <div className="menuItem_field_nutrition_version protein"><label>Protein</label><input type="number" className="menuItem_field_nutrition_input" defaultValue={option.nutrition?.protein} readOnly /></div>
              <div className="menuItem_field_nutrition_version carbs"><label>Carbs</label><input type="number" className="menuItem_field_nutrition_input" defaultValue={option.nutrition?.carbs} readOnly /></div>
              <div className="menuItem_field_nutrition_version fat"><label>Fat</label><input type="number" className="menuItem_field_nutrition_input" defaultValue={option.nutrition?.fat} readOnly /></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sales */}
      <Menus_collapse title="Sales performance" subtitle="Timeframes · trend · breakdown" defaultOpen>
        <Menus_salesSection doc={option} title="Sales performance" />
      </Menus_collapse>

      {/* Comparisons */}
      <Menus_collapse title="Comparisons" subtitle="Option vs siblings · channels · branches · price ↔ revenue" defaultOpen={false}>
        <Menus_compareSection doc={option} kind="option" title="Compared with siblings" />
      </Menus_collapse>

      {/* Attributes */}
      <Menus_collapse title="Attributes" subtitle="Free · order · active" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <FactCell label="Is free"       value={option.isFree ? "Free" : "Paid"} onEdit={() => handlers.startFieldUpdate?.("isFree", option)} />
          <FactCell label="Display order" value={option.displayOrder} onEdit={() => handlers.startFieldUpdate?.("displayOrder", option)} />
          <FactCell label="Active"        value={option.isActive ? "Yes" : "No"} onEdit={() => handlers.toggleActive?.(option._id, !option.isActive)} />
        </div>
      </Menus_collapse>

      {/* System & metadata */}
      <Menus_collapse title="System & metadata" subtitle="Owner · available-in · cloud · audit" defaultOpen={false}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <FactCell label="Owner"         value={option.ownerType} onEdit={() => handlers.startFieldUpdate?.("ownerType", option)} />
          <FactCell label="Available in"  value={(option.availableInModifiers || []).join(", ") || "—"} wrap onEdit={() => handlers.startFieldUpdate?.("availableInModifiers", option)} />
          <FactCell label="Cloud storage" value={option.cloudStorage ? `${option.cloudStorage.value}${option.cloudStorage.isDefault ? " (default)" : ""}` : "—"} onEdit={() => handlers.startFieldUpdate?.("cloudStorage", option)} />
          <FactCell label="Created" value={`${option.createdBy || "—"} · ${formatDate(option.createdAt)}`} wrap readOnly />
          <FactCell label="Updated" value={`${option.updatedBy || "—"} · ${formatDate(option.updatedAt)}`} wrap readOnly />
        </div>
      </Menus_collapse>

      {/* Files */}
      <Menus_collapse
        title="Files"
        subtitle="Recipe · TechCard · other"
        defaultOpen={false}
        rightSlot={
          <button type="button" className="menus_view_all_table_rows_provider_cell_button"
            onClick={(e) => { e.stopPropagation(); setFilesEditing((v) => !v); }}>
            {filesEditing ? "Done" : "Update files"}
          </button>
        }>
        <div className="menus_filePreview_strip" style={{ marginTop: 0 }}>
          {filesList.length === 0 && (
            <span style={{ fontSize: 13, color: "var(--menus-text-soft)" }}>No files yet.</span>
          )}
          {filesList.map((f, i) => (
            <button key={i} type="button"
              onClick={() => setFileViewer({ file: f, label: f.ref })}
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
              <Menus_filePreview file={f} />
            </button>
          ))}
        </div>
        {filesEditing && (
          <div style={{ marginTop: 12 }}>
            <Menus_dropZone label="Drop a file here" hint="PDF, DOCX, XLSX up to 10 MB"
              disabled={lockedByGlobal || !!states.updatingField}
              onFile={(f) => handlers.handleAddFile?.(f)} />
          </div>
        )}
      </Menus_collapse>

      <Menus_imageUpdater
        open={imageEdit}
        currentSrc={option.images?.main}
        currentLabel={option.name?.label}
        onClose={() => setImageEdit(false)}
        onConfirm={(meta) => {
          handlers.handleReplaceImage?.(option._id, meta);
          setImageEdit(false);
        }}
      />

      <Menus_fileViewer
        open={!!fileViewer}
        file={fileViewer?.file}
        label={fileViewer?.label}
        onClose={() => setFileViewer(null)}
      />
    </div>
  );
};

export default Menus_option_view_one;
