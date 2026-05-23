import { useState, Fragment } from "react";
import { NEW_MENU_MODIFIERS_HEADERS } from "../../05_newMenu_cnst/_newMenu_cnst.index.js";
import { unwrapOptions } from "../../02_newMenu_helpers/_newMenu_helpers.index.js";
import _NEW_MENU_CFG from "../../newMenu.config.js";
import NewMenu_quickView from "./NewMenu_quickView.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import "../../_styles/newMenu_table.css";

/* ============================================================================
   NewMenu_table_modifiers — list view for the Modifiers session.

   The "Options" column shows up to 4 contained option thumbnails stacked
   (with a +N badge for overflow) — this is informational about WHAT the
   modifier contains, NOT a modifier image.
============================================================================ */
const NewMenu_table_modifiers = ({ modifiers = [], onView, onUpdate, t }) => {
  const [expandedId, setExpandedId] = useState(null);
  const tr = (k, fb) => (t ? t(`tables.${k}`, { defaultValue: fb }) : fb);
  const maxPreview = _NEW_MENU_CFG.optionsPreviewCount;

  const renderTimings = (timings) => {
    if (!timings) return <NewMenu_pill tone="muted">—</NewMenu_pill>;
    if (timings.isAlwaysActive) {
      return <NewMenu_pill tone="success">{tr("alwaysActive", "Always Active")}</NewMenu_pill>;
    }
    const windows = timings.windows || [];
    if (windows.length === 0) {
      return <NewMenu_pill tone="muted">{tr("noSchedule", "No schedule")}</NewMenu_pill>;
    }
    return (
      <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 4 }}>
        {windows.slice(0, 2).map((w, i) => (
          <NewMenu_pill key={i} title={`${w.label} ${w.from}–${w.to}`}>
            {w.from}–{w.to}
          </NewMenu_pill>
        ))}
        {windows.length > 2 && <NewMenu_pill tone="muted">+{windows.length - 2}</NewMenu_pill>}
      </div>
    );
  };

  return (
    <div className="NewMenu_table_wrap">
      <table className="NewMenu_table NewMenu_table_modifiers">
        <thead>
          <tr>
            {NEW_MENU_MODIFIERS_HEADERS.map((h) => (
              <th key={h.key} scope="col" className={`NewMenu_table_header NewMenu_table_header_${h.className}`} title={h.title}>
                {tr(h.key, h.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modifiers.map((modifier, idx) => {
            const isOpen = expandedId === modifier._id;
            const usedBy = (modifier.availableInMenuItems || []);
            const options = unwrapOptions(modifier.options);
            return (
              <Fragment key={modifier._id}>
                <tr className="NewMenu_table_row">
                  <td className="NewMenu_table_cell NewMenu_table_cell_idx">{idx + 1}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_usedBy">
                    {usedBy[0] || "—"}
                    {usedBy.length > 1 && <strong style={{ marginLeft: 6 }}>+{usedBy.length - 1}</strong>}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_name"><strong>{modifier.title?.label}</strong></td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_description">
                    {modifier.description?.short?.en || modifier.description?.short || "—"}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_optionsPreview">
                    {options.length === 0 ? (
                      <NewMenu_pill tone="muted">{tr("noOptions", "No options")}</NewMenu_pill>
                    ) : (
                      <div className="NewMenu_table_optionStack" title={`${options.length} option(s)`}>
                        {options.slice(0, maxPreview).map((opt) => (
                          <span key={opt._id} className="NewMenu_table_optionStack_chip">
                            {opt.images?.main && <img src={opt.images.main} alt={opt.name?.label} />}
                          </span>
                        ))}
                        {options.length > maxPreview && (
                          <span className="NewMenu_table_optionStack_more">+{options.length - maxPreview}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_owner">
                    <NewMenu_ownerBadge value={modifier.ownerType} />
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_timings">
                    {renderTimings(modifier.activeTimings)}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_optionality">
                    {modifier.isOptional ? tr("optional", "Optional") : tr("mandatory", "Mandatory")}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_selectionMode">
                    {modifier.selectionMode}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_pricing">
                    {modifier.isFree ? tr("free", "Free") : tr("paid", "Paid")}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_update">
                    <button type="button" className="NewMenu_table_btn" data-id={modifier._id} onClick={onUpdate}>
                      {tr("update", "Update")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_view">
                    <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={modifier._id} onClick={onView}>
                      {tr("view", "View")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_dropdown">
                    <button type="button" className="NewMenu_table_btn"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedId(isOpen ? null : modifier._id)}>
                      {isOpen ? tr("close", "Close") : tr("quick", "Quick")}
                    </button>
                  </td>
                </tr>
                <NewMenu_quickView
                  open={isOpen}
                  colSpan={NEW_MENU_MODIFIERS_HEADERS.length}
                  fields={[
                    { label: tr("owner", "Owner"), value: modifier.ownerType },
                    { label: tr("selectionMode", "Selection"), value: modifier.selectionMode },
                    { label: tr("optionality", "Optionality"), value: modifier.isOptional ? tr("optional", "Optional") : tr("mandatory", "Mandatory") },
                    { label: tr("pricing", "Pricing"), value: modifier.isFree ? tr("free", "Free") : tr("paid", "Paid") },
                    { label: tr("optionsCount", "Options"), value: options.length },
                    { label: tr("usedBy", "Used by"), value: `${usedBy.length} ${tr("items", "item(s)")}` },
                  ]}
                  sections={[
                    {
                      title: tr("descriptionShort", "Short description"),
                      body: <p style={{ margin: 0 }}>{modifier.description?.short?.en || modifier.description?.short || "—"}</p>,
                    },
                  ]}
                  actions={
                    <>
                      <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={modifier._id} onClick={onView}>
                        {tr("openFull", "Open full view")}
                      </button>
                      <button type="button" className="NewMenu_table_btn" data-id={modifier._id} onClick={onUpdate}>
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

export default NewMenu_table_modifiers;
