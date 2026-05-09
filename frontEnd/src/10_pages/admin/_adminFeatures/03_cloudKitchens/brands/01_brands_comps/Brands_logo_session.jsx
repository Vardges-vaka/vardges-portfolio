import { useRef } from "react";
import { getBrandDisplayName } from "../02_brands_helpers/_brands_helpers.index.js";
import "../_styles/brands_logo_session.css";

const ALL_LOGO_TYPES = ["png", "jpg", "svg", "highRes", "pdf", "ico"];
const IMAGE_TYPES = ["png", "jpg", "svg"];
const VIEWABLE_TYPES = ["png", "jpg", "svg", "pdf"];
const PROVIDER_LABELS = { gcs: "Google Cloud", s3: "AWS S3", r2: "Cloudflare R2", blob: "Azure Blob" };
const PROVIDER_SHORT = { gcs: "GCS", s3: "S3", r2: "R2", blob: "Azure" };

const formatSize = (bytes) => {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const CloseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const TypeBadge = ({ type }) => (
  <span className="Brands_logo_session_typeBadge">{type.toUpperCase()}</span>
);

// ─── Download helper (fetch + blob → triggers real download) ─────────────────

const triggerDownload = async (signedUrl, filename) => {
  try {
    const res = await fetch(signedUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    window.open(signedUrl, "_blank");
  }
};

// ─── VIEW mode ────────────────────────────────────────────────────────────────

const Brands_logo_session_view = ({ brand, logoEdit, onSwitchToEdit, t }) => {
  const logos = brand?.files?.logos;
  const logosMeta = brand?.files?.logosMeta;
  const hasAny = logos && !Array.isArray(logos) && Object.values(logos).some(Boolean);

  return (
    <div className="Brands_logo_session_view">
      {!hasAny && (
        <p className="Brands_logo_session_emptyHint">{t("logoSession.noLogosYet")}</p>
      )}

      <div className="Brands_logo_session_viewList">
        {ALL_LOGO_TYPES.map((lt) => {
          const stored = logos?.[lt];
          const meta = logosMeta?.[lt];
          const signedUrl = logoEdit.currentUrls?.[lt];
          const size = meta?.size;
          const mimeType = meta?.mimeType;
          const isViewable = VIEWABLE_TYPES.includes(lt);
          const brandName = getBrandDisplayName(brand);
          const downloadName = `${brandName}_logo_${lt}${meta?.ext || ""}`;

          return (
            <div
              key={lt}
              className={"Brands_logo_session_viewRow" + (!stored ? " Brands_logo_session_viewRow--empty" : "")}>
              <div className="Brands_logo_session_viewRowLeft">
                <TypeBadge type={lt} />
                {stored ? (
                  <div className="Brands_logo_session_viewMeta">
                    {size ? (
                      <span className="Brands_logo_session_viewSize">{formatSize(size)}</span>
                    ) : null}
                    {mimeType ? (
                      <span className="Brands_logo_session_viewMime">{mimeType}</span>
                    ) : null}
                    {!size && !mimeType && logoEdit.isLoadingCurrentUrls ? (
                      <span className="Brands_logo_session_viewMime">{t("loading")}</span>
                    ) : null}
                  </div>
                ) : (
                  <span className="Brands_logo_session_viewEmpty">{t("logoSession.notUploaded")}</span>
                )}
              </div>

              <div className="Brands_logo_session_viewRowActions">
                {stored && signedUrl ? (
                  <>
                    <button
                      type="button"
                      className="Brands_logo_session_viewBtn"
                      onClick={() => triggerDownload(signedUrl, downloadName)}
                      title={t("logoSession.download")}>
                      <DownloadIcon />
                      {t("logoSession.download")}
                    </button>
                    {isViewable ? (
                      <a
                        className="Brands_logo_session_viewBtn"
                        href={signedUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={t("actions.view")}>
                        <EyeIcon />
                        {t("actions.view")}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="Brands_logo_session_viewBtn Brands_logo_session_viewBtn--disabled"
                        disabled
                        title={t("logoSession.viewNotAvailable")}>
                        <EyeIcon />
                        {t("actions.view")}
                      </button>
                    )}
                  </>
                ) : stored ? (
                  <span className="Brands_logo_session_viewLoadingUrl">{t("loading")}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="Brands_logo_session_viewFooter">
        <button
          type="button"
          className="Brands_logo_session_editBtn"
          onClick={onSwitchToEdit}>
          <EditIcon />
          {t("logoSession.editLogos")}
        </button>
      </div>
    </div>
  );
};

// ─── EDIT mode: single type row ────────────────────────────────────────────────

const Brands_logo_session_typeRow = ({
  logoType,
  currentUrl,
  upload,
  uploadProgress,
  onFileSelect,
  onClearFile,
  t,
}) => {
  const inputRef = useRef(null);
  const hasNew = !!upload?.file;
  const hasCurrent = !!currentUrl;
  const showImg = IMAGE_TYPES.includes(logoType);
  const isUploading = uploadProgress !== undefined && uploadProgress < 100;
  const isDone = uploadProgress === 100;

  return (
    <div className="Brands_logo_session_typeRow">
      <div className="Brands_logo_session_typeHeader">
        <TypeBadge type={logoType} />
        {hasCurrent && <span className="Brands_logo_session_typeExists">{t("logoPanel.currentExists")}</span>}
        {isDone && <span className="Brands_logo_session_typeDone">✓</span>}
      </div>

      {(isUploading || isDone) ? (
        <div className="Brands_logo_session_uploadingState">
          <div className="Brands_logo_session_uploadInfo">
            <FileIcon />
            <span className="Brands_logo_session_uploadFileName">{upload?.file?.name}</span>
            <span className="Brands_logo_session_uploadFileMeta">
              {formatSize(upload?.file?.size)}
              {upload?.file?.type ? ` • ${upload.file.type}` : ""}
            </span>
          </div>
          <div className="Brands_logo_session_progressWrap">
            <div
              className="Brands_logo_session_progressBar"
              style={{ width: `${uploadProgress ?? 0}%` }}
            />
          </div>
          <span className="Brands_logo_session_progressLabel">
            {isDone ? t("logoSession.uploadDone") : `${uploadProgress ?? 0}%`}
          </span>
        </div>
      ) : (
        <div className="Brands_logo_session_editGrid">
          <div className="Brands_logo_session_previewSlot">
            <span className="Brands_logo_session_previewLabel">{t("logoPanel.current")}</span>
            {hasCurrent ? (
              <div className="Brands_logo_session_previewBox Brands_logo_session_previewBox--filled">
                {showImg
                  ? <img className="Brands_logo_session_previewImg" src={currentUrl} alt={logoType} />
                  : <span className="Brands_logo_session_previewText">✓ {logoType.toUpperCase()}</span>}
              </div>
            ) : (
              <div className="Brands_logo_session_previewBox Brands_logo_session_previewBox--empty">
                <span>{t("logoPanel.noCurrent")}</span>
              </div>
            )}
          </div>

          <span className="Brands_logo_session_arrow">→</span>

          <div className="Brands_logo_session_previewSlot">
            <span className="Brands_logo_session_previewLabel">{t("logoPanel.new")}</span>
            {hasNew ? (
              <div className="Brands_logo_session_previewBox Brands_logo_session_previewBox--new">
                {upload.previewUrl && showImg ? (
                  <img className="Brands_logo_session_previewImg" src={upload.previewUrl} alt={logoType} />
                ) : (
                  <div className="Brands_logo_session_fileInfo">
                    <FileIcon />
                    <div className="Brands_logo_session_fileInfoText">
                      <span className="Brands_logo_session_uploadFileName">{upload.file.name}</span>
                      <span className="Brands_logo_session_uploadFileMeta">
                        {formatSize(upload.file.size)}
                        {upload.file.type ? ` • ${upload.file.type}` : ""}
                      </span>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  className="Brands_logo_session_clearBtn"
                  onClick={() => onClearFile(logoType)}
                  title={t("actions.remove")}>
                  <TrashIcon />
                </button>
              </div>
            ) : (
              <div
                className="Brands_logo_session_dropzone"
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onFileSelect(logoType, f); }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => inputRef.current?.click()}>
                <span className="Brands_logo_session_dropzoneText">
                  {t("logoPanel.dropHint", { type: logoType.toUpperCase() })}
                </span>
                <input
                  ref={inputRef}
                  type="file"
                  className="Brands_logo_session_fileInput"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onFileSelect(logoType, f);
                    e.target.value = "";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* File info strip when image file is selected (shown below the image preview) */}
      {hasNew && showImg && !isUploading && !isDone && (
        <div className="Brands_logo_session_selectedFileMeta">
          <FileIcon />
          <span>{upload.file.name}</span>
          <span className="Brands_logo_session_uploadFileMeta">
            {formatSize(upload.file.size)}
            {upload.file.type ? ` • ${upload.file.type}` : ""}
          </span>
        </div>
      )}

      {upload?.warning && (
        <div className="Brands_logo_session_warning">
          ⚠ {upload.warning} — {t("logoPanel.warningHint")}
        </div>
      )}
    </div>
  );
};

// ─── EDIT mode shell ──────────────────────────────────────────────────────────

const Brands_logo_session_edit = ({
  logoEdit,
  onSwitchToView,
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
  const {
    activeTypes,
    uploads,
    providers,
    provider,
    currentUrls,
    uploadProgress,
    isLoadingProviders,
    isLoadingCurrentUrls,
    isSaving,
    error,
    confirmOpen,
  } = logoEdit;
  const availableToAdd = ALL_LOGO_TYPES.filter((lt) => !activeTypes.includes(lt));
  const hasAnyFile = activeTypes.some((lt) => uploads[lt]?.file);
  const warningTypes = activeTypes.filter((lt) => uploads[lt]?.warning);

  return (
    <div className="Brands_logo_session_edit">
      <div className="Brands_logo_session_providerRow">
        <span className="Brands_logo_session_providerLabel">{t("logoPanel.uploadTo")}</span>
        {isLoadingProviders ? (
          <span className="Brands_logo_session_loadingText">{t("loading")}</span>
        ) : (
          <div className="Brands_logo_session_providers">
            {providers.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={!p.isEnabled || isSaving}
                className={
                  "Brands_logo_session_providerBtn" +
                  (p.id === provider ? " Brands_logo_session_providerBtn--active" : "") +
                  (!p.isEnabled ? " Brands_logo_session_providerBtn--disabled" : "")
                }
                onClick={() => p.isEnabled && onProviderSelect(p.id)}
                title={p.isEnabled ? PROVIDER_LABELS[p.id] : t("logoPanel.providerDisabled")}>
                {PROVIDER_SHORT[p.id]}
                {p.isDefault && p.isEnabled && <span className="Brands_logo_session_providerStar">★</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="Brands_logo_session_typeList">
        {isLoadingCurrentUrls ? (
          <p className="Brands_logo_session_loadingText">{t("loading")}</p>
        ) : (
          activeTypes.map((lt) => (
            <div key={lt} className="Brands_logo_session_typeWrap">
              <Brands_logo_session_typeRow
                logoType={lt}
                currentUrl={currentUrls?.[lt] || null}
                upload={uploads[lt]}
                uploadProgress={uploadProgress?.[lt]}
                onFileSelect={onFileSelect}
                onClearFile={onClearFile}
                t={t}
              />
              {lt !== "png" && !isSaving && (
                <button
                  type="button"
                  className="Brands_logo_session_removeTypeBtn"
                  onClick={() => onRemoveType(lt)}
                  title={t("logoPanel.removeType")}>
                  <CloseIcon />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {!isSaving && availableToAdd.length > 0 && (
        <div className="Brands_logo_session_addTypeRow">
          <span className="Brands_logo_session_addTypeLabel">{t("logoPanel.addType")}</span>
          <div className="Brands_logo_session_addTypeBtns">
            {availableToAdd.map((lt) => (
              <button
                key={lt}
                type="button"
                className="Brands_logo_session_addTypeBtn"
                onClick={() => onAddType(lt)}>
                + {lt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="Brands_logo_session_error">{error}</p>}

      {!isSaving && (
        <div className="Brands_logo_session_editFooter">
          <button
            type="button"
            className="Brands_logo_session_cancelBtn"
            onClick={onSwitchToView}>
            {t("actions.cancel")}
          </button>
          <button
            type="button"
            className="Brands_logo_session_uploadBtn"
            onClick={onConfirmOpen}
            disabled={!hasAnyFile || !provider}>
            {t("logoPanel.upload")}
          </button>
        </div>
      )}

      {confirmOpen && (
        <div className="Brands_logo_session_confirmOverlay">
          <div className="Brands_logo_session_confirm">
            <h4 className="Brands_logo_session_confirmTitle">{t("logoPanel.confirmTitle")}</h4>
            <p className="Brands_logo_session_confirmHint">
              {t("logoPanel.confirmHint", { provider: PROVIDER_LABELS[provider] || provider })}
            </p>
            <ul className="Brands_logo_session_confirmList">
              {activeTypes
                .filter((lt) => uploads[lt]?.file)
                .map((lt) => (
                  <li key={lt} className="Brands_logo_session_confirmItem">
                    <TypeBadge type={lt} />
                    <span className="Brands_logo_session_confirmItemName">{uploads[lt].file.name}</span>
                    <span className="Brands_logo_session_confirmItemSize">{formatSize(uploads[lt].file.size)}</span>
                    {warningTypes.includes(lt) && <span className="Brands_logo_session_confirmItemWarn">⚠</span>}
                  </li>
                ))}
            </ul>
            {warningTypes.length > 0 && (
              <p className="Brands_logo_session_confirmWarning">{t("logoPanel.confirmWarning")}</p>
            )}
            <div className="Brands_logo_session_confirmBtns">
              <button type="button" className="Brands_logo_session_cancelBtn" onClick={onConfirmClose}>
                {t("actions.cancel")}
              </button>
              <button type="button" className="Brands_logo_session_uploadBtn" onClick={onUploadSubmit}>
                {t("actions.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Session shell ────────────────────────────────────────────────────────────

const Brands_logo_session = ({
  viewMode,
  brand,
  logoEdit,
  onBack,
  onSwitchToEdit,
  onSwitchToView,
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
  const brandName = brand ? getBrandDisplayName(brand) : "…";
  const isEdit = viewMode === "logo_edit";

  return (
    <div className="Brands_logo_session">
      <div className="Brands_logo_session_topbar">
        <button
          type="button"
          className="Brands_logo_session_backBtn"
          onClick={onBack}
          disabled={logoEdit.isSaving}>
          <BackIcon />
          {t("actions.back")}
        </button>
        <div className="Brands_logo_session_heading">
          <h2 className="Brands_logo_session_title">
            {isEdit ? t("logoSession.editTitle") : t("logoSession.viewTitle")}
          </h2>
          <span className="Brands_logo_session_brandName">{brandName}</span>
        </div>
      </div>

      {isEdit ? (
        <Brands_logo_session_edit
          logoEdit={logoEdit}
          onSwitchToView={onSwitchToView}
          onAddType={onAddType}
          onRemoveType={onRemoveType}
          onFileSelect={onFileSelect}
          onClearFile={onClearFile}
          onProviderSelect={onProviderSelect}
          onConfirmOpen={onConfirmOpen}
          onConfirmClose={onConfirmClose}
          onUploadSubmit={onUploadSubmit}
          t={t}
        />
      ) : (
        <Brands_logo_session_view
          brand={brand}
          logoEdit={logoEdit}
          onSwitchToEdit={onSwitchToEdit}
          t={t}
        />
      )}
    </div>
  );
};

export default Brands_logo_session;
