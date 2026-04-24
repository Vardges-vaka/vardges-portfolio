import { ChevronIcon } from "../Branches_icons/_branches_icons.index.js";

// Thin wrapper that owns the collapsible chrome (title + chevron + edit/save
// buttons). Section components supply their own body via children.
//
// Props:
//   title           — section title string
//   icon            — optional icon node rendered before the title
//   isEditing       — section currently in edit mode
//   isBulkEdit      — detail view is in bulk edit mode (disables collapse)
//   isCollapsed     — only honored in read mode + not editing
//   isEmpty         — toggles "Add" vs "Edit" label on the header button
//   isSaving        — disables buttons during save
//   onToggleCollapse — () => void
//   onEditStart      — () => void
//   onCancel         — () => void
//   onSubmit         — () => void
//   t
//   renderReadonly   — fn(): JSX for readonly view
//   renderEditable   — fn(): JSX for edit form
const Branches_detail_sectionShell = ({
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
  // In bulk mode the section is always expanded + always editing; no user
  // controls beyond the body inputs.
  const effectiveCollapsed = !isBulkEdit && isCollapsed && !isEditing;
  const showBody = !effectiveCollapsed;

  const editBtnLabel = isEmpty ? t("actions.add") : t("actions.edit");

  return (
    <section
      className={
        "branchesDetailSection " +
        rootClass +
        (effectiveCollapsed ? " branchesDetailSection--collapsed" : "")
      }
    >
      <header className="branchesDetailSection__header">
        <div className="branchesDetailSection__headerTitle">
          {isBulkEdit ? (
            <span className="branchesDetailSection__titleBtn">
              {icon && (
                <span className="branchesDetailSection__sectionIcon">{icon}</span>
              )}
              <h3 className="branchesDetailSection__title">{title}</h3>
            </span>
          ) : (
            <button
              type="button"
              className="branchesDetailSection__titleBtn"
              onClick={onToggleCollapse}
              aria-expanded={!effectiveCollapsed}
            >
              <ChevronIcon
                size={14}
                className="branchesDetailSection__chevron"
              />
              {icon && (
                <span className="branchesDetailSection__sectionIcon">{icon}</span>
              )}
              <h3 className="branchesDetailSection__title">{title}</h3>
            </button>
          )}
        </div>

        {!isBulkEdit && (
          <div className="branchesDetailSection__actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="branchesDetailSection__btn"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  className="branchesDetailSection__btn branchesDetailSection__btn--primary"
                  onClick={onSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? t("saving") : t("actions.save")}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="branchesDetailSection__btn"
                onClick={onEditStart}
              >
                {editBtnLabel}
              </button>
            )}
          </div>
        )}
      </header>

      {showBody && (
        <div className="branchesDetailSection__body">
          {isEditing ? renderEditable() : renderReadonly()}
        </div>
      )}
    </section>
  );
};

export default Branches_detail_sectionShell;
