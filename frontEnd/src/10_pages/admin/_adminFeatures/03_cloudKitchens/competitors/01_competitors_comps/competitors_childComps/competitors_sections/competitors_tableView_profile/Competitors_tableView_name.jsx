import "../../../../_styles/competitors_tableView_profile/competitors_tableView_name.css";

const Competitors_tableView_name = ({ states, handlers, t }) => {
  const {
    isEditing,
    isUpdatingText,
    competitor,
    textDraft,
    canSaveText,
  } = states;

  const {
    onStartUpdateText,
    setTextDraft,
    handleCancelTextUpdate,
    openConfirmText,
  } = handlers;

  return (
    <div className="Competitors_tableView_name">
      <div className="Competitors_tableView_name_card">
        <div className="Competitors_tableView_name_top">
          <div className="Competitors_tableView_name_topSpacer" />
          <button
            type="button"
            className="Competitors_tableView_name_iconAction"
            onClick={onStartUpdateText}
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
              className="Competitors_tableView_name_iconActionSvg"
              viewBox="0 0 24 24"
              aria-hidden>
              <path
                fill="currentColor"
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              />
            </svg>
          </button>
        </div>

        <div className="Competitors_tableView_name_form">
          <div className="Competitors_tableView_name_formRow">
            <span className="Competitors_tableView_name_fieldLabel">
              {t ? t("profile.text.name", "Name") : "Name"}
            </span>
            <input
              className="Competitors_tableView_name_input"
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

          <div className="Competitors_tableView_name_formRow Competitors_tableView_name_formRowTextarea">
            <span className="Competitors_tableView_name_fieldLabel">
              {t
                ? t("profile.text.description", "Description")
                : "Description"}
            </span>
            <textarea
              className="Competitors_tableView_name_textarea"
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
            <div className="Competitors_tableView_name_footer">
              <button
                type="button"
                className="Competitors_tableView_name_btn"
                onClick={handleCancelTextUpdate}>
                {t ? t("actions.cancel", "Cancel") : "Cancel"}
              </button>
              <button
                type="button"
                className="Competitors_tableView_name_btn Competitors_tableView_name_btnPrimary"
                disabled={!canSaveText}
                onClick={openConfirmText}>
                {t ? t("actions.confirm", "Confirm") : "Confirm"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Competitors_tableView_name;
