import { EMPTY_RENEWAL_ROW } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_website_sub.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_website_renewal = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const renewalHistory = draft?.renewalHistory ?? [];

  const handleAddRenewal = () => {
    onDraftChange("renewalHistory", [
      ...renewalHistory,
      { ...EMPTY_RENEWAL_ROW },
    ]);
  };

  const handleRemoveRenewal = (index) => {
    onDraftChange(
      "renewalHistory",
      renewalHistory.filter((_, i) => i !== index),
    );
  };

  const handleRenewalChange = (index, field, value) => {
    const updated = [...renewalHistory];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updated[index] = {
        ...updated[index],
        [parent]: { ...updated[index][parent], [child]: value },
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    onDraftChange("renewalHistory", updated);
  };

  return (
    <div className="brandsDetailWebsiteSub_section">
      <div className="brandsDetailWebsiteSub_header">
        <h4 className="brandsDetailWebsiteSub_title">
          {t("sections.renewalHistory")}
        </h4>
        <button
          type="button"
          className="brandsDetailWebsiteSub_addBtn"
          onClick={handleAddRenewal}>
          {t("actions.addRenewal")}
        </button>
      </div>

      {renewalHistory.length === 0 ? (
        <p className="brandsDetailWebsiteSub_empty">
          {t("empty.noRenewalHistory")}
        </p>
      ) : (
        <div className="brandsDetailWebsiteSub_array">
          {renewalHistory.map((renewal, index) => (
            <div key={index} className="brandsDetailWebsiteSub_arrayRow">
              <div className="brandsDetailWebsiteSub_grid">
                <label className="brandsDetailWebsiteSub_field">
                  <span className="brandsDetailWebsiteSub_label">
                    {t("fields.renewedOn")}
                  </span>
                  <input
                    className="brandsDetailWebsiteSub_input"
                    type="date"
                    value={renewal.renewedOn ?? ""}
                    onChange={(e) =>
                      handleRenewalChange(index, "renewedOn", e.target.value)
                    }
                  />
                  {fieldErrors?.[`renewalHistory[${index}].renewedOn`] && (
                    <small className="brandsDetailWebsiteSub_error">
                      {errorText(
                        t,
                        fieldErrors[`renewalHistory[${index}].renewedOn`],
                      )}
                    </small>
                  )}
                </label>

                <label className="brandsDetailWebsiteSub_field">
                  <span className="brandsDetailWebsiteSub_label">
                    {t("fields.amount")}
                  </span>
                  <input
                    className="brandsDetailWebsiteSub_input"
                    type="number"
                    value={renewal.amount ?? ""}
                    onChange={(e) =>
                      handleRenewalChange(index, "amount", e.target.value)
                    }
                  />
                  {fieldErrors?.[`renewalHistory[${index}].amount`] && (
                    <small className="brandsDetailWebsiteSub_error">
                      {errorText(
                        t,
                        fieldErrors[`renewalHistory[${index}].amount`],
                      )}
                    </small>
                  )}
                </label>

                <label className="brandsDetailWebsiteSub_field">
                  <span className="brandsDetailWebsiteSub_label">
                    {t("fields.currency")}
                  </span>
                  <input
                    className="brandsDetailWebsiteSub_input"
                    type="text"
                    value={renewal.currency ?? ""}
                    onChange={(e) =>
                      handleRenewalChange(index, "currency", e.target.value)
                    }
                  />
                  {fieldErrors?.[`renewalHistory[${index}].currency`] && (
                    <small className="brandsDetailWebsiteSub_error">
                      {errorText(
                        t,
                        fieldErrors[`renewalHistory[${index}].currency`],
                      )}
                    </small>
                  )}
                </label>

                <label className="brandsDetailWebsiteSub_field">
                  <span className="brandsDetailWebsiteSub_label">
                    {t("fields.transactionId")}
                  </span>
                  <input
                    className="brandsDetailWebsiteSub_input"
                    type="text"
                    value={renewal.transactionId ?? ""}
                    onChange={(e) =>
                      handleRenewalChange(
                        index,
                        "transactionId",
                        e.target.value,
                      )
                    }
                  />
                </label>
              </div>

              <div className="brandsDetailWebsiteSub_cardFields">
                <h5 className="brandsDetailWebsiteSub_subtitle">
                  {t("fields.cardDetails")}
                </h5>
                <div className="brandsDetailWebsiteSub_grid">
                  <label className="brandsDetailWebsiteSub_field">
                    <span className="brandsDetailWebsiteSub_label">
                      {t("fields.cardBrand")}
                    </span>
                    <input
                      className="brandsDetailWebsiteSub_input"
                      type="text"
                      value={renewal.card?.brand ?? ""}
                      onChange={(e) =>
                        handleRenewalChange(index, "card.brand", e.target.value)
                      }
                    />
                  </label>

                  <label className="brandsDetailWebsiteSub_field">
                    <span className="brandsDetailWebsiteSub_label">
                      {t("fields.cardLast4")}
                    </span>
                    <input
                      className="brandsDetailWebsiteSub_input"
                      type="text"
                      maxLength="4"
                      value={renewal.card?.last4 ?? ""}
                      onChange={(e) =>
                        handleRenewalChange(index, "card.last4", e.target.value)
                      }
                    />
                  </label>

                  <label className="brandsDetailWebsiteSub_field">
                    <span className="brandsDetailWebsiteSub_label">
                      {t("fields.cardCardholder")}
                    </span>
                    <input
                      className="brandsDetailWebsiteSub_input"
                      type="text"
                      value={renewal.card?.cardholder ?? ""}
                      onChange={(e) =>
                        handleRenewalChange(
                          index,
                          "card.cardholder",
                          e.target.value,
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="brandsDetailWebsiteSub_removeBtn"
                onClick={() => handleRemoveRenewal(index)}>
                {t("actions.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_website_renewal;
