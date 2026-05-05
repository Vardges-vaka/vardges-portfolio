import { Fragment } from "react";
import { useCloudStorage_ProviderRow } from "../../03_CloudStorage_hooks/_CloudStorage_hooks.index.js";
import {
  CloudStorage_providerRow_logo,
  CloudStorage_providerRow_name,
  CloudStorage_providerRow_url,
  CloudStorage_providerRow_files,
  CloudStorage_providerRow_usage,
  CloudStorage_providerRow_payment,
  CloudStorage_providerRow_enabled,
  CloudStorage_providerRow_default,
  CloudStorage_providerRow_customExpiry,
  CloudStorage_providerRow_expand,
  CloudStorage_MonitorPanel,
  CloudStorage_logoPanel,
} from "../_CloudStorage_comps.index.js";

import "../../_styles/cloudStorage_providerRow.css";

const CloudStorage_ProviderRow = ({ provider, index, states, handlers }) => {
  const {
    states: rowStates,
    handlers: rowHandlers,
    setters: rowSetters,
  } = useCloudStorage_ProviderRow({
    provider,
    states,
    handlers,
  });

  return (
    <Fragment>
      {/* ── Main Row ── */}
      <tr
        className={`provider-row${rowStates.isMonitorOpen ? " expanded" : ""}`}
        id={`row-${provider.id}`}>
        <td className="row-num center">{index + 1}</td>
        <td className="logo-cell center">
          <CloudStorage_providerRow_logo
            provider={provider}
            onToggleUpload={() => handlers.onToggleUpload(provider.id)}
          />
        </td>
        <td>
          <CloudStorage_providerRow_name provider={provider} />
        </td>
        <td className="col-url-cell">
          <CloudStorage_providerRow_url
            provider={provider}
            copied={rowStates.copied}
            urlEditing={rowStates.urlEditing}
            setUrlValue={rowSetters.setUrlValue}
            urlValue={rowStates.urlValue}
            handleSaveUrl={rowHandlers.handleSaveUrl}
            handleCancelUrl={rowHandlers.handleCancelUrl}
            linktoConsole={rowHandlers.linktoConsole}
            handleCopyUrl={rowHandlers.handleCopyUrl}
            setUrlEditing={rowSetters.setUrlEditing}
          />
        </td>
        <td className="col-files files-cell">
          <CloudStorage_providerRow_files provider={provider} />
        </td>
        <td className="col-usage usage-cell">
          <CloudStorage_providerRow_usage provider={provider} />
        </td>
        <td className="col-payment payment-cell center">
          <CloudStorage_providerRow_payment provider={provider} />
        </td>
        <td className="center">
          <CloudStorage_providerRow_enabled
            provider={provider}
            onToggleEnabled={() => handlers.onToggleEnabled(provider.id)}
          />
        </td>
        <td className="center">
          <CloudStorage_providerRow_default
            provider={provider}
            onSetDefault={() => handlers.onSetDefault(provider.id)}
          />
        </td>
        <td className="center">
          <CloudStorage_providerRow_customExpiry
            provider={provider}
            onToggleExpiry={() => handlers.onToggleExpiry(provider.id)}
          />
        </td>
        <td className="center">
          <CloudStorage_providerRow_expand
            monitorOpen={rowStates.isMonitorOpen}
            onToggleMonitor={() => handlers.onToggleMonitor(provider.id)}
          />
        </td>
      </tr>

      <CloudStorage_logoPanel
        open={rowStates.isUploadOpen}
        hasLogo={provider.hasLogo}
        currentLogoUrl={provider.logoUrl}
        isUploading={provider.isLogoUploading}
        onClose={handlers.onToggleUpload}
        onUploaded={rowHandlers.handleLogoUploaded}
      />

      <CloudStorage_MonitorPanel
        open={rowStates.isMonitorOpen}
        provider={provider}
        monitorLoading={provider.monitorLoading}
        onCopyKey={() => console.log("Object key copied", "📋")}
      />
    </Fragment>
  );
};

export default CloudStorage_ProviderRow;
