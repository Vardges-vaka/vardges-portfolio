import { useCloudStorage } from "./03_CloudStorage_hooks/_CloudStorage_hooks.index.js";
import {
  CloudStorage_header,
  CloudStorage_loadingText,
  CloudStorage_errorText,
  CloudStorage_table,
  CloudStorage_confirmModal,
} from "./01_CloudStorage_comps/_CloudStorage_comps.index.js";
import "./_styles/cloudStorage.css";

const CloudStorage = () => {
  const { t, states, compProps } = useCloudStorage();
  const { CS_table_props, CS_ConfirmModal_props } = compProps;

  return (
    <div className="CloudStorage">
      <CloudStorage_header t={t} />

      <CloudStorage_loadingText t={t} loading={states.loading} />

      <CloudStorage_errorText
        t={t}
        loading={states.loading}
        error={states.error}
      />

      <CloudStorage_table
        states={CS_table_props.states}
        compProps={CS_table_props.compProps}
      />

      {states.modal && (
        <CloudStorage_confirmModal
          states={CS_ConfirmModal_props.states}
          handlers={CS_ConfirmModal_props.handlers}
        />
      )}
    </div>
  );
};

CloudStorage.displayName = "CloudStorage";

export default CloudStorage;
