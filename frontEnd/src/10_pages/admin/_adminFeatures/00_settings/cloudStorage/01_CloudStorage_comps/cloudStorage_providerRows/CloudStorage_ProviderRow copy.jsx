import { useState, useRef, useEffect, Fragment } from "react";
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
  const [urlEditing, setUrlEditing] = useState(false);
  const [urlValue, setUrlValue] = useState(provider.consoleUrl);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    setUrlValue(provider.consoleUrl);
  }, [provider.consoleUrl]);

  function handleSaveUrl() {
    handlers.onSaveUrl(urlValue.trim());
    setUrlEditing(false);
  }

  function handleCancelUrl() {
    setUrlValue(provider.consoleUrl);
    setUrlEditing(false);
  }

  function handleCopyUrl() {
    navigator.clipboard.writeText(provider.consoleUrl).catch(() => {});
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  }

  function handleLogoUploaded(file) {
    handlers.onLogoUploaded(file, provider.id); // opens the confirm modal — actual upload happens on modal confirm
  }

  const linktoConsole = () => {
    window.open(provider.consoleUrl, "_blank", "noopener,noreferrer");
  };

  const isMonitorOpen = states.monitorOpen === provider.id;
  const isUploadOpen = states.uploadOpen === provider.id;

  return (
    <Fragment>
      {/* ── Main Row ── */}
      <tr
        className={`provider-row${isMonitorOpen ? " expanded" : ""}`}
        id={`row-${provider.id}`}>
        <td className="row-num center">{index + 1}</td>
        <td className="logo-cell center">
          <CloudStorage_providerRow_logo
            provider={provider}
            onToggleUpload={handlers.onToggleUpload}
          />
        </td>
        <td>
          <CloudStorage_providerRow_name provider={provider} />
        </td>
        <td className="col-url-cell">
          <CloudStorage_providerRow_url
            provider={provider}
            copied={copied}
            urlEditing={urlEditing}
            setUrlValue={setUrlValue}
            urlValue={urlValue}
            handleSaveUrl={handleSaveUrl}
            handleCancelUrl={handleCancelUrl}
            linktoConsole={linktoConsole}
            handleCopyUrl={handleCopyUrl}
            setUrlEditing={setUrlEditing}
          />
        </td>
        <td className="files-cell">
          <CloudStorage_providerRow_files provider={provider} />
        </td>
        <td className="usage-cell">
          <CloudStorage_providerRow_usage provider={provider} />
        </td>
        <td className="payment-cell center">
          <CloudStorage_providerRow_payment provider={provider} />
        </td>
        <td className="center">
          <CloudStorage_providerRow_enabled
            provider={provider}
            onToggleEnabled={handlers.onToggleEnabled}
          />
        </td>
        <td className="center">
          <CloudStorage_providerRow_default
            provider={provider}
            onSetDefault={handlers.onSetDefault}
          />
        </td>
        <td className="center">
          <CloudStorage_providerRow_customExpiry
            provider={provider}
            onToggleExpiry={handlers.onToggleExpiry}
          />
        </td>
        <td className="center">
          <CloudStorage_providerRow_expand
            monitorOpen={isMonitorOpen}
            onToggleMonitor={() => handlers.onToggleMonitor(provider.id)}
          />
        </td>
      </tr>

      <CloudStorage_logoPanel
        open={isUploadOpen}
        hasLogo={provider.hasLogo}
        currentLogoUrl={provider.logoUrl}
        isUploading={provider.isLogoUploading}
        onClose={handlers.onToggleUpload}
        onUploaded={handleLogoUploaded}
      />

      <CloudStorage_MonitorPanel
        open={isMonitorOpen}
        provider={provider}
        monitorLoading={provider.monitorLoading}
        onCopyKey={() => console.log("Object key copied", "📋")}
      />
    </Fragment>
  );
};

export default CloudStorage_ProviderRow;
