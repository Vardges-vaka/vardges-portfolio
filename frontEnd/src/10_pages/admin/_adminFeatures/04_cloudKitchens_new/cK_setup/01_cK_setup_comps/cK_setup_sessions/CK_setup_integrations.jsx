import { CK_setup_empty_integrations } from "../cK_setup_states/_cK_setup_states.index";
import {
  CK_setup_integrations_addForm,
  CK_setup_integrations_viewOne,
  CK_setup_integrations_viewAll,
} from "../cK_setup_session_integrations/_cK_setup_session_integrations.index";
import CK_setup_entity_unsavedModal from "../cK_setup_shared/CK_setup_entity_unsavedModal.jsx";
import "../../_styles/cK_setup_session_integrations/cK_setup_integrations.css";

const CK_setup_integrations = ({ states, handlers, childProps, t }) => {
  const {
    stp_integrations_addForm_props,
    stp_empty_integrations_props,
    stp_integrations_viewOne_props,
    stp_integrations_viewAll_props,
    stp_integrations_modals_props,
  } = childProps;

  return (
    <div className="cK_setup_integrations">
      {states.activeOperation === "adding" && (
        <CK_setup_integrations_addForm
          states={stp_integrations_addForm_props.states}
          handlers={stp_integrations_addForm_props.handlers}
          childProps={stp_integrations_addForm_props.childComps}
          t={stp_integrations_addForm_props.t}
        />
      )}
      {states.activeOperation === "viewing" &&
        (states.integrations.length === 0 ? (
          <CK_setup_empty_integrations
            states={stp_empty_integrations_props.states}
            handlers={stp_empty_integrations_props.handlers}
            childProps={stp_empty_integrations_props.childComps}
            t={stp_empty_integrations_props.t}
          />
        ) : states.activeViewingType === "one" ? (
          <CK_setup_integrations_viewOne
            states={stp_integrations_viewOne_props.states}
            handlers={stp_integrations_viewOne_props.handlers}
          />
        ) : (
          <CK_setup_integrations_viewAll
            states={stp_integrations_viewAll_props.states}
            handlers={stp_integrations_viewAll_props.handlers}
          />
        ))}

      <CK_setup_entity_unsavedModal
        states={stp_integrations_modals_props.states}
        handlers={stp_integrations_modals_props.handlers}
      />
    </div>
  );
};

export default CK_setup_integrations;
