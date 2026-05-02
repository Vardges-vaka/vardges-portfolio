import "../_styles/xCloudStorage_ProviderCard.css";

const CloudStorage_ProviderCard = ({
  provider,
  meta,
  logoUrl,
  logoUrlLoading,
  logoFile,
  consoleUrlDraft,
  message,
  isBusy,
  onToggle,
  onSetDefault,
  onCustomExpTimeToggle,
  onConsoleUrlChange,
  onConsoleUrlSave,
  onLogoFileChange,
  onLogoUpload,
  onLogoDelete,
  t,
}) => {
  const { isEnabled, isDefault, logo, customExpTime } = meta;
  const anyBusy = isBusy("put") || isBusy("logo:upload") || isBusy("logo:delete");
  const logoUploading = isBusy("logo:upload");
  const logoDeleting = isBusy("logo:delete");
  const saving = isBusy("put");
  const hasLogo = !!logo;
  const isImage = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i.test(logo || "");
  const isDanger = message?.kind === "error";

  return (
    <div
      className={`xCloudStorage_ProviderCard${!isEnabled ? " xCloudStorage_ProviderCard--disabled" : ""}`}
    >
      {/* ── Header ───────────────────────────────────── */}
      <div className="xCloudStorage_ProviderCard_header">
        <div className="xCloudStorage_ProviderCard_headerLeft">
          <span className="xCloudStorage_ProviderCard_name">
            {t(`providers.${provider}`, { defaultValue: provider })}
          </span>
          {isDefault && (
            <span className="xCloudStorage_ProviderCard_defaultBadge">
              {t("card.defaultBadge", { defaultValue: "Default" })}
            </span>
          )}
        </div>
        <label
          className="xCloudStorage_ProviderCard_toggle"
          aria-label={`${isEnabled ? t("card.disable") : t("card.enable")} ${provider}`}
        >
          <input
            type="checkbox"
            checked={!!isEnabled}
            disabled={anyBusy}
            onChange={onToggle}
          />
          <span className="xCloudStorage_ProviderCard_toggleSlider" />
        </label>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="xCloudStorage_ProviderCard_body">
        {/* Set as Default */}
        <div className="xCloudStorage_ProviderCard_row">
          <label
            className={`xCloudStorage_ProviderCard_radioLabel${isDefault ? " xCloudStorage_ProviderCard_radioLabel--active" : ""}`}
          >
            <input
              type="radio"
              name="cloud-default"
              checked={!!isDefault}
              disabled={anyBusy || !isEnabled}
              onChange={onSetDefault}
            />
            {t("card.setDefault", { defaultValue: "Set as Default" })}
          </label>
        </div>

        {/* Custom Exp Time */}
        <div className="xCloudStorage_ProviderCard_row">
          <div className="xCloudStorage_ProviderCard_inlineToggleRow">
            <label className="xCloudStorage_ProviderCard_inlineToggleLabel">
              <input
                type="checkbox"
                checked={!!customExpTime}
                disabled={anyBusy || !isEnabled}
                onChange={onCustomExpTimeToggle}
              />
              {t("card.customExpTime", { defaultValue: "Custom Expiry" })}
            </label>
            <span
              className="xCloudStorage_ProviderCard_hint"
              title={t("card.customExpTimeHint", { defaultValue: "" })}
            >
              ⓘ
            </span>
          </div>
        </div>

        {/* Console URL */}
        <div className="xCloudStorage_ProviderCard_row">
          <span className="xCloudStorage_ProviderCard_label">
            {t("card.consoleUrl", { defaultValue: "Console URL" })}
          </span>
          <div className="xCloudStorage_ProviderCard_inputRow">
            <input
              type="url"
              className="xCloudStorage_ProviderCard_input"
              placeholder={t("card.consoleUrlPlaceholder", {
                defaultValue: "https://console.example.com/…",
              })}
              value={consoleUrlDraft}
              disabled={anyBusy || !isEnabled}
              onChange={(e) => onConsoleUrlChange(e.target.value)}
            />
            <button
              type="button"
              className="xCloudStorage_ProviderCard_btnSecondary"
              disabled={anyBusy || !isEnabled}
              onClick={onConsoleUrlSave}
            >
              {saving
                ? t("card.savingUrl", { defaultValue: "Saving…" })
                : t("card.saveUrl", { defaultValue: "Save" })}
            </button>
          </div>
        </div>

        {/* ── Logo ────────────────────────────────────── */}
        <div className="xCloudStorage_ProviderCard_logoSection">
          <span className="xCloudStorage_ProviderCard_label">
            {t("card.logo", { defaultValue: "Logo" })}
          </span>

          <div className="xCloudStorage_ProviderCard_logoPreview">
            {logoUrlLoading && (
              <p className="xCloudStorage_ProviderCard_logoPlaceholder">
                {t("card.loadingPreview", { defaultValue: "Loading preview…" })}
              </p>
            )}
            {!logoUrlLoading && hasLogo && logoUrl && isImage && (
              <img
                className="xCloudStorage_ProviderCard_logoImg"
                src={logoUrl}
                alt={`${provider} logo`}
              />
            )}
            {!logoUrlLoading && hasLogo && logoUrl && !isImage && (
              <a
                className="xCloudStorage_ProviderCard_logoLink"
                href={logoUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t("card.openFile", { defaultValue: "Open file" })}
              </a>
            )}
            {!logoUrlLoading && !hasLogo && (
              <p className="xCloudStorage_ProviderCard_logoPlaceholder">
                {t("card.noLogo", { defaultValue: "No logo — click Upload to add one" })}
              </p>
            )}
          </div>

          <div className="xCloudStorage_ProviderCard_logoControls">
            <input
              type="file"
              className="xCloudStorage_ProviderCard_fileInput"
              disabled={anyBusy || !isEnabled}
              onChange={(e) => onLogoFileChange(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              className="xCloudStorage_ProviderCard_btnPrimary"
              disabled={!logoFile || anyBusy || !isEnabled}
              onClick={onLogoUpload}
            >
              {logoUploading
                ? t("card.uploading", { defaultValue: "Uploading…" })
                : hasLogo
                  ? t("card.replace", { defaultValue: "Replace" })
                  : t("card.upload", { defaultValue: "Upload" })}
            </button>
            {hasLogo && (
              <button
                type="button"
                className="xCloudStorage_ProviderCard_btnDanger"
                disabled={anyBusy || !isEnabled}
                onClick={onLogoDelete}
              >
                {logoDeleting
                  ? t("card.deleting", { defaultValue: "Deleting…" })
                  : t("card.delete", { defaultValue: "Delete" })}
              </button>
            )}
          </div>
        </div>

        {/* Per-card message */}
        {message && (
          <p
            className={`xCloudStorage_ProviderCard_message xCloudStorage_ProviderCard_message--${message.kind}`}
            role={isDanger ? "alert" : undefined}
          >
            {t(`messages.${message.text}`, { defaultValue: message.text })}
          </p>
        )}
      </div>
    </div>
  );
};

export default CloudStorage_ProviderCard;
