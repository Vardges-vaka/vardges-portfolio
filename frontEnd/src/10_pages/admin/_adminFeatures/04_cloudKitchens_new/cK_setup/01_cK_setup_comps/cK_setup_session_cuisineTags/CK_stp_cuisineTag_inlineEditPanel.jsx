import { forwardRef } from "react";
import CK_stp_cuisineTag_editFields from "./CK_stp_cuisineTag_editFields.jsx";
import "../../_styles/cK_setup_session_cuisineTags/cK_setup_cuisineTags.css";
import "../../_styles/cK_setup_session_cuisineTags/cK_stp_cuisineTag_inlineEditPanel.css";

const CK_stp_cuisineTag_inlineEditPanel = forwardRef(
  function CK_stp_cuisineTag_inlineEditPanel(
    {
      tag,
      isExpanded = false,
      states,
      handlers,
      t,
      onCancel,
      onSubmit,
    },
    ref,
  ) {
    const label = tag?.label?.trim?.() || tag?.value || "Untitled tag";

    return (
      <li
        ref={ref}
        className={`cK_stp_cuisineTag_inlineEdit${
          isExpanded ? " cK_stp_cuisineTag_inlineEdit--open" : ""
        }`}>
        <div className="cK_stp_cuisineTag_inlineEdit__collapse">
          <form
            className="cK_stp_cuisineTag_inlineEdit__form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.();
            }}>
            <div className="cK_setup_cuisineTag_edit_bar cK_stp_cuisineTag_inlineEdit__bar">
              <h3 className="cK_setup_cuisineTag_edit_title">{label}</h3>
              <div className="cK_setup_cuisineTag_edit_actions">
                <button
                  type="button"
                  className="cK_setup_cuisineTag_edit_btn cK_setup_cuisineTag_edit_btn_secondary"
                  onClick={onCancel}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cK_setup_cuisineTag_edit_btn cK_setup_cuisineTag_edit_btn_primary">
                  Save
                </button>
              </div>
            </div>
            <CK_stp_cuisineTag_editFields
              states={states}
              handlers={handlers}
              t={t}
            />
          </form>
        </div>
      </li>
    );
  },
);

CK_stp_cuisineTag_inlineEditPanel.displayName = "CK_stp_cuisineTag_inlineEditPanel";

export default CK_stp_cuisineTag_inlineEditPanel;
