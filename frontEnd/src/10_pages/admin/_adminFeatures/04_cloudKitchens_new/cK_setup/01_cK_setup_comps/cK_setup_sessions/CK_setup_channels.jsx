import { CK_setup_empty_channels } from "../cK_setup_states/_cK_setup_states.index";
import {
  CK_setup_channels_addForm,
  CK_setup_channels_viewOne,
  CK_setup_channels_viewAll,
} from "../cK_setup_session_channels/_cK_setup_session_channels.index";
import "../../_styles/cK_setup_session_channels/cK_setup_channels.css";

const CK_setup_channels = ({ states, handlers, childProps, t }) => {
  const {
    stp_channels_addForm_props,
    stp_empty_channels_props,
    stp_channels_viewOne_props,
    stp_channels_viewAll_props,
  } = childProps;
  return (
    <div className="cK_setup_channels">
      {states.activeOperation === "adding" && (
        <CK_setup_channels_addForm
          states={stp_channels_addForm_props.states}
          handlers={stp_channels_addForm_props.handlers}
          childProps={stp_channels_addForm_props.childProps}
          t={stp_channels_addForm_props.t}
        />
      )}

      {states.activeOperation === "viewing" && states.channels.length === 0 ? (
        <CK_setup_empty_channels
          states={stp_empty_channels_props.states}
          handlers={stp_empty_channels_props.handlers}
          childProps={stp_empty_channels_props.childProps}
          t={stp_empty_channels_props.t}
        />
      ) : states.activeViewingType === "one" ? (
        <CK_setup_channels_viewOne
          states={stp_channels_viewOne_props.states}
          handlers={stp_channels_viewOne_props.handlers}
          childProps={stp_channels_viewOne_props.childProps}
          t={stp_channels_viewOne_props.t}
        />
      ) : (
        <CK_setup_channels_viewAll
          states={stp_channels_viewAll_props.states}
          handlers={stp_channels_viewAll_props.handlers}
          childProps={stp_channels_viewAll_props.childProps}
          t={stp_channels_viewAll_props.t}
        />
      )}
    </div>
  );
};

export default CK_setup_channels;
