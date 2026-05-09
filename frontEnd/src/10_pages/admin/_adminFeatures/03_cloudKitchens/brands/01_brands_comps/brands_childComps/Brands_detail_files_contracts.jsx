import { EMPTY_CONTRACT_ROW } from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_files_contracts.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_files_contracts = ({
  draft,
  fieldErrors = {},
  onDraftChange,
  t,
}) => {
  const contracts = draft?.contracts ?? [];

  const handleAddContract = () => {
    onDraftChange("contracts", [...contracts, { ...EMPTY_CONTRACT_ROW }]);
  };

  const handleRemoveContract = (index) => {
    onDraftChange(
      "contracts",
      contracts.filter((_, i) => i !== index),
    );
  };

  const handleContractChange = (index, field, value) => {
    const updated = [...contracts];
    updated[index] = { ...updated[index], [field]: value };
    onDraftChange("contracts", updated);
  };

  return (
    <div className="brandsDetailFilesContracts_section">
      <div className="brandsDetailFilesContracts_header">
        <h4 className="brandsDetailFilesContracts_title">
          {t("sections.contracts")}
        </h4>
        <button
          type="button"
          className="brandsDetailFilesContracts_addBtn"
          onClick={handleAddContract}>
          {t("actions.addContract")}
        </button>
      </div>

      {contracts.length === 0 ? (
        <p className="brandsDetailFilesContracts_empty">
          {t("empty.noContracts")}
        </p>
      ) : (
        <div className="brandsDetailFilesContracts_array">
          {contracts.map((contract, index) => (
            <div key={index} className="brandsDetailFilesContracts_row">
              <div className="brandsDetailFilesContracts_grid">
                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.with")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="text"
                    value={contract.with ?? ""}
                    onChange={(e) =>
                      handleContractChange(index, "with", e.target.value)
                    }
                  />
                  {fieldErrors?.[`contracts[${index}].with`] && (
                    <small className="brandsDetailFilesContracts_error">
                      {errorText(t, fieldErrors[`contracts[${index}].with`])}
                    </small>
                  )}
                </label>

                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.label")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="text"
                    value={contract.label ?? ""}
                    onChange={(e) =>
                      handleContractChange(index, "label", e.target.value)
                    }
                  />
                  {fieldErrors?.[`contracts[${index}].label`] && (
                    <small className="brandsDetailFilesContracts_error">
                      {errorText(t, fieldErrors[`contracts[${index}].label`])}
                    </small>
                  )}
                </label>

                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.fileUrl")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="url"
                    value={contract.fileUrl ?? ""}
                    onChange={(e) =>
                      handleContractChange(index, "fileUrl", e.target.value)
                    }
                  />
                  {fieldErrors?.[`contracts[${index}].fileUrl`] && (
                    <small className="brandsDetailFilesContracts_error">
                      {errorText(t, fieldErrors[`contracts[${index}].fileUrl`])}
                    </small>
                  )}
                </label>

                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.fileFormat")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="text"
                    value={contract.fileFormat ?? ""}
                    onChange={(e) =>
                      handleContractChange(index, "fileFormat", e.target.value)
                    }
                  />
                </label>

                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.started")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="date"
                    value={contract.started ?? ""}
                    onChange={(e) =>
                      handleContractChange(index, "started", e.target.value)
                    }
                  />
                  {fieldErrors?.[`contracts[${index}].started`] && (
                    <small className="brandsDetailFilesContracts_error">
                      {errorText(t, fieldErrors[`contracts[${index}].started`])}
                    </small>
                  )}
                </label>

                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.ending")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="date"
                    value={contract.ending ?? ""}
                    onChange={(e) =>
                      handleContractChange(index, "ending", e.target.value)
                    }
                  />
                </label>

                <label className="brandsDetailFilesContracts_field">
                  <span className="brandsDetailFilesContracts_label">
                    {t("fields.noticePeriodInDays")}
                  </span>
                  <input
                    className="brandsDetailFilesContracts_input"
                    type="number"
                    value={contract.noticePeriodInDays ?? ""}
                    onChange={(e) =>
                      handleContractChange(
                        index,
                        "noticePeriodInDays",
                        e.target.value,
                      )
                    }
                  />
                  {fieldErrors?.[`contracts[${index}].noticePeriodInDays`] && (
                    <small className="brandsDetailFilesContracts_error">
                      {errorText(
                        t,
                        fieldErrors[`contracts[${index}].noticePeriodInDays`],
                      )}
                    </small>
                  )}
                </label>
              </div>

              <label className="brandsDetailFilesContracts_field">
                <span className="brandsDetailFilesContracts_label">
                  {t("fields.description")}
                </span>
                <textarea
                  className="brandsDetailFilesContracts_input"
                  value={contract.description ?? ""}
                  onChange={(e) =>
                    handleContractChange(index, "description", e.target.value)
                  }
                  rows={2}
                />
              </label>

              <div className="brandsDetailFilesContracts_checkboxes">
                <label className="brandsDetailFilesContracts_checkbox">
                  <input
                    type="checkbox"
                    checked={contract.isEnded ?? false}
                    onChange={(e) =>
                      handleContractChange(index, "isEnded", e.target.checked)
                    }
                  />
                  <span>{t("fields.isEnded")}</span>
                </label>

                <label className="brandsDetailFilesContracts_checkbox">
                  <input
                    type="checkbox"
                    checked={contract.isTerminated ?? false}
                    onChange={(e) =>
                      handleContractChange(
                        index,
                        "isTerminated",
                        e.target.checked,
                      )
                    }
                  />
                  <span>{t("fields.isTerminated")}</span>
                </label>
              </div>

              <button
                type="button"
                className="brandsDetailFilesContracts_removeBtn"
                onClick={() => handleRemoveContract(index)}>
                {t("actions.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands_detail_files_contracts;
