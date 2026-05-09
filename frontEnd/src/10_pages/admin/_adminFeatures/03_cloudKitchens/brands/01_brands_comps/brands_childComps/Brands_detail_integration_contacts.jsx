import "../../_styles/brands_detail_integration.css";

const CONTACT_FIELDS = ["telegram", "whatsApp", "phone", "email"];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_integration_contacts = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const contacts = draft?.mainContacts ?? {};

  return (
    <div className="brandsDetailIntegration_subSection">
      <h4 className="brandsDetailIntegration_subTitle">
        {t("sections.mainContacts")}
      </h4>
      <div className="brandsDetailIntegration_grid">
        {CONTACT_FIELDS.map((field) => (
          <label className="brandsDetailIntegration_field" key={field}>
            <span className="brandsDetailIntegration_label">
              {t(`fields.${field}`)}
            </span>
            <input
              className="brandsDetailIntegration_input"
              type={field === "email" ? "email" : "text"}
              value={contacts[field] ?? ""}
              onChange={(e) =>
                onDraftChange(`mainContacts.${field}`, e.target.value)
              }
            />
            {fieldErrors?.[`mainContacts.${field}`] && (
              <small className="brandsDetailIntegration_error">
                {errorText(t, fieldErrors[`mainContacts.${field}`])}
              </small>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Brands_detail_integration_contacts;
