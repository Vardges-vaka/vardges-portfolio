import {
  MenuItems_detail_basic,
  MenuItems_detail_name,
  MenuItems_detail_modifiers,
  MenuItems_detail_descriptions,
  MenuItems_detail_images,
  MenuItems_detail_recipeFile,
  MenuItems_detail_ingredients,
} from "./menuItems_childComps/_menuItems_childComps.index.js";
import { SECTION_KEYS } from "../05_menuItems_cnst/_menuItems_cnst.index.js";
import "../_styles/menuItems_detail.css";

const SECTION_COMPONENT = {
  [SECTION_KEYS.basic]: MenuItems_detail_basic,
  [SECTION_KEYS.name]: MenuItems_detail_name,
  [SECTION_KEYS.modifiers]: MenuItems_detail_modifiers,
  [SECTION_KEYS.descriptions]: MenuItems_detail_descriptions,
};

const PLACEHOLDER_COMPONENT = {
  images: MenuItems_detail_images,
  recipeFile: MenuItems_detail_recipeFile,
  ingredients: MenuItems_detail_ingredients,
};

const MenuItems_detail = ({
  menuItem,
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
  if (!menuItem) {
    return (
      <div className="menuItemsDetail">
        <div className="menuItemsDetail__toolbar">
          <button type="button" className="menuItemsDetail__backBtn" onClick={onBack}>
            {t("actions.back")}
          </button>
        </div>
        <p className="menuItemsDetail__missing">{t("empty.menuItemGone")}</p>
      </div>
    );
  }

  const displayName = menuItem?.name?.en || menuItem?.name?.ru || menuItem?.name?.ar || "";

  const renderSection = (sectionKey) => {
    const Component = SECTION_COMPONENT[sectionKey];
    if (Component) return <Component key={sectionKey} {...sectionProps[sectionKey]} />;

    const Placeholder = PLACEHOLDER_COMPONENT[sectionKey];
    if (Placeholder) return <Placeholder key={sectionKey} t={t} />;

    return null;
  };

  return (
    <div className="menuItemsDetail">
      <div className="menuItemsDetail__toolbar">
        <button type="button" className="menuItemsDetail__backBtn" onClick={onBack}>
          {t("actions.back")}
        </button>
        <h2 className="menuItemsDetail__title">{displayName}</h2>
        {isBulkEdit && (
          <span className="menuItemsDetail__bulkBadge">{t("bulkEditBadge")}</span>
        )}
      </div>

      {error && <p className="menuItemsDetail__error">{error}</p>}

      <div className="menuItemsDetail__columns">
        <div className="menuItemsDetail__left">
          {layout.leftColumn.map((key) => renderSection(key))}
        </div>
        <div className="menuItemsDetail__right">
          {layout.rightColumn.map((key) => renderSection(key))}
        </div>
      </div>

      {isBulkEdit ? (
        <div className="menuItemsDetail__bulkFooter">
          <button
            type="button"
            className="menuItemsDetail__bulkCancelBtn"
            onClick={onBulkCancel}
            disabled={isSaving}
          >
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="menuItemsDetail__bulkSaveBtn"
            onClick={onBulkSubmit}
            disabled={isSaving}
          >
            {isSaving ? t("saving") : t("actions.saveAll")}
          </button>
        </div>
      ) : (
        <div className="menuItemsDetail__deleteFooter">
          <button
            type="button"
            className="menuItemsDetail__deleteBtn"
            onClick={onDeleteRequest}
          >
            {t("actions.deleteMenuItem")}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItems_detail;
