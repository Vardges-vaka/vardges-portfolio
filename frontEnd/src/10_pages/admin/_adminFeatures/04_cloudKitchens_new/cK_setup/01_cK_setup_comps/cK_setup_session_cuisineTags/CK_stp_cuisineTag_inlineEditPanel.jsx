import { forwardRef } from "react";
import CK_stp_cuisineTag_editFields from "./CK_stp_cuisineTag_editFields.jsx";
import CK_stp_cuisineTag_auditFields from "./CK_stp_cuisineTag_auditFields.jsx";
import "../../_styles/cK_setup_session_cuisineTags/cK_setup_cuisineTags.css";
import "../../_styles/cK_setup_session_cuisineTags/cK_stp_cuisineTag_inlineEditPanel.css";

const CK_stp_cuisineTag_inlineEditPanel = forwardRef(
  function CK_stp_cuisineTag_inlineEditPanel(
    {
      tag,
      isExpanded = false,
      readOnly = false,
      states,
      handlers,
      t,
      onCancel,
      onSubmit,
      onEnableEdit,
      isSaveDisabled = false,
    },
    ref,
  ) {
    const label = tag?.label?.trim?.() || tag?.value || "Untitled tag";

    return (
      <li
        ref={ref}
        className={
          "cK_stp_cuisineTag_inlineEdit" +
          (isExpanded ? " cK_stp_cuisineTag_inlineEdit--open" : "") +
          (readOnly ? " cK_stp_cuisineTag_inlineEdit--readOnly" : "")
        }>
        <div className="cK_stp_cuisineTag_inlineEdit__collapse">
          <form
            className="cK_stp_cuisineTag_inlineEdit__form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!readOnly && !isSaveDisabled) onSubmit?.();
            }}>
            <div className="cK_setup_cuisineTag_edit_bar cK_stp_cuisineTag_inlineEdit__bar">
              <h3 className="cK_setup_cuisineTag_edit_title cK_stp_cuisineTag_inlineEdit__barTitle">
                {label}
              </h3>
              <div className="cK_stp_cuisineTag_inlineEdit__barRight">
                <CK_stp_cuisineTag_auditFields tag={tag} />
                <div className="cK_setup_cuisineTag_edit_actions">
                  <button
                    type="button"
                    className="cK_setup_cuisineTag_edit_btn cK_setup_cuisineTag_edit_btn_secondary"
                    onClick={onCancel}>
                    {readOnly ? "Close" : "Cancel"}
                  </button>
                  {readOnly ? (
                    <button
                      type="button"
                      className="cK_setup_cuisineTag_edit_btn cK_setup_cuisineTag_edit_btn_primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEnableEdit?.();
                      }}>
                      Update
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="cK_setup_cuisineTag_edit_btn cK_setup_cuisineTag_edit_btn_primary"
                      disabled={isSaveDisabled}>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
            <CK_stp_cuisineTag_editFields
              states={states}
              handlers={handlers}
              t={t}
              readOnly={readOnly}
            />
          </form>
        </div>
      </li>
    );
  },
);

CK_stp_cuisineTag_inlineEditPanel.displayName = "CK_stp_cuisineTag_inlineEditPanel";

export default CK_stp_cuisineTag_inlineEditPanel;
