import {
  formatDate,
  unwrapItems,
} from "../../02_newMenu_helpers/_newMenu_helpers.index.js";
import NewMenu_fieldRow from "./NewMenu_fieldRow.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_table_items from "./NewMenu_table_items.jsx";
import "../../_styles/newMenu_viewOne.css";
import "../../_styles/newMenu_menu_viewOne.css";

/* ============================================================================
   NewMenu_menu_viewOne — full detail page for a single Menu.

   Layout:
     1. Header card (title + badges + editable label / description / owner /
        status fields)
     2. One section per category — header row + nested items table
============================================================================ */

const FactCell = ({ label, value, wrap }) => (
  <div className="NewMenu_viewOne_fact">
    <span className="NewMenu_viewOne_fact_label">{label}</span>
    <span className={`NewMenu_viewOne_fact_value ${wrap ? "NewMenu_viewOne_fact_value_wrap" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

const NewMenu_menu_viewOne = ({
  menu,
  isUpdating = false,
  editingField = null,
  setEditingField,
  requestConfirm,
  onViewItem,
  onUpdateItem,
  t,
}) => {
  if (!menu) return null;
  const tr = (k, fb) => (t ? t(`viewOne.${k}`, { defaultValue: fb }) : fb);

  const fieldProps = {
    editingField,
    setEditingField,
    onRequestConfirm: requestConfirm,
    lockedBy: isUpdating,
  };

  return (
    <div className="NewMenu_viewOne NewMenu_menu_viewOne">
      {/* ---- Header ---- */}
      <section className="NewMenu_viewOne_section NewMenu_menu_viewOne_header">
        <div className="NewMenu_viewOne_header_titleRow">
          <div>
            <h1 className="NewMenu_viewOne_header_title">{menu.label}</h1>
            <div className="NewMenu_viewOne_pillRow" style={{ marginTop: 8 }}>
              <NewMenu_ownerBadge value={menu.ownerType} />
              {menu.isActive
                ? <NewMenu_pill tone="success">{tr("active", "Active")}</NewMenu_pill>
                : <NewMenu_pill tone="muted">{tr("inactive", "Inactive")}</NewMenu_pill>}
            </div>
          </div>
        </div>

        <NewMenu_fieldRow
          label={tr("label", "Label")}
          fieldKey="label"
          value={menu.label}
          {...fieldProps}
        />
        <NewMenu_fieldRow
          label={tr("description", "Description")}
          fieldKey="description"
          value={menu.description}
          multiline
          {...fieldProps}
        />
        <NewMenu_fieldRow
          label={tr("owner", "Owner")}
          fieldKey="ownerType"
          type="select"
          options={["brand", "competitor"]}
          value={menu.ownerType}
          {...fieldProps}
        />
        <NewMenu_fieldRow
          label={tr("status", "Status")}
          fieldKey="isActive"
          type="select"
          options={["Active", "Inactive"]}
          value={menu.isActive ? "Active" : "Inactive"}
          {...fieldProps}
        />

        <div className="NewMenu_viewOne_factGrid" style={{ marginTop: 10 }}>
          <FactCell label={tr("createdBy", "Created by")} value={menu.createdBy} />
          <FactCell label={tr("createdAt", "Created at")} value={formatDate(menu.createdAt)} wrap />
          <FactCell label={tr("updatedBy", "Updated by")} value={menu.updatedBy} />
          <FactCell label={tr("updatedAt", "Updated at")} value={formatDate(menu.updatedAt)} wrap />
        </div>
      </section>

      {/* ---- Categories + nested items table ---- */}
      {(menu.categories || []).map((cat) => {
        const items = unwrapItems(cat.menuItems);
        return (
          <section key={cat._id} className="NewMenu_viewOne_section">
            <header className="NewMenu_menu_viewOne_category_header">
              <div>
                <h3 className="NewMenu_menu_viewOne_category_title">{cat?.name?.label}</h3>
                <div className="NewMenu_viewOne_pillRow" style={{ marginTop: 4 }}>
                  <NewMenu_pill tone="muted">
                    {items.length} {items.length === 1 ? tr("item", "item") : tr("items", "items")}
                  </NewMenu_pill>
                  {cat?.activeTimings?.isAlwaysActive
                    ? <NewMenu_pill tone="success">{tr("alwaysActive", "Always Active")}</NewMenu_pill>
                    : (cat?.activeTimings?.windows || []).map((w, i) => (
                        <NewMenu_pill key={i} title={`${w.label} ${w.from}–${w.to}`}>
                          {w.from}–{w.to}
                        </NewMenu_pill>
                      ))}
                </div>
              </div>
            </header>
            {items.length === 0 ? (
              <p style={{ margin: 0, color: "var(--newMenu_textFaint)", fontSize: "var(--newMenu_textSm)" }}>
                {tr("emptyCategoryItems", "No items in this category yet.")}
              </p>
            ) : (
              <NewMenu_table_items
                items={cat.menuItems}
                onView={onViewItem}
                onUpdate={onUpdateItem}
                t={t}
              />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default NewMenu_menu_viewOne;
