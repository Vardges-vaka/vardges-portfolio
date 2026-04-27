import "../../_styles/modifiers_detail_section.css";

const Modifiers_detail_sectionShell = ({
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
        "modifiersDetailSection " +
        rootClass +
        (effectiveCollapsed ? " modifiersDetailSection--collapsed" : "")
      }
    >
      <div className="modifiersDetailSection__header">
        <button
          type="button"
          className="modifiersDetailSection__titleBtn"
          onClick={onToggleCollapse}
          aria-expanded={!effectiveCollapsed}
          disabled={isBulkEdit}
        >
          {icon && <span className="modifiersDetailSection__sectionIcon">{icon}</span>}
          <h3 className="modifiersDetailSection__title">{title}</h3>
        </button>

        {!isBulkEdit && (
          <div className="modifiersDetailSection__actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="modifiersDetailSection__btn"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  className="modifiersDetailSection__btn modifiersDetailSection__btn--primary"
                  onClick={onSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? t("saving") : t("actions.save")}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="modifiersDetailSection__btn"
                onClick={onEditStart}
              >
                {editBtnLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {!effectiveCollapsed && (
        <div className="modifiersDetailSection__body">
          {isEditing ? renderEditable() : renderReadonly()}
        </div>
      )}
    </div>
  );
};

export default Modifiers_detail_sectionShell;
