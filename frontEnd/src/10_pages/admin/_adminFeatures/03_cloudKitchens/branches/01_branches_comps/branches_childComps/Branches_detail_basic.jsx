import Branches_detail_sectionShell from "./Branches_detail_sectionShell.jsx";
import "../../_styles/branches_detail_section.css";
import "../../_styles/branches_detail_basic.css";

// "Basic" section = branch name. Scalar: draft = { name }.
// On the two-column layout this lives in the LEFT column above the map.
const Branches_detail_basic = ({
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
  const nameErr = fieldErrors?.name;

  const renderReadonly = () => (
    <dl className="branchesDetailSection__dl">
      <dt className="branchesDetailSection__dt">{t("fields.name")}</dt>
      <dd className="branchesDetailSection__dd">
        {branch?.name || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
    </dl>
  );

  const renderEditable = () => (
    <div className="branchesDetailBasic__body">
      <div className="branchesDetailSection__field">
        <label
          className="branchesDetailSection__label"
          htmlFor={`detail-basic-name-${isBulkEdit ? "bulk" : "read"}`}
        >
          {t("fields.name")}
        </label>
        <input
          id={`detail-basic-name-${isBulkEdit ? "bulk" : "read"}`}
          className={
            "branchesDetailSection__input" +
            (nameErr ? " branchesDetailSection__input--error" : "")
          }
          type="text"
          value={draft?.name ?? ""}
          onChange={(e) => onDraftChange("name", e.target.value)}
          autoFocus={!isBulkEdit}
        />
        {nameErr && (
          <p className="branchesDetailSection__fieldError">
            {t(`validation.${nameErr}`, nameErr)}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailBasic"
      title={t("sections.basic")}
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

export default Branches_detail_basic;
