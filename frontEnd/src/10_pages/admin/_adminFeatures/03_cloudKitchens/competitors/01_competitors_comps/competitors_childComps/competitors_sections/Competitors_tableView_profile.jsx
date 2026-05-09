import { useEffect, useMemo, useRef, useState } from "react";
import "../../../_styles/competitors_tableView_profile.css";

const MAX_LOGO_BYTES = 10 * 1024 * 1024; // 10 MB
const RECOMMENDED_MAX_PX = 500;

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg", // some browsers provide this
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/ico",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/avif",
]);

const formatBytes = (bytes) => {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getLogoTypeLabel = (mime) => {
  if (!mime) return "—";
  if (mime === "image/svg+xml") return "SVG";
  if (mime === "image/png") return "PNG";
  if (mime === "image/jpeg" || mime === "image/jpg") return "JPG";
  if (mime === "image/x-icon" || mime === "image/vnd.microsoft.icon")
    return "ICO";
  if (mime.startsWith("image/"))
    return mime.replace("image/", "").toUpperCase();
  return mime;
};

const Competitors_tableView_profile = ({ states, handlers, compProps, t }) => {
  const competitor = states?.selectedCompetitor || null;
  const isEditing = !!states?.isEditing;
  const updatingFields = Array.isArray(states?.updatingFields)
    ? states.updatingFields
    : [];
  const isUpdatingLogo = updatingFields.includes("logo");
  const isUpdatingText = updatingFields.includes("text");

  const [textDraft, setTextDraft] = useState({ name: "", description: "" });

  const fileInputRef = useRef(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(null);
  const [logoMeta, setLogoMeta] = useState({
    width: null,
    height: null,
    warning: null,
    error: null,
  });

  const [confirm, setConfirm] = useState({ isOpen: false, type: null });

  const title = t
    ? t("profile.title", "Competitor profile")
    : "Competitor profile";
  const noSelection = t
    ? t(
        "profile.noSelection",
        "Select a competitor from the table to view/edit profile.",
      )
    : "Select a competitor from the table to view/edit profile.";

  const currentLogoSrc = competitor?.logo || null;

  useEffect(() => {
    if (!competitor) return;
    setTextDraft({
      name: competitor?.name || "",
      description: competitor?.description || "",
    });
  }, [competitor?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!logoFile) {
      setLogoMeta({ width: null, height: null, warning: null, error: null });
      return;
    }

    const isSvg = logoFile.type === "image/svg+xml";
    const isIco =
      logoFile.type === "image/x-icon" ||
      logoFile.type === "image/vnd.microsoft.icon";
    if (isSvg || isIco) {
      setLogoMeta((prev) => ({ ...prev, width: null, height: null }));
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || null;
      const h = img.naturalHeight || null;
      const warn =
        w && h && (w > RECOMMENDED_MAX_PX || h > RECOMMENDED_MAX_PX)
          ? t
            ? t(
                "profile.logo.recommendedSize",
                "Recommended max size is 500×500px.",
              )
            : "Recommended max size is 500×500px."
          : null;
      setLogoMeta((prev) => ({ ...prev, width: w, height: h, warning: warn }));
    };
    img.onerror = () => {
      if (cancelled) return;
      setLogoMeta((prev) => ({
        ...prev,
        width: null,
        height: null,
        warning: null,
      }));
    };
    img.src = logoPreviewUrl || "";

    return () => {
      cancelled = true;
    };
  }, [logoFile, logoPreviewUrl, t]);

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const canSaveText = useMemo(() => {
    if (!competitor) return false;
    const name = (textDraft.name || "").trim();
    const desc = (textDraft.description || "").trim();
    if (!name) return false;
    return (
      name !== (competitor?.name || "") ||
      desc !== (competitor?.description || "")
    );
  }, [competitor, textDraft]);

  const canUploadLogo = useMemo(() => {
    if (!competitor) return false;
    if (!logoFile || !logoPreviewUrl) return false;
    if (logoMeta?.error) return false;
    return true;
  }, [competitor, logoFile, logoPreviewUrl, logoMeta?.error]);

  const validateLogoFile = (file) => {
    if (!file) return { ok: false, error: "No file selected." };
    if (file.size > MAX_LOGO_BYTES) {
      return {
        ok: false,
        error: t
          ? t("profile.logo.maxSize", "Max file size is 10MB.")
          : "Max file size is 10MB.",
      };
    }

    const typeOk =
      (file.type &&
        (file.type.startsWith("image/") || ALLOWED_MIME.has(file.type))) ||
      ALLOWED_MIME.has(file.type);
    if (!typeOk) {
      return {
        ok: false,
        error: t
          ? t(
              "profile.logo.allowedTypes",
              "Please select an image file (png, jpg, jpeg, ico, svg, etc.).",
            )
          : "Please select an image file (png, jpg, jpeg, ico, svg, etc.).",
      };
    }

    return { ok: true, error: null };
  };

  const handlePickLogoClick = () => {
    if (!isEditing || !isUpdatingLogo) return;
    fileInputRef.current?.click();
  };

  const handleLogoFileChosen = (file) => {
    if (!file) return;

    const { ok, error } = validateLogoFile(file);
    if (!ok) {
      setLogoFile(null);
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
      setLogoPreviewUrl(null);
      setLogoMeta({ width: null, height: null, warning: null, error });
      return;
    }

    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    const url = URL.createObjectURL(file);
    setLogoFile(file);
    setLogoPreviewUrl(url);
    setLogoMeta({ width: null, height: null, warning: null, error: null });
  };

  const handleClearNewLogo = () => {
    setLogoFile(null);
    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    setLogoPreviewUrl(null);
    setLogoMeta({ width: null, height: null, warning: null, error: null });
  };

  const handleCancelLogoUpdate = () => {
    handleClearNewLogo();
    handlers?.handleStopUpdateField?.();
  };

  const handleCancelTextUpdate = () => {
    setTextDraft({
      name: competitor?.name || "",
      description: competitor?.description || "",
    });
    handlers?.handleStopUpdateField?.();
  };

  const openConfirmText = () => setConfirm({ isOpen: true, type: "text" });
  const openConfirmLogo = () => setConfirm({ isOpen: true, type: "logo" });
  const closeConfirm = () => setConfirm({ isOpen: false, type: null });

  const confirmTitle =
    confirm.type === "logo"
      ? t
        ? t("profile.logo.confirmTitle", "Confirm logo upload")
        : "Confirm logo upload"
      : t
        ? t("profile.text.confirmTitle", "Confirm profile update")
        : "Confirm profile update";

  const doConfirm = async () => {
    if (!competitor) return;

    if (confirm.type === "text") {
      const name = (textDraft.name || "").trim();
      const description = (textDraft.description || "").trim();
      handlers?.handleCompetitorProfileTextSave?.({
        competitorId: competitor._id,
        name,
        description,
      });
      setTextEditOpen(false);
      closeConfirm();
      return;
    }

    if (confirm.type === "logo") {
      if (!logoPreviewUrl || !logoFile) return;
      handlers?.handleCompetitorProfileLogoSave?.({
        competitorId: competitor._id,
        logoSrc: logoPreviewUrl,
        file: logoFile,
      });
      // Keep the previewUrl as "current" in mock state; clear selection UI.
      setLogoFile(null);
      setLogoPreviewUrl(null);
      setLogoMeta({ width: null, height: null, warning: null, error: null });
      closeConfirm();
    }
  };

  if (!competitor) {
    return (
      <div className="competitors_tableView_profile">
        <h2 className="competitors_tableView_profile__title">{title}</h2>
        <p className="competitors_tableView_profile__hint">{noSelection}</p>
      </div>
    );
  }

  return (
    <div className="competitors_tableView_profile">
      <div className="competitors_tableView_profile__header">
        <div className="competitors_tableView_profile__headerLeft">
          <h2 className="competitors_tableView_profile__title">{title}</h2>
          <p className="competitors_tableView_profile__subTitle">
            {competitor?.name || "—"}
          </p>
        </div>
      </div>

      <div className="competitors_tableView_profile__viewHero">
        <div className="competitors_tableView_profile__heroLogo">
          <div className="competitors_tableView_profile__heroLogoBox">
            <button
              type="button"
              className="competitors_tableView_profile__iconAction"
              onClick={() => handlers?.handleStartUpdateField?.("logo")}
              title={
                t ? t("profile.logo.update", "Update logo") : "Update logo"
              }
              aria-label={
                t ? t("profile.logo.update", "Update logo") : "Update logo"
              }>
              <svg
                className="competitors_tableView_profile__iconActionSvg"
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
                className="competitors_tableView_profile__heroLogoImg"
                src={currentLogoSrc}
                alt=""
              />
            ) : (
              <span className="competitors_tableView_profile__empty">
                {t ? t("profile.logo.none", "No logo") : "No logo"}
              </span>
            )}
          </div>

          {isEditing && isUpdatingLogo && (
            <div className="competitors_tableView_profile__card competitors_tableView_profile__card--inline">
              <div className="competitors_tableView_profile__cardHeader">
                <h3 className="competitors_tableView_profile__cardTitle">
                  {t ? t("profile.logo.title", "Logo") : "Logo"}
                </h3>
                <div className="competitors_tableView_profile__cardActions">
                  <button
                    type="button"
                    className="competitors_tableView_profile__btn"
                    onClick={handlePickLogoClick}>
                    {t
                      ? t("profile.logo.choose", "Choose file")
                      : "Choose file"}
                  </button>
                </div>
              </div>

              <div className="competitors_tableView_profile__logoRow">
                <div className="competitors_tableView_profile__logoSlot">
                  <span className="competitors_tableView_profile__slotLabel">
                    {t ? t("profile.logo.current", "Current") : "Current"}
                  </span>
                  <div
                    className={
                      "competitors_tableView_profile__logoBox" +
                      (currentLogoSrc
                        ? " competitors_tableView_profile__logoBox--filled"
                        : "")
                    }>
                    {currentLogoSrc ? (
                      <img
                        className="competitors_tableView_profile__logoImg"
                        src={currentLogoSrc}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <span className="competitors_tableView_profile__empty">
                        {t ? t("profile.logo.none", "No logo") : "No logo"}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className="competitors_tableView_profile__arrow"
                  aria-hidden="true">
                  →
                </span>

                <div className="competitors_tableView_profile__logoSlot">
                  <span className="competitors_tableView_profile__slotLabel">
                    {t ? t("profile.logo.new", "New") : "New"}
                  </span>
                  <div
                    className={
                      "competitors_tableView_profile__logoBox" +
                      (logoPreviewUrl
                        ? " competitors_tableView_profile__logoBox--new"
                        : "")
                    }>
                    {logoPreviewUrl ? (
                      <>
                        <img
                          className="competitors_tableView_profile__logoImg"
                          src={logoPreviewUrl}
                          alt=""
                        />
                        <button
                          type="button"
                          className="competitors_tableView_profile__iconBtn"
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
                        className="competitors_tableView_profile__dropBtn"
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
                className="competitors_tableView_profile__fileInput"
                accept="image/*,.png,.jpg,.jpeg,.svg,.ico"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleLogoFileChosen(file);
                  e.target.value = "";
                }}
              />

              {logoMeta?.error && (
                <p className="competitors_tableView_profile__error">
                  {logoMeta.error}
                </p>
              )}

              {logoFile && !logoMeta?.error && (
                <div className="competitors_tableView_profile__fileMeta">
                  <div className="competitors_tableView_profile__fileMetaRow">
                    <span className="competitors_tableView_profile__metaLabel">
                      {t ? t("profile.logo.fileName", "File") : "File"}
                    </span>
                    <span className="competitors_tableView_profile__metaValue">
                      {logoFile.name}
                    </span>
                  </div>
                  <div className="competitors_tableView_profile__fileMetaRow">
                    <span className="competitors_tableView_profile__metaLabel">
                      {t ? t("profile.logo.fileType", "Type") : "Type"}
                    </span>
                    <span className="competitors_tableView_profile__metaValue">
                      {getLogoTypeLabel(logoFile.type)}
                    </span>
                  </div>
                  <div className="competitors_tableView_profile__fileMetaRow">
                    <span className="competitors_tableView_profile__metaLabel">
                      {t ? t("profile.logo.fileSize", "Size") : "Size"}
                    </span>
                    <span className="competitors_tableView_profile__metaValue">
                      {formatBytes(logoFile.size)}
                    </span>
                  </div>
                  <div className="competitors_tableView_profile__fileMetaRow">
                    <span className="competitors_tableView_profile__metaLabel">
                      {t
                        ? t("profile.logo.dimensions", "Dimensions")
                        : "Dimensions"}
                    </span>
                    <span className="competitors_tableView_profile__metaValue">
                      {logoMeta.width && logoMeta.height
                        ? `${logoMeta.width}×${logoMeta.height}px`
                        : "—"}
                      <span className="competitors_tableView_profile__metaMuted">
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
                    <p className="competitors_tableView_profile__warning">
                      {logoMeta.warning}
                    </p>
                  )}
                </div>
              )}

              <div className="competitors_tableView_profile__footer">
                <button
                  type="button"
                  className="competitors_tableView_profile__btn"
                  onClick={handleCancelLogoUpdate}>
                  {t ? t("actions.cancel", "Cancel") : "Cancel"}
                </button>
                <button
                  type="button"
                  className="competitors_tableView_profile__btn competitors_tableView_profile__btn--primary"
                  onClick={openConfirmLogo}
                  disabled={!canUploadLogo}>
                  {t ? t("actions.upload", "Upload") : "Upload"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="competitors_tableView_profile__heroText">
          <div className="competitors_tableView_profile__heroTextCard">
            <div className="competitors_tableView_profile__heroTextTop">
              <div className="competitors_tableView_profile__heroTextSpacer" />
              <button
                type="button"
                className="competitors_tableView_profile__iconAction"
                onClick={() => handlers?.handleStartUpdateField?.("text")}
                title={
                  t
                    ? t("profile.text.update", "Update name & description")
                    : "Update name & description"
                }
                aria-label={
                  t
                    ? t("profile.text.update", "Update name & description")
                    : "Update name & description"
                }>
                <svg
                  className="competitors_tableView_profile__iconActionSvg"
                  viewBox="0 0 24 24"
                  aria-hidden>
                  <path
                    fill="currentColor"
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                  />
                </svg>
              </button>
            </div>

            <div className="competitors_tableView_profile__textForm">
              <div className="competitors_tableView_profile__formRow">
                <span className="competitors_tableView_profile__fieldLabel">
                  {t ? t("profile.text.name", "Name") : "Name"}
                </span>
                <input
                  className="competitors_tableView_profile__input"
                  value={
                    isEditing && isUpdatingText
                      ? textDraft.name
                      : competitor?.name || ""
                  }
                  onChange={(e) =>
                    setTextDraft((p) => ({ ...p, name: e.target.value }))
                  }
                  disabled={!isEditing || !isUpdatingText}
                  placeholder={
                    t ? t("profile.text.namePh", "e.g. Dacha") : "e.g. Dacha"
                  }
                />
              </div>

              <div className="competitors_tableView_profile__formRow competitors_tableView_profile__formRow--textarea">
                <span className="competitors_tableView_profile__fieldLabel">
                  {t
                    ? t("profile.text.description", "Description")
                    : "Description"}
                </span>
                <textarea
                  className="competitors_tableView_profile__textarea"
                  value={
                    isEditing && isUpdatingText
                      ? textDraft.description
                      : competitor?.description || ""
                  }
                  onChange={(e) =>
                    setTextDraft((p) => ({ ...p, description: e.target.value }))
                  }
                  disabled={!isEditing || !isUpdatingText}
                  rows={7}
                  placeholder={
                    t
                      ? t(
                          "profile.text.descPh",
                          "Short description shown in admin and map info.",
                        )
                      : "Short description shown in admin and map info."
                  }
                />
              </div>

              {isEditing && isUpdatingText && (
                <div className="competitors_tableView_profile__footer">
                  <button
                    type="button"
                    className="competitors_tableView_profile__btn"
                    onClick={handleCancelTextUpdate}>
                    {t ? t("actions.cancel", "Cancel") : "Cancel"}
                  </button>
                  <button
                    type="button"
                    className="competitors_tableView_profile__btn competitors_tableView_profile__btn--primary"
                    disabled={!canSaveText}
                    onClick={openConfirmText}>
                    {t ? t("actions.confirm", "Confirm") : "Confirm"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {confirm.isOpen && (
        <div
          className="competitors_tableView_profile__modal"
          role="dialog"
          aria-modal="true">
          <div className="competitors_tableView_profile__modalPanel">
            <h3 className="competitors_tableView_profile__modalTitle">
              {confirmTitle}
            </h3>

            {confirm.type === "logo" ? (
              <>
                <p className="competitors_tableView_profile__modalHint">
                  {t
                    ? t(
                        "profile.logo.confirmHint",
                        "You are about to upload/replace the competitor logo.",
                      )
                    : "You are about to upload/replace the competitor logo."}
                </p>
                <div className="competitors_tableView_profile__modalChanges">
                  <div className="competitors_tableView_profile__modalChange">
                    <strong>
                      {t ? t("profile.logo.fileName", "File") : "File"}
                    </strong>
                    <span>{logoFile?.name || "—"}</span>
                  </div>
                  <div className="competitors_tableView_profile__modalChange">
                    <strong>
                      {t ? t("profile.logo.fileType", "Type") : "Type"}
                    </strong>
                    <span>
                      {logoFile ? getLogoTypeLabel(logoFile.type) : "—"}
                    </span>
                  </div>
                  <div className="competitors_tableView_profile__modalChange">
                    <strong>
                      {t ? t("profile.logo.fileSize", "Size") : "Size"}
                    </strong>
                    <span>{logoFile ? formatBytes(logoFile.size) : "—"}</span>
                  </div>
                  <div className="competitors_tableView_profile__modalChange">
                    <strong>
                      {t
                        ? t("profile.logo.dimensions", "Dimensions")
                        : "Dimensions"}
                    </strong>
                    <span>
                      {logoMeta.width && logoMeta.height
                        ? `${logoMeta.width}×${logoMeta.height}px`
                        : "—"}
                    </span>
                  </div>
                </div>
                {logoMeta?.warning && (
                  <p className="competitors_tableView_profile__warning">
                    {logoMeta.warning}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="competitors_tableView_profile__modalHint">
                  {t
                    ? t(
                        "profile.text.confirmHint",
                        "You are about to update the competitor name/description.",
                      )
                    : "You are about to update the competitor name/description."}
                </p>
                <div className="competitors_tableView_profile__modalChanges">
                  <div className="competitors_tableView_profile__modalChange">
                    <strong>
                      {t ? t("profile.text.name", "Name") : "Name"}
                    </strong>
                    <span>
                      {String(competitor?.name ?? "—")} {"->"}{" "}
                      {String((textDraft.name || "").trim() || "—")}
                    </span>
                  </div>
                  <div className="competitors_tableView_profile__modalChange">
                    <strong>
                      {t
                        ? t("profile.text.description", "Description")
                        : "Description"}
                    </strong>
                    <span>
                      {String(competitor?.description ?? "—")} {"->"}{" "}
                      {String((textDraft.description || "").trim() || "—")}
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="competitors_tableView_profile__modalActions">
              <button
                type="button"
                className="competitors_tableView_profile__btn"
                onClick={closeConfirm}>
                {t ? t("actions.cancel", "Cancel") : "Cancel"}
              </button>
              <button
                type="button"
                className="competitors_tableView_profile__btn competitors_tableView_profile__btn--primary"
                onClick={doConfirm}
                disabled={
                  confirm.type === "logo" ? !canUploadLogo : !canSaveText
                }>
                {t ? t("actions.confirm", "Confirm") : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Competitors_tableView_profile;
