import { useState } from "react";
import { Globe, Pencil, X } from "lucide-react";
import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";
import {
  Menus_iconUpdateBtn,
  Menus_translations,
  Menus_collapse,
  Menus_salesSection,
  Menus_compareSection,
  Menus_imageUpdater,
} from "../_menus_childComps.index.js";
import { Menus_option_table } from "../../menus_tables/_menus_tables.index.js";
import "../../../_styles/menus_childComps/menus_modifiers/menus_modifier_view_one.css";

/* ============================================================================
   Menus_modifier_view_one (v3)

   Sections, each in its own Menus_collapse:
     1. Header — title + description with translation toggles
     2. Sales performance
     3. Comparisons
     4. Attributes — isOptional, selectionMode, isFree, displayOrder, active timings
     5. System & metadata — owner, used by, created (RO), updated (RO)
     6. Options table
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

const Menus_modifier_view_one = ({ states, handlers, childProps, t }) => {
  const [showTitleTrans, setShowTitleTrans] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);

  const { modifier } = states;
  if (!modifier) return null;

  const options = (modifier.options || []).map((o) => o.option || o).filter(Boolean);
  const updatingTitle = states.updatingField === "title.label";
  const updatingShort = states.updatingField === "description.short";
  const updatingLong  = states.updatingField === "description.long";
  const lockedByOther = !!states.isUpdating;

  return (
    <div className="menus_modifier_view_one menus_menuItem_view_one">
      {/* 1) Header — title + descriptions */}
      <Menus_collapse title={modifier.title?.label} subtitle="Modifier · title + descriptions" defaultOpen>
        <div className="menus_menuItem_view_one_topRight">
          <div className="menus_menuItem_view_one_topRight_name">
            <div className="menus_menuItem_view_one_topRight_name_label">
              <label>Title</label>
              <div className="menus_menuItem_view_one_topRight_controlls">
                <Menus_iconUpdateBtn icon={<Globe size={16} />} tooltip="Translations"
                  active={showTitleTrans} onClick={() => setShowTitleTrans((v) => !v)} />
                <Menus_iconUpdateBtn icon={<Pencil size={16} />} tooltip="Update Title"
                  active={updatingTitle}
                  disabled={lockedByOther && !updatingTitle}
                  onClick={() => handlers.startFieldUpdate?.("title.label", modifier.title?.label)} />
              </div>
            </div>
            <input type="text" className="menus_menuItem_view_one_topRight_name_input"
              defaultValue={modifier.title?.label} readOnly={!updatingTitle} />
            {showTitleTrans && (
              <Menus_translations title="Title — translations"
                data={modifier.title?.translations || {}} />
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
                      disabled={lockedByOther && !updatingShort}
                      onClick={() =>
                        handlers.startFieldUpdate?.(
                          "description.short",
                          modifier.description?.short?.en ?? modifier.description?.short,
                        )
                      } />
                  </div>
                </div>
                <textarea
                  className="menus_menuItem_view_one_topRight_description_textarea"
                  rows={5}
                  defaultValue={modifier.description?.short?.en ?? modifier.description?.short ?? ""}
                  readOnly={!updatingShort}
                />
                {showShortTrans && typeof modifier.description?.short === "object" && (
                  <Menus_translations title="Short — translations" data={modifier.description.short} multiline />
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
                      disabled={lockedByOther && !updatingLong}
                      onClick={() =>
                        handlers.startFieldUpdate?.(
                          "description.long",
                          modifier.description?.long?.en ?? modifier.description?.long,
                        )
                      } />
                  </div>
                </div>
                <textarea
                  className="menus_menuItem_view_one_topRight_description_textarea"
                  rows={5}
                  defaultValue={modifier.description?.long?.en ?? modifier.description?.long ?? ""}
                  readOnly={!updatingLong}
                />
                {showLongTrans && typeof modifier.description?.long === "object" && (
                  <Menus_translations title="Long — translations" data={modifier.description.long} multiline />
                )}
              </div>
            </div>
          </div>
        </div>
      </Menus_collapse>

      {/* 2) Sales */}
      <Menus_collapse title="Sales performance" subtitle="Timeframes · trend · breakdown" defaultOpen>
        <Menus_salesSection doc={modifier} title="Sales performance" />
      </Menus_collapse>

      {/* 3) Comparisons */}
      <Menus_collapse title="Comparisons" subtitle="Modifier vs its options · channels · branches · price ↔ revenue" defaultOpen={false}>
        <Menus_compareSection doc={modifier} kind="modifier" siblings={options} title="Modifier vs its options" />
      </Menus_collapse>

      {/* 4) Attributes */}
      <Menus_collapse title="Attributes" subtitle="Optional · selection mode · free · order · active timings" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <FactCell label="Is optional"    value={modifier.isOptional ? "Optional" : "Mandatory"} onEdit={() => handlers.startFieldUpdate?.("isOptional", modifier)} />
          <FactCell label="Selection mode" value={modifier.selectionMode} onEdit={() => handlers.startFieldUpdate?.("selectionMode", modifier)} />
          <FactCell label="Is free"        value={modifier.isFree ? "Free" : "Paid"} onEdit={() => handlers.startFieldUpdate?.("isFree", modifier)} />
          <FactCell label="Display order"  value={modifier.displayOrder} onEdit={() => handlers.startFieldUpdate?.("displayOrder", modifier)} />
          <FactCell label="Active"         value={modifier.isActive ? "Yes" : "No"} onEdit={() => handlers.toggleActive?.(modifier._id, !modifier.isActive)} />
          <FactCell label="Active timings"
            value={modifier.activeTimings?.isAlwaysActive
              ? "Always Active"
              : `${(modifier.activeTimings?.windows || []).length} window(s)`}
            onEdit={() => handlers.startFieldUpdate?.("activeTimings", modifier)} />
        </div>
      </Menus_collapse>

      {/* 5) System & metadata */}
      <Menus_collapse title="System & metadata" subtitle="Owner · used by · audit" defaultOpen={false}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <FactCell label="Owner"   value={modifier.ownerType} onEdit={() => handlers.startFieldUpdate?.("ownerType", modifier)} />
          <FactCell label="Used by" value={(modifier.availableInMenuItems || []).join(", ") || "—"} wrap onEdit={() => handlers.startFieldUpdate?.("availableInMenuItems", modifier)} />
          <FactCell label="Created" value={`${modifier.createdBy || "—"} · ${formatDate(modifier.createdAt)}`} wrap readOnly />
          <FactCell label="Updated" value={`${modifier.updatedBy || "—"} · ${formatDate(modifier.updatedAt)}`} wrap readOnly />
        </div>
      </Menus_collapse>

      {/* 6) Options */}
      <Menus_collapse title="Options" subtitle={`${options.length} option(s)`} defaultOpen>
        <Menus_option_table states={states} handlers={handlers} childProps={childProps} t={t} options={options} />
      </Menus_collapse>
    </div>
  );
};

export default Menus_modifier_view_one;
