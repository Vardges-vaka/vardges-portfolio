import "../../_styles/brands_detail_integration.css";

const PAYMENT_FIELDS = [
  ["cycle", "text"],
  ["method", "text"],
  ["currency", "text"],
  ["amount", "number"],
];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_integration_payment = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const payment = draft?.payment ?? {};

  return (
    <div className="brandsDetailIntegration_subSection">
      <h4 className="brandsDetailIntegration_subTitle">
        {t("sections.payment")}
      </h4>
      <div className="brandsDetailIntegration_grid">
        {PAYMENT_FIELDS.map(([field, type]) => (
          <label className="brandsDetailIntegration_field" key={field}>
            <span className="brandsDetailIntegration_label">
              {t(`fields.${field}`)}
            </span>
            <input
              className="brandsDetailIntegration_input"
              type={type}
              value={payment[field] ?? ""}
              onChange={(e) => onDraftChange(`payment.${field}`, e.target.value)}
              placeholder={t(`fields.${field}Placeholder`)}
            />
            {fieldErrors?.[`payment.${field}`] && (
              <small className="brandsDetailIntegration_error">
                {errorText(t, fieldErrors[`payment.${field}`])}
              </small>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Brands_detail_integration_payment;
