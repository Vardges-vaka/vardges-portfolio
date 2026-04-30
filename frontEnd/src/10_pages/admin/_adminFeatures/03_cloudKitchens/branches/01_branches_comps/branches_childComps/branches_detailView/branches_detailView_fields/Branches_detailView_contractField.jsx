import Branches_detail_sectionShell from "../../Branches_detail_sectionShell.jsx";
import {
  CalendarIcon,
  MoneyIcon,
} from "../../Branches_icons/_branches_icons.index.js";
import "../../../../_styles/branches_detail_section.css";
import "../../../../_styles/branches_detail_contract.css";

// "Contract" subdoc: { duration: { start, end }, amount, terminationNoticePeriod, file }.
// `file` is NOT rendered/edited here; the submit handler spreads the existing
// subdoc so file survives after this section is saved.
const fmtDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

const Branches_detailView_contractField = ({
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
  const contract = branch?.contract ?? {};
  const duration = contract?.duration ?? {};

  const err = (key) =>
    fieldErrors?.[key] ? (
      <p className="branchesDetailSection__fieldError">
        {t(`validation.${fieldErrors[key]}`, fieldErrors[key])}
      </p>
    ) : null;

  const renderReadonly = () => (
    <dl className="branchesDetailSection__dl">
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <CalendarIcon size={14} />
        </span>
        {t("fields.durationStart")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {fmtDate(duration.start) || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <CalendarIcon size={14} />
        </span>
        {t("fields.durationEnd")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {fmtDate(duration.end) || (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">
        <span className="branchesDetailSection__dtIcon">
          <MoneyIcon size={14} />
        </span>
        {t("fields.contractAmount")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {contract.amount ?? (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">
        {t("fields.terminationNoticePeriod")}
      </dt>
      <dd className="branchesDetailSection__dd">
        {contract.terminationNoticePeriod ?? (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
      <dt className="branchesDetailSection__dt">{t("fields.file")}</dt>
      <dd className="branchesDetailSection__dd">
        {contract.file ? (
          <a
            href={contract.file}
            target="_blank"
            rel="noopener noreferrer"
            className="branchesDetailContract__fileLink">
            {contract.file}
          </a>
        ) : (
          <span className="branchesDetailSection__dd--empty">{dash}</span>
        )}
      </dd>
    </dl>
  );

  const renderEditable = () => (
    <>
      <div className="branchesDetailSection__grid">
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <CalendarIcon size={14} />
            </span>
            {t("fields.durationStart")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.["duration.start"]
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="date"
            value={draft?.duration?.start ?? ""}
            onChange={(e) => onDraftChange("duration.start", e.target.value)}
          />
          {err("duration.start")}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <CalendarIcon size={14} />
            </span>
            {t("fields.durationEnd")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.["duration.end"]
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="date"
            value={draft?.duration?.end ?? ""}
            onChange={(e) => onDraftChange("duration.end", e.target.value)}
          />
          {err("duration.end")}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            <span className="branchesDetailSection__labelIcon">
              <MoneyIcon size={14} />
            </span>
            {t("fields.contractAmount")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.amount
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="number"
            step="any"
            value={draft?.amount ?? ""}
            onChange={(e) => onDraftChange("amount", e.target.value)}
          />
          {err("amount")}
        </div>
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            {t("fields.terminationNoticePeriod")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.terminationNoticePeriod
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="number"
            step="1"
            value={draft?.terminationNoticePeriod ?? ""}
            onChange={(e) =>
              onDraftChange("terminationNoticePeriod", e.target.value)
            }
          />
          {err("terminationNoticePeriod")}
        </div>
      </div>

      <p className="branchesDetailContract__fileHint">
        {t("contractFileHint")}
      </p>
    </>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailContract"
      title={t("sections.contract")}
      icon={<CalendarIcon size={16} />}
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

export default Branches_detailView_contractField;
