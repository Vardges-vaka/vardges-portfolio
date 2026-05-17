import { useEffect, useMemo, useRef, useState } from "react";
import { LOGO_UPLOAD_CONFIG } from "../../05_competitors_cnst/_competitors_cnst.index.js";

const MAX_LOGO_BYTES = LOGO_UPLOAD_CONFIG.MAX_SIZE;
const RECOMMENDED_MAX_PX = LOGO_UPLOAD_CONFIG.RECOMMENDED_MAX_PX;
const ALLOWED_MIME = LOGO_UPLOAD_CONFIG.ALLOWED_MIME;

export const useCompetitors_sessions_profile = ({ states, handlers, t }) => {
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

  const Competitors_tableView_logo_props = {
    t,
    states: {
      isEditing,
      isUpdatingLogo,
      currentLogoSrc,
      canUploadLogo,
      logoFile,
      logoPreviewUrl,
      logoMeta,
      fileInputRef,
    },
    handlers: {
      onStartUpdateLogo: () => handlers?.handleStartUpdateField?.("logo"),
      handlePickLogoClick,
      handleLogoFileChosen,
      handleClearNewLogo,
      handleCancelLogoUpdate,
      openConfirmLogo,
    },
  };

  const Competitors_tableView_name_props = {
    t,
    states: {
      isEditing,
      isUpdatingText,
      competitor,
      textDraft,
      canSaveText,
    },
    handlers: {
      onStartUpdateText: () => handlers?.handleStartUpdateField?.("text"),
      setTextDraft,
      handleCancelTextUpdate,
      openConfirmText,
    },
  };
  const isConfirmDisabled =
    confirm.type === "logo" ? !canUploadLogo : !canSaveText;

  const cancelLabel = t ? t("actions.cancel", "Cancel") : "Cancel";
  const confirmLabel = t ? t("actions.confirm", "Confirm") : "Confirm";

  const Competitors_confirmModal_profile_props = {
    states: {
      confirm,
      confirmTitle,
      isConfirmDisabled,
      cancelLabel,
      confirmLabel,
      logoFile,
      logoMeta,
      textDraft,
      competitor,
    },
    handlers: {
      onConfirm: () => doConfirm(),
      onCancel: () => closeConfirm(),
    },
  };

  return {
    profileStates: {
      competitor,
      isEditing,
      isUpdatingLogo,
      isUpdatingText,
      textDraft,
      fileInputRef,
      logoFile,
      logoPreviewUrl,
      logoMeta,
      confirm,
      title,
      noSelection,
      currentLogoSrc,
      canSaveText,
      canUploadLogo,
      confirmTitle,
    },
    profileHandlers: {
      handlePickLogoClick,
      handleLogoFileChosen,
      handleClearNewLogo,
      handleCancelLogoUpdate,
      handleCancelTextUpdate,
      openConfirmText,
      openConfirmLogo,
      closeConfirm,
      doConfirm,
      setTextDraft,
    },
    profileCompProps: {
      Competitors_tableView_name_props,
      Competitors_tableView_logo_props,
      Competitors_confirmModal_profile_props,
    },
  };
};
