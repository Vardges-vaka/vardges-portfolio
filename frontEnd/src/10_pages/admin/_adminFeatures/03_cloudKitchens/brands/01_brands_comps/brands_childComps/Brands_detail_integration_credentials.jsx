import "../../_styles/brands_detail_integration.css";

const CREDENTIAL_FIELDS = [
  ["apiKey", "password"],
  ["secret", "password"],
  ["accountId", "text"],
];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_integration_credentials = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const credentials = draft?.credentials ?? {};

  return (
    <div className="brandsDetailIntegration_subSection">
      <h4 className="brandsDetailIntegration_subTitle">
        {t("sections.credentials")}
      </h4>
      <div className="brandsDetailIntegration_grid">
        {CREDENTIAL_FIELDS.map(([field, type]) => (
          <label className="brandsDetailIntegration_field" key={field}>
            <span className="brandsDetailIntegration_label">
              {t(`fields.${field}`)}
            </span>
            <input
              className="brandsDetailIntegration_input"
              type={type}
              autoComplete={type === "password" ? "off" : undefined}
              value={credentials[field] ?? ""}
              onChange={(e) =>
                onDraftChange(`credentials.${field}`, e.target.value)
              }
              placeholder={t(`fields.${field}Placeholder`)}
            />
            {fieldErrors?.[`credentials.${field}`] && (
              <small className="brandsDetailIntegration_error">
                {errorText(t, fieldErrors[`credentials.${field}`])}
              </small>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Brands_detail_integration_credentials;
