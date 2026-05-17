import { Update_Icon } from "../../../../../../../../01_components/components.index.js";

import "../../../_styles/competitors_sections_controlBtn.css";

const Competitors_sections_controlBtn = ({
  isEditing,
  onCancel,
  onConfirm,
  onUpdate,
  text,
}) => {
  const updateIcon = Update_Icon();

  const updateLabel =
    text?.updateLabel != null && text.updateLabel !== ""
      ? text.updateLabel
      : text?.editLabel != null && text.editLabel !== ""
        ? text.editLabel
        : "Update";

  return (
    <div className="Competitors_sections_controlBtn">
      <div className="Competitors_sections_controlBtn_actions">
        {isEditing ? (
          <>
            <button
              type="button"
              className="Competitors_sections_controlBtn_btn Competitors_sections_controlBtn_btnGhost"
              onClick={onCancel}>
              {text.cancelLabel}
            </button>
            <button
              type="button"
              className="Competitors_sections_controlBtn_btn Competitors_sections_controlBtn_btnPrimary"
              onClick={onConfirm}>
              {text.confirmLabel}
            </button>
          </>
        ) : (
          <button
            type="button"
            className="Competitors_sections_controlBtn_idle"
            onClick={onUpdate}
            aria-label={updateLabel}>
            <span className="Competitors_sections_controlBtn_idleTrack">
              <span className="Competitors_sections_controlBtn_iconWrap">
                <img
                  className="Competitors_sections_controlBtn_icon"
                  src={updateIcon}
                  alt=""
                  draggable={false}
                />
              </span>
              <span
                className="Competitors_sections_controlBtn_label"
                aria-hidden="true">
                {updateLabel}
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Competitors_sections_controlBtn;
