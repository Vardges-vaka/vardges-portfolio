import { ChevronIcon } from "../MenuCategories_icons/_menuCategories_icons.index.js";
import "../../_styles/menuCategories_detail_section.css";

const MenuCategories_detail_sectionShell = ({
  rootClass,
  title,
  icon,
  isEditing,
  isBulkEdit,
  isCollapsed,
  isEmpty,
  isSaving,
  onToggleCollapse,
  onEditStart,
  onCancel,
  onSubmit,
  t,
  renderReadonly,
  renderEditable,
}) => {
  const effectiveCollapsed = !isBulkEdit && isCollapsed && !isEditing;
  const editBtnLabel = isEmpty ? t("actions.add") : t("actions.edit");

  return (
    <div
      className={
        "menuCategoriesDetailSection " +
        rootClass +
        (effectiveCollapsed ? " menuCategoriesDetailSection--collapsed" : "")
      }
    >
      <div className="menuCategoriesDetailSection__header">
        <button
          type="button"
          className="menuCategoriesDetailSection__titleBtn"
          onClick={onToggleCollapse}
          aria-expanded={!effectiveCollapsed}
          disabled={isBulkEdit}
        >
          {!isBulkEdit && (
            <ChevronIcon size={14} className="menuCategoriesDetailSection__chevron" />
          )}
          {icon && <span className="menuCategoriesDetailSection__sectionIcon">{icon}</span>}
          <h3 className="menuCategoriesDetailSection__title">{title}</h3>
        </button>

        {!isBulkEdit && (
          <div className="menuCategoriesDetailSection__actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="menuCategoriesDetailSection__btn"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  className="menuCategoriesDetailSection__btn menuCategoriesDetailSection__btn--primary"
                  onClick={onSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? t("saving") : t("actions.save")}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="menuCategoriesDetailSection__btn"
                onClick={onEditStart}
              >
                {editBtnLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {!effectiveCollapsed && (
        <div className="menuCategoriesDetailSection__body">
          {isEditing ? renderEditable() : renderReadonly()}
        </div>
      )}
    </div>
  );
};

export default MenuCategories_detail_sectionShell;
