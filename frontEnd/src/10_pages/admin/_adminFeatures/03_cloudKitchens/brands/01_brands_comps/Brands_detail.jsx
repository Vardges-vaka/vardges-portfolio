import {
  Brands_detail_basic,
  Brands_detail_socials,
  Brands_detail_emails,
  Brands_detail_logoPlaceholder,
  Brands_detail_files,
} from "./brands_childComps/_brands_childComps.index.js";
import { TrashIcon } from "./Brands_icons/_brands_icons.index.js";
import { SECTION_KEYS } from "../05_brands_cnst/_brands_cnst.index.js";
import "../_styles/brands_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Brands_detail_basic,
  [SECTION_KEYS.socials]: Brands_detail_socials,
  [SECTION_KEYS.emails]: Brands_detail_emails,
};

const PLACEHOLDER_COMPONENT = {
  logo: Brands_detail_logoPlaceholder,
  files: Brands_detail_files,
};

const Brands_detail = ({
  brand,
  isBulkEdit,
  isSaving,
  error,
  layout,
  sectionProps,
  onBack,
  onBulkSubmit,
  onBulkCancel,
  onDeleteRequest,
  t,
}) => {
  if (!brand) {
    return (
      <div className="brandsDetail">
        <div className="brandsDetail__toolbar">
          <button type="button" className="brandsDetail__backBtn" onClick={onBack}>
            {t("actions.back")}
          </button>
        </div>
        <p className="brandsDetail__missing">{t("empty.brandGone")}</p>
      </div>
    );
  }

  const renderSection = (sectionKey) => {
    const Component = SECTION_COMPONENT[sectionKey];
    if (Component) return <Component key={sectionKey} {...sectionProps[sectionKey]} />;

    const Placeholder = PLACEHOLDER_COMPONENT[sectionKey];
    if (Placeholder) return <Placeholder key={sectionKey} t={t} />;

    return null;
  };

  return (
    <div className="brandsDetail">
      <div className="brandsDetail__toolbar">
        <button type="button" className="brandsDetail__backBtn" onClick={onBack}>
          {t("actions.back")}
        </button>
        <h2 className="brandsDetail__title">{brand.name}</h2>
        {isBulkEdit && (
          <span className="brandsDetail__bulkBadge">{t("bulkEditBadge")}</span>
        )}
      </div>

      {error && <p className="brandsDetail__error">{error}</p>}

      <div className="brandsDetail__columns">
        <div className="brandsDetail__left">
          {layout.leftColumn.map((key) => renderSection(key))}
        </div>
        <div className="brandsDetail__right">
          {layout.rightColumn.map((key) => renderSection(key))}
        </div>
      </div>

      {isBulkEdit ? (
        <div className="brandsDetail__bulkFooter">
          <button
            type="button"
            className="brandsDetail__bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="brandsDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="brandsDetail__deleteFooter">
          <button
            type="button"
            className="brandsDetail__deleteBtn"
            onClick={onDeleteRequest}
          >
            <TrashIcon size={16} />
            {t("actions.deleteBrand")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Brands_detail;
