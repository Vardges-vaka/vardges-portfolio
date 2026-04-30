import Branches_detail_sectionShell from "../../Branches_detail_sectionShell.jsx";
import "../../../../_styles/branches_detail_section.css";
import "../../../../_styles/branches_detail_notes.css";

// "Notes" section. Scalar: draft = { notes }.
const Branches_detailView_notesField = ({
  branch,
  draft,
  isEditing,
  isBulkEdit,
  isCollapsed,
  isEmpty,
  isSaving,
  fieldErrors,
  onEditStart,
  onDraftChange,
  onCancel,
  onSubmit,
  onToggleCollapse,
  t,
}) => {
  const dash = t("empty.noValue");

  const renderReadonly = () => (
    <p className="branchesDetailNotes__body">
      {branch?.notes || (
        <span className="branchesDetailSection__dd--empty">{dash}</span>
      )}
    </p>
  );

  const renderEditable = () => (
    <div className="branchesDetailSection__field">
      <label className="branchesDetailSection__label">
        {t("fields.notes")}
      </label>
      <textarea
        className={
          "branchesDetailSection__textarea" +
          (fieldErrors?.notes ? " branchesDetailSection__textarea--error" : "")
        }
        value={draft?.notes ?? ""}
        onChange={(e) => onDraftChange("notes", e.target.value)}
        rows={5}
      />
      {fieldErrors?.notes && (
        <p className="branchesDetailSection__fieldError">
          {t(`validation.${fieldErrors.notes}`, fieldErrors.notes)}
        </p>
      )}
    </div>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailNotes"
      title={t("sections.notes")}
      isEditing={isEditing}
      isBulkEdit={isBulkEdit}
      isCollapsed={isCollapsed}
      isEmpty={isEmpty}
      isSaving={isSaving}
      onEditStart={onEditStart}
      onDraftChange={onDraftChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onToggleCollapse={onToggleCollapse}
      t={t}
      renderReadonly={renderReadonly}
      renderEditable={renderEditable}
    />
  );
};

export default Branches_detailView_notesField;
