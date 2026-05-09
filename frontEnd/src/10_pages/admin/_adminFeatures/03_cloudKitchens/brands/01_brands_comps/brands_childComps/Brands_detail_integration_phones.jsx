import {
  EMPTY_REGISTERED_PHONE_ROW,
  getRefDisplayName,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_integration.css";

const PHONE_FIELDS = [
  ["phone", "text"],
  ["purpose", "text"],
  ["registeredAt", "date"],
];

const PHONE_CHECKS = [
  "isActive",
  "isWhatsAppRegistered",
  "isTelegramRegistered",
];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_integration_phones = ({
  draft,
  fieldErrors = {},
  branchesList = [],
  onDraftChange,
  t,
}) => {
  const phones = Array.isArray(draft?.registeredPhones)
    ? draft.registeredPhones
    : [];

  const replacePhones = (next) => onDraftChange("registeredPhones", next);
  const changePhone = (index, field, value) => {
    const next = phones.slice();
    next[index] = { ...(next[index] ?? {}), [field]: value };
    replacePhones(next);
  };
  const rowError = (index, field) =>
    errorText(t, fieldErrors?.[`registeredPhones[${index}].${field}`]);

  return (
    <div className="brandsDetailIntegration_subSection">
      <div className="brandsDetailIntegration_subHeader">
        <h4 className="brandsDetailIntegration_subTitle">
          {t("sections.registeredPhones")}
        </h4>
        <button
          type="button"
          className="brandsDetailIntegration_addBtn"
          onClick={() =>
            replacePhones([...phones, { ...EMPTY_REGISTERED_PHONE_ROW }])
          }>
          {t("actions.addPhone")}
        </button>
      </div>

      {phones.length === 0 ? (
        <p className="brandsDetailIntegration_empty">{t("empty.noPhones")}</p>
      ) : (
        <div className="brandsDetailIntegration_array">
          {phones.map((phone, index) => (
            <div key={phone._id || index} className="brandsDetailIntegration_arrayRow">
              <div className="brandsDetailIntegration_grid">
                <label className="brandsDetailIntegration_field">
                  <span className="brandsDetailIntegration_label">
                    {t("fields.branch")}
                  </span>
                  <select
                    className="brandsDetailIntegration_input"
                    value={phone.branch ?? ""}
                    onChange={(e) => changePhone(index, "branch", e.target.value)}>
                    <option value="">{t("empty.noValue")}</option>
                    {branchesList.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {getRefDisplayName(branch)}
                      </option>
                    ))}
                  </select>
                  {rowError(index, "branch") && (
                    <small className="brandsDetailIntegration_error">
                      {rowError(index, "branch")}
                    </small>
                  )}
                </label>

                {PHONE_FIELDS.map(([field, type]) => (
                  <label className="brandsDetailIntegration_field" key={field}>
                    <span className="brandsDetailIntegration_label">
                      {t(`fields.${field}`)}
                    </span>
                    <input
                      className="brandsDetailIntegration_input"
                      type={type}
                      value={phone[field] ?? ""}
                      onChange={(e) => changePhone(index, field, e.target.value)}
                    />
                    {rowError(index, field) && (
                      <small className="brandsDetailIntegration_error">
                        {rowError(index, field)}
                      </small>
                    )}
                  </label>
                ))}
              </div>

              <div className="brandsDetailIntegration_checkboxes">
                {PHONE_CHECKS.map((field) => (
                  <label className="brandsDetailIntegration_checkbox" key={field}>
                    <input
                      type="checkbox"
                      checked={
                        field === "isActive"
                          ? phone[field] !== false
                          : !!phone[field]
                      }
                      onChange={(e) =>
                        changePhone(index, field, e.target.checked)
                      }
                    />
                    <span>{t(`fields.${field}`)}</span>
                  </label>
                ))}
              </div>

              <label className="brandsDetailIntegration_field">
                <span className="brandsDetailIntegration_label">
                  {t("fields.notes")}
                </span>
                <textarea
                  className="brandsDetailIntegration_input"
                  rows={2}
                  value={phone.notes ?? ""}
                  onChange={(e) => changePhone(index, "notes", e.target.value)}
                />
              </label>

              <button
                type="button"
                className="brandsDetailIntegration_removeBtn"
                onClick={() => replacePhones(phones.filter((_, i) => i !== index))}>
                {t("actions.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_integration_phones;
