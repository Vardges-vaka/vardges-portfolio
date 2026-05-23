import { useState, Fragment } from "react";
import { NEW_MENU_OPTIONS_HEADERS } from "../../05_newMenu_cnst/_newMenu_cnst.index.js";
import NewMenu_quickView from "./NewMenu_quickView.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import NewMenu_filePreview from "./NewMenu_filePreview.jsx";
import "../../_styles/newMenu_table.css";

/* ============================================================================
   NewMenu_table_options — list view for the Options session.
============================================================================ */
const NewMenu_table_options = ({ options = [], onView, onUpdate, t }) => {
  const [expandedId, setExpandedId] = useState(null);
  const tr = (k, fb) => (t ? t(`tables.${k}`, { defaultValue: fb }) : fb);

  return (
    <div className="NewMenu_table_wrap">
      <table className="NewMenu_table NewMenu_table_options">
        <thead>
          <tr>
            {NEW_MENU_OPTIONS_HEADERS.map((h) => (
              <th key={h.key} scope="col" className={`NewMenu_table_header NewMenu_table_header_${h.className}`} title={h.title}>
                {tr(h.key, h.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {options.map((option, idx) => {
            const isOpen = expandedId === option._id;
            const usedIn = (option.availableInModifiers || []);
            return (
              <Fragment key={option._id}>
                <tr className="NewMenu_table_row">
                  <td className="NewMenu_table_cell NewMenu_table_cell_idx">{idx + 1}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_image">
                    {option.images?.main && (
                      <img className="NewMenu_table_row_image" src={option.images.main} alt={option.name?.label} />
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_usedIn">
                    {usedIn[0] || "—"}
                    {usedIn.length > 1 && <strong style={{ marginLeft: 6 }}>+{usedIn.length - 1}</strong>}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_name"><strong>{option.name?.label}</strong></td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_description">
                    {option.description?.short?.en || option.description?.short || "—"}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_owner">
                    <NewMenu_ownerBadge value={option.ownerType} />
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_price">{option.sellingPrice?.gross}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_cost">{option.cost?.estimatedCost}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_pricing">
                    {option.isFree
                      ? <NewMenu_pill tone="success">{tr("free", "Free")}</NewMenu_pill>
                      : <NewMenu_pill tone="muted">{tr("paid", "Paid")}</NewMenu_pill>}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_calories">
                    {option.nutrition?.calories ?? "—"} kcal
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_recipe">
                    {option.recipeFile?.pdf
                      ? <NewMenu_pill>{tr("pdf", "PDF")}</NewMenu_pill>
                      : "—"}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_techCard">
                    {option.techCardFile?.pdf
                      ? <NewMenu_pill>{tr("pdf", "PDF")}</NewMenu_pill>
                      : "—"}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_update">
                    <button type="button" className="NewMenu_table_btn" data-id={option._id} onClick={onUpdate}>
                      {tr("update", "Update")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_view">
                    <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={option._id} onClick={onView}>
                      {tr("view", "View")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_dropdown">
                    <button type="button" className="NewMenu_table_btn"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedId(isOpen ? null : option._id)}>
                      {isOpen ? tr("close", "Close") : tr("quick", "Quick")}
                    </button>
                  </td>
                </tr>
                <NewMenu_quickView
                  open={isOpen}
                  colSpan={NEW_MENU_OPTIONS_HEADERS.length}
                  fields={[
                    { label: tr("owner", "Owner"), value: option.ownerType },
                    { label: tr("price", "Price"), value: `${option.sellingPrice?.gross} (net ${option.sellingPrice?.net})` },
                    { label: tr("cost", "Cost"), value: `est. ${option.cost?.estimatedCost} / actual ${option.cost?.actualCost}` },
                    { label: tr("calories", "Calories"), value: `${option.nutrition?.calories} kcal` },
                    {
                      label: tr("macros", "Macros"),
                      value: `P ${option.nutrition?.protein} · C ${option.nutrition?.carbs} · F ${option.nutrition?.fat}`,
                    },
                    { label: tr("usedIn", "Used in"), value: (option.availableInModifiers || []).join(", ") || "—" },
                  ]}
                  sections={[
                    {
                      title: tr("descriptionShort", "Short description"),
                      body: <p style={{ margin: 0 }}>{option.description?.short?.en || option.description?.short || "—"}</p>,
                    },
                    {
                      title: tr("files", "Files"),
                      body: (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {option.recipeFile?.pdf && (
                            <NewMenu_filePreview
                              file={{ path: option.recipeFile.pdf, fileType: "pdf", ref: "Recipe" }}
                              label={tr("recipe", "Recipe")}
                            />
                          )}
                          {option.techCardFile?.pdf && (
                            <NewMenu_filePreview
                              file={{ path: option.techCardFile.pdf, fileType: "pdf", ref: "TechCard" }}
                              label={tr("techCard", "Tech card")}
                            />
                          )}
                        </div>
                      ),
                    },
                  ]}
                  actions={
                    <>
                      <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={option._id} onClick={onView}>
                        {tr("openFull", "Open full view")}
                      </button>
                      <button type="button" className="NewMenu_table_btn" data-id={option._id} onClick={onUpdate}>
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

export default NewMenu_table_options;
