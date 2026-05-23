import { useState, Fragment } from "react";
import { Pencil, Eye, ChevronDown } from "lucide-react";
import { MODIFIERS_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import "../../_styles/menus_childComps/menus_modifiers/menus_modifier_table.css";
import {
  Menus_quickView,
  Menus_salesCell,
  Menus_salesFilter,
  Menus_ownerIcon,
  Menus_updatePopup,
  UPDATE_OPTIONS,
  Menus_optionsModal,
} from "../menus_childComps/_menus_childComps.index.js";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_modifier_table — modifiers list.
   v3: icon-only ownerType/update/view/quick, sort inactive last, options stack
   opens Menus_optionsModal, update popup with session options.
============================================================================ */

const sortInactiveLast = (arr) => {
  const a = [], b = [];
  (arr || []).forEach((x) => (x?.isActive === false ? b : a).push(x));
  return [...a, ...b];
};

const iconBtn = (icon, title, onClick) => (
  <button
    type="button"
    className="menus_modifier_table_rows_provider_cell_button"
    title={title}
    onClick={onClick}
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 30, height: 30, padding: 0, minWidth: 0,
    }}>
    {icon}
  </button>
);

const headerNode = (h) => {
  if (h.className === "ownerType") return <Menus_ownerIcon value="brand" />;
  if (h.className === "update")    return <span className="menus_iconHeader"><Pencil size={16} /></span>;
  if (h.className === "view")      return <span className="menus_iconHeader"><Eye size={16} /></span>;
  if (h.className === "dropdown")  return <span className="menus_iconHeader"><ChevronDown size={16} /></span>;
  return h.label;
};

const getActiveTimingsSummary = (at) => {
  if (!at) return { mode: "empty" };
  if (at.isAlwaysActive) return { mode: "always" };
  const w = at.windows ?? [];
  if (w.length === 0) return { mode: "unscheduled" };
  return { mode: "windows", windows: w };
};

const Menus_modifier_table = ({ states, handlers, childProps, t, modifiers }) => {
  const headers = MODIFIERS_TBL_HDRS();
  const [expandedId, setExpandedId] = useState(null);
  const [salesTimeframe, setSalesTimeframe] = useState("currentMonthSales");
  const [popup, setPopup] = useState(null);
  const [optsModal, setOptsModal] = useState(null);

  const tfLabel = SALES_TIMEFRAMES.find((tf) => tf.key === salesTimeframe)?.label || "Sales";
  const ordered = sortInactiveLast(modifiers);

  // Build allOptions map from the supplied modifiers so the modal can render.
  const allOptions = {};
  (modifiers || []).forEach((m) =>
    (m.options || []).forEach((o) => {
      const op = o.option || o;
      if (op?._id) allOptions[op._id] = op;
    }),
  );

  return (
    <div className="menus_modifier_table">
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, padding: "10px 12px",
        borderBottom: "1px solid var(--menus-border-soft)",
        background: "color-mix(in srgb, var(--menus-bg-soft) 35%, transparent)",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--menus-text-soft)",
        }}>Sales filter · {tfLabel}</span>
        <Menus_salesFilter value={salesTimeframe} onChange={setSalesTimeframe} />
      </div>
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={`menus_modifier_table_header ${h.label}`}
                scope="col"
                className={`menus_modifier_table_header ${h.className}`}
                title={h.title}>
                {headerNode(h)}
              </th>
            ))}
            <th scope="col" className="menus_modifier_table_header sales"
              title={`Sales — ${tfLabel}`}>Sales</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((modifier, rowIndex) => {
            const isOpen = expandedId === modifier._id;
            const atSum = getActiveTimingsSummary(modifier.activeTimings);
            const options = (modifier.options || []).map((o) => o.option || o);

            return (
              <Fragment key={modifier._id}>
                <tr className={`menus_modifier_table_rows_provider ${modifier.isActive === false ? "inactive" : ""}`}>
                  <td className="menus_modifier_table_rows_provider_cell">{rowIndex + 1}</td>
                  <td className="menus_modifier_table_rows_provider_cell modifiers">
                    {modifier.availableInMenuItems?.[0]
                      ? modifier.availableInMenuItems[0]
                      : <button className="menus_modifier_table_row btn"
                          style={{ width: "auto", height: "auto", padding: "0.3rem 0.6rem" }}>
                          Assign Menu Items
                        </button>}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell label">{modifier.title?.label}</td>
                  <td className="menus_modifier_table_rows_provider_cell description">
                    {modifier.description?.short?.en ?? modifier.description?.short}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell image">
                    {options.length === 0 ? (
                      <button
                        type="button"
                        className="menus_modifier_table_row btn"
                        style={{ width: "auto", height: "auto", padding: "0.3rem 0.6rem" }}
                        onClick={() => setOptsModal(modifier)}>
                        + Add options
                      </button>
                    ) : (
                      <div
                        className="menus_modifier_table_optionsStack"
                        title={`${options.length} option(s)`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setOptsModal(modifier)}>
                        {options.slice(0, 2).map((OPTION) => (
                          <button
                            key={OPTION._id}
                            type="button"
                            className="menus_modifier_table_row btn">
                            <img
                              src={OPTION.images?.main}
                              alt={OPTION.name?.label}
                              className="menus_modifier_table_row image"
                            />
                          </button>
                        ))}
                        {options.length > 2 && (
                          <button
                            type="button"
                            className="menus_modifier_table_row btn menus_modifier_table_row_btn--more">
                            <span className="menus_modifier_table_row_moreLabel">+{options.length - 2}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell ownerType" title={modifier.ownerType}>
                    <Menus_ownerIcon value={modifier.ownerType} />
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell activeTimings">
                    {atSum.mode === "always" && (
                      <span className="menus_modifier_table_activeTimings_always">Always Active</span>
                    )}
                    {atSum.mode === "unscheduled" && (
                      <span className="menus_modifier_table_activeTimings_unscheduled">No schedule</span>
                    )}
                    {atSum.mode === "windows" && (
                      <div className="menus_modifier_table_activeTimings">
                        <ul className="menus_modifier_table_activeTimings_list">
                          {atSum.windows.map((w, i) => (
                            <li key={i} className="menus_modifier_table_activeTimings_item">
                              <span className="menus_modifier_table_activeTimings_range">{w.from}–{w.to}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell isOptional">{modifier.isOptional ? "Optional" : "Mandatory"}</td>
                  <td className="menus_modifier_table_rows_provider_cell selectionMode">{modifier.selectionMode}</td>
                  <td className="menus_modifier_table_rows_provider_cell isFree">{modifier.isFree ? "Free" : "Paid"}</td>
                  <td className="menus_modifier_table_rows_provider_cell">
                    {iconBtn(<Pencil size={14} />, "Update",
                      (e) => setPopup({ anchor: e.currentTarget.getBoundingClientRect(), modifier }))}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell">
                    {iconBtn(<Eye size={14} />, "View", () => handlers.handleView_Modifier?.(modifier))}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell"
                    data-quickview-open={isOpen ? "true" : "false"}>
                    {iconBtn(<ChevronDown size={14} />, isOpen ? "Close" : "Quick look",
                      () => setExpandedId(isOpen ? null : modifier._id))}
                  </td>
                  <td className="menus_modifier_table_rows_provider_cell sales">
                    <Menus_salesCell sales={modifier[salesTimeframe]} />
                  </td>
                </tr>
                <Menus_quickView
                  open={isOpen}
                  colSpan={headers.length + 1}
                  fields={[
                    { label: "Owner", value: modifier.ownerType },
                    { label: "Selection", value: modifier.selectionMode },
                    { label: "Optional", value: modifier.isOptional ? "Yes" : "No" },
                    { label: "Free", value: modifier.isFree ? "Free" : "Paid" },
                    { label: "Options count", value: options.length },
                    { label: "Used by", value: `${(modifier.availableInMenuItems || []).length} item(s)` },
                  ]}
                />
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <Menus_updatePopup
        open={!!popup}
        anchorRect={popup?.anchor}
        options={UPDATE_OPTIONS.modifier}
        isActive={popup?.modifier?.isActive}
        onPick={(key) => {
          if (key === "updateAll") handlers.handleUpdate_Modifier?.(popup.modifier);
          else if (key === "options") setOptsModal(popup.modifier);
          else handlers.startFieldUpdate?.(key, popup.modifier);
        }}
        onToggleActive={() => handlers.toggleActive?.(popup.modifier._id, !popup.modifier.isActive)}
        onClose={() => setPopup(null)}
      />

      <Menus_optionsModal
        open={!!optsModal}
        modifier={optsModal}
        allOptions={allOptions}
        onClose={() => setOptsModal(null)}
        onSave={(ids) => handlers.handleUpdateModifierOptions?.(optsModal?._id, ids)}
      />
    </div>
  );
};

export default Menus_modifier_table;
