import Brands_detail_integration_payment from "./Brands_detail_integration_payment.jsx";
import Brands_detail_integration_credentials from "./Brands_detail_integration_credentials.jsx";
import Brands_detail_integration_contacts from "./Brands_detail_integration_contacts.jsx";
import Brands_detail_integration_phones from "./Brands_detail_integration_phones.jsx";
import Brands_detail_integration_logins from "./Brands_detail_integration_logins.jsx";
import "../../_styles/brands_detail_integration.css";

const Brands_detail_integration_row = ({
  integration,
  index,
  isEditMode,
  onToggleEdit,
  onRemove,
  onDraftChange,
  fieldErrors = {},
  branchesList = [],
  employeesList = [],
  t,
}) => {
  const handleFieldChange = (path, value) => {
    onDraftChange(index, path, value);
  };

  if (!isEditMode) {
    return (
      <div className="brandsDetailIntegration_row">
        <div className="brandsDetailIntegration_rowHeader">
          <div className="brandsDetailIntegration_rowInfo">
            <strong>{integration?.provider || t("empty.noProvider")}</strong>
            <span className="brandsDetailIntegration_rowMeta">
              {integration?.startedAt
                ? new Date(integration.startedAt).toLocaleDateString()
                : t("empty.noDate")}
            </span>
            {integration?.payment?.amount && (
              <span className="brandsDetailIntegration_rowMeta">
                {integration.payment.currency} {integration.payment.amount} /{" "}
                {integration.payment.cycle}
              </span>
            )}
          </div>
          <div className="brandsDetailIntegration_rowActions">
            <button
              type="button"
              className="brandsDetailIntegration_editBtn"
              onClick={onToggleEdit}>
              {t("actions.edit")}
            </button>
            <button
              type="button"
              className="brandsDetailIntegration_removeBtn"
              onClick={onRemove}>
              {t("actions.remove")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brandsDetailIntegration_row brandsDetailIntegration_row--edit">
      <div className="brandsDetailIntegration_rowHeader">
        <h4 className="brandsDetailIntegration_rowTitle">
          {t("sections.integration")} #{index + 1}
        </h4>
        <button
          type="button"
          className="brandsDetailIntegration_doneBtn"
          onClick={onToggleEdit}>
          {t("actions.done")}
        </button>
      </div>

      <div className="brandsDetailIntegration_basicFields">
        <label className="brandsDetailIntegration_field">
          <span className="brandsDetailIntegration_label">
            {t("fields.provider")}
          </span>
          <input
            className="brandsDetailIntegration_input"
            type="text"
            value={integration?.provider ?? ""}
            onChange={(e) => handleFieldChange("provider", e.target.value)}
          />
        </label>

        <label className="brandsDetailIntegration_field">
          <span className="brandsDetailIntegration_label">
            {t("fields.startedAt")}
          </span>
          <input
            className="brandsDetailIntegration_input"
            type="date"
            value={integration?.startedAt ?? ""}
            onChange={(e) => handleFieldChange("startedAt", e.target.value)}
          />
        </label>

        <label className="brandsDetailIntegration_field">
          <span className="brandsDetailIntegration_label">
            {t("fields.link")}
          </span>
          <input
            className="brandsDetailIntegration_input"
            type="url"
            value={integration?.link ?? ""}
            onChange={(e) => handleFieldChange("link", e.target.value)}
          />
        </label>

        <label className="brandsDetailIntegration_field">
          <span className="brandsDetailIntegration_label">
            {t("fields.consoleLink")}
          </span>
          <input
            className="brandsDetailIntegration_input"
            type="url"
            value={integration?.consoleLink ?? ""}
            onChange={(e) => handleFieldChange("consoleLink", e.target.value)}
          />
        </label>
      </div>

      <Brands_detail_integration_payment
        draft={integration}
        fieldErrors={fieldErrors}
        onDraftChange={handleFieldChange}
        t={t}
      />

      <Brands_detail_integration_credentials
        draft={integration}
        fieldErrors={fieldErrors}
        onDraftChange={handleFieldChange}
        t={t}
      />

      <Brands_detail_integration_contacts
        draft={integration}
        fieldErrors={fieldErrors}
        onDraftChange={handleFieldChange}
        t={t}
      />

      <Brands_detail_integration_phones
        draft={integration}
        fieldErrors={fieldErrors}
        branchesList={branchesList}
        onDraftChange={handleFieldChange}
        t={t}
      />

      <Brands_detail_integration_logins
        draft={integration}
        fieldErrors={fieldErrors}
        employeesList={employeesList}
        onDraftChange={handleFieldChange}
        t={t}
      />
    </div>
  );
};

export default Brands_detail_integration_row;
