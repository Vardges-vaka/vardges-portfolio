import { useState } from "react";
import { Globe, Image as ImageIcon, Upload } from "lucide-react";
import { formatDate } from "../../02_newMenu_helpers/_newMenu_helpers.index.js";
import NewMenu_fieldRow from "./NewMenu_fieldRow.jsx";
import NewMenu_iconBtn from "./NewMenu_iconBtn.jsx";
import NewMenu_translations from "./NewMenu_translations.jsx";
import NewMenu_dropZone from "./NewMenu_dropZone.jsx";
import NewMenu_filePreview from "./NewMenu_filePreview.jsx";
import NewMenu_pill from "./NewMenu_pill.jsx";
import NewMenu_ownerBadge from "./NewMenu_ownerBadge.jsx";
import "../../_styles/newMenu_viewOne.css";

/* ============================================================================
   NewMenu_option_viewOne — full detail page for a single Option.
   Options DO have images, so the 2-col top split is used here.
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

const NewMenu_option_viewOne = ({
  option,
  isUpdating = false,
  editingField,
  setEditingField,
  requestConfirm,
  t,
}) => {
  const [showNameTrans, setShowNameTrans] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);

  if (!option) return null;
  const tr = (k, fb) => (t ? t(`viewOne.${k}`, { defaultValue: fb }) : fb);

  const fieldProps = {
    editingField,
    setEditingField,
    onRequestConfirm: requestConfirm,
    lockedBy: isUpdating,
  };

  return (
    <div className="NewMenu_viewOne NewMenu_option_viewOne">
      {/* ---- Top split ---- */}
      <div className="NewMenu_viewOne_top">
        <aside className="NewMenu_viewOne_top_image">
          {option.images?.main && (
            <img className="NewMenu_viewOne_top_image_main" src={option.images.main} alt={option.name?.label} />
          )}
          <div className="NewMenu_viewOne_top_image_alt_strip">
            {IMAGE_SLOTS.map((slot) => (
              <span
                key={slot}
                className={`NewMenu_viewOne_top_image_alt ${option.images?.[slot] ? "NewMenu_viewOne_top_image_alt_active" : ""}`}
                title={slot}>
                {option.images?.[slot] ? <ImageIcon size={14} /> : <Upload size={14} />}
              </span>
            ))}
          </div>
          <NewMenu_dropZone
            label={tr("dropOptionImage", "Add option image")}
            hint={tr("optionImageHint", "PNG, JPG up to 5 MB")}
            disabled={isUpdating || !!editingField}
          />
        </aside>

        <aside className="NewMenu_viewOne_top_fields">
          <div className="NewMenu_viewOne_pillRow">
            <NewMenu_ownerBadge value={option.ownerType} />
            {option.isFree
              ? <NewMenu_pill tone="success">{tr("free", "Free")}</NewMenu_pill>
              : <NewMenu_pill tone="muted">{tr("paid", "Paid")}</NewMenu_pill>}
            {option.isActive
              ? <NewMenu_pill tone="success">{tr("active", "Active")}</NewMenu_pill>
              : <NewMenu_pill tone="muted">{tr("inactive", "Inactive")}</NewMenu_pill>}
          </div>

          {/* Name */}
          <NewMenu_fieldRow
            label={tr("name", "Name")}
            fieldKey="name.label"
            value={option.name?.label}
            {...fieldProps}
            extraControls={
              <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showNameTrans} onClick={() => setShowNameTrans((v) => !v)} />
            }
          />
          {showNameTrans && <NewMenu_translations title={tr("nameTranslations", "Name — translations")} data={option.name?.translations || {}} />}

          {/* Descriptions */}
          <div>
            <label className="NewMenu_fieldRow_label">{tr("descriptions", "Descriptions")}</label>
            <div className="NewMenu_viewOne_descGrid" style={{ marginTop: 6 }}>
              <div>
                <NewMenu_fieldRow
                  label={tr("short", "Short")}
                  fieldKey="description.short"
                  value={option.description?.short?.en ?? option.description?.short}
                  multiline
                  {...fieldProps}
                  extraControls={
                    <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showShortTrans} onClick={() => setShowShortTrans((v) => !v)} />
                  }
                />
                {showShortTrans && typeof option.description?.short === "object" && (
                  <NewMenu_translations title={tr("shortTranslations", "Short — translations")} data={option.description.short} multiline />
                )}
              </div>
              <div>
                <NewMenu_fieldRow
                  label={tr("long", "Long")}
                  fieldKey="description.long"
                  value={option.description?.long?.en ?? option.description?.long}
                  multiline
                  {...fieldProps}
                  extraControls={
                    <NewMenu_iconBtn icon={<Globe size={16} />} tooltip={tr("translations", "Translations")} active={showLongTrans} onClick={() => setShowLongTrans((v) => !v)} />
                  }
                />
                {showLongTrans && typeof option.description?.long === "object" && (
                  <NewMenu_translations title={tr("longTranslations", "Long — translations")} data={option.description.long} multiline />
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="NewMenu_viewOne_factGrid">
            <FactCell label={tr("sellingPriceGross", "Selling — gross")} value={option.sellingPrice?.gross} />
            <FactCell label={tr("sellingPriceNet", "Selling — net")} value={option.sellingPrice?.net} />
            <FactCell label="VAT" value={option.sellingPrice?.VAT} />
            <FactCell label={tr("estimatedCost", "Estimated cost")} value={option.cost?.estimatedCost} />
            <FactCell label={tr("actualCost", "Actual cost")} value={option.cost?.actualCost} />
          </div>

          {/* Nutrition */}
          <div className="NewMenu_viewOne_factGrid">
            <FactCell label={tr("source", "Source")} value={option.nutrition?.source} />
            <FactCell label={tr("calculatedAt", "Calculated")} value={formatDate(option.nutrition?.lastCalculatedAt)} wrap />
            <FactCell label={tr("calories", "Calories")} value={option.nutrition?.calories} />
            <FactCell label={tr("protein", "Protein")} value={option.nutrition?.protein} />
            <FactCell label={tr("carbs", "Carbs")} value={option.nutrition?.carbs} />
            <FactCell label={tr("fat", "Fat")} value={option.nutrition?.fat} />
          </div>
        </aside>
      </div>

      {/* ---- Fact grid ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("details", "Details")}</h3>
        <div className="NewMenu_viewOne_factGrid">
          <FactCell label={tr("owner", "Owner")} value={<NewMenu_ownerBadge value={option.ownerType} />} />
          <FactCell label={tr("displayOrder", "Display order")} value={option.displayOrder} />
          <FactCell label={tr("pricing", "Pricing")} value={option.isFree ? tr("free", "Free") : tr("paid", "Paid")} />
          <FactCell label={tr("status", "Status")} value={option.isActive ? tr("active", "Active") : tr("inactive", "Inactive")} />
          <FactCell label={tr("cloudStorage", "Cloud storage")}
            value={option.cloudStorage ? `${option.cloudStorage.value}${option.cloudStorage.isDefault ? " (default)" : ""}` : "—"} />
          <FactCell label={tr("availableInModifiers", "Available in modifiers")} value={(option.availableInModifiers || []).join(", ") || "—"} wrap />
          <FactCell label={tr("createdBy", "Created")} value={`${option.createdBy || "—"} · ${formatDate(option.createdAt)}`} wrap />
          <FactCell label={tr("updatedBy", "Updated")} value={`${option.updatedBy || "—"} · ${formatDate(option.updatedAt)}`} wrap />
        </div>
      </section>

      {/* ---- Files ---- */}
      <section className="NewMenu_viewOne_section">
        <h3 className="NewMenu_viewOne_section_title">{tr("files", "Files")}</h3>
        <div className="NewMenu_item_viewOne_fileStrip">
          {option.recipeFile?.pdf && (
            <NewMenu_filePreview file={{ path: option.recipeFile.pdf, fileType: "pdf", ref: "Recipe (PDF)" }} label={tr("recipePdf", "Recipe PDF")} />
          )}
          {option.techCardFile?.pdf && (
            <NewMenu_filePreview file={{ path: option.techCardFile.pdf, fileType: "pdf", ref: "TechCard (PDF)" }} label={tr("techCardPdf", "TechCard PDF")} />
          )}
          {(option.images?.other || []).map((f, i) => <NewMenu_filePreview key={"io" + i} file={f} />)}
        </div>
        <div style={{ marginTop: 10 }}>
          <NewMenu_dropZone
            label={tr("dropFiles", "Drop files here")}
            hint={tr("filesHint", "PDF, DOCX, XLSX up to 10 MB")}
            disabled={isUpdating || !!editingField}
          />
        </div>
      </section>
    </div>
  );
};

export default NewMenu_option_viewOne;
