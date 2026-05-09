import { useRef } from "react";
import { getBrandDisplayName } from "../02_brands_helpers/_brands_helpers.index.js";
import "../_styles/brands_logoPanel.css";

const ALL_LOGO_TYPES = ["png", "jpg", "svg", "highRes", "pdf", "ico"];

const PROVIDER_LABELS = { gcs: "Google Cloud", s3: "AWS S3", r2: "Cloudflare R2", blob: "Azure Blob" };
const PROVIDER_SHORT = { gcs: "GCS", s3: "S3", r2: "R2", blob: "Azure" };

const IMAGE_TYPES = ["png", "jpg", "svg"];

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Brands_logoPanel_typeRow = ({ logoType, currentUrl, upload, onFileSelect, onClearFile, t }) => {
  const inputRef = useRef(null);
  const hasNew = !!upload?.file;
  const hasCurrent = !!currentUrl;

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(logoType, file);
  };

  const showImagePreview = IMAGE_TYPES.includes(logoType);

  return (
    <div className="Brands_logoPanel_typeRow">
      <div className="Brands_logoPanel_typeHeader">
        <span className="Brands_logoPanel_typeBadge">{logoType.toUpperCase()}</span>
        {hasCurrent && <span className="Brands_logoPanel_typeExists">{t("logoPanel.currentExists")}</span>}
      </div>

      <div className="Brands_logoPanel_previews">
        <div className="Brands_logoPanel_previewSlot">
          <span className="Brands_logoPanel_previewLabel">{t("logoPanel.current")}</span>
          {hasCurrent ? (
            <div className="Brands_logoPanel_previewBox Brands_logoPanel_previewBox--filled">
              {showImagePreview ? (
                <img className="Brands_logoPanel_previewImg" src={currentUrl} alt={logoType} />
              ) : (
                <span className="Brands_logoPanel_previewFilename">✓ {logoType.toUpperCase()}</span>
              )}
            </div>
          ) : (
            <div className="Brands_logoPanel_previewBox Brands_logoPanel_previewBox--empty">
              <span>{t("logoPanel.noCurrent")}</span>
            </div>
          )}
        </div>

        <div className="Brands_logoPanel_arrow">→</div>

        <div className="Brands_logoPanel_previewSlot">
          <span className="Brands_logoPanel_previewLabel">{t("logoPanel.new")}</span>
          {hasNew ? (
            <div className="Brands_logoPanel_previewBox Brands_logoPanel_previewBox--new">
              {upload.previewUrl && showImagePreview ? (
                <img className="Brands_logoPanel_previewImg" src={upload.previewUrl} alt={logoType} />
              ) : (
                <span className="Brands_logoPanel_previewFilename">{upload.file.name}</span>
              )}
              <button
                type="button"
                className="Brands_logoPanel_clearBtn"
                onClick={() => onClearFile(logoType)}
                title={t("actions.remove")}>
                <TrashIcon />
              </button>
            </div>
          ) : (
            <div
              className="Brands_logoPanel_dropzone"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => inputRef.current?.click()}>
              <span className="Brands_logoPanel_dropzoneText">
                {t("logoPanel.dropHint", { type: logoType.toUpperCase() })}
              </span>
              <input
                ref={inputRef}
                type="file"
                className="Brands_logoPanel_fileInput"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onFileSelect(logoType, file);
                  e.target.value = "";
                }}
              />
            </div>
          )}
        </div>
      </div>

      {upload?.warning && (
        <div className="Brands_logoPanel_warning">
          ⚠ {upload.warning} — {t("logoPanel.warningHint")}
        </div>
      )}
    </div>
  );
};

const Brands_logoPanel = ({
  logoPanel,
  brand,
  onClose,
  onAddType,
  onRemoveType,
  onFileSelect,
  onClearFile,
  onProviderSelect,
  onConfirmOpen,
  onConfirmClose,
  onUploadSubmit,
  t,
}) => {
  if (!logoPanel.isOpen) return null;

  const {
    activeTypes,
    uploads,
    providers,
    provider,
    currentUrls,
    isLoadingProviders,
    isLoadingCurrentUrls,
    isSaving,
    error,
    confirmOpen,
  } = logoPanel;

  const brandName = brand ? getBrandDisplayName(brand) : "…";
  const availableToAdd = ALL_LOGO_TYPES.filter((t) => !activeTypes.includes(t));
  const hasAnyFile = activeTypes.some((lt) => uploads[lt]?.file);
  const warningTypes = activeTypes.filter((lt) => uploads[lt]?.warning);

  return (
    <>
      <div className="Brands_logoPanel_backdrop" onClick={onClose} />
      <div className="Brands_logoPanel">
        <div className="Brands_logoPanel_head">
          <div>
            <h3 className="Brands_logoPanel_title">{t("logoPanel.title")}</h3>
            <span className="Brands_logoPanel_brandName">{brandName}</span>
          </div>
          <button type="button" className="Brands_logoPanel_closeBtn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="Brands_logoPanel_providerSection">
          <span className="Brands_logoPanel_sectionLabel">{t("logoPanel.uploadTo")}</span>
          {isLoadingProviders ? (
            <span className="Brands_logoPanel_loadingText">{t("loading")}</span>
          ) : (
            <div className="Brands_logoPanel_providers">
              {providers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  disabled={!p.isEnabled}
                  className={
                    "Brands_logoPanel_providerBtn" +
                    (p.id === provider ? " Brands_logoPanel_providerBtn--active" : "") +
                    (!p.isEnabled ? " Brands_logoPanel_providerBtn--disabled" : "")
                  }
                  onClick={() => p.isEnabled && onProviderSelect(p.id)}
                  title={p.isEnabled ? PROVIDER_LABELS[p.id] : t("logoPanel.providerDisabled")}>
                  <span>{PROVIDER_SHORT[p.id]}</span>
                  {p.isDefault && p.isEnabled && <span className="Brands_logoPanel_providerStar">★</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="Brands_logoPanel_body">
          {isLoadingCurrentUrls ? (
            <p className="Brands_logoPanel_loadingText">{t("loading")}</p>
          ) : (
            <>
              {activeTypes.map((logoType) => (
                <div key={logoType} className="Brands_logoPanel_typeWrap">
                  <Brands_logoPanel_typeRow
                    logoType={logoType}
                    currentUrl={currentUrls?.[logoType] || null}
                    upload={uploads[logoType]}
                    onFileSelect={onFileSelect}
                    onClearFile={onClearFile}
                    t={t}
                  />
                  {logoType !== "png" && (
                    <button
                      type="button"
                      className="Brands_logoPanel_removeTypeBtn"
                      onClick={() => onRemoveType(logoType)}
                      title={t("logoPanel.removeType")}>
                      <CloseIcon />
                    </button>
                  )}
                </div>
              ))}

              {availableToAdd.length > 0 && (
                <div className="Brands_logoPanel_addTypeRow">
                  <span className="Brands_logoPanel_addTypeLabel">{t("logoPanel.addType")}</span>
                  <div className="Brands_logoPanel_addTypeBtns">
                    {availableToAdd.map((lt) => (
                      <button
                        key={lt}
                        type="button"
                        className="Brands_logoPanel_addTypeBtn"
                        onClick={() => onAddType(lt)}>
                        + {lt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {error && <p className="Brands_logoPanel_error">{error}</p>}

        <div className="Brands_logoPanel_footer">
          <button
            type="button"
            className="Brands_logoPanel_cancelBtn"
            onClick={onClose}
            disabled={isSaving}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="Brands_logoPanel_uploadBtn"
            onClick={onConfirmOpen}
            disabled={!hasAnyFile || !provider || isSaving}>
            {isSaving ? t("saving") : t("logoPanel.upload")}
          </button>
        </div>

        {confirmOpen && (
          <div className="Brands_logoPanel_confirmOverlay">
            <div className="Brands_logoPanel_confirm">
              <h4 className="Brands_logoPanel_confirmTitle">{t("logoPanel.confirmTitle")}</h4>
              <p className="Brands_logoPanel_confirmHint">
                {t("logoPanel.confirmHint", { provider: PROVIDER_LABELS[provider] || provider })}
              </p>
              <ul className="Brands_logoPanel_confirmList">
                {activeTypes
                  .filter((lt) => uploads[lt]?.file)
                  .map((lt) => (
                    <li key={lt} className="Brands_logoPanel_confirmItem">
                      <span className="Brands_logoPanel_typeBadge">{lt.toUpperCase()}</span>
                      {uploads[lt].file.name}
                    </li>
                  ))}
              </ul>
              {warningTypes.length > 0 && (
                <p className="Brands_logoPanel_confirmWarning">
                  ⚠ {t("logoPanel.confirmWarning")}
                </p>
              )}
              <div className="Brands_logoPanel_confirmBtns">
                <button type="button" className="Brands_logoPanel_cancelBtn" onClick={onConfirmClose}>
                  {t("actions.cancel")}
                </button>
                <button type="button" className="Brands_logoPanel_uploadBtn" onClick={onUploadSubmit}>
                  {t("actions.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Brands_logoPanel;
