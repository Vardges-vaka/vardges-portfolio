import { useState, Fragment } from "react";
import { NEW_MENU_ITEMS_HEADERS } from "../../05_newMenu_cnst/_newMenu_cnst.index.js";
import NewMenu_quickView from "./NewMenu_quickView.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import "../../_styles/newMenu_table.css";

/* ============================================================================
   NewMenu_table_items — list view for the Items session.

   Props (flat):
     items        — array of menu items (or entries {item} that get unwrapped)
     onView(id)   — open the single item view
     onUpdate(id) — open single item view in update mode
     t            — translation function
============================================================================ */
const NewMenu_table_items = ({ items = [], onView, onUpdate, t }) => {
  const [expandedId, setExpandedId] = useState(null);
  const tr = (k, fb) => (t ? t(`tables.${k}`, { defaultValue: fb }) : fb);

  return (
    <div className="NewMenu_table_wrap">
      <table className="NewMenu_table NewMenu_table_items">
        <thead>
          <tr>
            {NEW_MENU_ITEMS_HEADERS.map((h) => (
              <th key={h.key} scope="col" className={`NewMenu_table_header NewMenu_table_header_${h.className}`} title={h.title}>
                {tr(h.key, h.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((entry, idx) => {
            // Accept both bare items (Items session) and { item } envelopes (nested in a menu).
            const item = entry?.item || entry;
            const isOpen = expandedId === item._id;
            const dietary = (item.dietaryTags || []).slice(0, 2);
            const allergens = (item.allergens || []).slice(0, 2);
            const modifiers = (item.modifiers || []);
            return (
              <Fragment key={item._id}>
                <tr className="NewMenu_table_row">
                  <td className="NewMenu_table_cell NewMenu_table_cell_idx">{idx + 1}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_image">
                    {item.images?.main && (
                      <img className="NewMenu_table_row_image" src={item.images.main} alt={item.name?.label} />
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_categories">
                    {(item.availableInCategories || [])[0] || "—"}
                    {(item.availableInCategories || []).length > 1 && (
                      <strong style={{ marginLeft: 6 }}>+{(item.availableInCategories || []).length - 1}</strong>
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_name"><strong>{item.name?.label}</strong></td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_price">{item.sellingPrice?.gross}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_cost">{item.cost?.estimatedCost}</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_prep">{item.preparationTimeMin}m</td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_owner">
                    <NewMenu_ownerBadge value={item.ownerType} />
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_calories">
                    {item.nutrition?.calories ?? "—"} kcal
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_dietary">
                    {dietary.join(", ") || "—"}
                    {(item.dietaryTags || []).length > 2 && (
                      <strong style={{ marginLeft: 6 }}>+{item.dietaryTags.length - 2}</strong>
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_allergens">
                    {allergens.join(", ") || "—"}
                    {(item.allergens || []).length > 2 && (
                      <strong style={{ marginLeft: 6 }}>+{item.allergens.length - 2}</strong>
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_modifiers">
                    {modifiers[0]?.modifier?.title?.label || "—"}
                    {modifiers.length > 1 && (
                      <strong style={{ marginLeft: 6 }}>+{modifiers.length - 1}</strong>
                    )}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_mirrored">
                    {(item.mirroredWithOtherMenuItems || []).length || "—"}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_competes">
                    {(item.competesWithOtherMenuItems || []).length || "—"}
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_update">
                    <button type="button" className="NewMenu_table_btn" data-id={item._id} onClick={onUpdate}>
                      {tr("update", "Update")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_view">
                    <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={item._id} onClick={onView}>
                      {tr("view", "View")}
                    </button>
                  </td>
                  <td className="NewMenu_table_cell NewMenu_table_cell_dropdown">
                    <button type="button" className="NewMenu_table_btn"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedId(isOpen ? null : item._id)}>
                      {isOpen ? tr("close", "Close") : tr("quick", "Quick")}
                    </button>
                  </td>
                </tr>
                <NewMenu_quickView
                  open={isOpen}
                  colSpan={NEW_MENU_ITEMS_HEADERS.length}
                  fields={[
                    { label: "SKU", value: item.sku || "—" },
                    { label: tr("owner", "Owner"), value: item.ownerType },
                    { label: tr("cuisine", "Cuisine"), value: item.cuisineType },
                    { label: tr("station", "Station"), value: item.kitchenStation },
                    { label: tr("size", "Size"), value: item.sizeByGrams ? `${item.sizeByGrams} g` : "—" },
                    { label: tr("spicy", "Spicy"), value: item.spicyLevel },
                    { label: tr("prepTime", "Prep time"), value: item.preparationTimeMin ? `${item.preparationTimeMin}m` : "—" },
                    { label: tr("price", "Price"), value: `${item.sellingPrice?.gross} (net ${item.sellingPrice?.net}, VAT ${item.sellingPrice?.VAT})` },
                    { label: tr("cost", "Cost"), value: `est. ${item.cost?.estimatedCost} / actual ${item.cost?.actualCost}` },
                    { label: tr("dietary", "Dietary"), value: (item.dietaryTags || []).join(", ") || "—" },
                    { label: tr("allergens", "Allergens"), value: (item.allergens || []).join(", ") || "—" },
                  ]}
                  sections={[
                    {
                      title: tr("descriptionShort", "Short description"),
                      body: <p style={{ margin: 0 }}>{item.description?.short?.en || item.description?.short || "—"}</p>,
                    },
                  ]}
                  actions={
                    <>
                      <button type="button" className="NewMenu_table_btn NewMenu_table_btn_primary" data-id={item._id} onClick={onView}>
                        {tr("openFull", "Open full view")}
                      </button>
                      <button type="button" className="NewMenu_table_btn" data-id={item._id} onClick={onUpdate}>
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

export default NewMenu_table_items;
