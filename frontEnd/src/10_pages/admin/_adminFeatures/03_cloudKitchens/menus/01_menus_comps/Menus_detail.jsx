import {
  Menus_detail_basic,
  Menus_detail_name,
  Menus_detail_categories,
  Menus_detail_branches,
  Menus_detail_brands,
} from "./menus_childComps/_menus_childComps.index.js";
import { TrashIcon } from "./Menus_icons/_menus_icons.index.js";
import { SECTION_KEYS } from "../05_menus_cnst/_menus_cnst.index.js";
import "../_styles/menus_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: Menus_detail_basic,
  [SECTION_KEYS.name]: Menus_detail_name,
  [SECTION_KEYS.categories]: Menus_detail_categories,
  [SECTION_KEYS.branches]: Menus_detail_branches,
  [SECTION_KEYS.brands]: Menus_detail_brands,
};

const Menus_detail = ({
  menu,
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
  if (!menu) {
    return (
      <div className="menusDetail">
        <div className="menusDetail__toolbar">
          <button type="button" className="menusDetail__backBtn" onClick={onBack}>
            {t("actions.back")}
          </button>
        </div>
        <p className="menusDetail__missing">{t("empty.menuGone")}</p>
      </div>
    );
  }

  const renderSection = (sectionKey) => {
    const Component = SECTION_COMPONENT[sectionKey];
    if (Component) return <Component key={sectionKey} {...sectionProps[sectionKey]} />;
    return null;
  };

  return (
    <div className="menusDetail">
      <div className="menusDetail__toolbar">
        <button type="button" className="menusDetail__backBtn" onClick={onBack}>
          {t("actions.back")}
        </button>
        <h2 className="menusDetail__title">{menu.name?.en || t("empty.noValue")}</h2>
        {isBulkEdit && (
          <span className="menusDetail__bulkBadge">{t("bulkEditBadge")}</span>
        )}
      </div>

      {error && <p className="menusDetail__error">{error}</p>}

      <div className="menusDetail__columns">
        <div className="menusDetail__left">
          {layout.leftColumn.map((key) => renderSection(key))}
        </div>
        <div className="menusDetail__right">
          {layout.rightColumn.map((key) => renderSection(key))}
        </div>
      </div>

      {isBulkEdit ? (
        <div className="menusDetail__bulkFooter">
          <button
            type="button"
            className="menusDetail__bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="menusDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="menusDetail__deleteFooter">
          <button
            type="button"
            className="menusDetail__deleteBtn"
            onClick={onDeleteRequest}
          >
            <TrashIcon size={16} />
            {t("actions.deleteMenu")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Menus_detail;
