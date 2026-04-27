import { ChevronIcon } from "../Menus_icons/_menus_icons.index.js";
import "../../_styles/menus_detail_section.css";

const Menus_detail_sectionShell = ({
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
        "menusDetailSection " +
        rootClass +
        (effectiveCollapsed ? " menusDetailSection--collapsed" : "")
      }
    >
      <div className="menusDetailSection__header">
        <button
          type="button"
          className="menusDetailSection__titleBtn"
          onClick={onToggleCollapse}
          aria-expanded={!effectiveCollapsed}
          disabled={isBulkEdit}
        >
          {!isBulkEdit && (
            <ChevronIcon size={14} className="menusDetailSection__chevron" />
          )}
          {icon && <span className="menusDetailSection__sectionIcon">{icon}</span>}
          <h3 className="menusDetailSection__title">{title}</h3>
        </button>

        {!isBulkEdit && (
          <div className="menusDetailSection__actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="menusDetailSection__btn"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  className="menusDetailSection__btn menusDetailSection__btn--primary"
                  onClick={onSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? t("saving") : t("actions.save")}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="menusDetailSection__btn"
                onClick={onEditStart}
              >
                {editBtnLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {!effectiveCollapsed && (
        <div className="menusDetailSection__body">
          {isEditing ? renderEditable() : renderReadonly()}
        </div>
      )}
    </div>
  );
};

export default Menus_detail_sectionShell;
