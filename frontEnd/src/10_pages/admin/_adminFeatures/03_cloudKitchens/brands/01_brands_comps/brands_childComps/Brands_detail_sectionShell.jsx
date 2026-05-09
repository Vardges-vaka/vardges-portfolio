import { ChevronIcon } from "../Brands_icons/_brands_icons.index.js";
import "../../_styles/brands_detail_section.css";

const Brands_detail_sectionShell = ({
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
        "brandsDetailSection " +
        rootClass +
        (effectiveCollapsed ? " brandsDetailSection--collapsed" : "")
      }>
      <div className="brandsDetailSection_header">
        <button
          type="button"
          className="brandsDetailSection_titleBtn"
          onClick={onToggleCollapse}
          aria-expanded={!effectiveCollapsed}
          disabled={isBulkEdit}>
          {!isBulkEdit && (
            <ChevronIcon size={14} className="brandsDetailSection_chevron" />
          )}
          {icon && (
            <span className="brandsDetailSection_sectionIcon">{icon}</span>
          )}
          <h3 className="brandsDetailSection_title">{title}</h3>
        </button>

        {!isBulkEdit && (
          <div className="brandsDetailSection_actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="brandsDetailSection_btn"
                  onClick={onCancel}
                  disabled={isSaving}>
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  className="brandsDetailSection_btn brandsDetailSection_btn--primary"
                  onClick={onSubmit}
                  disabled={isSaving}>
                  {isSaving ? t("saving") : t("actions.save")}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="brandsDetailSection_btn"
                onClick={onEditStart}>
                {editBtnLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {!effectiveCollapsed && (
        <div className="brandsDetailSection_body">
          {isEditing ? renderEditable() : renderReadonly()}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_sectionShell;
