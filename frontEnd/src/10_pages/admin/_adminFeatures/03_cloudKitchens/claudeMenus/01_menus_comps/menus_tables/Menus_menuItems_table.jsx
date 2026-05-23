import { useState, Fragment } from "react";
import { Pencil, Eye, ChevronDown } from "lucide-react";
import { MENU_ITEMS_TBL_HDRS } from "../../05_menus_cnst/_menus_cnst.index.js";
import "../../_styles/menus_childComps/menus_menuItems/menus_menuItem_view_all.css";
import {
  Menus_quickView,
  Menus_salesCell,
  Menus_salesFilter,
  Menus_ownerIcon,
  Menus_updatePopup,
  UPDATE_OPTIONS,
  Menus_imageCell,
  Menus_imageUpdater,
} from "../menus_childComps/_menus_childComps.index.js";
import { SALES_TIMEFRAMES } from "../../05_menus_cnst/.temp_MOCK_DATA/MOCK_DATA_sales.js";

/* ============================================================================
   Menus_menuItems_table — items inside a category.
   v3: image cells with magnifier + edit, sort inactive last, icon-only
   ownerType/update/view/quick, update popup, image-replace flow.
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

const Menus_menuItems_table = ({ states, handlers, childProps, t, menuItems }) => {
  const rawHeaders = MENU_ITEMS_TBL_HDRS();
  const [expandedId, setExpandedId] = useState(null);
  const [salesTimeframe, setSalesTimeframe] = useState("currentMonthSales");
  const [popup, setPopup] = useState(null);
  const [imageEdit, setImageEdit] = useState(null);

  const tfLabel =
    SALES_TIMEFRAMES.find((tf) => tf.key === salesTimeframe)?.label || "Sales";
  const ordered = sortInactiveLast(
    menuItems?.map((m) => (states.viewingType === "single" ? m.item : m)) || [],
  );

  const headerNode = (h) => {
    if (h.className === "ownerType") return <Menus_ownerIcon value="brand" />;
    if (h.className === "update")    return <span className="menus_iconHeader"><Pencil size={16} /></span>;
    if (h.className === "view")      return <span className="menus_iconHeader"><Eye size={16} /></span>;
    if (h.className === "dropdown")  return <span className="menus_iconHeader"><ChevronDown size={16} /></span>;
    return h.label;
  };

  return (
    <div className="menus_menuItem_view_all">
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 10, padding: "10px 12px",
          borderBottom: "1px solid var(--menus-border-soft)",
          background: "color-mix(in srgb, var(--menus-bg-soft) 35%, transparent)",
        }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--menus-text-soft)",
        }}>
          Sales filter · {tfLabel}
        </span>
        <Menus_salesFilter value={salesTimeframe} onChange={setSalesTimeframe} />
      </div>
      <table className="menus_menuItem_view_all_table">
        <thead>
          <tr>
            {rawHeaders.map((h) => (
              <th
                key={`menus_menuItem_view_all_table_header ${h.label}`}
                scope="col"
                className={`menus_menuItem_view_all_table_header ${h.className}`}
                title={h.title}>
                {headerNode(h)}
              </th>
            ))}
            <th
              scope="col"
              className="menus_menuItem_view_all_table_header sales"
              title={`Sales — ${tfLabel}`}>
              Sales
            </th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((menuItem, rowIndex) => {
            const isOpen = expandedId === menuItem._id;
            return (
              <Fragment key={menuItem._id}>
                <tr className={`menus_menuItem_view_all_table_rows_provider ${menuItem.isActive === false ? "inactive" : ""}`}>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell index">{rowIndex + 1}</td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell image">
                    <Menus_imageCell
                      src={menuItem.images?.main}
                      alt={menuItem.name?.label}
                      onEdit={() => setImageEdit(menuItem)}
                    />
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell category">
                    {menuItem.availableInCategories?.[0] || "—"}
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell label">{menuItem.name?.label}</td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell sellingPrice">{menuItem.sellingPrice?.gross}</td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell cost">{menuItem.cost?.estimatedCost}</td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell PrepTime">{menuItem.preparationTimeMin}m</td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell ownerType" title={menuItem.ownerType}>
                    <Menus_ownerIcon value={menuItem.ownerType} />
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell nutrition">{menuItem.nutrition?.calories} kcal</td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell dietaryTags">
                    {menuItem.dietaryTags?.[0] || "—"}
                    {menuItem.dietaryTags?.length > 1 && <span style={{ fontWeight: "bold", marginLeft: 8 }}>+{menuItem.dietaryTags.length - 1}</span>}
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell allergens">
                    {menuItem.allergens?.[0] || "—"}
                    {menuItem.allergens?.length > 1 && <span style={{ fontWeight: "bold", marginLeft: 8 }}>+{menuItem.allergens.length - 1}</span>}
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell modifiers">
                    {menuItem.modifiers?.length ? `${menuItem.modifiers.length}` : "—"}
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell mirroredWithOtherMenuItems">
                    {menuItem.mirroredWithOtherMenuItems?.length || 0}
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell competesWithOtherMenuItems">
                    {menuItem.competesWithOtherMenuItems?.length || 0}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    {iconBtn(<Pencil size={14} />, "Update",
                      (e) => setPopup({ anchor: e.currentTarget.getBoundingClientRect(), menuItem }))}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell">
                    {iconBtn(<Eye size={14} />, "View",
                      () => handlers.handleView_MenuItem?.({ currentTarget: { dataset: { id: menuItem._id } } }))}
                  </td>
                  <td className="menus_view_all_table_rows_provider_cell"
                    data-quickview-open={isOpen ? "true" : "false"}>
                    {iconBtn(<ChevronDown size={14} />, isOpen ? "Close" : "Quick look",
                      () => setExpandedId(isOpen ? null : menuItem._id))}
                  </td>
                  <td className="menus_menuItem_view_all_table_rows_provider_cell sales">
                    <Menus_salesCell sales={menuItem[salesTimeframe]} />
                  </td>
                </tr>
                <Menus_quickView
                  open={isOpen}
                  colSpan={rawHeaders.length + 1}
                  fields={[
                    { label: "SKU", value: menuItem.sku },
                    { label: "Cuisine", value: menuItem.cuisineType },
                    { label: "Station", value: menuItem.kitchenStation },
                    { label: "Size", value: menuItem.sizeByGrams ? `${menuItem.sizeByGrams} g` : "—" },
                    { label: "Spicy", value: menuItem.spicyLevel },
                    { label: "Dietary", value: (menuItem.dietaryTags || []).join(", ") || "—" },
                    { label: "Allergens", value: (menuItem.allergens || []).join(", ") || "—" },
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
        options={UPDATE_OPTIONS.item}
        isActive={popup?.menuItem?.isActive}
        onPick={(key) => {
          if (key === "updateAll") handlers.handleUpdate_MenuItem?.({ currentTarget: { dataset: { id: popup.menuItem._id } } });
          else if (key === "images.main") setImageEdit(popup.menuItem);
          else handlers.startFieldUpdate?.(key, popup.menuItem);
        }}
        onToggleActive={() => handlers.toggleActive?.(popup.menuItem._id, !popup.menuItem.isActive)}
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
    </div>
  );
};

export default Menus_menuItems_table;
