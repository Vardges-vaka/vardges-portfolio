import "./_styles/xCloudStorage.css";

import { useCloudStorage } from "./03_CloudStorage_hooks/_CloudStorage_hooks.index.js";
import {
  CloudStorage_ProviderCard,
  CloudStorage_ConfirmModal,
} from "./01_CloudStorage_comps/_CloudStorage_comps.index.js";

const CloudStorage = () => {
  const { t, states, compProps } = useCloudStorage();
  const { loading, error } = states;

  return (
    <div className="xCloudStorage">
      <h2 className="xCloudStorage_title">{t("title")}</h2>
      <p className="xCloudStorage_subtitle">{t("subtitle")}</p>

      {loading && (
        <p className="xCloudStorage_status xCloudStorage_statusMuted" aria-live="polite">
          {t("loading")}
        </p>
      )}

      {error && !loading && (
        <p className="xCloudStorage_status xCloudStorage_statusError" role="alert">
          {t(error, { defaultValue: error })}
        </p>
      )}

      {!loading && (
        <div className="xCloudStorage_grid">
          {compProps.cards.map(({ CloudStorage_ProviderCard_props }) => (
            <CloudStorage_ProviderCard
              key={CloudStorage_ProviderCard_props.provider}
              {...CloudStorage_ProviderCard_props}
            />
          ))}
        </div>
      )}

      <CloudStorage_ConfirmModal {...compProps.CloudStorage_ConfirmModal_props} />
    </div>
  );
};

CloudStorage.displayName = "CloudStorage";

export default CloudStorage;
