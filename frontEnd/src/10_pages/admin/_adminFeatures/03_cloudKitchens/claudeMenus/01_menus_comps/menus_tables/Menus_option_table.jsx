import { useState, Fragment } from "react";
import { Pencil, Eye, ChevronDown, FileText } from "lucide-react";
import { OPTIONS_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import "../../_styles/menus_childComps/menus_options/menus_option_view_all.css";
import {
  Menus_quickView,
  Menus_salesCell,
  Menus_salesFilter,
  Menus_ownerIcon,
  Menus_updatePopup,
  UPDATE_OPTIONS,
  Menus_imageCell,
  Menus_imageUpdater,
  Menus_fileViewer,
} from "../menus_childComps/_menus_childComps.index.js";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_option_table — modifier options list.
   v3: icon-only Owner/Update/View/Quick, image cell with magnifier+edit,
   inactive sort to bottom, file click opens viewer with download.
============================================================================ */

const sortInactiveLast = (arr) => {
  const a = [], b = [];
  (arr || []).forEach((x) => (x?.isActive === false ? b : a).push(x));
  return [...a, ...b];
};

const iconBtn = (icon, title, onClick) => (
  <button
    type="button"
    className="menus_view_all_table_rows_provider_cell_button"
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

const Menus_option_table = ({ states, handlers, childProps, t, options }) => {
  const headers = OPTIONS_TBL_HDRS();
  const [expandedId, setExpandedId] = useState(null);
  const [salesTimeframe, setSalesTimeframe] = useState("currentMonthSales");
  const [popup, setPopup] = useState(null);
  const [imageEdit, setImageEdit] = useState(null);
  const [fileView, setFileView] = useState(null);

  const tfLabel = SALES_TIMEFRAMES.find((tf) => tf.key === salesTimeframe)?.label || "Sales";
  const ordered = sortInactiveLast(options);

  return (
    <div className="menus_option_view_all">
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
      <table className="menus_option_view_all_table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={`menus_option_view_all_table_header ${h.label}`}
                scope="col"
                className={`menus_option_view_all_table_header ${h.className}`}
                title={h.title}>
                {headerNode(h)}
              </th>
            ))}
            <th scope="col" className="menus_option_view_all_table_header sales"
              title={`Sales — ${tfLabel}`}>Sales</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((option, rowIndex) => {
            const isOpen = expandedId === option._id;
            return (
              <Fragment key={option._id}>
                <tr className={`menus_option_view_all_table_rows_provider ${option.isActive === false ? "inactive" : ""}`}>
                  <td className="menus_option_view_all_table_rows_provider_cell index">{rowIndex + 1}</td>
                  <td className="menus_option_view_all_table_rows_provider_cell image">
                    <Menus_imageCell
                      src={option.images?.main}
                      alt={option.name?.label}
                      onEdit={() => setImageEdit(option)}
                    />
                  </td>
                  <td className="menus_option_view_all_table_rows_provider_cell label">{option.name?.label}</td>
                  <td className="menus_option_view_all_table_rows_provider_cell ownerType" title={option.ownerType}>
                    <Menus_ownerIcon value={option.ownerType} />
                  </td>
                  <td className="menus_option_view_all_table_rows_provider_cell description">
                    {option.description?.short?.en ?? option.description?.short}
                  </td>
                  <td className="menus_option_view_all_table_rows_provider_cell modifiers">
                    {option.availableInModifiers?.[0] || "—"}
                    {option.availableInModifiers?.length > 1 && (
                      <span style={{ fontWeight: "bold", marginLeft: 8 }}>+{option.availableInModifiers.length - 1}</span>
                    )}
                  </td>
                  <td className="menus_option_view_all_table_rows_provider_cell sellingPrice">{option.sellingPrice?.gross}</td>
                  <td className="menus_option_view_all_table_rows_provider_cell cost">{option.cost?.estimatedCost}</td>
                  <td className="menus_option_view_all_table_rows_provider_cell isFree">{option.isFree ? "Free" : "Paid"}</td>
                  <td className="menus_option_view_all_table_rows_provider_cell nutrition">{option.nutrition?.calories} kcal</td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    <button
                      className="menus_view_all_table_rows_provider_cell_button"
                      title="Recipe file"
                      disabled={!option.recipeFile?.pdf}
                      onClick={() => setFileView({
                        file: { path: option.recipeFile.pdf, fileType: "pdf", ref: "Recipe (PDF)" },
                        label: "Recipe PDF",
                      })}>
                      <FileText size={14} />
                    </button>
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    <button
                      className="menus_view_all_table_rows_provider_cell_button"
                      title="TechCard file"
                      disabled={!option.techCardFile?.pdf}
                      onClick={() => setFileView({
                        file: { path: option.techCardFile.pdf, fileType: "pdf", ref: "TechCard (PDF)" },
                        label: "TechCard PDF",
                      })}>
                      <FileText size={14} />
                    </button>
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    {iconBtn(<Pencil size={14} />, "Update",
                      (e) => setPopup({ anchor: e.currentTarget.getBoundingClientRect(), option }))}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    {iconBtn(<Eye size={14} />, "View", () => handlers.handleView_Option?.(option))}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell"
                    data-quickview-open={isOpen ? "true" : "false"}>
                    {iconBtn(<ChevronDown size={14} />, isOpen ? "Close" : "Quick look",
                      () => setExpandedId(isOpen ? null : option._id))}
                  </td>
                  <td className="menus_option_view_all_table_rows_provider_cell sales">
                    <Menus_salesCell sales={option[salesTimeframe]} />
                  </td>
                </tr>
                <Menus_quickView
                  open={isOpen}
                  colSpan={headers.length + 1}
                  fields={[
                    { label: "Owner", value: option.ownerType },
                    { label: "Calories", value: `${option.nutrition?.calories} kcal` },
                    { label: "Selling price", value: option.sellingPrice?.gross },
                    { label: "Cost", value: `est ${option.cost?.estimatedCost} / act ${option.cost?.actualCost}` },
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
        options={UPDATE_OPTIONS.option}
        isActive={popup?.option?.isActive}
        onPick={(key) => {
          if (key === "updateAll") handlers.handleUpdate_Option?.(popup.option);
          else if (key === "images.main") setImageEdit(popup.option);
          else handlers.startFieldUpdate?.(key, popup.option);
        }}
        onToggleActive={() => handlers.toggleActive?.(popup.option._id, !popup.option.isActive)}
        onClose={() => setPopup(null)}
      />

      <Menus_imageUpdater
        open={!!imageEdit}
        currentSrc={imageEdit?.images?.main}
        currentLabel={imageEdit?.name?.label}
        onClose={() => setImageEdit(null)}
        onConfirm={(meta) => {
          handlers.handleReplaceImage?.(imageEdit._id, meta);
          setImageEdit(null);
        }}
      />

      <Menus_fileViewer
        open={!!fileView}
        file={fileView?.file}
        label={fileView?.label}
        onClose={() => setFileView(null)}
      />
    </div>
  );
};

export default Menus_option_table;
