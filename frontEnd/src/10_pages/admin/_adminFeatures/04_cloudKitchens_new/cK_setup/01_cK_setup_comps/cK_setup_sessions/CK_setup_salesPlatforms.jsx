import { CK_setup_empty_salesPlatforms } from "../cK_setup_states/_cK_setup_states.index.js";
import {
  CK_setup_salesPlatforms_addForm,
  CK_setup_salesPlatforms_viewOne,
  CK_setup_salesPlatforms_viewAll,
} from "../cK_setup_session_salesPlatforms/_cK_setup_session_salesPlatforms.index";
import "../../_styles/cK_setup_session_salesPlatforms/cK_setup_salesPlatforms.css";

const CK_setup_salesPlatforms = ({ states, handlers, childProps, t }) => {
  const {
    stp_empty_salesPlatforms_props,
    stp_salesPlatforms_addForm_props,
    stp_salesPlatforms_viewOne_props,
    stp_salesPlatforms_viewAll_props,
  } = childProps;
  return (
    <div className="cK_setup_salesPlatforms">
      {states.activeOperation === "adding" && (
        <CK_setup_salesPlatforms_addForm
          states={stp_salesPlatforms_addForm_props.states}
          handlers={stp_salesPlatforms_addForm_props.handlers}
          childProps={stp_salesPlatforms_addForm_props.childProps}
          t={stp_salesPlatforms_addForm_props.t}
        />
      )}

      {states.activeOperation === "viewing" &&
      states.salesPlatforms.length === 0 ? (
        <CK_setup_empty_salesPlatforms
          states={stp_empty_salesPlatforms_props.states}
          handlers={stp_empty_salesPlatforms_props.handlers}
          childProps={stp_empty_salesPlatforms_props.childProps}
          t={stp_empty_salesPlatforms_props.t}
        />
      ) : states.activeViewingType === "one" ? (
        <CK_setup_salesPlatforms_viewOne
          states={stp_salesPlatforms_viewOne_props.states}
          handlers={stp_salesPlatforms_viewOne_props.handlers}
          childProps={stp_salesPlatforms_viewOne_props.childProps}
          t={stp_salesPlatforms_viewOne_props.t}
        />
      ) : (
        <CK_setup_salesPlatforms_viewAll
          states={stp_salesPlatforms_viewAll_props.states}
          handlers={stp_salesPlatforms_viewAll_props.handlers}
          childProps={stp_salesPlatforms_viewAll_props.childProps}
          t={stp_salesPlatforms_viewAll_props.t}
        />
      )}
    </div>
  );
};

export default CK_setup_salesPlatforms;
