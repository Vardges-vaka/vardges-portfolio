import { useState } from "react";
import { Globe, ShoppingCart, Star, Image as ImageIcon, Upload } from "lucide-react";
import {
  formatDate,
  unwrapModifiers,
} from "../../02_newMenu_helpers/_newMenu_helpers.index.js";
import NewMenu_fieldRow from "./NewMenu_fieldRow.jsx";
import NewMenu_iconBtn from "./NewMenu_iconBtn.jsx";
import NewMenu_translations from "./NewMenu_translations.jsx";
import NewMenu_dropZone from "./NewMenu_dropZone.jsx";
import NewMenu_filePreview from "./NewMenu_filePreview.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import NewMenu_table_modifiers from "./NewMenu_table_modifiers.jsx";
import "../../_styles/newMenu_viewOne.css";
import "../../_styles/newMenu_item_viewOne.css";

/* ============================================================================
   NewMenu_item_viewOne — full detail page for a single MenuItem.

   Layout:
     1. Top split — image stack on left, name + descriptions + pricing + nutrition on right
     2. Fact grid (every secondary scalar field)
     3. Attached modifiers (nested table)
     4. Files strip + drop zone
     5. Mirrored / Competes side-by-side
============================================================================ */
const IMAGE_SLOTS = ["main", "aggregators", "website", "google", "highRes", "noBackgroundPng", "jpg", "png", "WebP", "ico"];

const FactCell = ({ label, value, wrap }) => (
  <div className="NewMenu_viewOne_fact">
    <span className="NewMenu_viewOne_fact_label">{label}</span>
    <span className={`NewMenu_viewOne_fact_value ${wrap ? "NewMenu_viewOne_fact_value_wrap" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

const NewMenu_item_viewOne = ({
  item,
  isUpdating = false,
  editingField,
  setEditingField,
  requestConfirm,
  onViewModifier,
  onUpdateModifier,
  t,
}) => {
  const [showNameTrans, setShowNameTrans] = useState(false);
  const [showNameAggr, setShowNameAggr] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);
  const [showDescAggr, setShowDescAggr] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  if (!item) return null;
  const tr = (k, fb) => (t ? t(`viewOne.${k}`, { defaultValue: fb }) : fb);

  const fieldProps = {
    editingField,
    setEditingField,
    onRequestConfirm: requestConfirm,
    lockedBy: isUpdating,
  };

  const modifiers = unwrapModifiers(item.modifiers);

  return (
    <div className="NewMenu_viewOne NewMenu_item_viewOne">
      {/* ---- Top split: images + fields ---- */}
      <div className="NewMenu_viewOne_top">
        <aside className="NewMenu_viewOne_top_image">
          {item.images?.main && (
            <img className="NewMenu_viewOne_top_image_main" src={item.images.main} alt={item.name?.label} />
          )}
          <div className="NewMenu_viewOne_top_image_alt_strip">
            {IMAGE_SLOTS.map((slot) => (
              <span
                key={slot}
                className={`NewMenu_viewOne_top_image_alt ${item.images?.[slot] ? "NewMenu_viewOne_top_image_alt_active" : ""}`}
                title={slot}>
                {item.images?.[slot] ? <ImageIcon size={14} /> : <Upload size={14} />}
              </span>
            ))}
          </div>
          <NewMenu_dropZone
            label={tr("dropMainImage", "Add main image")}
            hint={tr("imageHint", "PNG, JPG, WebP up to 5 MB")}
            disabled={isUpdating || !!editingField}
          />
        </aside>

        <aside className="NewMenu_viewOne_top_fields">
          {/* Name */}
          <NewMenu_fieldRow
            label={tr("name", "Name")}
            fieldKey="name.label"
            value={item.name?.label}
            {...fieldProps}
            extraControls={
              <>
                <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showNameTrans} onClick={() => setShowNameTrans((v) => !v)} />
                <NewMenu_iconBtn icon={<ShoppingCart size={16} />} tooltip={tr("aggregatorVersions", "Aggregator versions")} active={showNameAggr} onClick={() => setShowNameAggr((v) => !v)} />
              </>
            }
          />
          {showNameTrans && <NewMenu_translations title={tr("translations", "Translations")} data={item.name?.translations || {}} />}
          {showNameAggr && <NewMenu_translations title={tr("aggregatorVersions", "Aggregator versions")} data={item.name?.aggrigators || {}} />}

          {/* Descriptions */}
          <div className="NewMenu_item_viewOne_descriptions">
            <div className="NewMenu_item_viewOne_descriptions_header">
              <label className="NewMenu_fieldRow_label">{tr("descriptions", "Descriptions")}</label>
              <div className="NewMenu_fieldRow_controls">
                <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("websiteVersion", "Website")} />
                <NewMenu_iconBtn icon={<ShoppingCart size={16} />} tooltip={tr("aggregatorVersions", "Aggregator versions")} active={showDescAggr} onClick={() => setShowDescAggr((v) => !v)} />
                <NewMenu_iconBtn icon={<Star size={16} />} tooltip={tr("googleVersion", "Google version")} />
              </div>
            </div>
            <div className="NewMenu_viewOne_descGrid">
              <div>
                <NewMenu_fieldRow
                  label={tr("short", "Short")}
                  fieldKey="description.short"
                  value={item.description?.short?.en ?? item.description?.short}
                  multiline
                  {...fieldProps}
                  extraControls={
                    <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showShortTrans} onClick={() => setShowShortTrans((v) => !v)} />
                  }
                />
                {showShortTrans && typeof item.description?.short === "object" && (
                  <NewMenu_translations title={tr("shortTranslations", "Short — translations")} data={item.description.short} multiline />
                )}
              </div>
              <div>
                <NewMenu_fieldRow
                  label={tr("long", "Long")}
                  fieldKey="description.long"
                  value={item.description?.long?.en ?? item.description?.long}
                  multiline
                  {...fieldProps}
                  extraControls={
                    <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showLongTrans} onClick={() => setShowLongTrans((v) => !v)} />
                  }
                />
                {showLongTrans && typeof item.description?.long === "object" && (
                  <NewMenu_translations title={tr("longTranslations", "Long — translations")} data={item.description.long} multiline />
                )}
              </div>
            </div>
            {showDescAggr && (
              <NewMenu_translations title={tr("descriptionAggregator", "Description — aggregator versions")} data={item.description?.aggrigators || {}} />
            )}
          </div>

          {/* Pricing block */}
          <div className="NewMenu_item_viewOne_pricing">
            <div className="NewMenu_item_viewOne_pricing_header">
              <label className="NewMenu_fieldRow_label">{tr("sellingPrice", "Selling price")}</label>
            </div>
            <div className="NewMenu_item_viewOne_pricing_row">
              <FactCell label="Gross" value={item.sellingPrice?.gross} />
              <FactCell label="Net" value={item.sellingPrice?.net} />
              <FactCell label="VAT" value={item.sellingPrice?.VAT} />
            </div>
            <div className="NewMenu_item_viewOne_pricing_row">
              <FactCell label={tr("estimatedCost", "Estimated cost")} value={item.cost?.estimatedCost} />
              <FactCell label={tr("actualCost", "Actual cost")} value={item.cost?.actualCost} />
            </div>
            {(item.priceHistory || []).length > 0 && (
              <div>
                <button type="button" className="NewMenu_table_btn"
                  onClick={() => setShowPriceHistory((v) => !v)}>
                  {showPriceHistory ? tr("hidePriceHistory", "Hide price history") : tr("showPriceHistory", "Show price history")}
                  {" "}({item.priceHistory.length})
                </button>
                {showPriceHistory && (
                  <table className="NewMenu_item_viewOne_priceHistory">
                    <thead>
                      <tr>
                        <th>From</th><th>To</th><th>Gross</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.priceHistory.map((p, i) => (
                        <tr key={i}>
                          <td>{p.from}</td>
                          <td>{p.to || "—"}</td>
                          <td>{p.gross}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Nutrition */}
          <div className="NewMenu_viewOne_factGrid">
            <FactCell label={tr("source", "Source")} value={item.nutrition?.source} />
            <FactCell label={tr("calculatedAt", "Calculated")} value={formatDate(item.nutrition?.lastCalculatedAt)} wrap />
            <FactCell label={tr("calories", "Calories")} value={item.nutrition?.calories} />
            <FactCell label={tr("protein", "Protein")} value={item.nutrition?.protein} />
            <FactCell label={tr("carbs", "Carbs")} value={item.nutrition?.carbs} />
            <FactCell label={tr("fat", "Fat")} value={item.nutrition?.fat} />
          </div>
        </aside>
      </div>

      {/* ---- Fact grid ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("details", "Details")}</h3>
        <div className="NewMenu_viewOne_factGrid">
          <FactCell label="SKU" value={item.sku} />
          <FactCell label={tr("owner", "Owner")} value={<NewMenu_ownerBadge value={item.ownerType} />} />
          <FactCell label={tr("cuisine", "Cuisine")} value={item.cuisineType} />
          <FactCell label={tr("station", "Kitchen station")} value={item.kitchenStation} />
          <FactCell label={tr("size", "Size")} value={item.sizeByGrams ? `${item.sizeByGrams} g` : "—"} />
          <FactCell label={tr("spicy", "Spicy level")} value={item.spicyLevel} />
          <FactCell label={tr("prepTime", "Prep time")} value={item.preparationTimeMin ? `${item.preparationTimeMin}m` : "—"} />
          <FactCell label={tr("externalId", "External ID")} value={item.externalId} />
          <FactCell label={tr("cloudStorage", "Cloud storage")}
            value={item.cloudStorage ? `${item.cloudStorage.value}${item.cloudStorage.isDefault ? " (default)" : ""}` : "—"} />
          <FactCell label={tr("source", "Source")} value={item.source} />
          <FactCell label={tr("dietary", "Dietary tags")} value={(item.dietaryTags || []).join(", ") || "—"} wrap />
          <FactCell label={tr("allergens", "Allergens")} value={(item.allergens || []).join(", ") || "—"} wrap />
          <FactCell label={tr("createdBy", "Created")} value={`${item.createdBy || "—"} · ${formatDate(item.createdAt)}`} wrap />
          <FactCell label={tr("updatedBy", "Updated")} value={`${item.updatedBy || "—"} · ${formatDate(item.updatedAt)}`} wrap />
        </div>
      </section>

      {/* ---- Attached modifiers ---- */}
      {modifiers.length > 0 && (
        <section className="NewMenu_viewOne_section">
          <h3 className="NewMenu_viewOne_section_title">{tr("modifiers", "Modifiers")}</h3>
          <NewMenu_table_modifiers
            modifiers={modifiers}
            onView={onViewModifier}
            onUpdate={onUpdateModifier}
            t={t}
          />
        </section>
      )}

      {/* ---- Files ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("files", "Files")}</h3>
        <div className="NewMenu_item_viewOne_fileStrip">
          {item.recipeFile?.pdf && (
            <NewMenu_filePreview file={{ path: item.recipeFile.pdf, fileType: "pdf", ref: "Recipe (PDF)" }} label={tr("recipePdf", "Recipe PDF")} />
          )}
          {item.recipeFile?.word && (
            <NewMenu_filePreview file={{ path: item.recipeFile.word, fileType: "docx", ref: "Recipe (DOC)" }} label={tr("recipeDoc", "Recipe DOC")} />
          )}
          {item.techCardFile?.pdf && (
            <NewMenu_filePreview file={{ path: item.techCardFile.pdf, fileType: "pdf", ref: "TechCard (PDF)" }} label={tr("techCardPdf", "TechCard PDF")} />
          )}
          {item.techCardFile?.word && (
            <NewMenu_filePreview file={{ path: item.techCardFile.word, fileType: "docx", ref: "TechCard (DOC)" }} label={tr("techCardDoc", "TechCard DOC")} />
          )}
          {(item.otherFiles || []).map((f, i) => <NewMenu_filePreview key={"of" + i} file={f} />)}
          {(item.images?.other || []).map((f, i) => <NewMenu_filePreview key={"io" + i} file={f} />)}
        </div>
        <div style={{ marginTop: 10 }}>
          <NewMenu_dropZone
            label={tr("dropFiles", "Drop recipe / tech card / other files here")}
            hint={tr("filesHint", "PDF, DOCX, XLSX up to 10 MB")}
            disabled={isUpdating || !!editingField}
          />
        </div>
      </section>

      {/* ---- Mirrored / Competes ---- */}
      <section className="NewMenu_viewOne_section NewMenu_item_viewOne_mirrors">
        <div>
          <h3 className="NewMenu_viewOne_section_title">{tr("mirrored", "Mirrored with other items")}</h3>
          <div className="NewMenu_viewOne_pillRow" style={{ marginTop: 8 }}>
            {(item.mirroredWithOtherMenuItems || []).length === 0 && <span style={{ color: "var(--newMenu_textFaint)" }}>—</span>}
            {(item.mirroredWithOtherMenuItems || []).map((m, i) => (
              <NewMenu_pill key={i} title={m.note}>
                {m.brand?.logo && <img src={m.brand.logo} alt="" style={{ width: 14, height: 14, borderRadius: 3 }} />}
                {m.brand?.name} · {m.item?.name}
              </NewMenu_pill>
            ))}
          </div>
        </div>
        <div>
          <h3 className="NewMenu_viewOne_section_title">{tr("competes", "Competes with other items")}</h3>
          <div className="NewMenu_viewOne_pillRow" style={{ marginTop: 8 }}>
            {(item.competesWithOtherMenuItems || []).length === 0 && <span style={{ color: "var(--newMenu_textFaint)" }}>—</span>}
            {(item.competesWithOtherMenuItems || []).map((c, i) => (
              <NewMenu_pill key={i}>
                {c.brand?.logo && <img src={c.brand.logo} alt="" style={{ width: 14, height: 14, borderRadius: 3 }} />}
                {c.brand?.name} · {c.item?.name} · {c.sellingPrice?.gross}
              </NewMenu_pill>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewMenu_item_viewOne;
