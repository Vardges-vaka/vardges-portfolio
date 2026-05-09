import { EMPTY_DNS_RECORD_ROW } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_website_sub.css";

const DNS_FIELDS = [
  ["type", "text"],
  ["name", "text"],
  ["value", "text"],
  ["ttl", "number"],
];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_website_dns = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const dnsRecords = draft?.dnsRecords ?? [];

  const handleAddDnsRecord = () => {
    onDraftChange("dnsRecords", [...dnsRecords, { ...EMPTY_DNS_RECORD_ROW }]);
  };

  const handleRemoveDnsRecord = (index) => {
    onDraftChange(
      "dnsRecords",
      dnsRecords.filter((_, i) => i !== index),
    );
  };

  const handleDnsRecordChange = (index, field, value) => {
    const updated = [...dnsRecords];
    updated[index] = { ...updated[index], [field]: value };
    onDraftChange("dnsRecords", updated);
  };

  return (
    <div className="brandsDetailWebsiteSub_section">
      <div className="brandsDetailWebsiteSub_header">
        <h4 className="brandsDetailWebsiteSub_title">
          {t("sections.dnsRecords")}
        </h4>
        <button
          type="button"
          className="brandsDetailWebsiteSub_addBtn"
          onClick={handleAddDnsRecord}>
          {t("actions.addDnsRecord")}
        </button>
      </div>

      {dnsRecords.length === 0 ? (
        <p className="brandsDetailWebsiteSub_empty">
          {t("empty.noDnsRecords")}
        </p>
      ) : (
        <div className="brandsDetailWebsiteSub_array">
          {dnsRecords.map((record, index) => (
            <div key={index} className="brandsDetailWebsiteSub_arrayRow">
              <div className="brandsDetailWebsiteSub_grid">
                {DNS_FIELDS.map(([field, type]) => (
                  <label className="brandsDetailWebsiteSub_field" key={field}>
                    <span className="brandsDetailWebsiteSub_label">
                      {t(`fields.${field}`)}
                    </span>
                    <input
                      className="brandsDetailWebsiteSub_input"
                      type={type}
                      value={record[field] ?? ""}
                      onChange={(e) =>
                        handleDnsRecordChange(index, field, e.target.value)
                      }
                      placeholder={t(`fields.${field}Placeholder`)}
                    />
                    {fieldErrors?.[`dnsRecords[${index}].${field}`] && (
                      <small className="brandsDetailWebsiteSub_error">
                        {errorText(
                          t,
                          fieldErrors[`dnsRecords[${index}].${field}`],
                        )}
                      </small>
                    )}
                  </label>
                ))}
              </div>

              <button
                type="button"
                className="brandsDetailWebsiteSub_removeBtn"
                onClick={() => handleRemoveDnsRecord(index)}>
                {t("actions.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_website_dns;
