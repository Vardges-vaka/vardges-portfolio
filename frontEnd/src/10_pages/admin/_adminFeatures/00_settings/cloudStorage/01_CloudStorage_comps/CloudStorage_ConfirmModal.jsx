import "../_styles/xCloudStorage_ConfirmModal.css";

const DANGER_TYPES = new Set(["disable", "deleteLogo"]);

const CloudStorage_ConfirmModal = ({
  isOpen,
  type,
  provider,
  previousDefault,
  t,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !type || !provider) return null;

  const providerLabel = t(`providers.${provider}`, { defaultValue: provider });
  const isDanger = DANGER_TYPES.has(type);

  const configs = {
    enable: {
      title: t("modal.enable.title", { provider: providerLabel }),
      body: t("modal.enable.body", { provider: providerLabel }),
      confirm: t("modal.enable.confirm", { defaultValue: "Enable" }),
    },
    disable: {
      title: t("modal.disable.title", { provider: providerLabel }),
      body: t("modal.disable.body", { provider: providerLabel }),
      confirm: t("modal.disable.confirm", { defaultValue: "Disable" }),
    },
    setDefault: {
      title: t("modal.setDefault.title", { provider: providerLabel }),
      body: t("modal.setDefault.body", {
        provider: providerLabel,
        previous: previousDefault || "—",
      }),
      confirm: t("modal.setDefault.confirm", { defaultValue: "Set as Default" }),
    },
    deleteLogo: {
      title: t("modal.deleteLogo.title", { provider: providerLabel }),
      body: t("modal.deleteLogo.body", { provider: providerLabel }),
      confirm: t("modal.deleteLogo.confirm", { defaultValue: "Delete" }),
    },
    replaceLogo: {
      title: t("modal.replaceLogo.title", { provider: providerLabel }),
      body: t("modal.replaceLogo.body", { provider: providerLabel }),
      confirm: t("modal.replaceLogo.confirm", { defaultValue: "Replace" }),
    },
  };

  const cfg = configs[type];
  if (!cfg) return null;

  return (
    <div
      className="xCloudStorage_ConfirmModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="csModal-title"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="xCloudStorage_ConfirmModal_box">
        <h2 id="csModal-title" className="xCloudStorage_ConfirmModal_title">
          {cfg.title}
        </h2>
        <p className="xCloudStorage_ConfirmModal_body">{cfg.body}</p>
        <div className="xCloudStorage_ConfirmModal_actions">
          <button
            type="button"
            className="xCloudStorage_ConfirmModal_btnCancel"
            onClick={onCancel}
          >
            {t("modal.cancel", { defaultValue: "Cancel" })}
          </button>
          <button
            type="button"
            className={`xCloudStorage_ConfirmModal_btnConfirm${isDanger ? " xCloudStorage_ConfirmModal_btnConfirm--danger" : ""}`}
            onClick={onConfirm}
          >
            {cfg.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloudStorage_ConfirmModal;
