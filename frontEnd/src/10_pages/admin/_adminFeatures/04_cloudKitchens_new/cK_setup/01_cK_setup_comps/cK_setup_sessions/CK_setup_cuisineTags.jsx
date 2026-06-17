import { CK_setup_empty_cuisineTags } from "../cK_setup_states/_cK_setup_states.index";
import {
  CK_setup_cuisineTags_addForm,
  CK_setup_cuisineTags_viewOne,
  CK_setup_cuisineTags_viewAll,
} from "../cK_setup_session_cuisineTags/_cK_setup_session_cuisineTags.index";
import "../../_styles/cK_setup_session_cuisineTags/cK_setup_cuisineTags.css";

const CK_setup_cuisineTags = ({ states, handlers, childProps, t }) => {
  const {
    stp_empty_cuisineTags_props,
    stp_cuisineTags_addForm_props,
    stp_cuisineTags_viewOne_props,
    stp_cuisineTags_viewAll_props,
  } = childProps;

  return (
    <div className="cK_setup_cuisineTags">
      {states.activeOperation === "adding" && (
        <CK_setup_cuisineTags_addForm
          states={stp_cuisineTags_addForm_props.states}
          handlers={stp_cuisineTags_addForm_props.handlers}
          childProps={stp_cuisineTags_addForm_props.childProps}
          t={stp_cuisineTags_addForm_props.t}
        />
      )}

      {states.activeOperation === "viewing" &&
        (states.cuisineTags.length === 0 ? (
          <CK_setup_empty_cuisineTags
            states={stp_empty_cuisineTags_props.states}
            handlers={stp_empty_cuisineTags_props.handlers}
            childProps={stp_empty_cuisineTags_props.childProps}
            t={stp_empty_cuisineTags_props.t}
          />
        ) : states.activeViewingType === "one" ? (
          <CK_setup_cuisineTags_viewOne
            states={stp_cuisineTags_viewOne_props.states}
            handlers={stp_cuisineTags_viewOne_props.handlers}
            childProps={stp_cuisineTags_viewOne_props.childProps}
            t={stp_cuisineTags_viewOne_props.t}
          />
        ) : (
          <CK_setup_cuisineTags_viewAll
            states={stp_cuisineTags_viewAll_props.states}
            handlers={stp_cuisineTags_viewAll_props.handlers}
            childProps={stp_cuisineTags_viewAll_props.childProps}
            t={stp_cuisineTags_viewAll_props.t}
          />
        ))}
    </div>
  );
};

export default CK_setup_cuisineTags;
