import {
  formatBytes,
  getLogoTypeLabel,
} from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

import "../../../../_styles/competitors_tableView_profile/competitors_tableView_logo.css";

const Competitors_tableView_logo = ({ states, handlers, t }) => {
  const {
    isEditing,
    isUpdatingLogo,
    currentLogoSrc,
    canUploadLogo,
    logoFile,
    logoPreviewUrl,
    logoMeta,
    fileInputRef,
  } = states;

  const {
    onStartUpdateLogo,
    handlePickLogoClick,
    handleLogoFileChosen,
    handleClearNewLogo,
    handleCancelLogoUpdate,
    openConfirmLogo,
  } = handlers;

  return (
    <div className="Competitors_tableView_logo">
      <div className="Competitors_tableView_logo_heroBox">
        <button
          type="button"
          className="Competitors_tableView_logo_iconAction"
          onClick={onStartUpdateLogo}
          title={t ? t("profile.logo.update", "Update logo") : "Update logo"}
          aria-label={
            t ? t("profile.logo.update", "Update logo") : "Update logo"
          }>
          <svg
            className="Competitors_tableView_logo_iconActionSvg"
            viewBox="0 0 24 24"
            aria-hidden>
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </button>
        {currentLogoSrc ? (
          <img
            className="Competitors_tableView_logo_heroImg"
            src={currentLogoSrc}
            alt=""
          />
        ) : (
          <span className="Competitors_tableView_logo_empty">
            {t ? t("profile.logo.none", "No logo") : "No logo"}
          </span>
        )}
      </div>

      {isEditing && isUpdatingLogo && (
        <div className="Competitors_tableView_logo_card Competitors_tableView_logo_cardInline">
          <div className="Competitors_tableView_logo_cardHeader">
            <h3 className="Competitors_tableView_logo_cardTitle">
              {t ? t("profile.logo.title", "Logo") : "Logo"}
            </h3>
            <div>
              <button
                type="button"
                className="Competitors_tableView_logo_btn"
                onClick={handlePickLogoClick}>
                {t ? t("profile.logo.choose", "Choose file") : "Choose file"}
              </button>
            </div>
          </div>

          <div className="Competitors_tableView_logo_row">
            <div className="Competitors_tableView_logo_slot">
              <span className="Competitors_tableView_logo_slotLabel">
                {t ? t("profile.logo.current", "Current") : "Current"}
              </span>
              <div
                className={
                  "Competitors_tableView_logo_box" +
                  (currentLogoSrc ? " Competitors_tableView_logo_boxFilled" : "")
                }>
                {currentLogoSrc ? (
                  <img
                    className="Competitors_tableView_logo_img"
                    src={currentLogoSrc}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span className="Competitors_tableView_logo_empty">
                    {t ? t("profile.logo.none", "No logo") : "No logo"}
                  </span>
                )}
              </div>
            </div>

            <span className="Competitors_tableView_logo_arrow" aria-hidden="true">
              →
            </span>

            <div className="Competitors_tableView_logo_slot">
              <span className="Competitors_tableView_logo_slotLabel">
                {t ? t("profile.logo.new", "New") : "New"}
              </span>
              <div
                className={
                  "Competitors_tableView_logo_box" +
                  (logoPreviewUrl ? " Competitors_tableView_logo_boxNew" : "")
                }>
                {logoPreviewUrl ? (
                  <>
                    <img
                      className="Competitors_tableView_logo_img"
                      src={logoPreviewUrl}
                      alt=""
                    />
                    <button
                      type="button"
                      className="Competitors_tableView_logo_iconBtn"
                      onClick={handleClearNewLogo}
                      title={t ? t("actions.remove", "Remove") : "Remove"}
                      aria-label={
                        t ? t("actions.remove", "Remove") : "Remove"
                      }>
                      ×
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="Competitors_tableView_logo_dropBtn"
                    onClick={handlePickLogoClick}>
                    {t
                      ? t(
                          "profile.logo.dropHint",
                          "Click to select an image (max 10MB).",
                        )
                      : "Click to select an image (max 10MB)."}
                  </button>
                )}
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            className="Competitors_tableView_logo_fileInput"
            accept="image/*,.png,.jpg,.jpeg,.svg,.ico"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleLogoFileChosen(file);
              e.target.value = "";
            }}
          />

          {logoMeta?.error && (
            <p className="Competitors_tableView_logo_error">{logoMeta.error}</p>
          )}

          {logoFile && !logoMeta?.error && (
            <div className="Competitors_tableView_logo_fileMeta">
              <div className="Competitors_tableView_logo_fileMetaRow">
                <span className="Competitors_tableView_logo_metaLabel">
                  {t ? t("profile.logo.fileName", "File") : "File"}
                </span>
                <span className="Competitors_tableView_logo_metaValue">
                  {logoFile.name}
                </span>
              </div>
              <div className="Competitors_tableView_logo_fileMetaRow">
                <span className="Competitors_tableView_logo_metaLabel">
                  {t ? t("profile.logo.fileType", "Type") : "Type"}
                </span>
                <span className="Competitors_tableView_logo_metaValue">
                  {getLogoTypeLabel(logoFile.type)}
                </span>
              </div>
              <div className="Competitors_tableView_logo_fileMetaRow">
                <span className="Competitors_tableView_logo_metaLabel">
                  {t ? t("profile.logo.fileSize", "Size") : "Size"}
                </span>
                <span className="Competitors_tableView_logo_metaValue">
                  {formatBytes(logoFile.size)}
                </span>
              </div>
              <div className="Competitors_tableView_logo_fileMetaRow">
                <span className="Competitors_tableView_logo_metaLabel">
                  {t
                    ? t("profile.logo.dimensions", "Dimensions")
                    : "Dimensions"}
                </span>
                <span className="Competitors_tableView_logo_metaValue">
                  {logoMeta.width && logoMeta.height
                    ? `${logoMeta.width}×${logoMeta.height}px`
                    : "—"}
                  <span className="Competitors_tableView_logo_metaMuted">
                    {" "}
                    {t
                      ? t(
                          "profile.logo.recommended",
                          "(recommended ≤ 500×500)",
                        )
                      : "(recommended ≤ 500×500)"}
                  </span>
                </span>
              </div>
              {logoMeta.warning && (
                <p className="Competitors_tableView_logo_warning">
                  {logoMeta.warning}
                </p>
              )}
            </div>
          )}

          <div className="Competitors_tableView_logo_footer">
            <button
              type="button"
              className="Competitors_tableView_logo_btn"
              onClick={handleCancelLogoUpdate}>
              {t ? t("actions.cancel", "Cancel") : "Cancel"}
            </button>
            <button
              type="button"
              className="Competitors_tableView_logo_btn Competitors_tableView_logo_btnPrimary"
              onClick={openConfirmLogo}
              disabled={!canUploadLogo}>
              {t ? t("actions.upload", "Upload") : "Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Competitors_tableView_logo;
