import {
  Modifiers_detail_basic,
  Modifiers_detail_name,
  Modifiers_detail_descriptions,
  Modifiers_detail_options,
} from "./modifiers_childComps/_modifiers_childComps.index.js";
import { SECTION_KEYS } from "../05_modifiers_cnst/_modifiers_cnst.index.js";
import "../_styles/modifiers_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Modifiers_detail_basic,
  [SECTION_KEYS.name]: Modifiers_detail_name,
  [SECTION_KEYS.descriptions]: Modifiers_detail_descriptions,
  [SECTION_KEYS.options]: Modifiers_detail_options,
};

const Modifiers_detail = ({
  modifier,
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
  if (!modifier) {
    return (
      <div className="modifiersDetail">
        <div className="modifiersDetail__toolbar">
          <button type="button" className="modifiersDetail__backBtn" onClick={onBack}>
            {t("actions.back")}
          </button>
        </div>
        <p className="modifiersDetail__missing">{t("empty.modifierGone")}</p>
      </div>
    );
  }

  const displayName = modifier?.name?.en || t("empty.noValue");

  const renderSection = (sectionKey) => {
    const Component = SECTION_COMPONENT[sectionKey];
    if (Component) return <Component key={sectionKey} {...sectionProps[sectionKey]} />;
    return null;
  };

  return (
    <div className="modifiersDetail">
      <div className="modifiersDetail__toolbar">
        <button type="button" className="modifiersDetail__backBtn" onClick={onBack}>
          {t("actions.back")}
        </button>
        <h2 className="modifiersDetail__title">{displayName}</h2>
        {isBulkEdit && (
          <span className="modifiersDetail__bulkBadge">{t("bulkEditBadge")}</span>
        )}
      </div>

      {error && <p className="modifiersDetail__error">{error}</p>}

      <div className="modifiersDetail__columns">
        <div className="modifiersDetail__left">
          {layout.leftColumn.map((key) => renderSection(key))}
        </div>
        <div className="modifiersDetail__right">
          {layout.rightColumn.map((key) => renderSection(key))}
        </div>
      </div>

      {isBulkEdit ? (
        <div className="modifiersDetail__bulkFooter">
          <button
            type="button"
            className="modifiersDetail__bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="modifiersDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="modifiersDetail__deleteFooter">
          <button
            type="button"
            className="modifiersDetail__deleteBtn"
            onClick={onDeleteRequest}
          >
            {t("actions.deleteModifier")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Modifiers_detail;
