import { CK_setup_empty_contracts } from "../cK_setup_states/_cK_setup_states.index";
import {
  CK_setup_contracts_addForm,
  CK_setup_contracts_viewOne,
  CK_setup_contracts_viewAll,
} from "../cK_setup_session_contracts/_cK_setup_session_contracts.index";
import "../../_styles/cK_setup_session_contracts/cK_setup_contracts.css";

const CK_setup_contracts = ({ states, handlers, childProps, t }) => {
  const {
    stp_contracts_addForm_props,
    stp_empty_contracts_props,
    stp_contracts_viewOne_props,
    stp_contracts_viewAll_props,
  } = childProps;
  return (
    <div className="cK_setup_contracts">
      {states.activeOperation === "adding" && (
        <CK_setup_contracts_addForm
          states={stp_contracts_addForm_props.states}
          handlers={stp_contracts_addForm_props.handlers}
          childProps={stp_contracts_addForm_props.childProps}
          t={stp_contracts_addForm_props.t}
        />
      )}
      {states.activeOperation === "viewing" &&
        (states.contracts.length === 0 ? (
          <CK_setup_empty_contracts
            states={stp_empty_contracts_props.states}
            handlers={stp_empty_contracts_props.handlers}
            childProps={stp_empty_contracts_props.childProps}
            t={stp_empty_contracts_props.t}
          />
        ) : states.activeViewingType === "one" ? (
          <CK_setup_contracts_viewOne
            states={stp_contracts_viewOne_props.states}
            handlers={stp_contracts_viewOne_props.handlers}
            childProps={stp_contracts_viewOne_props.childProps}
            t={stp_contracts_viewOne_props.t}
          />
        ) : (
          <CK_setup_contracts_viewAll
            states={stp_contracts_viewAll_props.states}
            handlers={stp_contracts_viewAll_props.handlers}
            childProps={stp_contracts_viewAll_props.childProps}
            t={stp_contracts_viewAll_props.t}
          />
        ))}
    </div>
  );
};

export default CK_setup_contracts;
