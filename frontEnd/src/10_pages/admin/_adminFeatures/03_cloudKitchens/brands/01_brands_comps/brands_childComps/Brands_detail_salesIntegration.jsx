import { ManagerIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import Brands_detail_integration_payment from "./Brands_detail_integration_payment.jsx";
import Brands_detail_integration_credentials from "./Brands_detail_integration_credentials.jsx";
import Brands_detail_integration_contacts from "./Brands_detail_integration_contacts.jsx";
import Brands_detail_integration_phones from "./Brands_detail_integration_phones.jsx";
import Brands_detail_integration_logins from "./Brands_detail_integration_logins.jsx";
import { hydrateBrandForm } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_basic.css";
import "../../_styles/brands_detail_integration.css";

const hasValue = (value) => {
  if (value === null || value === undefined || value === "") return false;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.some(hasValue);
  if (typeof value === "object") return Object.values(value).some(hasValue);
  return true;
};

const Brands_detail_salesIntegration = (props) => {
  const {
    brand,
    draft,
    fieldErrors,
    branchesList,
    employeesList,
    onDraftChange,
    t,
  } = props;
  const source = draft ?? hydrateBrandForm(brand).salesIntegration;

  const isEmpty = !hasValue(source);

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailSalesIntegration"
      title={t("sections.salesIntegration")}
      icon={<ManagerIcon />}
      renderReadonly={() => (
        <div className="brandsDetailBasic_readonly">
          {isEmpty ? (
            <p>{t("empty.noIntegrations")}</p>
          ) : (
            <>
              <p>
                <strong>{t("fields.provider")}:</strong>{" "}
                {source.provider || t("empty.noValue")}
              </p>
              <p>
                <strong>{t("fields.isActive")}:</strong>{" "}
                {source.isActive !== false ? t("badges.yes") : t("badges.no")}
              </p>
            </>
          )}
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailIntegration_container">
          {isEmpty && (
            <p className="brandsDetailIntegration_empty">
              {t("empty.noIntegrations")}
            </p>
          )}

          <div className="brandsDetailIntegration_basicFields">
            <label className="brandsDetailIntegration_field">
              <span className="brandsDetailIntegration_label">
                {t("fields.provider")}
              </span>
              <input
                className="brandsDetailIntegration_input"
                type="text"
                value={source?.provider ?? ""}
                onChange={(e) => onDraftChange("provider", e.target.value)}
              />
            </label>

            <label className="brandsDetailIntegration_field">
              <span className="brandsDetailIntegration_label">
                {t("fields.link")}
              </span>
              <input
                className="brandsDetailIntegration_input"
                type="url"
                value={source?.link ?? ""}
                onChange={(e) => onDraftChange("link", e.target.value)}
              />
            </label>

            <label className="brandsDetailIntegration_field">
              <span className="brandsDetailIntegration_label">
                {t("fields.consoleLink")}
              </span>
              <input
                className="brandsDetailIntegration_input"
                type="url"
                value={source?.consoleLink ?? ""}
                onChange={(e) => onDraftChange("consoleLink", e.target.value)}
              />
            </label>

            <label className="brandsDetailIntegration_field">
              <span className="brandsDetailIntegration_label">
                {t("fields.startedAt")}
              </span>
              <input
                className="brandsDetailIntegration_input"
                type="date"
                value={source?.startedAt ?? ""}
                onChange={(e) => onDraftChange("startedAt", e.target.value)}
              />
            </label>
          </div>

          <Brands_detail_integration_payment
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <Brands_detail_integration_credentials
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <Brands_detail_integration_contacts
            draft={source}
            fieldErrors={fieldErrors}
            onDraftChange={onDraftChange}
            t={t}
          />

          <Brands_detail_integration_phones
            draft={source}
            fieldErrors={fieldErrors}
            branchesList={branchesList}
            onDraftChange={onDraftChange}
            t={t}
          />

          <Brands_detail_integration_logins
            draft={source}
            fieldErrors={fieldErrors}
            employeesList={employeesList}
            onDraftChange={onDraftChange}
            t={t}
          />

          <label className="brandsDetailIntegration_checkbox">
            <input
              type="checkbox"
              checked={source?.isActive !== false}
              onChange={(e) => onDraftChange("isActive", e.target.checked)}
            />
            <span>{t("fields.isActive")}</span>
          </label>
        </div>
      )}
    />
  );
};

export default Brands_detail_salesIntegration;
