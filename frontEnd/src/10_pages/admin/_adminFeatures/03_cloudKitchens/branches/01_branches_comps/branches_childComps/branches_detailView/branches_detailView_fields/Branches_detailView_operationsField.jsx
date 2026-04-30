import Branches_detail_sectionShell from "../../Branches_detail_sectionShell.jsx";
import {
  ClockIcon,
  CalendarIcon,
} from "../../Branches_icons/_branches_icons.index.js";
import "../../../../_styles/branches_detail_section.css";
import "../../../../_styles/branches_detail_operations.css";

const fmtDateForDisplay = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

// "Operations" subdoc: { isActive, is24Hours, openingTime, closingTime, openSince, closedSince }.
// Dependent-disable rules:
//   - isActive === true   → closedSince is disabled (an active branch hasn't closed)
//   - is24Hours === true  → openingTime / closingTime are disabled
const Branches_detailView_operationsField = ({
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
  const ops = branch?.operations ?? {};

  const draftIsActive = !!draft?.isActive;
  const draftIs24 = !!draft?.is24Hours;

  const field = (key, err) =>
    err ? (
      <p className="branchesDetailSection__fieldError">
        {t(`validation.${err}`, err)}
      </p>
    ) : null;

  const renderReadonly = () => (
    <dl className="branchesDetailSection__dl">
      <dt className="branchesDetailSection__dt">{t("fields.isActive")}</dt>
      <dd className="branchesDetailSection__dd">
        {ops.isActive === false ? t("badges.inactive") : t("badges.active")}
      </dd>
      <dt className="branchesDetailSection__dt">{t("fields.is24Hours")}</dt>
      <dd className="branchesDetailSection__dd">
        {ops.is24Hours ? t("badges.yes") : t("badges.no")}
      </dd>
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <ClockIcon size={14} />
        </span>
        {t("fields.openingTime")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {ops.openingTime || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <ClockIcon size={14} />
        </span>
        {t("fields.closingTime")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {ops.closingTime || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <CalendarIcon size={14} />
        </span>
        {t("fields.openSince")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {fmtDateForDisplay(ops.openSince) || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <CalendarIcon size={14} />
        </span>
        {t("fields.closedSince")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {fmtDateForDisplay(ops.closedSince) || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
    </dl>
  );

  const renderEditable = () => (
    <>
      <div className="branchesDetailOperations__toggles">
        <label className="branchesDetailSection__checkboxField">
          <input
            type="checkbox"
            checked={draftIsActive}
            onChange={(e) => onDraftChange("isActive", e.target.checked)}
          />
          {t("fields.isActive")}
        </label>
        <label className="branchesDetailSection__checkboxField">
          <input
            type="checkbox"
            checked={draftIs24}
            onChange={(e) => onDraftChange("is24Hours", e.target.checked)}
          />
          {t("fields.is24Hours")}
        </label>
      </div>

      <div className="branchesDetailSection__grid">
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <ClockIcon size={14} />
            </span>
            {t("fields.openingTime")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.openingTime
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="time"
            value={draft?.openingTime ?? ""}
            onChange={(e) => onDraftChange("openingTime", e.target.value)}
            disabled={draftIs24}
          />
          {field("openingTime", fieldErrors?.openingTime)}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <ClockIcon size={14} />
            </span>
            {t("fields.closingTime")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.closingTime
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="time"
            value={draft?.closingTime ?? ""}
            onChange={(e) => onDraftChange("closingTime", e.target.value)}
            disabled={draftIs24}
          />
          {field("closingTime", fieldErrors?.closingTime)}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <CalendarIcon size={14} />
            </span>
            {t("fields.openSince")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.openSince
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="date"
            value={draft?.openSince ?? ""}
            onChange={(e) => onDraftChange("openSince", e.target.value)}
          />
          {field("openSince", fieldErrors?.openSince)}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <CalendarIcon size={14} />
            </span>
            {t("fields.closedSince")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.closedSince
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="date"
            value={draft?.closedSince ?? ""}
            onChange={(e) => onDraftChange("closedSince", e.target.value)}
            disabled={draftIsActive}
          />
          {field("closedSince", fieldErrors?.closedSince)}
        </div>
      </div>
    </>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailOperations"
      title={t("sections.operations")}
      icon={<ClockIcon size={16} />}
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

export default Branches_detailView_operationsField;
