import "../../_styles/menuItems_detail_section.css";

const MenuItems_detail_sectionShell = ({
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
        "menuItemsDetailSection " +
        rootClass +
        (effectiveCollapsed ? " menuItemsDetailSection--collapsed" : "")
      }
    >
      <div className="menuItemsDetailSection__header">
        <button
          type="button"
          className="menuItemsDetailSection__titleBtn"
          onClick={onToggleCollapse}
          aria-expanded={!effectiveCollapsed}
          disabled={isBulkEdit}
        >
          {icon && <span className="menuItemsDetailSection__sectionIcon">{icon}</span>}
          <h3 className="menuItemsDetailSection__title">{title}</h3>
        </button>

        {!isBulkEdit && (
          <div className="menuItemsDetailSection__actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="menuItemsDetailSection__btn"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  className="menuItemsDetailSection__btn menuItemsDetailSection__btn--primary"
                  onClick={onSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? t("saving") : t("actions.save")}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="menuItemsDetailSection__btn"
                onClick={onEditStart}
              >
                {editBtnLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {!effectiveCollapsed && (
        <div className="menuItemsDetailSection__body">
          {isEditing ? renderEditable() : renderReadonly()}
        </div>
      )}
    </div>
  );
};

export default MenuItems_detail_sectionShell;
