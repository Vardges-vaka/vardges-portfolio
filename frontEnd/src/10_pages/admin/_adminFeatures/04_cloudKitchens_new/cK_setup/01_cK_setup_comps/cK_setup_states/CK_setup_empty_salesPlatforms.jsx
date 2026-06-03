import "../../_styles/cK_setup_states/cK_setup_empty_salesPlatforms.css";

const CK_setup_empty_salesPlatforms = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty_salesPlatforms">
      {/* <p>{states.message}</p> */}
      <h1>CK_setup_empty_salesPlatforms</h1>
      <button onClick={handlers.handleAddnew}>Add new sales platform</button>
    </div>
  );
};

export default CK_setup_empty_salesPlatforms;
