import "../../_styles/cK_setup_states/cK_setup_empty_contracts.css";

const CK_setup_empty_contracts = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty_contracts">
      {/* <p>{states.message}</p> */}
      <h1>CK_setup_empty_contracts</h1>
      <button onClick={handlers.handleAddnew}>Add new contract</button>
    </div>
  );
};

export default CK_setup_empty_contracts;
