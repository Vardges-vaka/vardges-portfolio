import {
  MenuCategories_detail_basic,
  MenuCategories_detail_name,
  MenuCategories_detail_items,
} from "./menuCategories_childComps/_menuCategories_childComps.index.js";
import { TrashIcon } from "./MenuCategories_icons/_menuCategories_icons.index.js";
import { SECTION_KEYS } from "../05_menuCategories_cnst/_menuCategories_cnst.index.js";
import "../_styles/menuCategories_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: MenuCategories_detail_basic,
  [SECTION_KEYS.name]: MenuCategories_detail_name,
  [SECTION_KEYS.items]: MenuCategories_detail_items,
};

const MenuCategories_detail = ({
  category,
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
  if (!category) {
    return (
      <div className="menuCategoriesDetail">
        <div className="menuCategoriesDetail__toolbar">
          <button type="button" className="menuCategoriesDetail__backBtn" onClick={onBack}>
            {t("actions.back")}
          </button>
        </div>
        <p className="menuCategoriesDetail__missing">{t("empty.categoryGone")}</p>
      </div>
    );
  }

  const renderSection = (sectionKey) => {
    const Component = SECTION_COMPONENT[sectionKey];
    if (Component) return <Component key={sectionKey} {...sectionProps[sectionKey]} />;
    return null;
  };

  return (
    <div className="menuCategoriesDetail">
      <div className="menuCategoriesDetail__toolbar">
        <button type="button" className="menuCategoriesDetail__backBtn" onClick={onBack}>
          {t("actions.back")}
        </button>
        <h2 className="menuCategoriesDetail__title">
          {category?.name?.en || t("empty.noValue")}
        </h2>
        {isBulkEdit && (
          <span className="menuCategoriesDetail__bulkBadge">{t("bulkEditBadge")}</span>
        )}
      </div>

      {error && <p className="menuCategoriesDetail__error">{error}</p>}

      <div className="menuCategoriesDetail__columns">
        <div className="menuCategoriesDetail__left">
          {layout.leftColumn.map((key) => renderSection(key))}
        </div>
        <div className="menuCategoriesDetail__right">
          {layout.rightColumn.map((key) => renderSection(key))}
        </div>
      </div>

      {isBulkEdit ? (
        <div className="menuCategoriesDetail__bulkFooter">
          <button
            type="button"
            className="menuCategoriesDetail__bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="menuCategoriesDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="menuCategoriesDetail__deleteFooter">
          <button
            type="button"
            className="menuCategoriesDetail__deleteBtn"
            onClick={onDeleteRequest}
          >
            <TrashIcon size={16} />
            {t("actions.deleteCategory")}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuCategories_detail;
