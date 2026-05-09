import {
  Brands_detail_basic,
  Brands_detail_socials,
  Brands_detail_files,
  Brands_detail_website,
  Brands_detail_otherSocials,
  Brands_detail_inventoryIntegrations,
  Brands_detail_salesIntegration,
  Brands_detail_legal,
  Brands_detail_relations,
} from "./brands_childComps/_brands_childComps.index.js";
import { TrashIcon } from "./Brands_icons/_brands_icons.index.js";
import { SECTION_KEYS } from "../05_brands_cnst/_brands_cnst.index.js";
import { getBrandDisplayName } from "../02_brands_helpers/_brands_helpers.index.js";
import "../_styles/brands_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Brands_detail_basic,
  [SECTION_KEYS.files]: Brands_detail_files,
  [SECTION_KEYS.socials]: Brands_detail_socials,
  [SECTION_KEYS.website]: Brands_detail_website,
  [SECTION_KEYS.otherSocials]: Brands_detail_otherSocials,
  [SECTION_KEYS.inventoryIntegrations]: Brands_detail_inventoryIntegrations,
  [SECTION_KEYS.salesIntegration]: Brands_detail_salesIntegration,
  [SECTION_KEYS.legal]: Brands_detail_legal,
  [SECTION_KEYS.relations]: Brands_detail_relations,
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
        <div className="brandsDetail_toolbar">
          <button
            type="button"
            className="brandsDetail_backBtn"
            onClick={onBack}>
            {t("actions.back")}
          </button>
        </div>
        <p className="brandsDetail_missing">{t("empty.brandGone")}</p>
      </div>
    );
  }

  const renderSection = (sectionKey) => {
    const Component = SECTION_COMPONENT[sectionKey];
    if (Component)
      return <Component key={sectionKey} {...sectionProps[sectionKey]} />;

    return null;
  };

  return (
    <div className="brandsDetail">
      <div className="brandsDetail_toolbar">
        <button type="button" className="brandsDetail_backBtn" onClick={onBack}>
          {t("actions.back")}
        </button>
        <h2 className="brandsDetail_title">{getBrandDisplayName(brand)}</h2>
        {isBulkEdit && (
          <span className="brandsDetail_bulkBadge">{t("bulkEditBadge")}</span>
        )}
      </div>

      {error && <p className="brandsDetail_error">{error}</p>}

      <div className="brandsDetail_columns">
        <div className="brandsDetail_left">
          {layout.leftColumn.map((key) => renderSection(key))}
        </div>
        <div className="brandsDetail_right">
          {layout.rightColumn.map((key) => renderSection(key))}
        </div>
      </div>

      {isBulkEdit ? (
        <div className="brandsDetail_bulkFooter">
          <button
            type="button"
            className="brandsDetail_bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="brandsDetail_bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}>
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="brandsDetail_deleteFooter">
          <button
            type="button"
            className="brandsDetail_deleteBtn"
            onClick={onDeleteRequest}>
            <TrashIcon size={16} />
            {t("actions.deleteBrand")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Brands_detail;
