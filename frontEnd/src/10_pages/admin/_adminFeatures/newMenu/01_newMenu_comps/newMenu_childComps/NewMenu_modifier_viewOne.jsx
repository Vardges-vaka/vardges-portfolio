import { useState } from "react";
import { Globe } from "lucide-react";
import {
  formatDate,
  unwrapOptions,
} from "../../02_newMenu_helpers/_newMenu_helpers.index.js";
import _NEW_MENU_CFG from "../../newMenu.config.js";
import NewMenu_fieldRow from "./NewMenu_fieldRow.jsx";
import NewMenu_iconBtn from "./NewMenu_iconBtn.jsx";
import NewMenu_translations from "./NewMenu_translations.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_table_options from "./NewMenu_table_options.jsx";
import "../../_styles/newMenu_viewOne.css";

/* ============================================================================
   NewMenu_modifier_viewOne — full detail page for a single Modifier.

   IMPORTANT: modifiers don't have their own image. Instead of borrowing the
   first option's image (the historical mistake), this view renders an
   "Options preview" chip strip that's clearly labelled as such.

   Sections:
     1. Header card — title + badges + options preview + editable Title /
        Short / Long fields
     2. Fact grid
     3. Active timings
     4. Nested options table
============================================================================ */
const FactCell = ({ label, value, wrap }) => (
  <div className="NewMenu_viewOne_fact">
    <span className="NewMenu_viewOne_fact_label">{label}</span>
    <span className={`NewMenu_viewOne_fact_value ${wrap ? "NewMenu_viewOne_fact_value_wrap" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

const NewMenu_modifier_viewOne = ({
  modifier,
  isUpdating = false,
  editingField,
  setEditingField,
  requestConfirm,
  onViewOption,
  onUpdateOption,
  t,
}) => {
  const [showTitleTrans, setShowTitleTrans] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);

  if (!modifier) return null;
  const tr = (k, fb) => (t ? t(`viewOne.${k}`, { defaultValue: fb }) : fb);

  const fieldProps = {
    editingField,
    setEditingField,
    onRequestConfirm: requestConfirm,
    lockedBy: isUpdating,
  };

  const options = unwrapOptions(modifier.options);
  const maxPreview = _NEW_MENU_CFG.optionsPreviewCount;

  return (
    <div className="NewMenu_viewOne NewMenu_modifier_viewOne">
      {/* ---- Header card ---- */}
      <section className="NewMenu_viewOne_section">
        <div className="NewMenu_viewOne_header_titleRow">
          <div>
            <h1 className="NewMenu_viewOne_header_title">{modifier.title?.label}</h1>
            <div className="NewMenu_viewOne_pillRow" style={{ marginTop: 8 }}>
              <NewMenu_ownerBadge value={modifier.ownerType} />
              <NewMenu_pill>{modifier.isOptional ? tr("optional", "Optional") : tr("mandatory", "Mandatory")}</NewMenu_pill>
              <NewMenu_pill>{modifier.selectionMode}</NewMenu_pill>
              <NewMenu_pill>{modifier.isFree ? tr("free", "Free") : tr("paid", "Paid")}</NewMenu_pill>
              {modifier.isActive
                ? <NewMenu_pill tone="success">{tr("active", "Active")}</NewMenu_pill>
                : <NewMenu_pill tone="muted">{tr("inactive", "Inactive")}</NewMenu_pill>}
            </div>
          </div>

          {/* Options preview — explicitly labelled as Options. NOT an image. */}
          <aside className="NewMenu_viewOne_optionsPreview">
            <span className="NewMenu_viewOne_optionsPreview_label">
              {options.length} {options.length === 1 ? tr("option", "Option") : tr("options", "Options")}
            </span>
            <div className="NewMenu_viewOne_pillRow">
              {options.length === 0 && <NewMenu_pill tone="muted">{tr("noOptions", "No options yet")}</NewMenu_pill>}
              {options.slice(0, maxPreview).map((opt) => (
                <span key={opt._id} className="NewMenu_viewOne_optionsPreview_chip" title={opt.name?.label}>
                  {opt.images?.main && <img src={opt.images.main} alt="" />}
                  <span className="NewMenu_viewOne_optionsPreview_chip_name">{opt.name?.label}</span>
                </span>
              ))}
              {options.length > maxPreview && (
                <NewMenu_pill tone="muted">+{options.length - maxPreview}</NewMenu_pill>
              )}
            </div>
          </aside>
        </div>

        {/* Title */}
        <NewMenu_fieldRow
          label={tr("title", "Title")}
          fieldKey="title.label"
          value={modifier.title?.label}
          {...fieldProps}
          extraControls={
            <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showTitleTrans} onClick={() => setShowTitleTrans((v) => !v)} />
          }
        />
        {showTitleTrans && (
          <NewMenu_translations title={tr("titleTranslations", "Title — translations")} data={modifier.title?.translations || {}} />
        )}

        {/* Descriptions */}
        <div>
          <label className="NewMenu_fieldRow_label">{tr("descriptions", "Descriptions")}</label>
          <div className="NewMenu_viewOne_descGrid" style={{ marginTop: 6 }}>
            <div>
              <NewMenu_fieldRow
                label={tr("short", "Short")}
                fieldKey="description.short"
                value={modifier.description?.short?.en ?? modifier.description?.short}
                multiline
                {...fieldProps}
                extraControls={
                  <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showShortTrans} onClick={() => setShowShortTrans((v) => !v)} />
                }
              />
              {showShortTrans && typeof modifier.description?.short === "object" && (
                <NewMenu_translations title={tr("shortTranslations", "Short — translations")} data={modifier.description.short} multiline />
              )}
            </div>
            <div>
              <NewMenu_fieldRow
                label={tr("long", "Long")}
                fieldKey="description.long"
                value={modifier.description?.long?.en ?? modifier.description?.long}
                multiline
                {...fieldProps}
                extraControls={
                  <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showLongTrans} onClick={() => setShowLongTrans((v) => !v)} />
                }
              />
              {showLongTrans && typeof modifier.description?.long === "object" && (
                <NewMenu_translations title={tr("longTranslations", "Long — translations")} data={modifier.description.long} multiline />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Fact grid ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("details", "Details")}</h3>
        <div className="NewMenu_viewOne_factGrid">
          <FactCell label={tr("owner", "Owner")} value={modifier.ownerType} />
          <FactCell label={tr("optionality", "Optionality")} value={modifier.isOptional ? tr("optional", "Optional") : tr("mandatory", "Mandatory")} />
          <FactCell label={tr("selectionMode", "Selection mode")} value={modifier.selectionMode} />
          <FactCell label={tr("pricing", "Pricing")} value={modifier.isFree ? tr("free", "Free") : tr("paid", "Paid")} />
          <FactCell label={tr("displayOrder", "Display order")} value={modifier.displayOrder} />
          <FactCell label={tr("status", "Status")} value={modifier.isActive ? tr("active", "Active") : tr("inactive", "Inactive")} />
          <FactCell label={tr("createdBy", "Created")} value={`${modifier.createdBy || "—"} · ${formatDate(modifier.createdAt)}`} wrap />
          <FactCell label={tr("updatedBy", "Updated")} value={`${modifier.updatedBy || "—"} · ${formatDate(modifier.updatedAt)}`} wrap />
          <FactCell label={tr("usedBy", "Used by")} value={(modifier.availableInMenuItems || []).join(", ") || "—"} wrap />
        </div>
      </section>

      {/* ---- Active timings ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("activeTimings", "Active timings")}</h3>
        <div className="NewMenu_viewOne_pillRow">
          {modifier.activeTimings?.isAlwaysActive ? (
            <NewMenu_pill tone="success">{tr("alwaysActive", "Always Active")}</NewMenu_pill>
          ) : (modifier.activeTimings?.windows || []).length === 0 ? (
            <span style={{ color: "var(--newMenu_textFaint)", fontSize: "var(--newMenu_textSm)" }}>
              {tr("noSchedule", "No schedule set.")}
            </span>
          ) : (
            (modifier.activeTimings?.windows || []).map((w, i) => (
              <NewMenu_pill key={i}>{w.label}: {w.from}–{w.to}</NewMenu_pill>
            ))
          )}
        </div>
      </section>

      {/* ---- Options ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("options", "Options")}</h3>
        <NewMenu_table_options
          options={options}
          onView={onViewOption}
          onUpdate={onUpdateOption}
          t={t}
        />
      </section>
    </div>
  );
};

export default NewMenu_modifier_viewOne;
