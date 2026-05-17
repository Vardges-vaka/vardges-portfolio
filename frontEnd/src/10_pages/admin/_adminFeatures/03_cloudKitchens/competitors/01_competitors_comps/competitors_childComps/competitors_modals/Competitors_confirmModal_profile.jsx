import { ConfirmModal } from "../../../../../../../../01_components/components.index.js";
import {
  formatBytes,
  getLogoTypeLabel,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import "../../../_styles/competitors_modals/competitors_confirmModal_profile.css";

const Competitors_confirmModal_profile = ({ states, handlers, t }) => {
  const {
    confirm,
    confirmTitle,
    logoFile,
    logoMeta,
    textDraft,
    isConfirmDisabled,
    cancelLabel,
    confirmLabel,
    competitor,
  } = states;

  const getModalBody = () => {
    if (confirm.type === "logo") {
      return (
        <div className="competitorsConfirmModal_profile">
          <p className="confirmModal_hint">
            {t
              ? t(
                  "profile.logo.confirmHint",
                  "You are about to upload/replace the competitor logo.",
                )
              : "You are about to upload/replace the competitor logo."}
          </p>
          <div className="confirmModal_detailList">
            <div className="confirmModal_detailRow">
              <strong>{t ? t("profile.logo.fileName", "File") : "File"}</strong>
              <span>{logoFile?.name || "—"}</span>
            </div>
            <div className="confirmModal_detailRow">
              <strong>{t ? t("profile.logo.fileType", "Type") : "Type"}</strong>
              <span>{logoFile ? getLogoTypeLabel(logoFile.type) : "—"}</span>
            </div>
            <div className="confirmModal_detailRow">
              <strong>{t ? t("profile.logo.fileSize", "Size") : "Size"}</strong>
              <span>{logoFile ? formatBytes(logoFile.size) : "—"}</span>
            </div>
            <div className="confirmModal_detailRow">
              <strong>
                {t ? t("profile.logo.dimensions", "Dimensions") : "Dimensions"}
              </strong>
              <span>
                {logoMeta.width && logoMeta.height
                  ? `${logoMeta.width}×${logoMeta.height}px`
                  : "—"}
              </span>
            </div>
          </div>
          {logoMeta?.warning ? (
            <p className="confirmModal_alert">{logoMeta.warning}</p>
          ) : null}
        </div>
      );
    }
    return (
      <div className="competitorsConfirmModal_profile">
        <p className="confirmModal_hint">
          {t
            ? t(
                "profile.text.confirmHint",
                "You are about to update the competitor name/description.",
              )
            : "You are about to update the competitor name/description."}
        </p>
        <div className="confirmModal_detailList">
          <div className="confirmModal_detailRow">
            <strong>{t ? t("profile.text.name", "Name") : "Name"}</strong>
            <span>
              {String(competitor?.name ?? "—")} →{" "}
              {String((textDraft.name || "").trim() || "—")}
            </span>
          </div>
          <div className="confirmModal_detailRow">
            <strong>
              {t
                ? t("profile.text.description", "Description")
                : "Description"}
            </strong>
            <span>
              {String(competitor?.description ?? "—")} →{" "}
              {String((textDraft.description || "").trim() || "—")}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ConfirmModal
      isOpen={confirm.isOpen}
      title={confirmTitle}
      danger={false}
      confirmDisabled={isConfirmDisabled}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      onConfirm={handlers.onConfirm}
      onCancel={handlers.onCancel}>
      {getModalBody()}
    </ConfirmModal>
  );
};

export default Competitors_confirmModal_profile;
