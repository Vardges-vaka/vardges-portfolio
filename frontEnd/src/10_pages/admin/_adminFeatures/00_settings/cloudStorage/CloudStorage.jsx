import "./cloudStorage.css";
import { useTranslation } from "react-i18next";

import { useCloudStorageSettings } from "./useCloudStorageSettings.js";

const CloudStorage = () => {
  const { t } = useTranslation("settingsCloud");
  const { loading, error, busyKey, rows, patchToggle } = useCloudStorageSettings();

  return (
    <div className="cloudStorage">
      <h2 className="cloudStorage__title" tabIndex={0}>
        {t("title")}
      </h2>
      <p className="cloudStorage__subtitle">{t("subtitle")}</p>

      {loading && (
        <p className="cloudStorage__status cloudStorage__status--muted" aria-live="polite">
          {t("loading")}
        </p>
      )}

      {error && !loading && (
        <p className="cloudStorage__status cloudStorage__status--error" role="alert">
          {t(error, { defaultValue: error })}
        </p>
      )}

      {!loading && (
        <div className="cloudStorage__tableWrap">
          <table className="cloudStorage__table">
            <thead>
              <tr>
                <th scope="col" className="cloudStorage__th">
                  {t("colProvider")}
                </th>
                <th scope="col" className="cloudStorage__th">
                  {t("colEnabled")}
                </th>
                <th scope="col" className="cloudStorage__th">
                  {t("colDefault")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key, meta }) => {
                const busy = !!busyKey?.startsWith(`${key}:`);
                const canDefault = !!meta?.isEnabled;
                return (
                  <tr key={key} className="cloudStorage__row">
                    <td className="cloudStorage__td">{t(`providers.${key}`)}</td>
                    <td className="cloudStorage__td">
                      <label className="cloudStorage__label">
                        <input
                          type="checkbox"
                          className="cloudStorage__input"
                          aria-label={`${t("colEnabled")}: ${t(`providers.${key}`)}`}
                          checked={!!meta?.isEnabled}
                          disabled={busy}
                          onChange={(e) => patchToggle(key, "isEnabled", e.target.checked)}
                        />
                        {meta?.isEnabled ? t("enabledOn") : t("enabledOff")}
                      </label>
                    </td>
                    <td className="cloudStorage__td">
                      <div className="cloudStorage__cellControls">
                        <label
                          className={
                            canDefault ? "cloudStorage__label" : "cloudStorage__label cloudStorage__label--muted"
                          }
                        >
                          <input
                            type="radio"
                            className="cloudStorage__input"
                            name="cloud-storage-default"
                            aria-label={`${t("colDefault")}: ${t(`providers.${key}`)}`}
                            checked={!!meta?.isDefault}
                            disabled={!canDefault || busy}
                            onChange={() => patchToggle(key, "isDefault", true)}
                          />
                          {t("default")}
                        </label>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CloudStorage;
