import { useTranslation } from "react-i18next";

import { useBranches_storageOptions } from "../../../../03_branches_hooks/useBranches_storageOptions.js";

import "./branches_detailView_filesField.css";

/**
 * Files strip: cloud provider picker (all four vendors; disabled when off in Settings).
 * Upload flow is still pending; `images` / contract file wiring comes later.
 */
const Branches_detailView_filesField = ({
  t,
  branch,
  onCloudStorageChange,
  isSaving,
  isBulkEdit,
}) => {
  const { t: tProv } = useTranslation("settingsCloud");
  const { rows, loading, error } = useBranches_storageOptions();

  const current = branch?.cloudStorage ?? "";

  const handleSelect = (e) => {
    const v = e.target.value;
    if (v === "") {
      onCloudStorageChange?.(null);
      return;
    }
    onCloudStorageChange?.(v);
  };

  return (
    <section className="branchesDetailFiles" aria-labelledby="branchesDetailFiles-heading">
      <header className="branchesDetailFiles__header">
        <h3 id="branchesDetailFiles-heading" className="branchesDetailFiles__title">
          {t("sections.files")}
        </h3>
      </header>

      <div className="branchesDetailFiles__control">
        <label className="branchesDetailFiles__label" htmlFor="branchesDetailFiles-cloudStorage">
          {t("filesSection.cloudStorageLabel")}
        </label>

        {loading && (
          <p className="branchesDetailFiles__hint" aria-live="polite">
            {t("filesSection.loadingStorage")}
          </p>
        )}

        {!loading && error && (
          <p className="branchesDetailFiles__warn" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <select
            id="branchesDetailFiles-cloudStorage"
            className="branchesDetailFiles__select"
            value={current === null || current === undefined ? "" : String(current)}
            onChange={handleSelect}
            disabled={!!isBulkEdit || !!isSaving}
            aria-busy={!!isSaving}>
            <option value="">{t("filesSection.cloudStorageUnset")}</option>
            {rows.map(({ key, meta }) => {
              const enabled = !!meta?.isEnabled;
              const isDefault = !!meta?.isDefault;
              const labelBase = tProv(`providers.${key}`);
              const suffix = isDefault ? t("filesSection.cloudStorageDefaultSuffix") : "";
              return (
                <option key={key} value={key} disabled={!enabled}>
                  {!enabled
                    ? t("filesSection.cloudStorageDisabledOption", { label: labelBase })
                    : `${labelBase}${suffix}`}
                </option>
              );
            })}
          </select>
        )}

        {isBulkEdit && (
          <p className="branchesDetailFiles__hint">{t("filesSection.cloudStorageBulkHint")}</p>
        )}

        <p className="branchesDetailFiles__hint">{t("filesSection.cloudStorageHint")}</p>
      </div>

      <p className="branchesDetailFiles__body">{t("filesSection.placeholderBody")}</p>
    </section>
  );
};

export default Branches_detailView_filesField;
