import "../../_styles/cK_setup_states/cK_setup_empty_cuisineTags.css";

const CK_setup_empty_cuisineTags = ({ states, handlers, childProps, t }) => {
  return (
    <div className="cK_setup_empty_cuisineTags">
      {/* <p>{states.message}</p> */}
      <h1>CK_setup_empty_cuisineTags</h1>
      <button onClick={handlers.handleAddnew}>Add new cuisine tag</button>
    </div>
  );
};

export default CK_setup_empty_cuisineTags;
