import { useState } from "react";
import { Globe, Pencil } from "lucide-react";
import "../../../_styles/menus_childComps/menus_modifiers/menus_modifier_view_one.css";
import {
  Menus_iconUpdateBtn,
  Menus_translations,
} from "../_menus_childComps.index.js";
import { Menus_option_table } from "../../menus_tables/_menus_tables.index.js";
import { formatDate } from "../../../02_menus_helpers/_menus_helpers.index.js";

/* ============================================================================
   Menus_modifier_view_one — full detail view for a single Modifier.

   Layout (modifier-specific — does NOT reuse the menuItem 2-col grid, since
   modifiers don't have an image of their own):
     1. Header card (title + meta badges + options strip + descriptions)
     2. Fact grid
     3. Active timings
     4. Options table (nested Menus_option_table)

   The options strip in section 1 shows the contained option images stacked
   with their names — this is informative about WHAT the modifier contains,
   and is properly labelled "Options" rather than masquerading as a modifier
   image.
============================================================================ */

const FactCell = ({ label, value, wrap }) => (
  <div className="menus_quickView_field">
    <span className="menus_quickView_field_label">{label}</span>
    <span className={`menus_quickView_field_value ${wrap ? "wrap" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

const Menus_modifier_view_one = ({ states, handlers, childProps, t }) => {
  const [showTitleTrans, setShowTitleTrans] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);

  const { modifier } = states;
  if (!modifier) return null;

  const updatingTitle = states.updatingField === "title.label";
  const updatingShort = states.updatingField === "description.short";
  const updatingLong = states.updatingField === "description.long";
  const lockedByOther = !!states.isUpdating;

  // Normalise options[] which can be either { option: {...} } or {...} flat.
  const options = (modifier.options || [])
    .map((o) => o.option || o)
    .filter(Boolean);

  return (
    <div className="menus_modifier_view_one">
      {/* ============================================================ */}
      {/* 1. Header card                                                */}
      {/* ============================================================ */}
      <section className="menus_modifier_view_one_header">
        <header className="menus_modifier_view_one_header_top">
          <div className="menus_modifier_view_one_header_titleBlock">
            <h1 className="menus_modifier_view_one_header_title">
              {modifier.title?.label}
            </h1>
            <div className="menus_modifier_view_one_header_badges">
              <span className={`menus_pill ${modifier.ownerType}`}>
                {modifier.ownerType}
              </span>
              <span className="menus_pill">
                {modifier.isOptional ? "Optional" : "Mandatory"}
              </span>
              <span className="menus_pill">{modifier.selectionMode}</span>
              <span className="menus_pill">
                {modifier.isFree ? "Free" : "Paid"}
              </span>
              {modifier.isActive ? (
                <span className="menus_pill menus_pill_success">Active</span>
              ) : (
                <span className="menus_pill menus_pill_muted">Inactive</span>
              )}
            </div>
          </div>

          {/* Options strip — preview of CONTAINED options, not a modifier image. */}
          <aside className="menus_modifier_view_one_header_optionsStrip">
            <span className="menus_modifier_view_one_header_optionsStrip_label">
              {options.length}{" "}
              {options.length === 1 ? "Option" : "Options"}
            </span>
            <div className="menus_modifier_view_one_header_optionsStrip_chips">
              {options.length === 0 && (
                <span className="menus_modifier_view_one_header_optionsStrip_empty">
                  No options yet
                </span>
              )}
              {options.slice(0, 4).map((opt) => (
                <span
                  key={opt._id}
                  className="menus_modifier_view_one_header_optionsStrip_chip"
                  title={opt.name?.label}>
                  {opt.images?.main && (
                    <img
                      src={opt.images.main}
                      alt=""
                      className="menus_modifier_view_one_header_optionsStrip_chip_img"
                    />
                  )}
                  <span className="menus_modifier_view_one_header_optionsStrip_chip_name">
                    {opt.name?.label}
                  </span>
                </span>
              ))}
              {options.length > 4 && (
                <span className="menus_modifier_view_one_header_optionsStrip_more">
                  +{options.length - 4}
                </span>
              )}
            </div>
          </aside>
        </header>

        {/* Title (editable) */}
        <div className="menus_menuItem_view_one_topRight_name">
          <div className="menus_menuItem_view_one_topRight_name_label">
            <label>Title</label>
            <div className="menus_menuItem_view_one_topRight_controlls">
              <Menus_iconUpdateBtn
                icon={<Globe size={16} />}
                tooltip="Translations"
                active={showTitleTrans}
                onClick={() => setShowTitleTrans((v) => !v)}
              />
              <Menus_iconUpdateBtn
                icon={<Pencil size={16} />}
                tooltip="Update Title"
                active={updatingTitle}
                disabled={lockedByOther && !updatingTitle}
                onClick={() =>
                  handlers.startFieldUpdate?.("title.label", modifier.title?.label)
                }
              />
            </div>
          </div>
          <input
            type="text"
            className="menus_menuItem_view_one_topRight_name_input"
            defaultValue={modifier.title?.label}
            readOnly={!updatingTitle}
          />
          {showTitleTrans && (
            <Menus_translations
              title="Title — translations"
              data={modifier.title?.translations || {}}
            />
          )}
        </div>

        {/* Descriptions (short + long, side-by-side, wraps on narrow) */}
        <div className="menus_menuItem_view_one_topRight_description">
          <div className="menus_menuItem_view_one_topRight_description_label">
            <label>Descriptions</label>
          </div>
          <div className="menus_menuItem_view_one_topRight_description_versions">
            <div className="menus_menuItem_view_one_topRight_description_version short">
              <div className="menus_menuItem_view_one_topRight_description_version_label">
                <label>Short</label>
                <div className="menus_modifier_view_one_iconGroup">
                  <Menus_iconUpdateBtn
                    icon={<Globe size={16} />}
                    tooltip="Translations"
                    active={showShortTrans}
                    onClick={() => setShowShortTrans((v) => !v)}
                  />
                  <Menus_iconUpdateBtn
                    icon={<Pencil size={16} />}
                    tooltip="Update Short"
                    active={updatingShort}
                    disabled={lockedByOther && !updatingShort}
                    onClick={() =>
                      handlers.startFieldUpdate?.(
                        "description.short",
                        modifier.description?.short?.en ??
                          modifier.description?.short,
                      )
                    }
                  />
                </div>
              </div>
              <textarea
                className="menus_menuItem_view_one_topRight_description_textarea"
                rows={5}
                defaultValue={
                  modifier.description?.short?.en ??
                  modifier.description?.short ??
                  ""
                }
                readOnly={!updatingShort}
              />
              {showShortTrans &&
                typeof modifier.description?.short === "object" && (
                  <Menus_translations
                    title="Short — translations"
                    data={modifier.description.short}
                    multiline
                  />
                )}
            </div>
            <div className="menus_menuItem_view_one_topRight_description_version long">
              <div className="menus_menuItem_view_one_topRight_description_version_label">
                <label>Long</label>
                <div className="menus_modifier_view_one_iconGroup">
                  <Menus_iconUpdateBtn
                    icon={<Globe size={16} />}
                    tooltip="Translations"
                    active={showLongTrans}
                    onClick={() => setShowLongTrans((v) => !v)}
                  />
                  <Menus_iconUpdateBtn
                    icon={<Pencil size={16} />}
                    tooltip="Update Long"
                    active={updatingLong}
                    disabled={lockedByOther && !updatingLong}
                    onClick={() =>
                      handlers.startFieldUpdate?.(
                        "description.long",
                        modifier.description?.long?.en ??
                          modifier.description?.long,
                      )
                    }
                  />
                </div>
              </div>
              <textarea
                className="menus_menuItem_view_one_topRight_description_textarea"
                rows={5}
                defaultValue={
                  modifier.description?.long?.en ??
                  modifier.description?.long ??
                  ""
                }
                readOnly={!updatingLong}
              />
              {showLongTrans &&
                typeof modifier.description?.long === "object" && (
                  <Menus_translations
                    title="Long — translations"
                    data={modifier.description.long}
                    multiline
                  />
                )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Fact grid                                                  */}
      {/* ============================================================ */}
      <section className="menus_modifier_view_one_section">
        <h3 className="menus_modifier_view_one_section_title">Details</h3>
        <div className="menus_modifier_view_one_factGrid">
          <FactCell label="Owner" value={modifier.ownerType} />
          <FactCell
            label="Optional"
            value={modifier.isOptional ? "Optional" : "Mandatory"}
          />
          <FactCell label="Selection mode" value={modifier.selectionMode} />
          <FactCell label="Free" value={modifier.isFree ? "Free" : "Paid"} />
          <FactCell label="Display order" value={modifier.displayOrder} />
          <FactCell label="Active" value={modifier.isActive ? "Yes" : "No"} />
          <FactCell
            label="Created"
            value={`${modifier.createdBy || "—"} · ${formatDate(modifier.createdAt)}`}
            wrap
          />
          <FactCell
            label="Updated"
            value={`${modifier.updatedBy || "—"} · ${formatDate(modifier.updatedAt)}`}
            wrap
          />
          <FactCell
            label="Used by"
            value={(modifier.availableInMenuItems || []).join(", ") || "—"}
            wrap
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Active timings                                             */}
      {/* ============================================================ */}
      <section className="menus_modifier_view_one_section">
        <h3 className="menus_modifier_view_one_section_title">
          Active timings
        </h3>
        <div className="menus_modifier_view_one_timings">
          {modifier.activeTimings?.isAlwaysActive ? (
            <span className="menus_pill menus_pill_success">Always Active</span>
          ) : (modifier.activeTimings?.windows || []).length === 0 ? (
            <span className="menus_modifier_view_one_timings_empty">
              No schedule set.
            </span>
          ) : (
            (modifier.activeTimings?.windows || []).map((w, i) => (
              <span key={i} className="menus_pill">
                {w.label}: {w.from}–{w.to}
              </span>
            ))
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Options table                                              */}
      {/* ============================================================ */}
      <section className="menus_modifier_view_one_section">
        <h3 className="menus_modifier_view_one_section_title">Options</h3>
        <Menus_option_table
          states={states}
          handlers={handlers}
          childProps={childProps}
          t={t}
          options={options}
        />
      </section>
    </div>
  );
};

export default Menus_modifier_view_one;
