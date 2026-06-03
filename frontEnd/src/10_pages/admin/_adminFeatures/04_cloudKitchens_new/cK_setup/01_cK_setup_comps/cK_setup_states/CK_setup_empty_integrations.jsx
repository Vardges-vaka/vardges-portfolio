import "../../_styles/cK_setup_states/cK_setup_empty_integrations.css";

const CK_setup_empty_integrations = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty_integrations">
      {/* <p>{states.message}</p> */}
      <h1>CK_setup_empty_integrations</h1>
      <button onClick={handlers.handleAddnew}>Add new integration</button>
    </div>
  );
};

export default CK_setup_empty_integrations;
